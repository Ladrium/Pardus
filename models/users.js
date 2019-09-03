const { model, Schema } = require("mongoose");

const user = new Schema({
	userID: String,
	developer: Boolean,
	premium: Boolean,
	warns: Array,
});
module.exports = model("user", user);