const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['halp'],
            description: 'Displays available commands to use for the bot',
            category: 'Utilities',
            usage: '[command]'
        });
    }

    async run(message, [command]) {
        const embed = new MessageEmbed()
        .setColor(0xC9ACD2)
        .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
        .setThumbnail(this.client.user.displayAvatarURL())
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();

        if (command)
        {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if (!cmd) 
            {
                return message.channel.send(`Invalid command called. \`${command}\``);
            }
            embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
            embed.setDescription([
                `**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(aliases => `\`${aliases}\``).join(' ') : 'No aliases'}`,
                `**❯ Description:** ${cmd.description}`,
                `**❯ Category:** ${cmd.category}`,
                `**❯ Usage:** ${cmd.usage}`,
            ]);

            return message.channel.send(embed);
        } 
        else 
        {
            embed.setDescription([
                `These are the commands for ${message.guild.name}`,
                `The prefix usage is: ${this.client.prefix}`,
                `Command Params: \`<>\` is strict & \`[]\` is optional`
            ]);
            let categories; 
            if (!this.client.owners.includes(message.author.id))
            {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
            }
            else
            {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories)
            {
                embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
            }
            return message.channel.send(embed);
        }
    }
}
