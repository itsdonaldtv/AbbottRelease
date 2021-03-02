module.exports = class Event {

    constructor(client, name, options = {})
    {
        this.name = name;
        this.client = client;
        //Ready event should fire once 
        this.type = options.once ? 'once' : 'on';
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;

        //Add process events and etc
    }

    async run(...args)
    {
        throw new Error(`Run hasn't been implemented in ${this.name}`);
    }
};