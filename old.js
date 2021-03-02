  //message.client.queue.set(message.guild.id, queueConstruct);

    
        /*
        var songTitle;
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) 
        {
			return message.reply('Please join a voice channel first!');
        }

        if(!args[0])
        {
            return message.reply('Please specify a URL or song name');
        }

        const msg = await message.channel.send('Loading: :flamingo:');
        msg.edit(`Loading: :shrimp:`);
        msg.edit(`Loading: :flamingo:`);
        msg.edit('Now playing.');
        msg.edit('Now playing..');
        msg.edit('Now playing...');
        
        var songName = args.join(' ');
        
        //msg.edit('Now playing:');

        
        youtube.searchVideos(songName, 1).then(results => {
            var url = 'https://www.youtube.com/watch?v=' + results[0].id;
            //console.log("This will be the song link: " + url);
            message.channel.send('Queued: ' + results[0].title);
            console.log("URL: " + url);
            songTitle = results[0].title;
            songQueue.push(url);
        });

        var connection = await voiceChannel.join();
        await connection.voice.setSelfDeaf(true);
        //play(songQueue[0], message);
        console.log(songQueue[0]);
        var stream = await ytdl(songQueue[0], { highWaterMark: 1 << 25 });
        const dispatcher = connection;
        msg.edit('Now playing: ' + songTitle);
        dispatcher.play(stream).on("finish", () => {
            //songQueue.shift();
        })
        */
        //Hello
        /*
        voiceChannel.join().then(connection => {
            console.log(songQueue[0] + " is first in line");
            const stream = ytdl(songQueue[0], { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
            console.log("Removing: " + songQueue[0]);
            songQueue.shift();
            dispatcher.on('end', () => voiceChannel.leave());
        }); 
        voiceChannel.join().then(connection => {

            youtube.searchVideos(songName, 1).then(results => {
                var url = 'https://www.youtube.com/watch?v=' + results[0].id;
                console.log("This will be the song link: " + url);
                msg.edit('Queued: ' + results[0].title);
                console.log("URL: " + url);
                songQueue.push(url);

                console.log(songQueue[0] + " is first in line");
                const stream = ytdl(songQueue[0], { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                console.log("Removing: " + songQueue[0]);
                songQueue.shift();
                dispatcher.on('end', () => voiceChannel.leave());
                

            }).catch(console.log);
        });
        */