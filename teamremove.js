import SlashCommandBuilder from '@discordjs/builders';
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

const ping = {
	data: new SlashCommandBuilder.SlashCommandBuilder()
		.setName('teamremove')
		.setDescription('Removes the card from team')
        .addStringOption(option => option.setName('card_id').setDescription('Input ID of the card you want to remove').setRequired(true)),
        async execute(interaction){
            console.log(interaction)
            let card_id = interaction.options.getString('card_id')
            let user_id = interaction.user.id;
            let sql = `SELECT * FROM users WHERE USER_ID = '${user_id}'`;
            con.query(sql, async function vroom (err,data) {
                if (data.length==0) {await interaction.reply('You are not registered. Register using \'/start\'')}
                else{
                    let cardtoremove = `SELECT * FROM gamedata WHERE card_id = ${card_id}`;
                    con.query(cardtoremove, async function(err,data){
                        if ( data === undefined|| data.length === 0 ){await interaction.reply('You don\'t own that card')}
                        else if (data[0].card_owner != user_id){await interaction.reply('You don\'t own that card')}
                        else{
                            if (String(data[0].team_status) == 'null'){await interaction.reply('This card is not in the team. Please selct a card which is already in the team')}
                            else{
                                let cardremove = `update gamedata set team_status = NULL where card_id = ${card_id}`;
                                con.query(cardremove, async function(err){if(!err){await interaction.reply('Successfully removed the card from team')}
                            else{await interaction.reply('There was some problem. Report to owner')}}) 
                            }
                        }
                    })
            }})

        }}
export{ping}