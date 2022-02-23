const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    description: "Remove a role from a member",
    usage: "m/roledel <member mention/member id> <role mention/role id>",
    aliases: ['role del', 'role delete', 'rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("<:896365442925482025:914642294752301057> | **You dont have permission to perform this command!**")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Please provide a user to remove a role from.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Please provide a role to remove from said user.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("<:896365442925482025:914642294752301057> | **I don't have permission to perform this command. Please give me Manage Roles Permission!**")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`2f3136`)
      .setDescription(`<:896365442925482025:914642294752301057> **Error  |** ${rMember.displayName}, **Does not have this role!**`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`2f3136`)
      .setDescription(`<:896365430841679882:914642292441231360> **Success  |** ${rMember} **has been removed from** **${role.name}**`)

      message.channel.send(rolDEL)
    
    }

  },
};
