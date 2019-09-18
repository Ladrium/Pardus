/* eslint-disable require-atomic-updates */
const Guild = require("../models/guildSettings");
module.exports = async (bot, message) => {
	if(!message.guild) return;
	if(!message.guild.me.hasPermission("SEND_MESSAGES")) return;
	if(message.author.bot) return;
	let guild = await Guild.findOne({ guildID: message.guild.id });
	if(!guild) {
		guild = new Guild({
			guildID: message.guild.id,
			staffRoles: [],
			logChannel: "logs",
			leave:{
				enabled: false,
				channel: "",
				message: "",
			},
			welcome:{
				enabled: false,
				channel: "",
				message: "",
			},
			prefix: "!",
			autoroles: [],
			case: 0,
		});
		guild.save().catch(console.error);
	}
	const prefix = guild.prefix;
	if(message.isMentioned(bot.user)) return message.channel.send(`The Guild prefix is ${prefix}, write ${prefix}help for more informations`);
	if(!message.content.startsWith(prefix)) return;
	if(!message.member) message.member = message.guild.fetchMember(message.author);
	if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I need the permission: Administrator !!");
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command;
	try{
		command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
		if(command) command.run(message, args, guild);
	}
	catch(e) {
		console.log(e);
	}
};