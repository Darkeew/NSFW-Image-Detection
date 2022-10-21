const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(client) {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity(/* Can be set to anything you want*/ "you.", {
      type: "WATCHING" /* Can also be changed to LISTENING, PLAYING, etc... */,
    });
    botuptime = Date.now() / 1000;
  },
};
