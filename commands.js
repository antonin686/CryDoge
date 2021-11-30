const Discord = require("discord.js");
function EmbededMessage(message) {
  return new Discord.MessageEmbed().setColor("#FF0000").setDescription(message);
}
module.exports = {
  kick: (message, member) => {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      member.kick().then((member) => {
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(`:wave: <@${member.id}> has been kicked!!!`)
        );
      });
    } else {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setDescription(
            `Hey <@${message.member.id}>, You dont have permission to kick!!!`
          )
      );
    }
  },

  play: async (message, helper, song) => {
    if (!song) {
      message.channel.send(
        EmbededMessage(`Hey <@${message.member.id}>, you have to give a name!`)
      );
      return;
    } else if (!message.member.voice.channel) {
      message.channel.send(
        EmbededMessage(
          `Hey <@${message.member.id}>, you need to join a voice channel first!!`
        )
      );
      return;
    } else {
      const connection = await message.member.voice.channel.join();
      $link = "";
      if (song.includes("www.youtube.com")) {
        connection.play(helper.ytdl(song, { filter: "audioonly" }));
      } else {
        const link =
          "https://www.googleapis.com/youtube/v3/search?key=" +
          helper.ytkey +
          "&type=video&part=snippet&maxResults=1&q=" +
          song;
        const response = await helper.fetch(link);
        const json = await response.json();
        const videoID = json.items[0].id.videoId;
        const title = json.items[0].snippet.title;
        const thumbnail = json.items[0].snippet.thumbnails.high.url;
        connection.play(
          helper.ytdl(`https://www.youtube.com/watch?v=${videoID}`, {
            filter: "audioonly",
          })
        );
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Now Playing")
            .setDescription(`[${title}](https://www.youtube.com/watch?v=${videoID})`)
            .setThumbnail(thumbnail)
            .addField('Issued by', `<@${message.member.id}>`, true)
        );
      }

      //console.log(json.items);
      //message.channel.send(song);
    }
  },

  stop: (message) => {
    message.member.voice.channel.leave();
  },

  whoIsDoge: (message) => {
    message.channel.send(
      EmbededMessage(`CryDoge is a BOT made by <@190059732608745472>`)
    );
  },
  
  setRules: (message) => {
    if (!message.member.roles.cache.has("206716867664936960")) {
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(
              `Hey <@${message.member.id}>, you dont have the permission to set rules`
            )
        )
        .then((msg) => msg.delete({ timeout: 10000 }));
    }

    const rulesChannel = message.member.guild.channels.cache.find(
      (channel) => channel.id == "733682227484819556"
    );
    if (!rulesChannel) return;

    rulesChannel.send(
      new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Rules")
        .setThumbnail("https://img.icons8.com/nolan/64/rules.png")
        .setDescription(`Follow them rules`)
        .addFields(
          {
            name: "1️⃣ Be Respectful",
            value:
              "You must respect all users, regardless of your liking towards them. Treat others the way you want to be treated.",
            inline: false,
          },
          {
            name: "2️⃣ No Inappropriate Language",
            value:
              "The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited.",
            inline: false,
          },
          {
            name: "3️⃣ No Spamming",
            value:
              "Don't send a lot of small messages right after each other. Do not disrupt chat by spamming.",
            inline: false,
          },
          {
            name: "4️⃣ No Advertisement",
            value:
              "We do not tolerate any kind of advertisements, whether it be for other communities or streams. You can post your content in the media channel if it is relevant and provides actual value (Video/Art)",
            inline: false,
          },
          {
            name: "5️⃣ No offensive names and profile pictures",
            value:
              "You will be asked to change your name or picture if the admins deems them inappropriate.",
            inline: false,
          },
          {
            name: "6️⃣ Direct & Indirect Threats",
            value:
              "Threats to other users of DDoS, Death, DoX, abuse, and other malicious threats are absolutely prohibited and disallowed.",
            inline: false,
          },
          {
            name: "7️⃣ Follow the Discord Community Guidelines",
            value: "You can find them here: https://discordapp.com/guidelines",
            inline: false,
          }

          //{ name: "\u200B", value: "\u200B" }
        )
      //.setFooter("You know the drill, so do I ✌")
    );

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription(
          `Hey <@${message.member.id}>, the rules has been set on <#733682227484819556> channel`
        )
    );
  },
};
