const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
 
    //!kick @Duckiesocial Reden Hier!

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) message.channel.send("Kan geen User vinden");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Die persoon kan niet gekicked worden.");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#e56b00")
        .addField("User die is gekicked", `${kUser} met ID ${kUser.id}`)
        .addField("Gekicked door", `<@${message.author.id}> met ID ${message.author.id}`)
        .addField("Kicked in", message.channel)
        .addField("Reden", kReason);

        let kickChannel = message.guild.channels.find(`name`, "report");
        if(!kickChannel) return message.channel.send("Kon de kanaal niet vinden vraag @DuckieSocial#8214 voor Hulp!");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
        
        return;
    }

module.exports.help = {
    name: "kick"
}