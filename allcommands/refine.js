import discord from 'discord.js';
import SlashCommandBuilder from '@discordjs/builders';
import { All_Cards as cards, randomcard} from '/ASHWIN/JavaScript/disc_cards.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

//MYSQL PASSWORD
const possswd = process.env.SQLPASSWD;
// console.log(possswd)

// MYSQL CONNECTION
const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password:`${possswd}`,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    database: 'testgame'
  });
  
con.getConnection((err) => {
if (err) {
    return console.error('error: ' + err.message);
}
// console.log('Connected to the MySQL server.');
});
const dbQuery = (query) => new Promise((resolve, reject) => {
    con.query(query, (error, data) => {
      if(error) reject(error);
      else resolve(data);
    })
  });

  const ping = {data : new SlashCommandBuilder.SlashCommandBuilder()
    .setName('refine')
    .setDescription('Refine your Card')
    .addStringOption(option => option.setName('card_id').setDescription('Input ID').setRequired(true))
    .addStringOption(option => option.setName('energy_soul_type').setDescription('Input type').setRequired(false)
    .addChoices([['fire','<:fire:916337311397052416>'],['water','<:water:916338240179552267>'],['light','light'],
  ['dark','<:dark:910723272495222794>'],['wind','<:wind:916336940343771156>'],['nature','<:nature:910561837492346931>'],
['ground','<:download:910194644648861776>'],['zap',':zap:'],['neutral',':sparkles:']]))
    .addIntegerOption(option => option.setName('energy_soul').setDescription('No. of energy souls you want to use').setRequired(false)),
    async execute(interaction){
      let card
        let user_id = interaction.user.id
        let energy_stone_type = interaction.options.getString('energy_soul_type')
        let card_id = interaction.options.getString('card_id')
        let energy_stone = interaction.options.getInteger('energy_soul')
        let sq = `Select * from users where USER_ID = ${user_id}`
      let sqexe = await dbQuery(sq)
      if (sqexe.length == 0){await interaction.reply('Not registered')} 
      else{let userdataquery = `SELECT * from gamedata where card_owner = ${user_id}`
    let userdata = await dbQuery(userdataquery)
    for (let x = 0;x<userdata.length-1;x++){if (x == (card_id-1)){card = userdata[x]}}
    let a = {1:20,2:40,3:60,4:80,5:100}
    let elementquery= `Select * from useritems where user_id = ${user_id}`
    let element_map = {'<:fire:916337311397052416>':'fire','light':'light','<:water:916338240179552267>':'water',
    '<:dark:910723272495222794>':'dark','<:wind:916336940343771156>':'wind','<:nature:910561837492346931>':'nature',
    '<:download:910194644648861776>':'ground',':zap:':'zap',':sparkles:':'neutral'}
    let elementdata = await dbQuery(elementquery)
    let element = elementdata[0]
    let type_energystone
    if(energy_stone_type == undefined){
      energy_stone_type= card.card_element
    type_energystone = element_map[`${card.card_element}`]}
    else if (energy_stone_type!=undefined){type_energystone=element_map[`${energy_stone_type}`] }
    let stone_xp
    if (energy_stone==undefined){energy_stone = element[`${type_energystone}`]}
    if(energy_stone > element[`${type_energystone}`])
    {await interaction.reply(`You own ${element[`${type_energystone}`]} ${type_energystone} soul.`)}
  else{
    if (energy_stone_type ==  card.card_element){
      stone_xp = energy_stone*6
    }else if (energy_stone_type != card.card_element){
      stone_xp = energy_stone*4}

let total_xp = stone_xp+card.card_xp
let card_class
for (let j = 0;j<=cards.length-1;j++){if(card.card_unique_id == cards[j].uniqueID){card_class = cards[j]}}

const levelembed = new discord.MessageEmbed();
levelembed.setAuthor(interaction.user.tag, interaction.user.avatarURL())
levelembed.setColor('BLUE')
levelembed.setTimestamp()
levelembed.setTitle('**__REFINING__**')
levelembed.setThumbnail(`${card_class.artlink}`)
levelembed.setDescription(`You are refining the following card:\n\n **CARD NAME :** ${card_class.character}
\nYou are using following resources:\n**SOULS :** ${energy_stone} ${type_energystone} souls
**Total xp gained =** ${stone_xp}`)
levelembed.setFooter('Support the bot, contact [    ]#3780')
let confirm = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId('ok')
            .setLabel('Done')
            .setEmoji('✅')
            .setStyle('SUCCESS')
        ).addComponents(
            new discord.MessageButton()
            .setCustomId('notok')
            .setLabel('No')
            .setEmoji('❌')
            .setStyle('DANGER')
        )
    await interaction.reply({embeds:[levelembed], components:[confirm]})
    let idofrefine
    interaction.fetchReply()
        .then (reply=> idofrefine = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofrefine===i.message.id 
    const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 30000 });
    collector.on('collect', async i => {
      if (i.customId=='ok'){
        let z = 0
        for(let x =0;x<=a[card.card_rarity];x++){z = z+1.1*x
        if(z>total_xp){
          await dbQuery(`update gamedata set card_lvl = ${x},card_xp = ${total_xp} where card_owner = ${user_id} and card_id = ${card.card_id}`)
          await dbQuery(`update useritems set ${type_energystone}=${element[`${type_energystone}`]-energy_stone} where user_id = ${user_id}`)
          levelembed.setDescription(`You successfully refined your ${card_class.character} to level ${x}`)
          await i.update({embeds:[levelembed],components:[]})
        break}} 
      }if (i.customId=='notok'){
        levelembed.setDescription('Refinement was not done')
        await i.update({embeds:[levelembed],components:[]})
      }
    })

  }}
}}
export{ping}