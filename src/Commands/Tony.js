const Command = require('../Structures/Command.js');

module.exports = class extends Command {
    constructor(...args)
    {
        super(...args, {
            aliases: ['tony'],
            description: 'If you read this then you are a scrub'
        });
    }

    async run(message, args)
    {   
        message.channel.send("is gay");
    }
}
