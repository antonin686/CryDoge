const Discord = require("discord.js");
const { prefix, token, ytkey } = require("./config.json");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const fetch = require("node-fetch");

const commands = require("./commands.js");

client.once("ready", () => {
  console.log(`Bot ${client.user.tag} is online!`);
  client.user
    .setActivity("over CryDawgs", { type: "WATCHING" })
    .catch(console.error);
});

const helper = {
  ytdl: ytdl,
  fetch: fetch,
  ytkey: ytkey,
};

var prevMusic = "";

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");

  const command = args.shift().toLowerCase();

  switch (command) {
    case "kick":
      let member = message.mentions.members.first();
      commands.kick(message, member);
      break;

    case "play":
      commands.play(message, helper, args);
      prevMusic = args;
      break;

    case "replay":
      commands.play(message, helper, prevMusic);
      break;

    case "stop":
      commands.stop(message);
      break;

    case "setrules":
      commands.setRules(message);
      break;

    case "whoisdoge":
      commands.whoIsDoge(message);
      break;

    case "rules":
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`Hey <@${message.member.id}>, the rules are on <#733682227484819556> channel`)
      ).then(msg => msg.delete({timeout: 10000}));;
      break;
    case "exit":
      process.exit();
      break;

    default:
      break;
  }
});

client.on("guildMemberAdd", (member) => {
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.id == "733657563777990667"
  );
  if (!welcomeChannel) return;

  var messages = [
    new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`Hey ${member}, you're finally awake`),
    new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`Yay ${member}, you have made it`),
    new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`Welcome ${member}, leave your weapon by the door`),
  ];

  welcomeChannel.send(messages[Math.floor(Math.random() * messages.length)]);
});

client.login(token);
