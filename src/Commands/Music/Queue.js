const Command = require('../../Structures/Command');
const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["q"],
            description: "Show the music queue and now playing.",
            category: 'Music',
        });
    }

    run(message) 
    {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    
        const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);
    
        let queueEmbed = new MessageEmbed()
          .setTitle("Travis Bott's Line Up Queue")
          .setDescription(description)
          .setColor(0x8A382D);
    
        const splitDescription = splitMessage(description, {
          maxLength: 2048,
          char: "\n",
          prepend: "",
          append: ""
        });
    
        splitDescription.forEach(async (m) => {
          queueEmbed.setDescription(m);
          message.channel.send(queueEmbed);
        });
    }
};

