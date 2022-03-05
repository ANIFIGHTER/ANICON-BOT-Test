import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import { All_Cards as cards, enemy as enemylist} from '/ASHWIN/JavaScript/disc_cards.js';
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

let ser = []
let bla = new Set()
for (let y = 0; y<=cards.length-1;y++){bla.add(cards[y].series)}
ser = Array.from(bla)
let seriesname= ser.sort()
// console.log(seriesname)
let no_of_pages
const ping = {data : new SlashCommandBuilder()
    .setName('cards')
    .setDescription('View all the cards'),
    async execute(interaction){
        let user_id = interaction.user.id
        
        if (seriesname.length%10==0){no_of_pages=seriesname.length/10}
        else if (seriesname.length%10!=0){no_of_pages=Math.floor(seriesname.length/10)+1}
        let j = 0
        let menu = []
        for (let x = 0; x<=no_of_pages-1;x++){
            menu[x] = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                .setCustomId(`page${x+1}`)
                .setPlaceholder('Select Series Name')
            )
            for (;j < 10*(x+1); j++) {
                if (j == seriesname.length){break;}
                else{
            menu[x].components[0].addOptions([
                {
                    label: `${seriesname[j]}`,
                    value: `series${j+1}`
                }
            ])
        }}}
        const navigate = new discord.MessageActionRow()
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
        if (menu.length>1){    
        await interaction.reply({content:'test',components:[menu[0],navigate]})
    }else if(menu.length==1){
        navigate.components[2].setDisabled(true)
        await interaction.reply({content : 'Select the Series to know it\'s character that are in the game',
    components:[menu[0],navigate]})}

let idofdex
    interaction.fetchReply()
        .then (reply=> idofdex = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofdex===i.message.id
    const menucollector = interaction.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 180000 });
    const buttoncollector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 180000 })
    menucollector.on('collect', async i => {
        for (let a = 0; a <= menu.length-1;a++){
        for (let z = 0; z<=seriesname.length-1 ;z++){  
        if (i.values[0] == menu[a].components[a].options[z].value){
            let characters = new discord.MessageEmbed()
            characters.setTitle(menu[a].components[a].options[z].label)
            characters.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
            characters.setColor('GREEN')
            characters.setTimestamp()
            characters.setDescription('Following characters of this series are available')
            characters.setFooter({text:'Support the bot, contact [    ]#3780'})
            for (let c = 0;c<=cards.length-1;c++){
                if (menu[a].components[a].options[z].label == cards[c].series){
            characters.addFields({name:`***${cards[c].character}*** ${cards[c].element}`,value:`HP: ${cards[c].hp} ATK: ${cards[c].attack} DEF: ${cards[c].defense} AGILITY: ${cards[c].agility}`})}}
            await i.update({embeds:[characters]})
        }}}
    })
    buttoncollector.on('collect', async i=>{
        if (i.customId=== 'deleting'){
            buttoncollector.stop()
            menucollector.stop()
            await i.update({content:'Deleted',embeds:[],components:[]})
        }
    })

}}
export{ping}