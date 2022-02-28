import discord from 'discord.js';
import SlashCommandBuilder from '@discordjs/builders';
import { All_Cards as cards, randomcard} from '/ASHWIN/JavaScript/disc_cards.js';
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

  const ping = {data : new SlashCommandBuilder.SlashCommandBuilder()
    .setName('items')
    .setDescription('View items'),
    async execute(interaction){
        let user_id = interaction.user.id
        let sql = await dbQuery(`SELECT * FROM users WHERE USER_ID = '${user_id}'`)
        if (sql.length===0){
            await interaction.reply('Not registered')
        }else{
            const items = await dbQuery(`Select * from useritems where user_id = ${user_id}`)
            let itemmenu = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageSelectMenu()
                    .setCustomId('itemmenu')
                    .setPlaceholder('Select the Category')
                    .addOptions([{
                        label : 'All Items',
                        value: 'all_items'
                    },{label:'Evolution', value:'evolution'},
                    {label:'Souls',value:'souls'}])
                )
            let allembed = new discord.MessageEmbed()
            allembed.setAuthor(interaction.user.tag,interaction.user.avatarURL())
            allembed.setColor('RED')
            allembed.setTimestamp()
            allembed.setTitle('***__ALL ITEMS__***')
            allembed.setDescription(`Items owned by you`)
            allembed.addFields({name:'***__Currency__***',value:`**Tricons**: ${items[0].gold}\n**Lost Coins**: ${items[0].localgold}`})
            allembed.addFields({name: `***__Souls__***`,value:`**Fire Souls** : ${items[0].fire}
            **Water Souls** : ${items[0].water}\n**Wind Souls**: ${items[0].wind}
            **Nature Souls**: ${items[0].nature}\n**Ground Souls**: ${items[0].ground}
            **Zap Souls**: ${items[0].zap}\n**Neutral Souls**: ${items[0].neutral}
            **Light Souls**: ${items[0].light}\n**Dark Souls**: ${items[0].dark}`})
            allembed.addFields({name:'***__Evolution__***',value:`**Limit Breaker(S)**: ${items[0].limit_break_small}
            **Limit Breaker(M)**: ${items[0].limit_break_medium}\n**Limit Breaker(L)**: ${items[0].limit_break_big}`})
        
        await interaction.reply({content:'***__ITEM INVENTORY__***',components:[itemmenu]})    

            let idofitems
            interaction.fetchReply()
                .then (reply=> idofitems = reply.id)
            const filter = i => i.user.id === interaction.user.id && idofitems===i.message.id 
            
            const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 180000 });
            collector.on('collect', async i => {
                if (i.values[0] == 'all_items'){
                    await i.update({embeds :[allembed], components:[itemmenu]})}
                else if (i.values[0] == 'evolution' ){
                    let evo = new discord.MessageEmbed(allembed)
                    evo.spliceFields(0,2)
                await i.update({embeds :[evo], components:[itemmenu]})}
                else if (i.values[0] == 'souls' ){
                    let sol = new discord.MessageEmbed(allembed)
                    sol.spliceFields(0,1)
                    sol.spliceFields(1,1)
                    await i.update({embeds :[sol], components:[itemmenu]})}
            })    
        }
    }}
export{ping}