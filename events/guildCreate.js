const Guild = require("../models/guildSettings");
module.exports = (bot, guild) => {
	const newGuild = new Guild({
		guildID: guild.id,
		staffRoles: [],
		logChannel: "logs",
		leave:{
			enabled: false,
			channel: "",
			message: "",
		},
		welcome:{
			enabled: false,
			channel: "",
			message: "",
		},
		prefix: "!",
		autoroles: [],
		case: 0,
	});
	newGuild.save().catch(console.error);
};