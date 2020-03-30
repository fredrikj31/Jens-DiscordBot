const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./details.js');

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {
	// Voice only works in guilds, if the message does not come from a guild,
	// we ignore it
	if (!message.guild) return;

	if (message.content === "/join") {
		// Only try to join the sender's voice channel if they are in one themselves
		if (message.member.voice.channel) {
			message.member.voice.channel.join();
		} else {
			message.reply("You need to join a voice channel first!");
		}
	}


	if (message.content === "/disconnect") {
		if (message.member.voice.channel) {
			message.member.voice.channel.leave();
		} else {
			message.reply("You need to join a voice channel first!");
		}
	}

	if (message.content === "/oof") {
		if (message.member.voice.channel) {
			var voiceChannel = message.member.voice.channel
			voiceChannel.join().then(connection => {
			const dispatcher = connection.play('./sounds/oof.mp3')
			dispatcher.on('end', end => voiceChannel.leave());
			}).catch(err => console.log(err))
			setTimeout(function () {
				voiceChannel.leave();
			}, 2000);
		} else {
			message.reply("You need to join a voice channel first!");
		}
	}
});

client.login(settings.TOKEN);
