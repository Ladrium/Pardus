const CSClient = require("./base/CSClient");
const bot = new CSClient();
const { config } = require("dotenv");
const mongoose = require("mongoose");
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
config({
	path: `${__dirname}/.env`,
});
mongoose.connect(process.env.LOGINURI, { useNewUrlParser: true, useUnifiedTopology: true });
Array.prototype.random = function(count) {
	let arr = this;
	if (count === undefined) return arr[Math.floor(Math.random() * arr.length)];
	if (typeof count !== "number") throw new TypeError("The count must be a number.");
	if (!Number.isInteger(count) || count < 1) throw new RangeError("The count must be an integer greater than 0.");
	if (arr.length === 0) return [];
	const rand = new Array(count);
	arr = arr.slice();
	for (let i = 0; i < count; i++) rand[i] = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
	return rand;
};
bot.login(process.env.TOKEN);