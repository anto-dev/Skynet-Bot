const Discord = require("discord.js");
const config = require("../Configuration/config.json");

module.exports = async(bot, msg, args) => {
        const embed = new Discord.RichEmbed()
            .setTitle(`:clock10: Uptime`)
            .setDescription(`Am fost aprins acum ` + Math.floor(bot.uptime / 60 / 60 / 60) + ` ore`)
            .setColor(0x157f87)
        
        msg.channel.send(embed)
}