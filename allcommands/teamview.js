import discord from 'discord.js';
import { All_Cards as cards,skillfunc} from '/ASHWIN/JavaScript/disc_cards.js';
import {userid,gamedata,userdata,stamina,item} from '/Ashwin/JavaScript/models.js'
import dotenv from 'dotenv';
dotenv.config();


function card_name(a) {
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv]}}}
let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']

const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('teamview')
		.setDescription('View your team'),
    async execute(interaction){
        let user_id = interaction.user.id;
        let teamembeds = []
        
        const fet = await userid.find({USER_ID:`${user_id}`})
        if (fet.length==0) {
            await interaction.reply('Register yourself first using the command /start !!!');            
        }else{
            let navigate = new discord.ActionRowBuilder()
        .addComponents(
            new discord.ButtonBuilder()
            .setCustomId('left')
            .setLabel('left')
            .setStyle(discord.ButtonStyle.Primary)
            .setDisabled(true)
        ).addComponents(
            new discord.ButtonBuilder()
            .setCustomId('delete')
            .setLabel('delete')
            .setStyle(discord.ButtonStyle.Danger)
        ).addComponents(
            new discord.ButtonBuilder()
            .setCustomId('right')
            .setLabel('right')
            .setStyle(discord.ButtonStyle.Primary)
        )
            let temp = await gamedata.find({card_owner:user_id,team_status:{$ne:null}})
            if (temp.length==0){await interaction.reply('You haven\'t equipped any card. Use /teamset to equip a card' )}
            else {    
            let data = temp.sort(function(b, a){return b.team_status - a.team_status})   
                    teamembeds[0] = new discord.EmbedBuilder();
                    teamembeds[0].setAuthor({name:`${interaction.user.tag}`,iconURL: `${interaction.user.avatarURL()}`})
                    teamembeds[0].setTitle('TEAM')
                    teamembeds[0].setDescription('Following characters are in your team')
                    teamembeds[0].setColor('Blue');
                    for (let i = 0; i<=3; i++){
                        for (let hawa = 0;hawa<=data.length-1;hawa++){
                            if ( i+1 == data[hawa].team_status){
                            let card = {...card_name(data[hawa].card_unique_id)}
                            card.hp = Math.floor(card.hp + data[hawa].card_lvl*0.01*card.hp+data[hawa].card_rarity*0.2*card.hp)
                            card.attack = Math.floor(card.attack + data[hawa].card_lvl*0.01*card.attack+data[hawa].card_rarity*0.2*card.attack)
                            card.defense = Math.floor(card.defense + data[hawa].card_lvl*0.01*card.defense+data[hawa].card_rarity*0.2*card.defense)
                            card.agility = Math.floor(card.agility + data[hawa].card_lvl*0.01*card.agility+data[hawa].card_rarity*0.2*card.agility)
                        teamembeds[0].addFields(
                            {name:`${i+1} | ${card.character} | ${card.element}`,value:`${stars[data[hawa].card_rarity]} | ${data[hawa].card_lvl} | ${data[hawa].card_id}`})   
                    let jk 
                    jk = new discord.EmbedBuilder();
                    jk.setAuthor({name:`${interaction.user.tag}`,iconURL: `${interaction.user.avatarURL()}`});
                    jk.setTitle(`**${card.character}**\nSERIES:${card.series} `);
                    jk.setColor('Blue');
                    jk.addFields({name:'Card Details',value:`RARITY: ${stars[data[hawa].card_rarity]} \nLIMITBREAK: ${data[hawa].limitbreak}  \nLEVEL: ${data[hawa].card_lvl}  \nELEMENT: ${card.element}  \nSKIN:  \nFRIENDSHIP: ${data[hawa].familarity}`},
                    {name: 'CARD STATS', value: `HP: ${card.hp}  \nATTACK: ${card.attack}  \nDEFENSE: ${card.defense}  \nAGILITY: ${card.agility}`},
                    {name: `SKILL`, value : `${skillfunc(card.talent_id,data[hawa].card_rarity)}`})
                    jk.setTimestamp()
                    jk.setFooter({text:`${card.quote} |Card ID: ${data[hawa].card_id}`})   
                    teamembeds.push(jk) 
                }}}await interaction.reply({embeds:[teamembeds[0]], components:[navigate]})
                let pageno = 0

                let idofteamview
    interaction.fetchReply()
        .then (reply=> idofteamview = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofteamview===i.message.id 
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.Button, time: 120000 });
                collector.on('collect', async i => {
                    if (i.customId == 'right'){pageno = pageno + 1
                    if (pageno == (teamembeds.length-1)){navigate.components[0].setDisabled(false)
                        navigate.components[2].setDisabled(true)
                        await i.update({embeds:[teamembeds[pageno]],components:[navigate]})}
                   else if (pageno < teamembeds.length-1){navigate.components[0].setDisabled(false)
                        navigate.components[2].setDisabled(false)
                        await i.update({embeds:[teamembeds[pageno]],components:[navigate]})}
                }if (i.customId == 'left'){pageno = pageno-1
                if (pageno == 0){navigate.components[0].setDisabled(true)
                    navigate.components[2].setDisabled(false)
                    await i.update({embeds:[teamembeds[pageno]],components:[navigate]})
            }else if (!pageno == 0){navigate.components[0].setDisabled(false)
                navigate.components[2].setDisabled(false)
                await i.update({embeds:[teamembeds[pageno]],components:[navigate]})
            }}if (i.customId == 'delete'){collector.stop()
                await i.update({content : 'Deleted!!', components : [], embeds:[]})}
            })
           
        }}
     
}}
export{ping}