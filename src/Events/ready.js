const Event = require('../Structures/Event');

module.exports = class extends Event
{
    constructor(...args)
    {
        super(...args, {
            once: true
        });
    }

    run()
    {
        /*
        this.client.queue = {};
        for (guild of this.client.guilds)
        {
            this.client.queue[guild.id] = [];

        } */
        console.log([
            `Logged in as ${this.client.user.tag}`,
            `Loaded ${this.client.commands.size} commands!`,
            `Loaded ${this.client.events.size} events!`,
        ].join('\n'));


        this.client.user.setPresence({
            status: "dnd",
            activity: {
                name: "🔥🦩🔥🦩🔥🦩🔥🦩🔥🦩🔥🦩🔥",
                type: "LISTENING"
            }
        });
    }
};
