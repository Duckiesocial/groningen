const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
        //;report @DUckiesocial Reden hier!

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Ik kon de gebruiker niet vinden!");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#800080")
        .addField("User die is Gereport is", `${rUser} met ID: ${rUser.id}`)
        .addField("Is Gereported door", `${message.author} Met ID: ${message.author.id}`)
        .addField("Kanaal", message.channel)
        .addField("Tijd", message.createdAt)
        .addField("Reden", reason);

        let reportschannel = message.guild.channels.find(`name`, "report");
        if(!reportschannel) return message.channel.send("Kon de kanaal niet vinden vraag @DuckieSocial#8214 voor Hulp");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    }

    module.exports.help = {
        name: "report"
    }