import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
import { All_Cards as cards, enemy as enemylist,enemyhp} from '/ASHWIN/JavaScript/disc_cards.js';
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
  let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
let enemytype
const ping = {
	data: new SlashCommandBuilder()
		.setName('stage')
        .setDescription('Travel to an stage')
        .addStringOption(option => option.setName('stage_id').setDescription('Input ID of stage').setRequired(true)),
        async execute(interaction){
            let user_id = interaction.user.id
            let stage_id = interaction.options.getString('stage_id')
            let sql = await dbQuery( `SELECT * FROM users WHERE USER_ID = '${user_id}'`);
            if (sql.length===0) {await interaction.reply('Not Registered. Register using /start')}
            else if (0>stage_id){
                await interaction.reply('This stage does not exist')}
            else if (stage_id>26){
                await interaction.reply('This stage does not exist')}
            else{

                let stagembed = new discord.MessageEmbed()
                stagembed.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
                stagembed.setColor('GREEN')
                stagembed.setTimestamp()
                stagembed.setFooter({text:'Support the bot, contact [    ]#3780'})

            let datauser = await dbQuery(`Select * from userdata where user_id = ${user_id}`)
            let currentlocid = datauser[0].location
            let currentareaid = datauser[0].area
            let usermaxstage = datauser[0].max_stage
        
        if (currentlocid ==0){await interaction.reply('You have to travel to a location first. Use /map to know your current position and use /location to travel to a location.')}
        else if (currentareaid==0){await interaction.reply(`You are not in an area. Use /map to know your current position and use /area to travel to an area.' `)}
        else if (currentlocid==1 &&currentareaid == 1 && stage_id==1){
            stagembed.setTitle(`Stage  1-1-1`)
            stagembed.addFields({name:'STAGE DEFENDER',
            value: `**TEMPLE DEMON** <:dark:910723272495222794>\nRARITY: ${stars[2]}\nLEVEL: 2\n
            **__STATS__:**\nHP: 204\nATTACK: 93\nDEFENSE: 123\nAGILITY: 115`})
            stagembed.setImage('https://cdn.discordapp.com/attachments/897181776982720563/910719423197900800/Temple_Demon.jpg')
            
            await dbQuery(`update userdata set stage = 1,leveluniqueid = 1 where user_id = ${user_id}`)
            await interaction.reply({embeds:[stagembed]})}
            else {    
        let uniqueidfetch = await dbQuery(`Select * from stages where location = ${currentlocid} and area = ${currentareaid} and stage = ${stage_id}`)
    if(uniqueidfetch.length==0){await interaction.reply(`This stage does not exist.`)}
    else if (uniqueidfetch[0].leveluniqueid>usermaxstage){
        await interaction.reply('You have to clear previous stage')}
    else if (uniqueidfetch[0].leveluniqueid<=usermaxstage){
        await dbQuery(`update userdata set stage = ${stage_id}, leveluniqueid=${uniqueidfetch[0].leveluniqueid} where user_id=${user_id}`)
        let enemy = []
        for(let x = 0; x <= uniqueidfetch.length-1;x++){
            for (let k = 0; k<=enemylist.length-1;k++){
            if (uniqueidfetch[x].enemy_unique_id == enemylist[k].uniqueID ){
                enemy.push({...enemylist[k]})
            }}}
            for (let b = 0; b<=enemy.length-1;b++){
                for (let v = 0;v<=enemies.length-1;v++){
                    if(enemy[b].uniqueID==enemies[v].enemy_unique_id){
                enemy[b].hp = Math.floor(2*enemy[b].hp + enemies[v].enemy_lvl*0.02*enemy[b].hp)
                enemy[b].attack = Math.floor(1.2*enemy[b].attack + enemies[v].enemy_lvl*0.02*enemy[b].attack)
                enemy[b].defense = Math.floor(1.2*enemy[b].defense + enemies[v].enemy_lvl*0.02*enemy[b].defense)
                enemy[b].agility = Math.floor(1.5*enemy[b].agility + enemies[v].enemy_lvl*0.02*enemy[b].agility)
                    }}}
    if (uniqueidfetch[0].leveluniqueid%5!=0){enemytype = '**__STAGE DEFENDER__**'} 
        
        await interaction.reply(`Here is the stage embed`)
    }}}
}}
export{ping}