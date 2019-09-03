const Guild = require("../models/guildSettings");
module.exports = (bot, guild) => {
	Guild.deleteOne({ guildID: guild.id }, (err) => {
		if(err) console.log(err);
	});
};