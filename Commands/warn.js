const Discord = require("discord.js");
const config = require("../Configuration/config.json");

module.exports = async(bot, msg, args) => {
    let warnUser = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");

    // EMBEDS
    const noPerms = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`:no_entry_sign: ${msg.author.username}, Nu ai acces sa folosesti aceasta comanda`)
        .setColor(0xff0000)
        .setFooter(`Skynet v${config.version}`)
    // ---------------------------------------------------
    const missingArgument_User = new Discord.RichEmbed()
        .setTitle(`Oops! :scream:`)
        .setDescription(`Mentioneaza user-ul caruia vrei sa ii dai warn`)
        .setColor(0xff0000)
        .setFooter(`Skynet v${config.version}`)
    // ---------------------------------------------------
    const missingArgument_Reason = new Discord.RichEmbed()
        .setTitle(`Oops! :scream:`)
        .setDescription(`Ai uitat motivul boss`)
        .setColor(0xff0000)
        .setFooter(`Skynet v${config.version}`)
    // ================================ END OF EMBEDS SECTION =====================================

    if(!msg.member.roles.some(r=>["Moderator", "CEO", "Manager", "Staff"].includes(r.name)) ) return msg.channel.send(noPerms);
    if (msg.mentions.users.size < 1) return msg.channel.send(missingArgument_User)
    if (reason.length < 1) return msg.channel.send(missingArgument_Reason)

    const embed1 = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setDescription(`**${warnUser.user.username}** has been warned.`)
        .setColor(0x00ff00)

    msg.channel.send(embed1)

    await warnUser.send({
        embed: {
          color: 0xFF0000,
          title: "Uh oh! :scream:",
          description: `You've been warned in **${msg.guild.name}** by **${msg.author.username}** with the reason **${reason}**`
          }
        })
} // No DB Used, simply DM's a mentioned use