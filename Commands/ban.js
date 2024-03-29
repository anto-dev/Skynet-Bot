const Discord = require("discord.js");
const config = require("../Configuration/config.json");

module.exports = async(bot, msg, args) => {
  let banUser = msg.mentions.members.first();
  let reason = args.slice(1).join(" ");

  const noPerms = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription(`:no_entry_sign: ${msg.author.username}, Nu ai acces sa folosesti aceasta comanda`)
    .setColor(0xff0000)
    .setFooter(`Contact your server admin for help is you belive this isn't right`)
  // ---------------------------------------------------
  const missingArgument_User = new Discord.RichEmbed()
  .setTitle(`Oops! :scream:`)
  .setDescription(`Mentioneaza membrul pe care vrei sa-l banezi`)
  .setColor(0xff0000)
  .setFooter(`Skynet v${config.version}`)
  // ---------------------------------------------------
  const missingArgument_Reason = new Discord.RichEmbed()
  .setTitle(`Oops! :scream:`)
  .setDescription(`Ai uitat sa pui motivul boss.`)
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
    console.log(`An error has eccoured during the running of the ban command and could not operate: ${err}`)
  });
  if (reason.length < 1) return msg.channel.send(missingArgument_Reason).catch(err => {
    msg.channel.send(error)
    console.log(`An error has eccoured during the running of the ban command and could not operate: ${err}`)
  });

  const embed1 = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription(`**${banUser.user.username}** has been banned.`)
    .setColor(0x00ff00)
  msg.channel.send(embed1)

  await banUser.send({
  embed: {
    color: 0xFF0000,
    title: "Uh oh! :scream:",
    description: `You've been banned from **${msg.guild.name}** by **${msg.author.username}** with the reason **${reason}**`
    }
  }).then(async() => {
    msg.guild.ban(banUser.id).catch(err => {
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
} // Command by Hayden
