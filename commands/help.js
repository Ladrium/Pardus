const CTemp = require("../base/Command");
class Help extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "help",
			category:"Info",
			description:"Use this command to gain information about the commands!",
			example:"!help setup",
			usage:"!help (command)",
		});
	}

	run(message, args) {
		const helpEmbed = this.bot.botEmbed(message, this.bot)
			.setTitle("Help")
			.setFooter(this.bot.user.tag, message.author.displayAvatarURL);
		const commands = this.bot.commands;
		if(!args[0] || !commands.has(args[0])) return message.channel.send(this.bot.helpEmbed);
		else getCmd(args[0]);
		message.channel.send(helpEmbed);
		function getCmd(commandName) {
			let info = "";
			const command = commands.get(commandName);
			const newName = commandName.charAt(0).toUpperCase() + commandName.slice(1);
			helpEmbed.setTitle(newName);
			info += `**Category**: ${command.category}`;
			if(command.aliases.length > 0) info += `\n**Aliases**: ${command.aliases.map(x => `\`\`${x}\`\``).join(", ")}`;
			if(command.description) info += `\n**Description**: ${command.description}`;
			if(command.example) info += `\n**Example**: ${command.example}`;
			if(command.usage) info += `\n**Usage**: ${command.usage}`;
			helpEmbed.setDescription(info).setFooter("Syntax: <> = required, () = optional");
		}
	}
}
module.exports = Help;