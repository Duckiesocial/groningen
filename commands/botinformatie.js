const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Informatie!")
        .setColor("#00ff00")
        .setThumbnail(bicon)
        .addField("Gemaakt op..", bot.user.createdAt)
        .addField("Bot Naam", bot.user.username)

        return message.channel.send(botembed);
    }
    module.exports.help = {
        name: "botinformatie"
    }