import SlashCommandBuilder from '@discordjs/builders';
import discord from 'discord.js';
import util from 'util'

const wait = util.promisify(setTimeout); 
const ping = {
	data: new SlashCommandBuilder.SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.addStringOption(option => option.setName('input').setDescription('ping for pong, beep for boop').setRequired(true)),
    async execute(interaction) {
        const row = new discord.MessageActionRow()
        .addComponents( 
        new discord.MessageButton()
        .setCustomId('back')
        .setLabel('Previous Page')
        .setStyle('PRIMARY'),
    
        new discord.MessageButton()
        .setCustomId('deleting')
        .setLabel('Delete')
        .setStyle('PRIMARY'),

        new discord.MessageButton()
        .setCustomId('next')
        .setLabel('Next Page')
        .setStyle('PRIMARY')
    );
        const userinput = interaction.options.getString('input');
        if (userinput=='ping'){
            await interaction.reply({content : 'pong', components :[row] })
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter,componentType: 'BUTTON', time: 45000 });
            collector.on('collect', async i => {
                if (i.customId === 'next') {
                    console.log(i.customId)
                    await i.update('The first message')
                    await wait(5000)
                    await i.editReply('2ND MESSAGE')
                    await wait(3000)
                    await i.editReply(`${i.user.id} clicked on the ${i.customId} button.`);
                } else {
                    await i.update({ content: `These buttons aren't for you!`, ephemeral: true });
                }
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        }else if (userinput == 'beep') {
            await interaction.reply('Boop !')
        }
        else{await interaction.reply('Wrong Input')}
    },
};
export{ping};