const Discord = module.require("discord.js");

module.exports = {
  config : {
    name: "deleterole",
    description: "Deletes a role"},
    run: async(client, message, args) => {
    const role = message.mentions.roles.first();
    if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send("<:896365442925482025:914642294752301057> | **You don't have enough Permissions**")
    }
    if (!role) {
    return message.channel.send("`Usage: <prefix> delrole <role>`")
    }
    role.delete();
    const embed = new Discord.MessageEmbed()
    .setTitle("Roles Update")
    .setDescription (`<:896365430841679882:914642292441231360> ${role} role has been deleted`)
    .setColor("2f3136");
  await message.channel.send(embed);
}
}
