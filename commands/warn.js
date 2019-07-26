const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    //;warn @user reden
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Kon geen user vinden");
    if(wUser.hasPermission("MANAGE_ROLES")) return message.reply("Je kan hem niet gebruiken op die persoon😉");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
     };

     warns[wUser.id].warns++;
     
     fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
         if (err) console.log(err)
     });

     let warnEmbed = new Discord.RichEmbed()
     .setDescription("Warns")
     .setAuthor(message.author.username)
     .setColor("#fc6400")
     .addField("Persoon die is Gewarned", wUser.tag)
     .addField("Gewarned in", message.channel)
     .addField("Hoe vaak gewarned", warns[wUser.id].warns)
     .addField("Reden", reason);

     let warnchannel = message.guild.channels.find(`name`, "report");
     if(!warnchannel) return message.reply("Kon kanaal niet vinden dus ook geen Warn gekregen");

     warnchannel.send(warnEmbed);

     if(warns[wUser.id].warns == 2){
         let muterole = message.guild.roles.find(`name`, "muted");
         if(!muterole) return message.reply("Ik zou het beter maken die Rol")

         let mutetime = "320s";
         await(wUser.addRole(muterole.id));
         message.channel.send(`${wUser.tag} Is Gemuted`);

         setTimeout(function(){
             wUser.removeRole(muterole.id)
             message.channel.reply(`Persoon is unmuted.`)
         })
     }
     if(warns[wUser.id].warns == 5){
         message.guild.member(wUser).kick(reason);
         message.channel.send(`${wUser.tag}😓 Hij is weg gelukkig.`)
    }


   }

    module.exports.help = {
        name: "warn"
    }