const { readdirSync } = require("fs");

module.exports = bot => {
	const events = readdirSync("./events/").filter(file => file.endsWith(".js"));

	for (let file of events) {
		const evt = require(`../events/${file}`);

		const eName = file.split(".")[0];
		bot.on(eName, evt.bind(null, bot));
	}
};