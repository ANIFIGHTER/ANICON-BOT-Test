import discord from 'discord.js';
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
      resolve(data);
    })
  });
const ping = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Register Yourself!'),
    async execute(interaction) {
        let id = interaction.user.id;
        var sql = `INSERT INTO users (USER_ID) VALUES ('${id}')`;
        con.query(sql, async function vroom (err) {
            if (err) {
                await interaction.reply('Already Registered');            
            }else if (!err){
                const randomcarrd = randomcard(cards);
                let cardgenerate = `INSERT INTO gamedata (card_unique_id, card_rarity, card_lvl, card_owner) VALUES('${randomcarrd.uniqueID}', '4','20', '${randomcarrd.element}' , ${id})`;
                await dbQuery(cardgenerate)
                let stage = `INSERT INTO userdata (user_id,location,area,stage,leveluniqueid,max_stage) VALUES(${id},0,0,0,0,0)`;
                await dbQuery(stage)
                let stamina = `INSERT INTO userstamina (user_id,user_lvl,user_xp,user_xp_limit,stamina,lastupstam,stamlimit) Values(${id},1,0,100,60,now(),61)`;
                await dbQuery(stamina)   
                let itementry = `INSERT INTO useritems (user_id,gold) VALUES(${id},5000)`
                await dbQuery(itementry)
                await interaction.reply(`Cadet <@${id}>, welcome to the Lost Angeles City! Check out your inventory for your new soul crystal using /inv`);
        }})    
    }
}
export{ping}