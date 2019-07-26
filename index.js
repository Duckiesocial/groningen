const botConfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Kon geen Commands vinden.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} Geladen!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", async () =>{
    console.log(`${bot.user.username} Is in de lucht!`);
    
    bot.user.setActivity(";help | Groningen Community V1", {type: "PLAYING"});
});

bot.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botConfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

//     if(cmd === `${prefix}ban`){

//         //!ban @Duckiesocial Reden Hier!

//         let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//         if(!bUser) message.channel.send("Kan geen User vinden");
//         let bReason = args.join(" ").slice(22);
//         if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
//         if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die persoon kan niet gekicked worden.");

//         let banEmbed = new Discord.RichEmbed()
//         .setDescription("Ban")
//         .setColor("#e56b00")
//         .addField("User die is gebanned", `${bUser} met ID ${bUser.id}`)
//         .addField("Gebanned door", `<@${message.author.id}> met ID ${message.author.id}`)
//         .addField("Gebanned in", message.channel)
//         .addField("Reden", bReason);

//         let reportChannel = message.guild.channels.find(`name`, "report");
//         if(!reportChannel) return message.channel.send("Kon de kanaal niet vinden vraag @DuckieSocial#8214 voor Hulp!");

//         message.guild.member(bUser).ban(bReason);
//         reportChannel.send(banEmbed);
        
//         return;
//     }



//     if(cmd === `${prefix}kick`){

//         //!kick @Duckiesocial Reden Hier!

//         let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//         if(!kUser) message.channel.send("Kan geen User vinden");
//         let kReason = args.join(" ").slice(22);
//         if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Jij kan deze Command niet gebruiken Dit kan tot een Warn Lijden!");
//         if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Die persoon kan niet gekicked worden.");

//         let kickEmbed = new Discord.RichEmbed()
//         .setDescription("Kick")
//         .setColor("#e56b00")
//         .addField("User die is gekicked", `${kUser} met ID ${kUser.id}`)
//         .addField("Gekicked door", `<@${message.author.id}> met ID ${message.author.id}`)
//         .addField("Kicked in", message.channel)
//         .addField("Reden", kReason);

//         let kickChannel = message.guild.channels.find(`name`, "report");
//         if(!kickChannel) return message.channel.send("Kon de kanaal niet vinden vraag @DuckieSocial#8214 voor Hulp!");

//         message.guild.member(kUser).kick(kReason);
//         kickChannel.send(kickEmbed);
        
//         return;
//     }




//     if(cmd === `${prefix}report`){

//         //;report @DUckiesocial Reden hier!

//         let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//         if(!rUser) return message.channel.send("Ik kon de gebruiker niet vinden!");
//         let reason = args.join(" ").slice(22);

//         let reportEmbed = new Discord.RichEmbed()
//         .setDescription("Reports")
//         .setColor("#800080")
//         .addField("User die is Gereport is", `${rUser} met ID: ${rUser.id}`)
//         .addField("Is Gereported door", `${message.author} Met ID: ${message.author.id}`)
//         .addField("Kanaal", message.channel)
//         .addField("Tijd", message.createdAt)
//         .addField("Reden", reason);

//         let reportschannel = message.guild.channels.find(`name`, "report");
//         if(!reportschannel) return message.channel.send("Kon de kanaal niet vinden vraag @DuckieSocial#8214 voor Hulp");

//         message.delete().catch(O_o=>{});
//         reportschannel.send(reportEmbed);

//         return;
//     }


//     if(cmd === `${prefix}informatie`){

//         let sicon = message.guild.iconURL;
//         let serverembed = new Discord.RichEmbed()
//         .setDescription("Informatie")
//         .setColor("#800080")
//         .setThumbnail(sicon)
//         .addField("Naam", message.guild.name)
//         .addField("Gemaakt op", message.guild.createdAt)
//         .addField("Jij bent Gejoined op..", message.member.joinedAt)
//         .addField("Totaal aantal Members", message.guild.memberCount);


//         return message.channel.send(serverembed);
//     }

//     if(cmd === `${prefix}botinformatie`){

//         let bicon = bot.user.displayAvatarURL;
//         let botembed = new Discord.RichEmbed()
//         .setDescription("Bot Informatie!")
//         .setColor("#00ff00")
//         .setThumbnail(bicon)
//         .addField("Gemaakt op..", bot.user.createdAt)
//         .addField("Bot Naam", bot.user.username)

//         return message.channel.send(botembed);
//     }

 });

bot.login(botConfig.token);
