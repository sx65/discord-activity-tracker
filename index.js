import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import activeWindow from 'active-win';


const token = 'rap';
const id = '1234567890';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let lastProcess = null;

async function sigma() {
  const activeProcess = await activeWindow();

  if (activeProcess && activeProcess.owner.name !== lastProcess) {
    lastProcess = activeProcess.owner.name;

    const channel = await client.channels.fetch(id);
    const currentTime = new Date().toLocaleTimeString();

    const embed = new EmbedBuilder()
      .setColor('#FFA500') 
      .setTitle('wowzers tracker')
      .addFields(
        { name: 'Switched to process', value: `\`${lastProcess}\``, inline: true },
        { name: 'Current Time', value: `${currentTime}`, inline: true },
      )
      .setDescription('👀')
      .setFooter({ text: 'omg', iconURL: 'https://cdn.discordapp.com/attachments/1287251092467482715/1287254579662032927/Ekran_goruntusu_2023-10-14_044350.png?ex=66f0e0bf&is=66ef8f3f&hm=6d9a5a84c1e8a2459359801e3ca32c4a994cee3f3ca11c961b5fccf824b791d7&' });

    channel.send({ embeds: [embed] });
  }
}

setInterval(sigma, 1000); // 1 sec


client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});