module.exports = (bot) => {
	setInterval(() =>
		setStatus(["my Master", "the Admins"]), 60000);
	bot.helpEmbed = bot.botEmbed(undefined, bot)
		.setTitle("Help");
	let commands = bot.commands;
	let categories = commands
		.map((c) => c.category)
		.reduce((a, b) => {
			if (a.indexOf(b) < 0) a.push(b);
			return a;
		}, [])
		.sort();
	categories.forEach((category) => {
		let cateCmds = commands.filter((f) => f.category === category);
		bot.helpEmbed.addField(category, cateCmds.map(x =>`\`\`${x.name}\`\``).join(", "));
	});
	bot.setupEmbed = bot.botEmbed(undefined, bot)
		.setTitle("Setup")
		.addField("AutoRole", "To setup autorole on your server.")
		.addField("LogChannel", "To setup the log channel on your server.")
		.addField("WelcomeMessage", "To setup a welcome message on your server.")
		.addField("LeaveMessage", "To setup a leave message ony our server.")
		.addField("StaffRole", "To setup the staff role on your server.")
		.addField("Prefix", "To change the prefix on your server.");
	function setStatus(statuses) {
		if(Array.isArray(statuses)) {
			bot.user.setPresence({
				game:{
					name: statuses.random(),
					type: "LISTENING",
				},
				status: "online",
			});
		}
		else{
			bot.user.setPresence({
				game:{
					name: statuses,
					type: "LISTENING",
				},
				status: "online",
			});
		}
	}
	console.log("I'm not online >:)");
};