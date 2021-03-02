const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["s"],
            description: "Skip the currently playing song",
            category: 'Music',
        });
    }

    run(message) 
    {
        const embed = new MessageEmbed();

        embed.setColor(0x8A382D)
        .addField(`**__Skipping song...__**`, `**Skip** requested by **<${message.author.toString()}>**`);

        const queue = message.client.queue.get(message.guild.id);
        if (!queue)
        return message.reply("There is nothing playing that I could skip for you.").catch(console.error);
        queue.playing = true;
        queue.connection.dispatcher.end();
        queue.textChannel.send(embed).catch(console.error);
    }
};