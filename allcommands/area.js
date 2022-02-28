import SlashCommandBuilder from '@discordjs/builders';
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


let seriesname
const ping = {
	data: new SlashCommandBuilder.SlashCommandBuilder()
		.setName('area')
        .setDescription('Travel to an area')
        .addStringOption(option => option.setName('area_id').setDescription('Input ID of area').setRequired(true)),
        async execute(interaction){
            let user_id = interaction.user.id
            let area_id = interaction.options.getString('area_id')
            let sql = await dbQuery(`SELECT * FROM users WHERE USER_ID = '${user_id}'`)
            if (sql.length==0) {await interaction.reply('Not Registered. Register using /start')}
            else{
              if (area_id < 1 || area_id >26){await interaction.reply('Incorrect input')}
              else{
                let currentloc = await dbQuery(`Select * from userdata where user_id = ${user_id}`)
                
                let areaconfirm = await dbQuery(`Select * from stages where location = ${currentloc[0].location} and area = ${area_id}`)
            if (areaconfirm.length == 0){await interaction.reply('This area does not exist within this location')}
        else {
            if (currentloc[0].max_stage>=areaconfirm[0].leveluniqueid-1){
            await dbQuery(`update userdata set area = ${area_id} where user_id = ${user_id}`)
            for (let x = 0;x<=enemylist.length-1;x++){
                if (enemylist[x].uniqueID == areaconfirm[0].enemy_unique_id)
                {seriesname = enemylist[x].series }}
        await interaction.reply(`You have successfully travelled to ${seriesname} area.`)}
            else {await interaction.reply('You haven\'t cleared the previous area yet. Clear previous area to move into this one')}
                    

        }}}
    }}
export{ping}