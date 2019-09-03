/* eslint-disable require-atomic-updates */
const Guild = require("../models/guildSettings");
const { ErrorMsg } = require("../functions");
module.exports = async (bot, message) => {
	if(!message.guild) return;
	if(!message.guild.me.hasPermission("SEND_MESSAGES")) return;
	if(message.author.bot) return;
	if(message.isMentioned(bot.user) && message.content.includes("help")) return message.channel.send(bot.helpEmbed);
	const guild = await Guild.findOne({ guildID: message.guild.id });
	if(!guild) return ErrorMsg(this.bot, message, "Please kick the bot and invite it again!");
	let prefix = guild.prefix;
	if(!message.content.startsWith(prefix)) return;
	if(!message.member) message.member = message.guild.fetchMember(message.author);
	if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I need the permission: Administrator !!");
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command;
	try{
		command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
		if(command) command.run(message, args);
	}
	catch(e) {
		console.log(e);
	}
};