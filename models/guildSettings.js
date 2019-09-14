const { model, Schema } = require("mongoose");

const guildSchema = new Schema({
	guildID: String,
	staffRoles: Array,
	logChannel: String,
	leave: {
		enabled: Boolean,
		channel: String,
		message: String,
	},
	welcome: {
		enabled: Boolean,
		channel: String,
		message: String,
	},
	prefix: String,
	autoroles: Array,
	case: Number,
});
module.exports = model("Guilds", guildSchema);