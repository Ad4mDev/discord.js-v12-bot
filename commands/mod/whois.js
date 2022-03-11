const Discord = require("discord.js")
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports = {
    config: {
        name: "whois",
        description: "whois",
        category: 'mod',
        usage: "m/profil <mention a member/member id>",
        aliases: ['whois', 'zbi']
    },
    run: async (bot, message, args) => {
        var permissions = [];
        var acknowledgements = 'None';
        let whoisPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("<:896365442925482025:914642294752301057> **| Sorry you dont have the perm to do it**")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        

        if(member.hasPermission("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.hasPermission("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.hasPermission("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.hasPermission("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.hasPermission("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.hasPermission("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.hasPermission("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.hasPermission("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.hasPermission("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(member.hasPermission("MANAGE_EMOJIS")){
            permissions.push("Manage Emojis");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements = 'Server Owner';
        }
    
        const embed = new Discord.MessageEmbed()
            .setTitle(`:sparkles: __Kurisu User profile__`)
            .setDescription(` ||Kurisu is here||`)
            .setColor('2f3136')
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp()
            .addField("<:on:911040513535246386> Status",`${status[member.user.presence.status]}`, true)
            .addField('<a:magic:893453729179783208> Joined at: ',`${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
            .addField(':calendar:  Created On', member.user.createdAt.toLocaleString(), true)
            .addField(":play_pause:  Playing", member.presence.activities[0] ? member.presence.activities[0].state : `no status!`, true)
            .addField(` \n:closed_lock_with_key: Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "no roles!"}`, true)
            .addField(`> <:896365436491403264:914642293703716884> | **Links**: `,`   [Invite Me](https://discordapp.com/oauth2/authorize?client_id=900317926773653515&permissions=8&scope=bot)`+` / `+`[Support Server](https://discord.gg/4KVHc7zdBJ)`)
            
            
        message.channel.send({embed});
    
    }
    }
