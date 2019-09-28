const CTemp = require("../base/Command");
const { ErrorMsg, findMember, findRole } = require("../functions");
const Mutes = require("../models/mutes");
const ms = require("ms");
module.exports = class Mute extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "mute",
			category:"Moderation",
			aliases: ["tempmute"],
			description: "Use this command to mute a member!",
			example: "!mute @Chaos_Phoe 50s/m/h/d noob haha",
			usage:"!mute <member> (time) (reason)",
		});
	}
	async run(message, args, guild) {
		if(!message.member.hasPermission("MANAGE_GUILD", false, true, true)) return ErrorMsg(this.bot, message, "Not enough permissions!");
		if(!args[0]) return ErrorMsg(this.bot, message, "No member provided!");
		const member = await findMember(message, args[0]);
		if(!member) return ErrorMsg(this.bot, message, "Couldn't find that member!");
		const muteRole = findRole(message, "muted") || message.guild.createRole({ name:"muted", color:"#27272b", permissions:[] });
		const reason = args.slice(2).join(" ");
		message.guild.channels.forEach((channel) => {
			channel.overwritePermissions(muteRole, {
				SEND_MESSAGES: false,
				SPEAK: false,
			});
		});
		const muteTime = ms(args[1]);
		if(isNaN(muteTime) || muteTime > 2592000000000) return ErrorMsg(this.bot, message, "Please provide a mute time under 30 days!");
		const mute = new Mutes({
			guildID: message.guild.id,
			userID: member.user.id,
			created: Date.now(),
			muteTime: muteTime || 999999999999999999999999999999999,
		});
		mute.save().catch(console.error);
		member.addRole(muteRole);
		const muteEmbed = this.bot.botEmbed(message, this.bot)
			.setColor("#000000")
			.setAuthor(`Mute | Case: ${guild.case}`, member.user.displayAvatarURL)
			.setDescription(`**Muted By:** ${message.author.tag}\n**Muted User:** ${member.user.tag}\n**Mute Time:** ${args[1]}\n **Reason:** ${reason ? reason : "No reason provided!"}`);
		guild.case++;
		guild.save().catch(console.error);
		const channel = message.guild.channels.get(guild.logChannel);
		if(!channel) return message.channel.send(muteEmbed);
		channel.send(muteEmbed);
	}
};