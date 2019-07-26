const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) =>{

    //!tempmute @user 1s/m/h/d 

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Kon geen user Vinden");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Ik kon die Persoon niet Muten.");
    let muterole = message.guild.roles.find(`name`, "muted");
   //start of create role
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
             })
             message.guild.channels.forEach(async (channel, id) => {
                 await channel.overwritePermissions(muterole, {
                     SEND_MESSAGES: false,
                     ADD_REACTIONS: false
                 });
             });
            }catch(e){
              console.log(e.stack);
            }
          }
          //end of create role
          let mutetime = args[1];
          if(!mutetime) return message.reply("Geef ook een tijd aan.");

          await(tomute.addRole(muterole.id));
          message.reply(`@${tomute.id} is gemuted voor ${ms(ms(mutetime))}`);

          setTimeout(function(){
            tomute.removerole(muterole.id);
            message.channel.send(`<@${tomute.id}> is unmuted.`);
          }, ms(mutetime));


          //end of module
}
    module.exports.help = {
        name: "tempmute"
    }