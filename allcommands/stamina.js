import {SlashCommandBuilder} from '@discordjs/builders';
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
const ping = {
	data: new SlashCommandBuilder()
		.setName('stamina')
		.setDescription('view the stamina'),
        async execute(interaction) {
            let user_id = interaction.user.id
            let sql = `SELECT * FROM users WHERE USER_ID = '${user_id}'`;
        con.query(sql, async function vroom (err,data) {
            if (data.length === 0){
                await interaction.editReply('Not registered')}
                else{
            let staminadata = `SELECT * from userstamina where user_id = ${user_id}`
                const data = await dbQuery(staminadata)
                    let jk =Date.now()-Date.parse(String(data[0].lastupstam))
                    let newstam = Math.floor(jk/240000)+data[0].stamina
                    if (newstam>=data[0].stamlimit){newstam = data[0].stamlimit-1}
                let staminaincrease = `UPDATE userstamina set stamina = ${newstam}, lastupstam = now() where user_id = ${user_id}`
                await dbQuery(staminaincrease)
            await interaction.reply(`You currently have ${newstam}/${data[0].stamlimit-1} stamina.`)
        }})
    }}
export{ping}