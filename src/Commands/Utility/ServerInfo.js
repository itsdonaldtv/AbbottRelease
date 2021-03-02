const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js'); 
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Too High :^)'
};
const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['server', 'guild', 'guildinfo '],
            category: 'Utilities'
        });
    }

    async run(message) {
            const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const members = message.guild.members.cache;
            const channels = message.guild.channels.cache;
            const emojis = message.guild.emojis.cache;

            const embed = new MessageEmbed()
                .setDescription(`**Guild information for __${message.guild.name}__**`)
                .setColor(0xEC8315)
                .setThumbnail(message.guild.iconURL( {dynamic: true}))
                .addField('General', [
                    `**❯ Name:** ${message.guild.name}`,
                    `**❯ ID:** ${message.guild.id}`,
                    `**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                    `**❯ Region:** ${regions[message.guild.region]}`,
                    `**❯ Boost Tier:** ${message.guild.premiumTier}`,
                    `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                    `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                    `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                    '\u200b'
                ])
                .addField('Statistics', [
                    `**❯ Role Count:** ${roles.length}`,
                    `**❯ Emote Count:** ${emojis.size}`,
                    `**❯ Regular emotes:** ${emojis.filter(emoji => !emoji.animated).size}`,
                    `**❯ Animated emotes:** ${emojis.filter(emoji => emoji.animated).size}`,
                    `**❯ Member count:** ${message.guild.memberCount}`,
                    `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
                    `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
                    `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                    `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                    `**❯ Boost Count:** ${message.guild.premiumTier || '0'}`,
                    '\u200b'
                ])
                .addField('Presence', [
                    `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                    `**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                    `**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                    `**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                    '\u200b'
                ])
                .addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
                .setTimestamp();
            message.channel.send(embed);

    }
}
