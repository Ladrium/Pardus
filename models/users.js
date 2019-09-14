const { model, Schema } = require("mongoose");

const user = new Schema({
	userID: String,
	developer: Boolean,
	bio: String,
	premium: Boolean,
});
module.exports = model("user", user);