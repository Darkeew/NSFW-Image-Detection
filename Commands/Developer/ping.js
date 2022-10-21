const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Gives the current latency of the bot.",
  permission: "SEND_MESSAGES",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `
      🏓Latency is \`${Date.now() - message.createdTimestamp}\`ms. 
      API Latency is \`${Math.round(client.ws.ping)}\`ms`
          )
          .setColor("DARK_NAVY")
          .setAuthor({
            name: `${interaction.member.user.tag}`,
            iconURL: `${interaction.member.user.avatarURL()}`,
          }),
      ],
    });
  },
};
