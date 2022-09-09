import discord from 'discord.js';
import {userid,gamedata,userdata,stamina,item} from '/Ashwin/JavaScript/models.js'
import { All_Cards as cards} from '/ASHWIN/JavaScript/disc_cards.js';


function card_name(a) {
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].character}}}
const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('teamset')
		.setDescription('Puts the card in team')
        .addStringOption(option => option.setName('card_no').setDescription('Input card serial no.').setRequired(true))
        .addStringOption(option => option.setName('position').setDescription('Input position').setRequired(true)),
    async execute(interaction){
        let card_id = interaction.options.getString('card_no')
        let card_position = interaction.options.getString('position')
        if (parseInt(card_position)<0 || 3 < parseInt(card_position) ){
            interaction.reply('Not entered valid position. Plase enter between 1 and 3')}
            else{
        let user_id = interaction.user.id;
        let card
        const fet = await userid.findOne({USER_ID:`${user_id}`})
        if (fet==undefined) {
            await interaction.reply('Register yourself first using the command /start !!!');            
        }else{
                let userdata = await gamedata.find({card_owner:user_id}).exec()
                    for (let x = 0;x<=userdata.length-1;x++){if (x == (card_id-1)){card = userdata[x]}}
                if (card==undefined){await interaction.reply('You Don\'t Own That Card')}
                else{                        
                let team = await gamedata.find({ card_owner :user_id, team_status:{$ne:null}}).exec()
                if(team.length==0) {
                    await gamedata.findOneAndUpdate({_id:card._id},{team_status:card_position})
                    await interaction.reply(`Successfully set ${card_name(card.card_unique_id)} at position ${card_position}` )
                    }
                    else {
                    let confirmation = new discord.ActionRowBuilder()
                     .addComponents(
                        new discord.ButtonBuilder()
                            .setCustomId('ok')
                            .setLabel('Done')
                            .setEmoji('✅')
                            .setStyle(discord.ButtonStyle.Success)
                        ).addComponents(
                            new discord.ButtonBuilder()
                            .setCustomId('notok')
                            .setLabel('No')
                            .setEmoji('❌')
                            .setStyle(discord.ButtonStyle.Danger)
                        )
                    
    
                        let existing = await gamedata.find({card_owner:user_id,team_status:card_position})
                        let del
                        if (existing.length<=0){
                            let up =await gamedata.find({_id:card._id})
                            up[0].team_status=card_position
                            await up[0].save()
                            await interaction.reply(`Successfully set ${card_name(card.card_unique_id)} at position ${card_position}`) 
                        }else{
                            if(existing[0]._id.toString()==card._id.toString()){
                            await interaction.reply({content:`${card_name(existing[0].card_unique_id)} is already present at position ${card_position}.
                            Do you want to remove it ?`,components:[confirmation]})
                            del = true
                        }else{
                                await interaction.reply({content:`${card_name(existing[0].card_unique_id)} is already present at position ${card_position}.
                        Do you want it to replace it by ${card_name(card.card_unique_id)} ?`,components:[confirmation]})}}
                            let idofrefine
                            interaction.fetchReply()
                                .then (reply=> idofrefine = reply.id)
                                const filter = i => i.user.id === interaction.user.id && idofrefine===i.message.id 
                                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.Button, time: 30000 });
                                collector.on('collect', async i => {
                                     if (i.customId=='ok'){
                                        if (del == true){await gamedata.findOneAndUpdate({_id:existing[0]._id},{team_status:null})}
                                        else{
                                        await gamedata.findOneAndUpdate({_id:existing[0]._id},{team_status:null})
                                        await gamedata.findOneAndUpdate({_id:card._id},{team_status:card_position})}
                                        
                                        i.update({content :'Successfully updated the team.',components:[]})
                                    }else if (i.customId == 'notok'){
                                        i.update({content :'Cancelled',components:[]})
                    }
                    })}
                    
                    }
            }}
        }}

export{ping}