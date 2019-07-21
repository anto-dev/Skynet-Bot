const Discord = require("discord.js");
const config = require("../Configuration/config.json");

module.exports = async(bot, msg, args) => {
  let kickUser = msg.mentions.members.first();
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
    .setDescription(`Mentioneaza jucatorul pe care vrei sa-l dai afara de pe acest server.`)
    .setColor(0xff0000)
    .setFooter(`Skynet v${config.version}`)
  // ---------------------------------------------------
  const missingArgument_Reason = new Discord.RichEmbed()
    .setTitle(`Oops! :scream:`)
    .setDescription(`Ai uitat sa pui motivul boss`)
    .setColor(0xff0000)
    .setFooter(`Skynet v${config.version}`)
  // ========================== END OF EMBEDS SECTION ==============================

  if(!msg.member.roles.some(r=>["Moderator", "CEO", "Manager"].includes(r.name)) ) return msg.channel.send(noPerms);

  if (msg.mentions.users.size < 1) return msg.channel.send(missingArgument_User).catch(err => {
    const error = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setTitle(`Something went wrong :scream:`)
      .setDescription(`An error happened while executing the command and could not run`)
      .addField(`Here's what returned`, err, false)
      .setColor(0xff0000)
      .setFooter(`Contact a developer for help on how to fix this.`)

    msg.channel.send(error)
    console.log(`An error has eccoured during the running of the kick command and could not operate: ${err}`)
  });
  if (reason.length < 1) return msg.channel.send(missingArgument_User).catch(err => {
    msg.channel.send(`Oops, errors happened... Contact a developer and they'll be able to assist you.`)
    console.log(`An error has eccoured during the running of the kick command and could not operate: ${err}`)
  });

  const embed1 = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription(`**${kickUser.user.username}** has been kicked.`)
    .setColor(0x00ff00)
  msg.channel.send(embed1)

  await kickUser.send({
  embed: {
    color: 0xFF0000,
    title: "Uh oh! :scream:",
    description: `You've been kicked from **${msg.guild.name}** by **${msg.author.username}** with the reason **${reason}**`
    }
  }).then(async() => {
    kickUser.kick(reason).catch(err => {
      const error = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setTitle(`Something went wrong :scream:`)
      .setDescription(`An error happened while executing the command and could not run`)
      .addField(`Here's what returned`, err, false)
      .setColor(0xff0000)
      .setFooter(`Contact a developer for help on how to fix this.`)

      msg.channel.send(error)

      console.error(err)
    });
  });

} // Command by Hayden, With much help from Dan
