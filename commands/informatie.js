const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Informatie")
        .setColor("#800080")
        .setThumbnail(sicon)
        .addField("Naam", message.guild.name)
        .addField("Gemaakt op", message.guild.createdAt)
        .addField("Jij bent Gejoined op..", message.member.joinedAt)
        .addField("Totaal aantal Members", message.guild.memberCount)
        .addField("Totaal bots WERKZAAMHEDEN", message.guild.bot);


        return message.channel.send(serverembed);
    }
    module.exports.help = {
        name: "informatie"
    }