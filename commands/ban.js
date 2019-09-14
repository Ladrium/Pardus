const CTemp = require("../base/Command");
const { ErrorMsg, findMember } = require("../functions");
module.exports = class Ban extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "ban",
			category:"Moderation",
			description: "Use this command to ban a member!",
			example: "!ban @Chaos_Phoe being bad",
			usage:"!ban <Member> (reason)",
		});
	}
	async run(message, args, guild) {
		if(!message.member.hasPermission("BAN_MEMBERS", false, true, true)) return ErrorMsg(this.bot, message, "You do not have the required permissions for that command!");
		if(!args[0]) return ErrorMsg(this.bot, message, "Please mention a member or provide his id!");
		const member = await findMember(message, args[0]);
		let reason;
		if(args[1]) reason = args.slice(1).join(" ");
		if(!member) return ErrorMsg(this.bot, message, "Couldn't find that member!");
		if(member.highestRole.position >= message.member.highestRole.position) return message.reply("Couldn't ban that member!");
		if(!member.bannable) return message.reply("Couldn't ban that member!");
		guild.case++;
		member.ban(reason ? reason : "No Reason").catch(() => message.reply("Oh no an error occured, please contact the owner!"));
		const banEmbed = this.bot.botEmbed(message, this.bot)
			.setColor("#000000")
			.setAuthor(`Ban | Case: ${guild.case}`, member.user.displayAvatarURL)
			.setDescription(`**Banned By:** ${message.author.tag}\n**Banned User:** ${member.user.tag}\n **Reason:** ${reason ? reason : "No reason provided!"}`);
		const logChannel = message.guild.channels.get(guild.logChannel);
		if(!logChannel) {
			message.channel.send(banEmbed);
			message.reply("Please setup a log channel with !setup !");
		}
		else {
			logChannel.send(banEmbed);
		}
		guild.save();
	}
};