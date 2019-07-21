const Discord = require("discord.js");
const config = require("../Configuration/config.json");

module.exports = async(bot, msg, args) => {
    if(!msg.member.roles.some(r=>["Staff"].includes(r.name)) ) {
        const embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setTitle(`__**HELP**__`)
        .addField(`ping`, `Ping the bot`, false)
        .addField(`about`, `About TTGProtect`, false)
        .addField(`serverinfo`, `Info about the server`, false)
        .addField(`debug`, `Info about the Host and the bot`, false)
        .addField(`stats`, `View some statistics about TTGProtect`, false)
        .addField(`uptime`, `How long has the bot been up?`, false)
        .addField(`profile`, `About your user profile`, false)
        .setFooter(`You are not seeing all commands as you are not Staff in this server`)
        .setColor(0x157f87)
    
    msg.author.send(embed)
    msg.channel.send(`:mailbox: ${msg.author.username}, Check your DM's`)
    } else {
        const embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setTitle(`__**HELP**__`)
        .addField(`botinfo`, `despre skynet`, false)
        .addField(`serverinfo`, `Informatii despre server`, false)
        .addField(`botstats`, `Statistici despre bot`, false)
        .addField(`debug`, `Informatii despre host si bot`, false)
        .addField(`uptime`, `De cat timp este botul online`, false)
        .addField(`userinfo`, `Informatii despre profilul tau`, false)
        .addField(`warn`, `Ii dai warn unui membrului mentionat [STAFF]`, false)
        .addField(`kick`, `Ii dai kick unui membrului mentionat [STAFF]`, false)
        .addField(`ban`, `Banezi membrul mentionat [STAFF]`, false)
        .setFooter(`You are viewing all commands`)
        .setColor(0x157f87)

        msg.author.send(embed)
        msg.channel.send(`:mailbox: ${msg.author.username}, Check your DM's`)
    }
}