const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        aliases: ["ub", "unbanish"],
    },
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("<:896365442925482025:914642294752301057> **| You Dont Have The Permissions To Unban Someone!**")

        if (!args[0]) return message.channel.send("<:896365442925482025:914642294752301057> **| I can't find this member**")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("<:896365442925482025:914642294752301057> **| I couldn't ban that user or bot. Please check my permissions and role position.**")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                message.channel.send(`<:896365430841679882:914642292441231360>** | ${banMember.user.username} has been unbanned**`)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                message.channel.send(`<:896365430841679882:914642292441231360>** | ${banMember.user.username} has been unbanned**`)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unban")
            .addField("**Unbanned**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason}` || "**No Reason**")
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
}
