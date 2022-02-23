const { MessageEmbed } = require('discord.js');
const db = require('old-wio.db');
const { ownerID } = require("../../owner.json");

module.exports = {
    config: {
        name: "ban",
        category: 'mod',
        aliases: ["b", "7wi"],
        description: "Bans the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send(`<:896365442925482025:914642294752301057> **| ${message.author.username} you dont have permssion to ban**`);
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`<:896365442925482025:914642294752301057> **| ${message.author.username} you dont have permssion to ban**`);
            if (!args[0]) return message.channel.send(`<:896365442925482025:914642294752301057> **| I can't find this member**`)

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send(`<:896365442925482025:914642294752301057> **| ${message.author.username} user not in the server**`);
            if (banMember === message.member) return message.channel.send(`**${message.author.username};** Are you okay?`)

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send(`<:896365442925482025:914642294752301057> **| I couldn't ban that user or bot. Please check my permissions and role position.**`)
            try {
            message.guild.members.ban(banMember);
            banMember.send(`you are banned by **${client.user.username}** in **${message.guild.name}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            message.channel.send(`<:896365430841679882:914642292441231360>** | ${banMember.user.username} banned from the server! :airplane:**`)
            } else {
                message.channel.send(`<:896365430841679882:914642292441231360>** | ${banMember.user.username} banned from the server! :airplane:**`)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("2f3136")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
