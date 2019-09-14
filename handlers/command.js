const { readdirSync } = require("fs");

module.exports = (bot) => {
	const load = (dir) => {
		const files = readdirSync(require("path").resolve(__dirname, `../${dir}`)).filter((f) => f.endsWith("js"));
		for(const file of files) {
			let pull = require(`../${dir}/${file}`);
			pull = new pull(bot);
			bot.commands.set(pull.name, pull);
			if(pull.aliases) pull.aliases.forEach((alias) => bot.aliases.set(alias, pull.name));
		}
	};
	load("commands");
};