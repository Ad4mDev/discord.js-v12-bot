const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "createvc",
    description: "Create Voice Channels in your Server"},
    run: async(client, message , args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.channel.send("<:896365442925482025:914642294752301057> | **You don't have enough Permissions**")
}
    if (!args[0]) {
    return message.channel.send("**Please mention the name for the Channel**")
}
    message.guild.channels.create(args.slice(0).join(" "), {type: "voice"});

    const embed = new Discord.MessageEmbed()
    .setTitle("Channel Updates")
    .setDescription(`Channel has been created`)
    .setColor("2f3136");
  message.channel.send(embed);
}
}
