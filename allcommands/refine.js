import discord from 'discord.js';
import { All_Cards as cards} from '/home/container/disc_cards.js';
import {userid,gamedata,item} from '/home/container/models.js'

const ping = {data : new discord.SlashCommandBuilder()
  .setName('refine')
  .setDescription('Refine your Card')
  .addStringOption(option => option.setName('card_id').setDescription('Input ID').setRequired(true))
  .addStringOption(option => option.setName('energy_soul_type').setDescription('Input type').setRequired(false)
  .addChoices({name:'fire',value:'<:fire:916337311397052416>'},{name:'water',value:'<:water:916338240179552267>'},
  {name:'light',value:':sunny:'},{name:'dark',value:'<:dark:910723272495222794>'},{name:'wind',value:'<:wind:916336940343771156>'},
  {name:'nature',value:'<:nature:910561837492346931>'},{name:'ground',value:'<:earth:910194644648861776>'},
  {name:'zap',value:':zap:'},{name:'neutral',value:':sparkles:'}))
    .addIntegerOption(option => option.setName('energy_soul').setDescription('No. of energy souls you want to use').setRequired(false)),
    async execute(interaction){
      let card
      let cardo
      let user_id = interaction.user.id
      let energy_stone_type = interaction.options.getString('energy_soul_type')
      let card_id = interaction.options.getString('card_id')
      let energy_stone = interaction.options.getInteger('energy_soul')
      let sqexe = await userid.find({USER_ID:`${user_id}`})
      if (sqexe.length == 0){await interaction.reply('Not registered')} 
      else{let data = await gamedata.find({card_owner :user_id})

    for (let x = 0;x<=data.length-1;x++){
      if (x == (card_id-1)){
      for (let o =0;o<=cards.length-1;o++){
        if (cards[o].uniqueID==data[x].card_unique_id){
      card = cards[o]
    card._id = data[x]._id
  card.xp = data[x].card_xp
card.rarity = data[x].card_rarity}}}}

    let a = [20,40,60,80,100]
    let element_map = {'<:fire:916337311397052416>':'fire',':sunny:':'light','<:water:916338240179552267>':'water',
    '<:dark:910723272495222794>':'dark','<:wind:916336940343771156>':'wind','<:nature:910561837492346931>':'nature',
    '<:earth:910194644648861776>':'ground',':zap:':'zap',':sparkles:':'neutral'}
    let elementdata = await item.find({user_id :user_id})
    let element = elementdata[0]
    let type_energystone
    if(energy_stone_type== undefined){
      energy_stone_type= card.element
    type_energystone = element_map[`${card.element}`]}
    else if (energy_stone_type!=undefined){type_energystone=element_map[`${energy_stone_type}`] }
    let stone_xp
    if (energy_stone==undefined){energy_stone = element[`${type_energystone}`]}
    if(energy_stone > element[`${type_energystone}`])
    {await interaction.reply(`You own ${element[`${type_energystone}`]} ${type_energystone} soul.`)}
  else{
const levelembed = new discord.EmbedBuilder();
levelembed.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
levelembed.setColor('Blue')
levelembed.setTimestamp()
levelembed.setTitle('**__REFINING__**')
levelembed.setThumbnail(`${card.artlink}`)
levelembed.setDescription(`You are refining the following card:\n\n **CARD NAME :** ${card.character}
\nYou are using following resources:\n**SOULS :** ${energy_stone} ${type_energystone} souls`)
levelembed.setFooter({text:'Support the bot, contact [    ]#3780'})
let confirm = new discord.ActionRowBuilder()
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
    await interaction.reply({embeds:[levelembed], components:[confirm]})
    let idofrefine
    interaction.fetchReply()
        .then (reply=> idofrefine = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofrefine===i.message.id 
    const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.Button, time: 30000 });
    collector.on('collect', async i => {
      if (i.customId=='ok'){
    if (energy_stone_type ==  card.element){
      stone_xp = energy_stone*60}else{stone_xp = energy_stone*40}
      let soul_used
      let total_xp
      let z = 0
      let cxpup = await gamedata.find({card_owner :user_id,_id:card._id}) 
      total_xp = stone_xp+card.xp
      for(let x =0;x<=a[card.rarity-1];x++){z = z+12*x      
        if (z>=total_xp){
          cxpup[0].card_xp = total_xp
          cxpup[0].card_lvl = x-1 
          cxpup[0].save()
          element[`${type_energystone}`]=element[`${type_energystone}`]-energy_stone
          await element.save()
          levelembed.setDescription(`You are refining the following card:\n\n **CARD NAME :** ${card.character}
\nYou are using following resources:\n**SOULS :** ${energy_stone} ${type_energystone} souls`)
          levelembed.addFields({name:'Result',value:`You successfully refined your ${card.character} to level ${x-1}`})
          await i.update({embeds:[levelembed],components:[]})
          break
        }else if(z<total_xp&&x==a[card.rarity-1]){
          soul_used = Math.floor((z-card.xp)/60)
          cxpup[0].card_xp = Math.floor(z)
          cxpup[0].card_lvl = x
          cxpup[0].save()
          element[`${type_energystone}`]=element[`${type_energystone}`]-soul_used
          await element.save()
          levelembed.setDescription(`You are refining the following card:\n\n **CARD NAME :** ${card.character}
\nYou are using following resources:\n**SOULS :** ${soul_used} ${type_energystone} souls`)
          levelembed.addFields({name:'Result',value:`You successfully refined your ${card.character} to level ${x}`})
          await i.update({embeds:[levelembed],components:[]})
          break
        }}
      }if (i.customId=='notok'){
        levelembed.setDescription('Refinement was not done')
        await i.update({embeds:[levelembed],components:[]})
      }
    })

  }}
}}
export{ping}