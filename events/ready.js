const Mutes = require("../models/mutes");
const Guild = require("../models/guildSettings");
module.exports = (bot) => {
	setInterval(() =>
		setStatus(["my Master", "the Admins"]), 60000);
	bot.helpEmbed = bot.botEmbed(undefined, bot)
		.setTitle("Help");
	const commands = bot.commands;
	const categories = commands
		.map((c) => c.category)
		.reduce((a, b) => {
			if (a.indexOf(b) < 0) a.push(b);
			return a;
		}, [])
		.sort();
	categories.forEach((category) => {
		const cateCmds = commands.filter((f) => f.category === category);
		bot.helpEmbed.addField(category, cateCmds.map(x =>`\`\`${x.name}\`\``).join(", "));
	});
	bot.setupEmbed = bot.botEmbed(undefined, bot)
		.setTitle("Setup")
		.addField("AutoRole", "To setup autorole on your server.")
		.addField("LogChannel", "To setup the log channel on your server.")
		.addField("WelcomeMessage", "To setup a welcome message on your server.")
		.addField("LeaveMessage", "To setup a leave message ony our server.")
		.addField("StaffRole", "To setup the staff role on your server.")
		.addField("Prefix", "To change the prefix on your server.");
	function setStatus(statuses) {
		if(Array.isArray(statuses)) {
			bot.user.setPresence({
				game:{
					name: statuses.random(),
					type: "LISTENING",
				},
				status: "online",
			});
		}
		else{
			bot.user.setPresence({
				game:{
					name: statuses,
					type: "LISTENING",
				},
				status: "online",
			});
		}
	}
	setInterval(async () => {
		const mutes = await Mutes.find({});
		for(const mute of mutes) {
			if(mute.created + mute.muteTime <= Date.now()) {
				const guild = bot.guilds.get(mute.guildID);
				if(!guild) return;
				const member = guild.members.get(mute.userID);
				if(!member) return;
				let muteRole = guild.roles.find((x) => x.name === "muted");
				if(!muteRole) muteRole = guild.createRole({ name:"muted", color:"#27272b", permissions:[] });
				if(!member.roles.has(muteRole.id)) return;
				member.removeRole(muteRole);
				const logGuild = await Guild.findOne({ guildID: mute.guildID });
				const logChannel = guild.channels.get(logGuild.logChannel);
				if(!logChannel) return;
				logChannel.send(`Unmuted ${member.user}!`);
				Mutes.deleteOne({ userID: member.user.id, guildID: guild.id }, err => {
					if(err) console.log(err);
				});
			}
		}
	}, 10000);
	console.log("I'm not online >:)");
};