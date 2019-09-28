/* eslint-disable require-atomic-updates */
"use strict";
const CTemp = require("../base/Command");
const { ErrorMsg, findRole, findChannel } = require("../functions");
class Setup extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "setup",
			category:"Moderation",
			description:"Use this command to setup your bot!",
			example:"!setup",
			usage:"!setup",
		});
	}
	run(message, args, guild) {
		if(!message.member.hasPermission("MANAGE_GUILD", false, true, true)) return ErrorMsg(this.bot, message, "You need the permission: Manage Server to execute this command!");
		if(!args[0]) return message.channel.send(this.bot.setupEmbed);
		if(!["autorole", "staffrole", "welcomemessage", "leavemessage", "staffrole", "prefix", "logchannel"].includes(args[0].toLowerCase())) return message.channel.send(this.bot.setupEmbed);
		const toSetup = args[0].toLowerCase();
		if(toSetup === "welcomemessage") {
			if(!args[1]) return ErrorMsg(this.bot, message, "You need to provide a channel!");
			if(args[1] === "disable") {
				guild.welcome.enabled = false;
				return guild.save().catch(console.error);
			}
			const channel = findChannel(message, args[1]);
			if(!channel) return ErrorMsg(this.bot, message, "Couldn't find that channel!");
			guild.welcome.channel = channel.id;
			if(!args[2]) return;
			guild.welcome.enabled = true;
			guild.welcome.message = args.slice(2).join(" ");
			guild.save().catch(console.error);
			message.reply(`Sucessfully set the WelcomeMessage to ${args.slice(2).join(" ")} and the WelcomeChannel to ${channel.name}!`);

		}
		else if(toSetup === "leavemessage") {
			if(!args[1]) return ErrorMsg(this.bot, message, "You need to provide a channel!");
			if(args[1] === "disable") {
				guild.leave.enabled = false;
				return guild.save().catch(console.error);
			}
			const channel = findChannel(message, args[1]);
			if(!channel) return ErrorMsg(this.bot, message, "Couldn't find that channel!");
			guild.leave.channel = channel.id;
			if(!args[2]) return;
			guild.leave.enabled = true;
			guild.leave.message = args.slice(2).join(" ");
			guild.save().catch(console.error);
			message.reply(`Sucessfully set the LeaveMessage to ${args.slice(2).join(" ")} and the LeaveChannel to ${channel.name}!`);
		}
		else if(toSetup === "autorole") {
			if(!args[1]) return ErrorMsg(this.bot, message, "Do you want to Remove or Add one?");
			if(!args[2]) return ErrorMsg(this.bot, message, "You need to mention the role or provide the role id/name");
			const role = findRole(message, args.slice(2).join(" "));
			if(!role) return ErrorMsg(this.bot, message, "Couldn't find that role!");
			if(args[1].toLowerCase() === "remove") {
				if(!guild.autoroles.includes(role.id)) return ErrorMsg(this.bot, message, "That role isn't set up as an auto role!");
				guild.autoroles = guild.autoroles.splice(guild.autorole.findIndex((x) => x === role.id));
				guild.save().catch(console.error);
				message.reply("Successfully removed the role " + role.name + "!");
			}
			if(args[1].toLowerCase() === "add") {
				if(guild.autoroles.includes(role.id)) return ErrorMsg(this.bot, message, "That role is already added as a Auto Role!");
				guild.autoroles = [...guild.autoroles, role.id];
				guild.save().catch(console.error);
				message.reply("Successfully added the role " + role.name + "!");
			}
		}
		else if(toSetup === "staffrole") {
			if(!args[1]) return ErrorMsg(this.bot, message, "Do you want to Remove or Add one?");
			if(!args[2]) return ErrorMsg(this.bot, message, "You need to mention the role or provide the role id/name");
			const role = findRole(message, args.slice(2).join(" "));
			if(!role) return ErrorMsg(this.bot, message, "Couldn't find that role!");
			if(args[1].toLowerCase() === "remove") {
				if(!guild.staffRoles.includes(role.id)) return ErrorMsg(this.bot, message, "That role isn't set up as a staff role!");
				guild.staffRoles = guild.staffRoles.splice(guild.staffRoles.findIndex((x => x === role.id)));
				guild.save().catch();
				message.reply("Successfully removed the role " + role.name + "!");
			}
			if(args[1].toLowerCase() === "add") {
				if(guild.staffRoles.includes(role.id)) return ErrorMsg(this.bot, message, "That role is already added as a Staff Role!");
				guild.staffRoles = [...guild.staffRoles, role.id];
				guild.save().catch(console.error);
				message.reply("Successfully added the role " + role.name + "!");
			}
		}
		else if(toSetup === "prefix") {
			if(!args[1]) return ErrorMsg(this.bot, message, "Please provide a new prefix!");
			guild.prefix = args[1];
			message.reply("Successfully set the prefix to " + args[1] + " !");
			guild.save().catch(console.error);
		}
		else if(toSetup === "logchannel") {
			if(!args[1]) return ErrorMsg(this.bot, message, "Please provide a channel!");
			const channel = findChannel(message, args.slice(1).join(" "));
			if(!channel) return message.reply("Couldn't find that channel!");
			guild.logChannel = channel.id;
			message.reply("Successfully set the LogChannel to " + channel.name + "!");
			guild.save().catch(console.error);
		}
		else{
			message.channel.send(this.bot.setupEmbed);
		}
	}
}
module.exports = Setup;
