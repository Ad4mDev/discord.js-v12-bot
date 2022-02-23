module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`<:896365442925482025:914642294752301057>** | That is not a number!**`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `<:896365430841679882:914642292441231360>** | Slowmode set in this channel to ${args[0]}**`
    );
  },
};
