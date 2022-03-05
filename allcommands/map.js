import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import {enemy} from '/ASHWIN/JavaScript/disc_cards.js'
import mysql from 'mysql2';
import dotenv from 'dotenv';
// import { enemy } from '../disc_cards';
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
let locname = ['Necropsis','Forest','Mountains','City','Firelands','Wandering Sea','Skytopia']

function areaname(a,enemy){
  if(a==0){return 0}else{
  for (let g = 0;g<enemy.length;g++){
    if (enemy[g].uniqueID==a){return enemy[g].series}
  }}
}
function noname(a){if (a==undefined){return 0}else{return a}}

const ping = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Replies with your current location'),
		async execute(interaction) {
let user_id = interaction.user.id;
            let sql = await dbQuery(`SELECT * FROM users WHERE USER_ID = '${user_id}'`)
            if (sql.length===0) {await interaction.reply('Not Registered. Register using /start')}
        else{
          let userstagedata = await dbQuery(`Select * from userdata where user_id = ${user_id}`)
          let nextstagedata = await dbQuery(`Select * from stages where leveluniqueid = ${userstagedata[0].leveluniqueid+1}`)
          let enemydata = await dbQuery(`Select * from stages where leveluniqueid = ${userstagedata[0].leveluniqueid}`)
          let max = await dbQuery(`Select * from stages where leveluniqueid = ${userstagedata[0].max_stage}`)
      
          if (nextstagedata.length==0){nextstagedata=max}
          if (enemydata.length==0){enemydata=[{enemy_unique_id:0}]}
          if(max.length == 0){max=[{location:0,enemy_unique_id:0,area:0}]}
          
          let cur = new discord.MessageEmbed()
            cur.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
            cur.setTitle(`**__MAP__**`)
            cur.setColor('GREEN')
            cur.setDescription(`**Current coordinates:**\nLocation: ${locname[noname(userstagedata[0].location)]}
            Area: ${areaname(enemydata[0].enemy_unique_id,enemy)}\nStage: ${noname(userstagedata[0].stage)}\n
            **Next Stage: **\nLocation: ${locname[nextstagedata[0].location]}\nArea: ${areaname(nextstagedata[0].enemy_unique_id,enemy)} (ID:${nextstagedata[0].area})
            Stage: ${noname(nextstagedata[0].stage)}\n
            **Max Level:**\nLocation: ${locname[max[0].location]}\nArea: ${areaname(max[0].enemy_unique_id,enemy)} (ID:${max[0].area})
            Stage: ${noname(max[0].stage)}`)
            cur.setTimestamp()
            cur.setFooter({text:'Support the bot, contact [    ]#3780'})
          
            let loclist = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageSelectMenu()
                .setCustomId('loclist')
                .setPlaceholder('Select the Location')
                .addOptions([
                    {label : 'Forest',
                    value: '1'},
                    {label:'Mountains',
                    value: '2'},
                    {label:'City',
                    value:'3'},
                    {label:'Firelands',
                    value :'4'},
                    {label:'Wandering Sea',
                    value:'5'},
                    {label:'Skytopia',
                    value:'6'}
                ]))
                let no_ofacstages = new Set()
                let no_ofstages
                
                await interaction.reply({embeds:[cur],components: [loclist]})
                let idofmap
                interaction.fetchReply()
                    .then (reply=> idofmap = reply.id)
                const filter = i => i.user.id === interaction.user.id && idofmap===i.message.id
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 180000 });
                collector.on('collect', async i => {
                  if (['1','2','3','4','5','6'].includes(i.values[0])){
                let areadata = await dbQuery(`Select * from stages where location = ${i.values[0]}`)
                let areaobject = new Object()
                for (let x = 0;x<areadata.length;x++){
                areaobject[`${areadata[x].area}`]=areadata[x].enemy_unique_id}

                for (let y = 0;y<=Object.getOwnPropertyNames(areaobject)-1;y++){
                no_ofstages = await dbQuery(`Select * from stages where location= ${i.values[0]} and area = ${Object.getOwnPropertyNames(areaobject)[y]}`)
                no_ofstages.forEach(element => {no_ofacstages.add(element.leveluniqueid)});
                console.log(no_ofacstages)
                cur.addFields({name:`${areaname(no_ofstages[0].enemy_unique_id,enemy)}(ID:${no_ofstages[0].area})`,value:`No. of Stages: ${no_ofacstages.size}`})}
                await i.update({embeds:[cur],components: [loclist]})}
                    
                })
            }
    }}
export{ping}