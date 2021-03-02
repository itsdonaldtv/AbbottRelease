const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['dc'],
            description: 'Leaves the voice channel',
            category: 'Music'
        });
    }

    async run(message,) 
    {
        message.channel.send("$clean");
        message.channel.send("Good-bye!");
        message.member.voice.channel.leave();
    }
}
