const Command = require('../../Structures/Command');
const { play }= require('../../Structures/play');
const path = require('path');
const Youtube = require('simple-youtube-api');
const { youtubeAPI } = require('../../../config.json'); 
const youtube = new Youtube(youtubeAPI);
const { MessageEmbed } = require('discord.js');
const ytdl = require("ytdl-core");



module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['play', 'p'],
            description: 'Plays a song of your choice.',
            category: 'Music'
        });
    }


    async run(message, args) 
    {
        const { channel } = message.member.voice;
        const embed = new MessageEmbed();

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) 
        {
            return message.reply("You need to join a voice channel first!").catch(console.error);
        }
        if (serverQueue && channel !== message.guild.me.voice.channel)
        { 
            return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);
        }


        if (!args.length)
        {
            return message
            .reply(`Usage: ${message.client.prefix}play <YouTube URL | Video Name `)
            .catch(console.error);
        }

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))
        {
            return message.reply("Cannot connect to voice channel, missing permissions"); 
        }

        if (!permissions.has("SPEAK")) 
        {
            return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");
        }

        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;

        const url = args[0];
        const urlValid = videoPattern.test(args[0]);


        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };

        let song = null;

        const results = await youtube.searchVideos(search, 1);

        let curSong = results[0];

        song = {
            title: curSong.title,
            url: curSong.url,
            duration: curSong.durationSeconds,
            playing: false
        }

        if (serverQueue) 
        {
            serverQueue.songs.push(song);
            embed.setColor(0x8A382D)
            .addField(`**__Queued__**`, `**[${song.title}](${song.url})** has been requested by **<${message.author.toString()}>**`);
            return serverQueue.textChannel
                .send(embed)
                .catch(console.error);
        }

        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);

        try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
        } catch (error) {
        console.error(error);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }
    }
};
