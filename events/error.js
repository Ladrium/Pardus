module.exports = (bot, err) => {
	bot.channels.get("621365405495066624").send(err.name + ":" + err.stack);
	console.log(err);
};