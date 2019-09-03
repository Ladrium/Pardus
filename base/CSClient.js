const { Client, Collection, RichEmbed } = require("discord.js");
class CSClient extends Client {
	constructor() {
		super();
		this.commands = new Collection();
		this.aliases = new Collection();
	}
	botEmbed(message, bot) {
		if(!message) {
			return new RichEmbed()
				.setColor("#F87000")
				.setFooter(bot.user.tag, bot.user.displayAvatarURL);
		}
		return new RichEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.setColor("#F87000")
			.setFooter(bot.user.tag, bot.user.displayAvatarURL);
	}
}
module.exports = CSClient;