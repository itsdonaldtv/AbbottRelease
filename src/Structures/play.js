const ytdlDiscord = require("ytdl-core-discord");
const { MessageEmbed } = require('discord.js');

module.exports = {
  async play(song, message) {

    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      return queue.textChannel.send("🚫 Music queue ended.").catch(console.error);
    }

    let stream = null;


    if (song.url.includes("youtube.com")) {
      stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
    }


    const embed = new MessageEmbed();
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
    embed.setColor(0x8A382D)
    .addField(`**__Playing__**`, `**[${song.title}](${song.url})** requested by **<${message.author.toString()}>**`);
    //message.channel.send(embed);
    message.channel.send(embed);
    const type = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
    const dispatcher = queue.connection
      .play(stream, { type: type })
      .on("finish", () => { 
        // Recursively play the 
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
  }
};