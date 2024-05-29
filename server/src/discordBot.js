import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import dotenv from "dotenv";
import { addToSwarm, removeFromSwarm } from "../../utils/DatabaseFunc.js";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let channelId = "1237244404981436466";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    try {
      channelId = message.channelId;
      await message.channel.send("Successfully set this channel as the default channel for sending swarm alerts.");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  const parts = interaction.customId.split("/");
  const action = parts[0];
  const swarmId = parts[1];

  switch (action) {
    case "yes_button":
      // await interaction.reply(interaction.user.username);
      try {
        await addToSwarm("coral", swarmId, interaction.user.username); // Assume teamName is known or dynamically determined
        
        const originalMessage = interaction.message;

        // Get the original embed
        const originalEmbed = originalMessage.embeds[0];

        // Update the embed to reflect the user's interaction
        const fields = originalEmbed.fields.map((field) => {
          // If there are consecutive \n in field.value, remove them
          if (field.value.includes("\n\n")) {
            field.value = field.value.replace("\n\n", "\n");
          }
          if (field.name === "Attendees") {
            if (field.value.includes(interaction.user.username)) {
              return field;
            }
            if (field.value === "Currently no attendees") {
              return {
                name: "Attendees",
                value: interaction.user.username,
                inline: true,
              };
            }
            return {
              name: "Attendees",
              value: `${field.value}\n${interaction.user.username}`,
              inline: true,
            };
          }
          if (field.name === "NonAttendees") {
            if (field.value.includes(`${interaction.user.username}`)) {
              if (
                field.value.replace(`${interaction.user.username}`, "") === ""
              ) {
                return {
                  name: "NonAttendees",
                  value: "Currently no non-attendees",
                  inline: true,
                };
              }
              return {
                name: "NonAttendees",
                value: field.value.replace(`${interaction.user.username}`, ""),
                inline: true,
              };
            }
          }
          return field;
        });

        // Copy the embed's components
        const components = originalMessage.components.map((componentRow) =>
          ActionRowBuilder.from(componentRow),
        );

        // Edit the components ID
        components[0].components[0].setCustomId(
          `yes_button/${swarmId}/${Date.now().toString()}`,
        );
        components[0].components[1].setCustomId(
          `no_button/${swarmId}/${Date.now().toString()}`,
        );

        // Create the updated embed
        const updatedEmbed = EmbedBuilder.from(originalEmbed).setFields(fields);

        // Edit the original message with the updated embed
        await interaction.update({
          embeds: [updatedEmbed],
          components: components,
        });
        console.log("User added to swarm successfully");
      } catch (error) {
        console.error("Failed to add user to swarm:", error);
      }
      break;
    case "no_button": {
        try {
            await removeFromSwarm("coral", swarmId, interaction.user.username);
            const originalMessage = interaction.message;

            // Get the original embed
            const originalEmbed = originalMessage.embeds[0];
      
            // Update the embed to reflect the user's interaction
            const fields = originalEmbed.fields.map((field) => {
              // If there are consecutive \n in field.value, remove them
              if (field.value.includes("\n\n")) {
                field.value = field.value.replace("\n\n", "\n");
              }
              if (field.name === "NonAttendees") {
                if (field.value.includes(`${interaction.user.username}`)) {
                  return field;
                }
                if (field.value === "Currently no non-attendees") {
                  return {
                    name: "NonAttendees",
                    value: `${interaction.user.username}`,
                    inline: true,
                  };
                }
                return {
                  name: "NonAttendees",
                  value: `${field.value}\n${interaction.user.username}`,
                  inline: true,
                };
              }
              if (field.name === "Attendees") {
                if (field.value.includes(`${interaction.user.username}`)) {
                  if (
                    field.value.replace(`${interaction.user.username}`, "") === ""
                  ) {
                    return {
                      name: "Attendees",
                      value: "Currently no attendees",
                      inline: true,
                    };
                  }
                  return {
                    name: "Attendees",
                    value: field.value.replace(interaction.user.username, ""),
                    inline: true,
                  };
                }
              }
              return field;
            });
      
            // Copy the embed's components
            const components = originalMessage.components.map((componentRow) =>
              ActionRowBuilder.from(componentRow),
            );
      
            // Edit the components ID
            components[0].components[0].setCustomId(
              `yes_button/${swarmId}/${Date.now().toString()}`,
            );
            components[0].components[1].setCustomId(
              `no_button/${swarmId}/${Date.now().toString()}`,
            );
      
            // Create the updated embed
            const updatedEmbed = EmbedBuilder.from(originalEmbed).setFields(fields);
      
            // Edit the original message with the updated embed
            await interaction.update({
              embeds: [updatedEmbed],
              components: components,
            }); 
        } catch (error) {
            console.error("Failed to add user to swarm:", error);
        }
        break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

export { client, channelId};

