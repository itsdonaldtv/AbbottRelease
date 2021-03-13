# Abbott
A robust, lightweight Discord bot framework. Easy to extend and easy to use.
Abbott (A play on 'a bot' is meant to convey to users that its simply a bot, easy to use and understand) 
Built upon DiscordJS this serves to be a painless way to build upon a bot on Discord, skip all basic requirements and set up and go straight to customising your bot the way you want and need it for. 
The aim was to provide the frame work for users, so they only have to learn the basics
of documentation and can use this framework to easily extend for their own usage.

Installation:
Install dependencies using npm in root 

Quick Set Up:
In config.json
-Under 'token' you find your developer token for your bot in the Discord developer portal (enables deployment of bot)
-under 'youtubeAPI' acquire an API key from Google to query and load Youtube videos (enables music queue function) 
-under 'owner' you can enter your unique Discord ID to assume executive control

Commands:
Commands extend the basic Command class and implementing new commands are as simply as creating a new .js file with the command name.
You would then call the constructor and implement what you want done to the new command
Finally fill out what it would do upon running the command. 
There are several basic command examples you can find to help guide you, within the repository.


