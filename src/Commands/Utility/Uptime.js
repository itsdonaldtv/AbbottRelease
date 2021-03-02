const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

    constructor(... args)
    {
        super(...args, {
            aliases: ['alive'],
            description: 'This provides the time the bot has been up',
            category: 'Utilities'
        });
    }
    async run(message)
    {
        message.channel.send(`My uptime is \`${ms(this.client.uptime, { long: true })}\``);
    }
}; 