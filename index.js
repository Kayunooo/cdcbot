const { execFileSync } = require("child_process");
const Discord = require("discord.js");

const Client = new Discord.Client;

const fs = require ('fs');

const prefix = "&";

Client.on("ready", async () => {
    Client.user.setStatus("dnd")
    Client.user.setActivity("discord.gg/cdc")
console.log("Bot connecté");
});

const exampleEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('**CDC BOT**')

Client.on("message", message =>{

        if(message.content.startsWith(prefix + "clear")){
        message.delete();
            if(message.member.hasPermission("MANAGE_MESSAGES")){

                let args = message.content.trim().split(/ +/g);

                if(args[1]){

                    if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                       message.channel.bulkDelete(args[1])
                       message.channel.send(`**${args[1]} messages ont été supprimés**`)
                    }
                }
            }
    }
});

Client.on("message", message => {
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention =message.mentions.members.first();

            if(mention == undefined){
                message.reply("Erreur dans le pseudo du membre.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " à bien été banni !");
                }
                else {
                    message.reply("Hélas, je ne peux pas bannir ce membre !");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Erreur dans le pseudo du membre."); 
            }
            else {
                if(mention.kickable){
                   mention.kick();
                   message.channel.send(mention.displayName + " à bien été kick !"); 
                }
                else {
                    message.reply("Hélas, je ne peux pas kick ce membre !");
                }
            }    
        }   
    }
    else if(message.content.startsWith(prefix + "mute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.reply("Membre mal mentionné !");
        }
        else {
            mention.roles.add("815253040101064745");
            message.reply(mention.displayName + "à bien été mute !");
        }
    }
    else if(message.content.startsWith(prefix + "unmute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.reply("Membre mal mentionné !");

        }
        else {
            mention.roles.remove("815253040101064745");
            message.channel.send(mention.displayName +"à bien été unmute !");
        }
    }
    else if(message.content.startsWith(prefix + "tempmute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
            message.reply("Membre mal mentionné !");
        }
        else {
            let args = message.content.split(" ");

            mention.roles.add("815253040101064745");
            setTimeout(function() {
                mention.roles.remove("815253040101064745")
                mention.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");
            }. args [2] * 1000);
        }
    }
});

Client.login("ODU2MTY1MTY2Njg5Mjg4MTkz.YM9D8g.JdNrKaX0EsO3-ikeRMculG6bm8E");