const db = require("old-wio.db");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  config: {
  name: "addemoji",
  aliases: ["upload_emoji", "a-emote"],
  description: "Steal emojis and upload it on your server",
  usage: "addemoji <emoji>",
  category: "admin",
  },
  run: async (bot, message, args) => {

    
    if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
      return message.channel.send(`**${message.author.username}**, You dont have **Enough Perms** ;O; `)
    }
    
    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) { return message.channel.send(`**${message.author.username}**, You dont have **Enough Perms** ;O; `)
    }
    
    const emoji = args[0];
    if (!emoji) return message.channel.send(`**${message.author.username}**, Please give me a **Emoji** 0-0 `);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
        `${Link}`,
        `${name || `${customemoji.name}`}`
      );
      const Added = new MessageEmbed()
        .setTitle(`${message.guild.name} :trident: `)
        .setColor(`#b89c9c`)
        .setDescription(
          `⭕ **Emoji** Added!\n⭕ **Emoji** Name : (${customemoji.name})\n⭕ **Emoji** Id : (${customemoji.id})\n⭕ **By :** (${message.author.username})\n⭕ **In :** (${message.guild.name})`
          
      
          
        );
        
      return message.channel.send(Added);
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`**${message.author.username}**, Please give me a Valid one ! `);
      message.channel.send(
        `**${message.author.username}**, You can use normal emojis `
      );
    }
  }
};
