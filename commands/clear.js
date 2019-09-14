const Command = require("../base/Command");
const { ErrorMsg } = require("../functions");
module.exports = class Template extends Command {
	constructor(bot) {
		super(bot, {
			name:"clear",
			aliases:["purge"],
			category:"Moderation",
			usage:"!clear <amount> (reason) or !clear <user> [this will clear the most recent messages of that user]",
			description:"Deletes a certain amount of messages or the most recent messages of a certain user",
			cooldown: 5000,
			example: "!clear 50 spam",
		});
	}
	async run(message, args, guild) {
		if(!message.member.hasPermission("MANAGE_MESSAGES", false, true, true)) return ErrorMsg(this.bot, message, "You do not have the required permissions!");
		const [toClear, ...reason] = args;
		if(isNaN(toClear) || toClear.includes("-") || !toClear || toClear == 0) return ErrorMsg(this.bot, message, "Please provide a valid amount of messages to delete!");
		const messages = await message.channel.fetchMessages({ limit: toClear });
		await message.delete();
		await message.channel.bulkDelete(messages);
		const clearEmbed = this.bot.botEmbed(message, this.bot)
			.setColor("#000000")
			.setAuthor(`Clear | Case: ${guild.case}`, message.author.displayAvatarURL)
			.setDescription(`**Cleared Messages:** ${messages.size}\n**Cleared in :**${message.channel}\n **Cleared by:** ${message.author}\n**Reason:** ${reason.length > 0 ? reason.join(" ") : "No Reason"}`);
		const logChannel = message.guild.channels.get(guild.logChannel) || message.channel;
		logChannel.send(clearEmbed);
		guild.case++;
		guild.save().catch(console.error);
	}
};
