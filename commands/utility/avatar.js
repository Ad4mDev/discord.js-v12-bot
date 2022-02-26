const Discord = require("discord.js");

module.exports = {
    config: {
  name: "avatar",
  aliases: ["av"],
  description: "Display a user avatar",
  usage: "avatar [@user | user ID]",
  category: "info",
    },
 run: async (bot, message, args) => {
  let user;

if (message.mentions.users.first())
 {
user = message.mentions.users.first();

} else if (args[0]) {

user = message.guild.members.cache.get(args[0]).user;

} else {
user = message. author;
}



let avatar = user.displayAvatarURL ({size: 4096, dynamic: true, format: 'png'});

const embed = new Discord.MessageEmbed()

.setAuthor(`${user.tag}`, message.author.avatarURL({ dynamic: true }))
.setColor('2f3136')
.setDescription(`[**Avatar Link**](${avatar})\n<:reply:914646323570024529>Hey, **${message.author.username}**, its cool right?`)
.addField("ㅤ",`[\**JPEG**\](${user.displayAvatarURL({format: "jpg"})})`, true)
.addField("ㅤ",`[\**PNG\**](${user.displayAvatarURL({format: "png"})})`, true)
.addField("ㅤ",`[\**WEBP\**](${user.displayAvatarURL({format: "webp"})})`, true)
.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
.setImage(avatar);



return message.channel.send(embed);
}
};
