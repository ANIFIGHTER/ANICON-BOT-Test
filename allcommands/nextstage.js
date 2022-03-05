import {SlashCommandBuilder} from '@discordjs/builders';
import { All_Cards as cards,randomcard} from '/ASHWIN/JavaScript/disc_cards.js';
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

const ping = {data: new SlashCommandBuilder()
    .setName('next_stage')
    .setDescription('Move to Next Stage!'),
async execute(interaction) {
    let id = interaction.user.id;
    var sql = `SELECT * FROM users WHERE USER_ID = '${id}'`;
    const sqlexe = await dbQuery(sql)
    if  (sqlexe.length == 0){await interaction.reply('YOU ARE NOT REGISTERED')}
    else{
        let datauserquery = `Select * from userdata where user_id = ${id}`
        const datauser = await dbQuery(datauserquery)
        let currentlocid = datauser[0].location
        let currentareaid = datauser[0].area
        let currentstageid = datauser[0].stage
        let usermaxstage = datauser[0].max_stage
      if (currentlocid==0||currentareaid==0||currentstageid==0){
        await interaction.reply('You haven\'t entered any stage. Use /map to know your current position.')}
       else{ 
      let checkquery = `Select * from stages where location = ${currentlocid} and area = ${currentareaid} and stage = ${currentstageid}`
      const stagedata = await dbQuery(checkquery)
      if (stagedata[0].leveluniqueid <= usermaxstage){
        let abc = `Select * from stages where location = ${currentlocid} and area = ${currentareaid} and stage = ${currentstageid+1}`
        let abcexe = await dbQuery(abc)
        if(abcexe.length===0){
          await interaction.reply('You have cleared all the stages within this area')}
      else{let stgup = `update userdata set stage = ${currentstageid+1}, leveluniqueid = ${datauser[0].leveluniqueid+1} where user_id = ${id}`
    await dbQuery(stgup)
  await interaction.reply('Here comes the stage embed. Command was successful')}
  }}}
}}

export {ping}