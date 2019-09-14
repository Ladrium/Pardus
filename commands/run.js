const CTemp = require("../base/Command");
const { ErrorMsg } = require("../functions");
const User = require("../models/users");
module.exports = class Run extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "run",
			aliases: ["exec"],
			category: "Developer",
			description: "Use this command to run a code!",
			usage: "!run <code>",
			example: "!run console.log(\"Hello World\")",
		});
	}
	async run(message, args) {
		const user = await User.findOne({ userID: message.author.id });
		if(!user || !user.developer) return ErrorMsg(this.bot, message, "You don't have permissions to execute this command!");
		if(args[0] === "command") {
			const cmd = this.bot.commands.get(args[1]);
			if(!cmd) return ErrorMsg(this.bot, message, "Command not found!");
			args = args.slice(2);
			try{
				return cmd.run(message, args);
			}
			catch(e) {
				message.channel.send(`${e.name}: ${e.message}`);
			}
		}
		else{
			let embed;
			try{
				const codein = args.join(" ");
				let code = eval(codein);
				const ctype = typeof code;
				if (typeof code !== "string") {
					code = require("util").inspect(code, {
						depth: 0,
					});
				}
				embed = this.bot.botEmbed(message, this.bot)
					.setTitle("Evaluation")
					.addField("Input", `\`\`\`js\n${codein}\`\`\``)
					.addField("Output", `\`\`\`js\n${code}\`\`\``)
					.addField("Type", `\`\`\`js\n${ctype}\`\`\``);
			}
			catch(e) {
				embed = this.bot.botEmbed(message, this.bot)
					.setTitle("Error")
					.setColor("#ff0000")
					.addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
					.addField("Error", `\`\`\`js\n${e.name}: ${e.message}\`\`\``);
			}
			message.channel.send(embed);
		}
	}
};