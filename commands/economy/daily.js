const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    config: {
        name: "daily",
        aliases: ["day"],
        category: "economy",
        description: "Gives You 200 per day",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("2f3136")
                .setDescription(`<:896365442925482025:914642294752301057> | You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(`<:896365442925482025:914642294752301057> | You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `)
          
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("2f3136")
                .setDescription(`<:896365430841679882:914642292441231360> | You've collected your daily reward of ${amount} coins`);
            message.channel.send(`<:896365430841679882:914642292441231360> | You've collected your daily reward of ${amount} coins`)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}
