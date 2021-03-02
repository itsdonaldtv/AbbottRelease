const Command = require('../../Structures/Command');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['clean'],
            description: 'Deletes messages of bot',
            category: 'Moderation'
        });
    }

    async run(message) 
    {
        const bot = '250570569538338816';
        const messages = message.channel.messages;
        messages.fetch()
        .then(messages => {
            messages.forEach(m => {
                if(m.author.id === bot)
                {
                    console.log(m.content);
                    m.delete();
                }
                else
                {
                }
            })
        })

    }
}
