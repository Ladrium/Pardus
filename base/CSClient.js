const { Client, Collection, RichEmbed } = require("discord.js");
class CSClient extends Client {
	constructor(options = {}) {
		super(options)
		this.commands = new Collection();
		this.aliases = new Collection();
	}
	botEmbed(message, bot) {
		const embed = new RichEmbed({ color: 0xF87000 })	
			.setFooter(bot.user.tag, bot.user.displayAvatarURL);
		return message ? embed.setAuthor(message.author.tag, message.author.displayAvatarURL) : embed;
	}
}
module.exports = CSClient;
