const CTemp = require("../base/Command");
const { ErrorMsg, findMember } = require("../functions");
module.exports = class Kick extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "kick",
			category:"Moderation",
			description: "Use this command to kick a member!",
			example: "!kick @Chaos_Phoe being bad",
			usage:"!kick <Member> (reason)",
		});
	}
	async run(message, args, guild) {
		if(!message.member.hasPermission("KICK_MEMBERS", false, true, true)) return ErrorMsg(this.bot, message, "You do not have the required permissions for that command!");
		if(!args[0]) return ErrorMsg(this.bot, message, "Please mention a member or provide his id!");
		const member = await findMember(message, args[0]);
		const reason = args.slice(1).join(" ") || "No Reason";
		if(!member) return ErrorMsg(this.bot, message, "Couldn't find that member!");
		if(member.highestRole.position >= message.member.highestRole.position) return message.reply("Couldn't kick that member!");
		if(!member.kickable) return message.reply("Couldn't kick that member!");
		guild.case++;
		member.kick(reason ? reason : "No Reason").catch(() => message.reply("Oh no an error occured, please contact the owner!"));
		const kickEmbed = this.bot.botEmbed(message, this.bot)
			.setColor("#000000")
			.setAuthor(`Kick | Case: ${guild.case}`, member.user.displayAvatarURL)
			.setDescription(`**Kicked By:** ${message.author.tag}\n**Kicked User:** ${member.user.tag}\n **Reason:** ${reason ? reason : "No reason provided!"}`);
		const logChannel = message.guild.channels.get(guild.logChannel);
		if(!logChannel) {
			message.channel.send(kickEmbed);
			message.reply("Please setup a log channel with !setup !");
		}
		else {
			logChannel.send(kickEmbed);
		}
		guild.save();
	}
};