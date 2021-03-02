const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pong'],
            description: 'Displays the ping of the bot',
            category: 'Utilities'
        });
    }

    async run(message) {
        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['I do not care, I did not ask', 'Who asked?', 'When did I ask?', 'Where is the person that asked?', 'What is the point?'];
        const response = choices[Math.floor(Math.random() * choices.length)];

        msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
    }
}
