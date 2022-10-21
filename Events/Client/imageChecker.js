const { Message, MessageEmbed, Client } = require("discord.js");
const axios = require("axios");
const { moderatecontentkey } = require("../../Structures/config.json");

module.exports = {
  name: "messageCreate",
  /**
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    // If there are any nsfw channels.
    const allowed_channels = ["", ""];
    if (allowed_channels.includes(message.channel.id)) return;

    const prediction = 75; // You can change this if the bot is giving false positives.

    const guild = client.guilds.cache.get(message.guild.id);

    //If the image is a link and not an attachment.
    if (message.toString().startsWith("https")) {
      axios
        .get("https://api.moderatecontent.com/moderate/", {
          params: {
            key: moderatecontentkey,
            url: message.toString(),
          },
        })
        .then(async (response) => {
          try {
            if (response.data.predictions.adult > prediction) {
              const member = guild.members.cache.get(interaction.user.id);
              await member.timeout(600 * 1000, "NSFW Image Detected.");
              message.delete();
              const alert = guild.channels.cache.get("1004899001545543730");
              alert.send(
                `<@&1000799229125595206>, I have flagged an image by ${message.author} in ${message.channel}. Prediction: \`${response.data.predictions.adult}\``
              );
              const logs = guild.channels.cache.get("1004905418876788767");
              logs.send({
                embeds: [
                  new MessageEmbed()
                    .setDescription(
                      `
  ${message.author} (${message.author.id}) sent an image in ${message.channel}.
  
  Adult rating: \`${response.data.predictions.adult}\`
  Everyone rating: \`${response.data.predictions.everyone}\`
  Teen rating: \`${response.data.predictions.teen}\`
              `
                    )
                    .setColor("BLURPLE")
                    .setImage(`${message.toString()}`),
                ],
              });
            }
          } catch (e) {
            if (
              !e.toString(
                "TypeError: Cannot read properties of undefined (reading 'adult')"
                // The image type isnt supported
              )
            ) {
              console.log(e);
            }
          }
        });
    } else if (message.attachments.size < 1) {
      return;
    } else {
      message.attachments.every((m) => {
        if (m.url.endsWith(".mov")) return;
        if (m.url.endsWith(".mp4")) return;
        axios
          .get("https://api.moderatecontent.com/moderate/", {
            params: {
              key: moderatecontentkey,
              url: m.url,
            },
          })
          .then(async (response) => {
            try {
              if (response.data.predictions.adult > prediction) {
                const member = guild.members.cache.get(interaction.user.id);
                await member.timeout(600 * 1000, "NSFW Image Detected.");
                message.delete();
                const alert = guild.channels.cache.get("1004899001545543730");
                alert.send(
                  `<@&1000799229125595206>, I have flagged an image by ${message.author} in ${message.channel}. Prediction: \`${response.data.predictions.adult}\``
                );
                const logs = guild.channels.cache.get("1004905418876788767");
                logs.send({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        `
  ${message.author} (${message.author.id}) sent an image in ${message.channel}.
  
  Adult rating: \`${response.data.predictions.adult}\`
  Everyone rating: \`${response.data.predictions.everyone}\`
  Teen rating: \`${response.data.predictions.teen}\`
              `
                      )
                      .setColor("BLURPLE")
                      .setImage(`${message.toString()}`),
                  ],
                });
              }
            } catch (e) {
              if (
                !e.toString(
                  "TypeError: Cannot read properties of undefined (reading 'adult')"
                )
              ) {
                console.log(e);
              }
            }
          });
      });
    }
  },
};
