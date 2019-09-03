const { model, Schema } = require("mongoose");

const guildSchema = new Schema({
	guildID: String,
	staffRoles: Array,
	logChannel: String,
	leaveMessage: String,
	leaveChannel: String,
	welcomeMessage: String,
	welcomeChannel: String,
	prefix: String,
	autoroles: Array,
});
module.exports = model("Guilds", guildSchema);