import {SlashCommandBuilder} from '@discordjs/builders';
import discord from 'discord.js';
import mysql from 'mysql2';
import { All_Cards as cards} from '/ASHWIN/JavaScript/disc_cards.js';
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
function card_name(a) {
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv]}}}
let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
function card_element(a) {
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].element}}}
const ping = {
	data: new SlashCommandBuilder()
		.setName('teamview')
		.setDescription('View your team'),
    async execute(interaction){
        let user_id = interaction.user.id;
        let teamembeds = []
        let sql = `SELECT * FROM users WHERE USER_ID = '${user_id}'`;
        let navigate = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId('left')
            .setLabel('left')
            .setStyle('PRIMARY')
            .setDisabled(true)
        ).addComponents(
            new discord.MessageButton()
            .setCustomId('delete')
            .setLabel('delete')
            .setStyle('DANGER')
        ).addComponents(
            new discord.MessageButton()
            .setCustomId('right')
            .setLabel('right')
            .setStyle('PRIMARY')
        )
        con.query(sql, async function vroom (err,data) {
            if (data.length === 0) {await interaction.reply('You are not registered. Register using \'/start\'')}
            else{
                    let cardsinteam = `Select * from gamedata where card_owner = ? and team_status is NOT NULL ORDER BY team_status`
                con.query(cardsinteam,[user_id],async function(err,data){
                    if (data.length==0){await interaction.reply('You haven\'t equipped any card. Use /teamset to equip a card' )}    
                    else {teamembeds[0] = new discord.MessageEmbed();
                    teamembeds[0].setAuthor({name:`${interaction.user.tag}`,iconURL: `${interaction.user.avatarURL()}`})
                    teamembeds[0].setTitle('TEAM')
                    teamembeds[0].setDescription('Following characters are in your team')
                    teamembeds[0].setColor('BLUE');
                    for (let i = 0; i<=4; i++){
                        for (let hawa = 0;hawa<=data.length-1;hawa++){
                            if ( i+1 == data[hawa].team_status){
                                let card = card_name(data[hawa].card_unique_id)
                        teamembeds[0].fields[i]=
                            {name:`${i+1} | ${card.character} | ${card.element}`,value:`${stars[data[hawa].card_rarity]} | ${data[hawa].card_lvl} | ${data[hawa].card_id}`}    
                    let jk 
                    jk = new discord.MessageEmbed();
                    jk.setAuthor({name:`${interaction.user.tag}`,iconURL: `${interaction.user.avatarURL()}`});
                    jk.setTitle(`**${card.character}** (${data[hawa].card_id})\nSERIES:${card.series} `);
                    jk.setColor('BLUE');
                    jk.addFields({name:'Card Details',value:`EVOLUTION: ${stars[data[hawa].card_rarity]} \nLIMITBREAK: ${data[hawa].limitbreak}  \nLEVEL: ${data[hawa].card_lvl}  \nELEMENT: ${card.element}  \nSKIN:  \nFAMILARITY:  `},
                    {name: 'CARD STATS', value: `HP: ${card.hp}  \nATTACK: ${card.attack}  \nDEFENSE: ${card.defense}  \nAGILITY: ${card.agility}  `},
                    {name: `SKILL`, value : 'SOME SKILL'})
                    jk.setTimestamp()
                    jk.setFooter({text:'WILL THINK OF SOMETHING'})   
                    teamembeds.push(jk) 
                }}}await interaction.reply({embeds:[teamembeds[0]], components:[navigate]})
                let pageno = 0

                let idofteamview
    interaction.fetchReply()
        .then (reply=> idofteamview = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofteamview===i.message.id 
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 120000 });
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
           
        }})
     }
     })
}}
export{ping}