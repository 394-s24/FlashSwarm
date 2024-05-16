import { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import dotenv from 'dotenv'; 
import { addToSwarm } from '../../utils/DatabaseFunc.js';
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const channelid = '1237244404981436466';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // if (message.content.startsWith('$embed')) {
    //     const embed = new EmbedBuilder()
    //         .setTitle('New Flash Swarm')
    //         .setDescription('Description here')
    //         .setColor(0x00FF00)
    //         .addFields(
    //             { name: 'Title', value: 'Inline Field 1', inline: true },
    //             { name: 'Time', value: 'Inline Field 2', inline: true }
    //         )
    //         .setFooter({ text: 'Hi from team purple :)' })
    //         .setAuthor({ name: 'FlashSwarm', iconURL: 'https://example.com/link-to-my-image.png' });

    //     const buttons = new ActionRowBuilder()
    //         .addComponents(
    //             new ButtonBuilder()
    //                 .setLabel('Yes')
    //                 .setStyle(ButtonStyle.Success)
    //                 .setCustomId('yes_button'),
    //             new ButtonBuilder()
    //                 .setLabel('No')
    //                 .setStyle(ButtonStyle.Danger)
    //                 .setCustomId('no_button')
    //         );

    //     await message.channel.send({ content: '<@everyone>', embeds: [embed], components: [buttons] });
    // }

    if (message.mentions.has(client.user)) {
        const channel = await client.channels.fetch(channelid).catch(console.error);
        if (channel) {
            channel.send('I was pinged!');
        } else {
            console.log('Channel not found.');
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const parts = interaction.customId.split('-');
    const action = parts[0];
    const swarmId = parts.slice(1).join('-');

    switch (action) {
        case 'yes_button':
            await interaction.reply(interaction.user.username);
            try {
                await addToSwarm('coral', swarmId, interaction.user.username); // Assume teamName is known or dynamically determined
                console.log("User added to swarm successfully");
            } catch (error) {
                console.error("Failed to add user to swarm:", error);
            }
            break;
        case 'no_button':
            await interaction.reply('No');
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);

export { client };