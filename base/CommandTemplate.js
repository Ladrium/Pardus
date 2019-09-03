const Command = require("./Command.js");

class Template extends Command {
	constructor(bot) {
		super(bot, {
			name:"Template",
			aliases:["ttttttttttttttttttttt"],
			category:"lala",
			usage:"lele",
			description:"nunu",
			cooldown: 500,
			example: "meh",
		});
	}
	run(message, args) {
		if(message.author.id === args[0]) {
			return this.bot.username;
		}
	}
}
module.exports = Template;

