const Discord = module.require("discord.js");

module.exports = {
  config : {
	name: "delchannel",
	description: "Delete Channels From your Server"},
	run: async(client, message, args) => {
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
	return message.channel.send("<:896365442925482025:914642294752301057> | **You don't have enough Permissions**")
	}
        const fetchedChannel = message.mentions.channels.first();
	if (!fetchedChannel) {
	return message.channel.send("`Usage: <prefix> delchannel <channel>`")
        }
	fetchedChannel.delete()

	const embed = new Discord.MessageEmbed()
	.setTitle("Channel Updates")
	.setDescription ("<:896365430841679882:914642292441231360> | **Channel has been deleted**")
  
	.setColor("2f3136");
	
	await message.channel.send(embed);
}
}
