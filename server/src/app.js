// Import necessary libraries
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { client } from './discordBot.js'; // Import your Discord client
import { GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

const formatDateRange = (startDate, endDate) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Assuming startDate and endDate are on the same day, you can reuse these:
    const month = months[startDate.getMonth()];
    const day = startDate.getDate();
    const suffix = (n) => {
      return (n % 10 === 1 && n !== 11) ? "st" :
             (n % 10 === 2 && n !== 12) ? "nd" :
             (n % 10 === 3 && n !== 13) ? "rd" : "th";
    };

    // Formatting the start time:
    const startHours = startDate.getHours();
    const startFormattedHour = startHours % 12 || 12; // Convert 24h to 12h format and handle midnight as 12
    const startAmpm = startHours >= 12 ? "pm" : "am";

    // Formatting the end time:
    const endHours = endDate.getHours();
    const endFormattedHour = endHours % 12 || 12; // Convert 24h to 12h format
    const endAmpm = endHours >= 12 ? "pm" : "am";

    return `${month} ${day}${suffix(day)} ${startFormattedHour} ${startAmpm} - ${endFormattedHour} ${endAmpm}`;
};

// Define a route to handle POST requests
app.post('/send-message', async (req, res) => {

    const desc = req.body.description;
    const link = req.body.link;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const swarmId = req.body.swarmId;

    const embed = new EmbedBuilder()
    .setTitle('New Flash Swarm')
    .setDescription(desc)
    .setColor(0x00FF00)
    .addFields(
        { name: 'Link', value: link, inline: true },
        { name: 'Time', value: formatDateRange(new Date(startTime), new Date(endTime)), inline: false }
    )
    .setFooter({ text: 'Hi from team purple :)' })

    const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('Join Swarm')
            .setStyle(ButtonStyle.Success)
            .setCustomId(`yes_button-${swarmId}`),
        new ButtonBuilder()
            .setLabel('Not Available')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('no_button')
    );

    const channel = await client.channels.fetch('1237244404981436466').catch(console.error);
    if (channel) {
        channel.send({ content: '<@everyone>', embeds: [embed], components: [buttons] });
        res.status(200).send('Message sent!');
    } else {
        res.status(404).send('Channel not found.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});