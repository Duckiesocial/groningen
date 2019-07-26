const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //;zeg Hallo
    //Hi
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage)
}
    module.exports.help = {
        name: "training"
    }