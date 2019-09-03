const Guild = require("../models/guildSettings");
module.exports = (bot, guild) => {
	const newGuild = new Guild({
		guildID: guild.id,
		staffRoles: [],
		logChannel: "logs",
		leaveMessage: "no",
		leaveChannel: "no",
		welcomeMessage: "no",
		welcomeChannel: "no",
		prefix: "!",
		autoroles: [],
	});
	newGuild.save().catch(console.error);
};