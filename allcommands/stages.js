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

const ping = {
	data: new SlashCommandBuilder.SlashCommandBuilder()
		.setName('stage')
        .setDescription('Travel to an stage')
        .addStringOption(option => option.setName('stage_id').setDescription('Input ID of stage').setRequired(true)),
        async execute(interaction){
            let user_id = interaction.user.id
            let stage_id = interaction.options.getString('stage_id')
            let sql = `SELECT * FROM users WHERE USER_ID = '${user_id}'`;
            con.query(sql, async function vroom (err,data) {
                if (data.length===0) {await interaction.reply('Not Registered. Register using /start')}
            else{if (0>stage_id){
                console.log('dont')
                await interaction.reply('This stage does not exist')}
            else if (stage_id>26){
                await interaction.reply('This stage does not exist')}
            else{
                let datauser = `Select * from userdata where user_id = ${user_id}`
            con.query(datauser, async function(err,data){if(err){throw err;}
            else{let currentlocid = data[0].location
            let currentareaid = data[0].area
            let usermaxstage = data[0].max_stage
        if (currentlocid==1 &&currentareaid == 1 && stage_id==1){
            let stageupdate = `update userdata set stage = 1 where user_id = ${user_id}`
            con.query(stageupdate,async function(err,data){if (err){throw err;}})
        let uniqueidfetch = `Select * from stages where location = 1 and area = 1 and stage = 1`
    con.query(uniqueidfetch,async function(err,data){if(err){throw err;}
else{let uniqueidupdate = `Update userdata set leveluniqueid = ${data[0].leveluniqueid} where user_id = ${user_id}`
con.query(uniqueidupdate,async function(err,data){if(err){throw err;}
else{await interaction.reply('Here there will be the embed which shows stage details')}})}})
        }else if (stage_id!=1){
            console.log('it came here')
            let stageconfirm = `Select * from stages where location = ${currentlocid} and area = ${currentareaid} and stage = ${stage_id}`
            con.query(stageconfirm, async function(err, data){if (data.length===0){
                await interaction.reply('This stage does not exist')}
            else if(data.length!=0){
                if (data[0].leveluniqueid-1<=usermaxstage){
                    let stageupdate = `update userdata set stage = ${stage_id} where user_id = ${user_id}`
            con.query(stageupdate,async function(err,data){if (err){throw err;}})
                    let uniqueidupdate = `Update userdata set leveluniqueid = ${data[0].leveluniqueid} where user_id = ${user_id}`
                    con.query(uniqueidupdate,async function(err,data){if(err){throw err;}else{    
                    await interaction.reply('Here there will be the embed which shows stage details')}})}
                else{await interaction.reply('You haven\'t reached that stage yet. Please clear previous stage')}
            }}) 
        }}})}

            }})}}
export{ping}