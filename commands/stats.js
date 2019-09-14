const CTemp = require("../base/Command");
const { utc } = require("moment");
module.exports = class Stats extends CTemp {
	constructor(bot) {
		super(bot, {
			name: "stats",
			aliases: ["status", "info"],
			category: "Info",
			usage:"!stats",
			description: "Shows the bots stats",
			example: "!stats",
			cooldown: 5000,
		});
	}
	async run(message, args, guild) {
		const Owner = this.bot.users.get("464499620093886486") || await this.bot.fetchUser("464499620093886486");
		const msg = await message.channel.send("Pinging...");
		const statusEmbed = this.bot.botEmbed(message, this.bot)
			.setAuthor("Stats")
			.addField("Owner Information", `**Tag:** ${Owner.tag}
            **ID:** ${Owner.id}
            **Created At:** ${utc(Owner.createdAt).format("dddd, MM Do YYYY")}`)
			.addField("General Information", `**Tag:** ${this.bot.user.tag}
            **ID:** ${this.bot.user.id}
            **Guild's Prefix:** ${guild.prefix}
            **Created At:** ${utc(this.bot.user.createdAt).format("dddd, MM Do YYYY")}
            **Language:** JavaScript - Discord.Js`)
			.addField("Statistics", `**Api Ping:** ${this.bot.ping}
             **Response Time:** ${msg.createdTimestamp - Date.now()}
             **Guild Count:** ${this.bot.guilds.size}
             **Channel Count:** ${this.bot.channels.filter(x => x.type !== "category").size}
             **Category Count:** ${this.bot.channels.filter(x => x.type === "category").size}
             **Command Count:** ${this.bot.commands.size}
             **Uptime:** ${require("ms")(this.bot.uptime)}
            `);
		msg.edit(statusEmbed);
	}
};