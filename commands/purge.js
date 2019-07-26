const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    //!purge 15
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
    if(!args[0]) return message.channel.send("Nu nog een getal Schrijven.");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Ik heb ${args[0]} Berichten verwijderd`).then(msg => msg.delete(5000));
    });
}
    module.exports.help = {
        name: "purge"
    }