var irc = require('irc');

//verbarmateAbsconded!pcc31@hidden-4C77288A.lightspeed.rcsntx.sbcglobal.net
var hiddenServer = "hidden-4C77288A.lightspeed.rcsntx.sbcglobal.net";
"pcc31@hidden-9218896D.hsd1.in.comcast.net";

var bot = new irc.Client('irc6.mindfang.org', 'wintechRobot', {
	port: 6667,
	debug: true,
	showErrors: true,
	//secure: true,
	//nick: 'wintechRobot',
	userName: 'wintechRobot',
	realName: 'wintechRobot',
	channels: ['#pesterchum'],
});

bot.on('error', function(message) {
	console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.on('message#pesterchum', function (from, message) {
	console.log('#pc <%s> %s', from, message);
});

bot.on('message', function (from, to, message) {
	console.log('%s => %s: %s', from, to, message);
});
bot.on('pm', function(nick, message) {
	console.log('Got private message from %s: %s', nick, message);
});
bot.on('join', function(channel, who) {
	console.log('%s has joined %s', who, channel);
});
bot.on('part', function(channel, who, reason) {
	console.log('%s has left %s: %s', who, channel, reason);
});
bot.on('kick', function(channel, who, by, reason) {
	console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});
bot.on("raw", function (message) {
	console.log("RAW:", message);
});

module.exports = bot;
