const Command = require("../base/Command");
const moment = require("moment");
const User = require("../models/users");
module.exports = class UserInfo extends Command {
	constructor(bot) {
		super(bot, {
			name:"userinfo",
			aliases:["whois", "ui", "profile"],
			category:"Info",
			usage:"!userinfo <User> or !userinfo bio <bio>",
			description:"Shows the userinfo of a user",
			cooldown: 5000,
			example: "!userinfo @Chaos_Phoe",
		});
	}
	async run(message, args) {
		if(args[0] === "bio") {
			const user = await User.findOne({ userID: message.author.id }) || await new User({ userID: message.author.id, premium: false, developer: false });
			if(!args[1]) return message.reply("You can set your bio by doing: !userinfo bio <YourBio> example: !userinfo bio Hey there I am chaos!").then(msg => msg.delete(10000));
			if(args.slice(1).join(" ").length > 140) return message.reply("Your bio can't be bigger than 140 characters!");
			user.bio = args.slice(1).join(" ");
			user.save().catch(console.error);
			message.delete(5001);
			return message.reply(`Successfully set your bio to ${args.slice(1).join(" ")}!`).then(msg => msg.delete(5000));
		}
		const member = message.mentions.members.first() || message.guild.members.get(args.join(" ")) || message.member;
		const user = await User.findOne({ userID: member.user.id }) || await new User({ userID: message.author.id, premium: false, developer: false });
		const online = this.bot.emojis.get("577175605787885574");
		const idle = this.bot.emojis.get("577175581876158485");
		const offline = this.bot.emojis.get("577175538901319709");
		const dnd = this.bot.emojis.get("577175469443645471");
		const statuses = {
			online,
			idle,
			offline,
			dnd,
		};
		const userEmbed = this.bot.botEmbed(message, this.bot)
			.setThumbnail(member.user.displayAvatarURL)
			.setAuthor(`${member.user.username}'s information`, member.user.displayAvatarURL)
			.addField("Personal Information", `**Nickname:** ${member.displayName}\n**Discriminator:** #${member.user.discriminator}\n**ID:** ${member.user.id}\n**Bot:** ${user.bot ? "✅" : "❌"}\n **Status:** ${statuses[member.user.presence.status]}\n**Game:** ${member.user.presence.game ? member.user.presence.game : "No Game"}`)
			.addField("Server Information", `**Join Date:** ${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}\n**Creation Date:** ${moment.utc(member.user.createdAt).format("dddd, MMMM, Do YYYY")}\n**Roles:**${member.roles.filter(f => f.name !== "@everyone").map(x => x).join(", ")}`);
		if(user.bio) userEmbed.addField("Bio", user.bio);
		message.channel.send(userEmbed);
	}
};

