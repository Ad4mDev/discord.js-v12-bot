const Discord = require('discord.js');
const { Console } = require('console');

module.exports = {
    config: {
        name: "unlock",
        description: "unlock channel",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("** <:896365442925482025:914642294752301057> Sorry, you don't have permissions to use this! **")
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`🔓 **Done | Channel Unlocked!** <:896365430841679882:914642292441231360>`);
    }
}
