const Guild = require("../models/guildSettings");
module.exports = async (bot, member) => {
	const guild = await Guild.findOne({ guildID: member.guild.id });
	if(guild.autoroles.length !== 0) {
		for(const role of guild.autoroles) {
			member.addRole(role).catch(() => void null);
		}
	}
	if(!guild.welcome.enabled) return;
	if(!guild.welcome.message || guild.welcome.message.length < 1) return;
	if(!guild.welcome.channel) return;
	const placeHolders = {
		"memberCount": member.guild.memberCount,
		"botCount": member.guild.members.filter(x => x.user.bot).size,
		"serverName": member.guild.name,
		"userName": member.user.username,
		"userMention": member.user.toString(),
		"userTag": member.user.tag,
	};
	const welcomeMessage = guild.welcome.message.replace(/{(memberCount|botCount|serverName|userName|userMention|userTag)}/gi, m => placeHolders[m.slice(1, -1)]);
	const welcomeChannel = member.guild.channels.get(guild.welcome.channel);
	if(!welcomeChannel) return;
	welcomeChannel.send(welcomeMessage).catch(() => void null);
};