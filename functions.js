const { RichEmbed } = require("discord.js");
module.exports = {
	findMember: async (message, toFind) => {
		let member;
		if(message.mentions && message.mentions.members.size == 0 && message.mentions.users.size > 0) {
			const toFetch = await message.guild.fetchMember(message.mentions.users.first());
			member = toFetch;
		}

		else{
			if(!toFind) return message.member;
			toFind = toFind.toLowerCase();
			member = message.mentions.members.first() || message.guild.members.find((x) => x.user.username.toLowerCase() === toFind) || message.guild.members.get(toFind);
		}
		return member;
	},
	findRole: (message, toFind) => {
		toFind = toFind.toLowerCase();
		const role = message.guild.roles.find((x) => x.name.toLowerCase() === toFind) || message.guild.roles.find((x) => x.name.toLowerCase().startsWith(toFind)) || message.guild.roles.get(toFind);
		return role;
	},
	findChannel: (message, toFind) => {
		toFind = toFind.toLowerCase();
		const channel = message.mentions.channels.first() || message.guild.channels.find((x) => x.name.toLowerCase().startsWith(toFind)) || message.guild.channels.find((x) => x.name.toLowerCase() === (toFind)) || message.guild.channels.get(toFind);
		return channel;
	},
	ErrorMsg: (bot, message, error) => {
		const errEmbed = new RichEmbed()
			.setTitle("ERROR")
			.setColor("#ff0000")
			.setDescription(error)
			.setAuthor(message.author.username, bot.user.displayAvatarURL)
			.setFooter(bot.user.username, message.author.displayAvatarURL);
		message.channel.send(errEmbed);
	},
};