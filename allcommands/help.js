import discord from 'discord.js';
import {userid} from '/home/container/models.js'

const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('help')
		.setDescription('List of commands'),
    async execute(interaction) {
        let id = interaction.user.id;
        const fet = await userid.findOne({USER_ID:id})
            if (fet==undefined) {
                await interaction.reply('Not Registered');
            }else{let helpembed = new discord.EmbedBuilder()
                helpembed.setAuthor({name:`${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}`});
                helpembed.setTitle('**INVENTORY**');
                helpembed.setColor('AQUA');
                helpembed.setTimestamp()
                helpembed.setFooter({text:'Support the bot, contact [    ]#3780'})
                helpembed.addFields({name:'/register',value:'Register yourself to the bot.'},
                {name: 'Cards and Items',value:`1. /inventory: Use to view the cards you own.
                2. /info: To view the stats of a particular command that you own.
                3. /cards: View all the cards obtainable in the game.
                4. /cinfo: Use to view the general stats of the card in the game.`},
                {name: 'Battle',value:`/stamina: Use to check your stamina. The stamina is used when you do battles.
                2. /teamset: Use to put cards in your team.
                3. /teamview: Use to view your team.
                4. /battle: Use to do battle
                5. /autobattle: Use to do battle with help of AI.` },
                {name: 'Stage Selection',value:`1. /Area: Use this to move into an area.
                2. /stage: To move into a stage that is available in an area.`},
                {name: 'Upgrading and Evolution',value:`1. /items: Use to view items owned by you.
            2. /refine: Upgrading cards.`})
        await interaction.reply({embeds:[helpembed]})    
        }
        }}

export{ping}