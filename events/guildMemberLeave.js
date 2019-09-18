const Guild = require("../models/guildSettings");
module.exports = async (bot, member) => {
	const guild = await Guild.findOne({ guildID: member.guild.id });
	if(!guild.leave.enabled) return;
	if(!guild.leave.message || guild.leave.message.length < 1) return;
	if(!guild.leave.channel) return;
	const placeHolders = {
		"memberCount": member.guild.memberCount,
		"botCount": member.guild.members.filter(x => x.user.bot).size,
		"serverName": member.guild.name,
		"userName": member.user.username,
		"userMention": member.user.toString(),
		"userTag": member.user.tag,
	};
	const leaveMessage = guild.leave.message.replace(/{(memberCount|botCount|serverName|userName|userMention|userTag)}/gi, m => placeHolders[m.slice(1, -1)]);
	const leaveChannel = member.guild.channels.get(guild.leave.channel);
	if(!leaveChannel) return;
	leaveChannel.send(leaveMessage);
};