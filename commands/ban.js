const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
        //!ban @Duckiesocial Reden Hier!

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) message.channel.send("Kan geen User vinden");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Die persoon kan niet gekicked worden.");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#e56b00")
        .addField("User die is gebanned", `${bUser} met ID ${bUser.id}`)
        .addField("Gebanned door", `<@${message.author.id}> met ID ${message.author.id}`)
        .addField("Gebanned in", message.channel)
        .addField("Reden", bReason);

        let reportChannel = message.guild.channels.find(`name`, "report");
        if(!reportChannel) return message.channel.send("Kon de kanaal niet vinden vraag @DuckieSocial#8214 voor Hulp!");

        message.guild.member(bUser).ban(bReason);
        reportChannel.send(banEmbed);
        
        return;
    }

    module.exports.help = {
        name: "ban"
    }