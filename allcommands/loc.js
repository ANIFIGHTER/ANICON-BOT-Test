import discord from 'discord.js';
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

const dbQuery = (query) => new Promise((resolve, reject) => {
    con.query(query, (error, data) => {
      if(error) reject(error);
      else resolve(data);
    })
  });

let listofloc = ['Forest','Mountains','City','Firelands','Wandering Sea','Skytopia']
  
const ping = {
	data: new SlashCommandBuilder.SlashCommandBuilder()
		.setName('location')
        .setDescription('Travel to a location'),      
        async execute(interaction){
            let user_id = interaction.user.id;
            let sql = await dbQuery(`SELECT * FROM users WHERE USER_ID = '${user_id}'`)
            if (sql.length===0) {await interaction.reply('Not Registered. Register using /start')}
        else{
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
                await interaction.reply({content:'***__LOCATIONS__***',components: [loclist]})
                let idofloc
                interaction.fetchReply()
                    .then (reply=> idofloc = reply.id)
                const filter = i => i.user.id === interaction.user.id && idofloc===i.message.id
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 180000 });
                collector.on('collect', async i => {
                    let usermax = await dbQuery(`Select * from userdata where user_id = ${user_id}`)
                    let stagedata = {location:0}
                    if (usermax.max_stage>0){
                    stagedata = await dbQuery(`Select * from stages where leveluniqueid = ${usermax.max_stage}`)}
                    if (i.values[0]==1){
                        await dbQuery(`update userdata set location = ${i.values[0]} where user_id = ${user_id}`)
                        await i.update({content: `You have travelled to ${listofloc[i.values[0]-1]} location.`,components: []})}
                    else if (i.values[0]>stagedata.location){
                            await i.update({content:'You haven\'t unlocked that location. Please clear all the area in previous location.',components: []})}
                    else if (i.values[0] <= stagedata.location) { 
                        await dbQuery(`update userdata set location = ${i.values[0]} where user_id = ${user_id}`)
                        await i.update({content: `You have travelled to ${listofloc[i.values[0]-1]} location.`,components: []})}      
                         
                })     
            }}}
export{ping}       