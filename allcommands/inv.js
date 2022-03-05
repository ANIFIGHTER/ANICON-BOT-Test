import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
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
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].character}}}
function card_element(a) {
        for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].element}}}

let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
const ping = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('View your Cards'),
    async execute(interaction){
        let id = interaction.user.id;
        let sql = `SELECT * FROM users WHERE USER_ID = '${id}'`;
        con.query(sql, async function vroom (err,data) {
            if (data.length>0) {
                let cardsininv = `SELECT * FROM gamedata WHERE card_owner = '${id}'`;
                con.query(cardsininv, async function (err,data) {
                if (err)  throw err;
                const row = new discord.MessageActionRow()
                    .addComponents( 
                    new discord.MessageButton()
                    .setCustomId('back')
                    .setLabel('Previous Page')
                    .setStyle('PRIMARY')
                    .setDisabled(true)
                )
                    .addComponents(
                    new discord.MessageButton()
                    .setCustomId('deleting')
                    .setLabel('Delete')
                    .setStyle('PRIMARY')
                )
                    .addComponents(
                    new discord.MessageButton()
                    .setCustomId('next')
                    .setLabel('Next Page')
                    .setStyle('PRIMARY')
                );
                let  noofpages;
                let totalinvembeds = [];
                totalinvembeds.push('invembed')
                if (data.length%10 === 0){noofpages = data.length/10
                let j = 0;
                for (let i = 1; i <= noofpages; i++){
                    totalinvembeds[i] = new discord.MessageEmbed();
                    totalinvembeds[i].setAuthor({name:`${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}`});
                    totalinvembeds[i].setTitle('**INVENTORY**');
                    totalinvembeds[i].setColor('AQUA');
                    totalinvembeds[i].setDescription('')
                    totalinvembeds[i].setThumbnail('https://artfiles.alphacoders.com/114/114357.jpg')
                    totalinvembeds[i].setTimestamp()
                    totalinvembeds[i].setFooter(`${i} of ${noofpages}`)
                    for (;j < 10*i; j++) {
                        totalinvembeds[i].addField(`${j+1} | **${card_name(data[j].card_unique_id)}** | ${stars[data[j].card_rarity]} | ${card_element(data[j].card_unique_id)}`, `LEVEL: ${data[j].card_lvl} |ID: ${data[j].card_id} | LIMIT BREAK: ${data[j].limitbreak}`);   
                }}
                }else if (data.length%10 !== 0){noofpages = Math.floor(data.length/10)+1
                    let j = 0;
                    for (let i = 1; i <= noofpages; i++){
                        totalinvembeds[i] = new discord.MessageEmbed();
                        totalinvembeds[i].setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`});
                        totalinvembeds[i].setThumbnail('https://artfiles.alphacoders.com/114/114357.jpg')
                        totalinvembeds[i].setTitle('**INVENTORY**');
                        totalinvembeds[i].setColor('AQUA');
                        totalinvembeds[i].setDescription('')
                        totalinvembeds[i].setTimestamp()
                        totalinvembeds[i].setFooter(`${i} of ${noofpages}`)
                        for (; j < 10*i; j++) {
                            if (j === data.length){break;}
                            else {totalinvembeds[i].addField(`${j+1} | **${card_name(data[j].card_unique_id)}** | ${stars[data[j].card_rarity]} | ${card_element(data[j].card_unique_id)}`,  `LEVEL: ${data[j].card_lvl} | ID: ${data[j].card_id} | LIMIT BREAK: ${data[j].limitbreak}`);}
                    }}
                }let pageno = 1;
                if (totalinvembeds.length===2){
                    row.components[2].setDisabled(true)
                await interaction.reply({embeds : [totalinvembeds[pageno]] , components :[row]})}
                else{
                    await interaction.reply({embeds : [totalinvembeds[pageno]] , components :[row]})
                }
                let idofinv
                interaction.fetchReply()
                    .then (reply=> idofinv = reply.id)
                const filter = i => i.user.id === interaction.user.id && idofinv === i.message.id;
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 90000 });
                collector.on('collect', async i => {
                    if(i.customId === 'next'){
                        pageno = pageno + 1;
                        if (pageno === totalinvembeds.length-1){
                            row.components[0].setDisabled(false)
                            row.components[2].setDisabled(true)
                            await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})
                        }else{
                            row.components[2].setDisabled(false)
                            row.components[0].setDisabled(false)
                        await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})}
                    }else if (i.customId === 'back'){
                        pageno = pageno - 1;
                        if (pageno === 1){row.components[0].setDisabled(true)
                            row.components[2].setDisabled(false)
                            await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})
                        }else{row.components[0].setDisabled(false)
                            row.components[2].setDisabled(false)
                            await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})}
                    }else if (i.customId === 'deleting'){
                        i.update({content : 'Deleted!!', components : [], embeds:[]})
                    }
                    })    
                })
            }else if (data.length=== 0){await interaction.reply('Register yourself first using the command /start !!!')}
        })          
}}

export {ping}