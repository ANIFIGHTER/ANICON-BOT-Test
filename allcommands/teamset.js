import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { All_Cards as cards} from '/ASHWIN/JavaScript/disc_cards.js';
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

function card_name(a) {
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].character}}}
const ping = {
	data: new SlashCommandBuilder()
		.setName('teamset')
		.setDescription('Puts the card in team')
        .addStringOption(option => option.setName('card_no').setDescription('Input card serial no.').setRequired(true))
        .addStringOption(option => option.setName('position').setDescription('Input position').setRequired(true)),
    async execute(interaction){
        let card_id = interaction.options.getString('card_no')
        let card_position = interaction.options.getString('position')
        if (parseInt(card_position)<0 || 4 < parseInt(card_position) ){
            interaction.reply('Not entered valid position. Plase enter between 1 and 4')}
            else{
        let user_id = interaction.user.id;
        let card
        let abc =[]
        let sql = `SELECT * FROM users WHERE USER_ID = '${user_id}'`;
        let sqlexe = await dbQuery(sql)
            if (sqlexe.length==0) {
                interaction.reply('You are not registered. Please register using /start.')}
                else{
                let userdataquery = `SELECT * from gamedata where card_owner = ${user_id}`
                    let userdata = await dbQuery(userdataquery)
                    for (let x = 0;x<=userdata.length-1;x++){if (x == (card_id-1)){card = userdata[x]}}
                if (card!=undefined){
                let cardsselection = `SELECT * FROM gamedata WHERE card_id = ${card.card_id} and card_owner = ${user_id}`;
                let data = await dbQuery(cardsselection)
                    if (data === undefined) {
                        await interaction.editReply('You Don\'t Own That Card')}
                    else {
                        let team = await dbQuery(`SELECT * from gamedata where card_owner = ${user_id} and team_status is NOT NULL`)
                        if (team.length>0){
                        for (let i = 0; i <team.length; i++ )
                        {if(team[i].team_status===card_position)
                        {abc.push(team[i])}}}
                        if(team.length==0||abc.length==0) {let cardset = `UPDATE gamedata SET team_status = '${card_position}' WHERE card_id = '${card.card_id}'`;
                        con.query(cardset,async function(err){
                            if(!err){
                                await interaction.reply(`Successfully set ${card_name(card.card_unique_id)} at position ${card_position}` )
                            }if (err) 
                            {await interaction.reply('There was some problem. Please report to bot owner')} 
                        })}
                        else {
                            let confirmation = new discord.MessageActionRow()
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
                        await interaction.reply({content:`${card_name(abc[0].card_unique_id)} is already present at position ${card_position}.
                        Do you want it to replace it by ${card_name(card.card_unique_id)} ?`,components:[confirmation]})}}
            let idofrefine
            interaction.fetchReply()
                .then (reply=> idofrefine = reply.id)
                const filter = i => i.user.id === interaction.user.id && idofrefine===i.message.id 
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 30000 });
                collector.on('collect', async i => {
                     if (i.customId=='ok'){
                        await dbQuery(`UPDATE gamedata SET team_status = ${card_position} WHERE card_id = ${card.card_id}`)
                        await dbQuery(`UPDATE gamedata SET team_status = NULL WHERE card_id = ${abc[0].card_id}`)
                        i.update({content :'Successfully updated the team.',components:[]})
                    }else if (i.customId == 'notok'){
                        i.update({content :'Cancelled',components:[]})
                    }
                    })
                    
                    }
            }}
        }}

export{ping}