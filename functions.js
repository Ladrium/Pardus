const { RichEmbed } = require("discord.js");
module.exports = {
	findMember: async (message, toFind) => {
		let member;
		if(message.mentions.members.size == 0 && message.mentions.users.size > 0) {
			const toFetch = await message.guild.fetchMember(message.mentions.users.first());
			member = toFetch;
		}
		else{
			toFind = toFind.toLowerCase();
			member = message.guild.members.find((x) => x.name === toFind) || message.guild.members.get(toFind);
			if(!member) {
				let filter = message.guild.members.filter((tMember) => tMember.user.tag.toLowerCase().includes(toFind.toLowerCase()) || tMember.id == toFind || tMember.displayName.toLowerCase().includes(toFind.toLowerCase()));
				if (filter.size > 1) member = filter.array();
				else member = filter.array()[0];
			}
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