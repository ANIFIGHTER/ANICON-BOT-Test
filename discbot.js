import discord from 'discord.js';
import dotenv from 'dotenv';
import { All_Cards as cards, rarrity as randomrarity,randomcard } from './disc_cards.js';
import fs from 'fs';
import mysql from 'mysql2';
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

//CREATED CLIENT
const client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    discord.Intents.FLAGS.DIRECT_MESSAGES,
discord.Intents.FLAGS.GUILD_PRESENCES ],
restRequestTimeout:50000    
})

// TOKEN - BOT PASSWORD
const startpassword = process.env.TOKEN;
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
const a = '$'

client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./allcommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	let command = await import (`./allcommands/${file}`);
    // console.log(command)
	client.commands.set(command.ping.data.name, command);
}
// console.log(client.commands)

//BOT ON READY EVENT
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    // console.log(command)
    if (!command) return;

	try{
         await command.ping.execute(interaction)
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
    
});



// client.on('interactionCreate', async (interaction) => {
//     if (interaction.isButton()){
//         interaction.user
//     }
//  
//     if (!command) return;

// 	try{
//          await command.ping.execute(interaction)
// 	} catch (error) {
// 		console.error(error);
// 		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
    
// });

// client.on('messageCreate', async (message) => {
//     let inst = new discord.MessageEmbed();
//     inst.setAuthor(message.author.tag, message.author.avatarURL());
//     inst.setColor('BLUE');
//     inst.setTitle('**INSTRUCTIONS**')
//     inst.setDescription('This is an embed');
    
//     if (message.content === `${a}jankenpun`) {        
//         await message.channel.send({embeds:[inst]});
//     }
// });

// client.on('messageCreate', async(message) =>{
//     if (message.content.startsWith(`${a}info`)) {
//         let id = message.author.id;
//         let alluserid = [];
//         var sql = `SELECT * FROM users`;
//         con.query(sql, function (err, result) {
//         if (result) { 
//             for (let g = 0; g < result.length; g++){
//                 alluserid.push(result[g].USER_ID)
//                 if (alluserid.includes(id) === true) {
//                     let cardsininv = `SELECT * FROM gamedata WHERE card_id = '${id}'`;
//                     con.query(cardsininv, function (err,result) {
//                     if (err)  throw err;
//                         let data = result;
//                         // console.log(lastindex)
//                         let playercardids = [];
//                         function playercardd(cardid,cardname,cardrarity) {
//                             this.cardid = cardid;
//                             this.carddname = cardname;
//                             this.cardrarity 
//                         }
//                         let actualcard = [];
//                         for (let i = 0; i < data.length; i++) {
//                             let thecarddetail = new playercardd(`${data[i].card_id}`, `${data[i].card_name}`)
//                             playercardlist.push( data[i].card_name);}
//                             for (let j = 0; j < cards.length; j++) {
//                                 for (let k = 0; k < playercardnamelist.length; k++){
//                                     if (playercardnamelist[k] === cards[j].character) {
//                                     actualcard.push(cards[j])}};
//                                         if (playercardnamelist[k]=== data[i].card_name){
//                                             let cardindex = i;
//                                             let stars = ['',':star2:',':star2::star2:',':star2::star2::star2:',':star2::star2::star2::star2:',':star2::star2::star2::star2::star2:']
//                                             let invembed = new discord.MessageEmbed();
//                                             invembed.setAuthor(message.author.tag, message.author.avatarURL());
//                                             invembed.setTitle('**INVENTORY**'); 
//                                             invembed.setColor('AQUA');    
//                                             invembed.addField(`1 | ${actualcards[0].character} element here  ${stars[data[cardindex].card_rarity]}`,'card level and id here ');
                                        
//                                             message.channel.send({embeds:[invembed]})
                                            
//                     }}
//         })
//                 }else{
//                     message.channel.send('Not Registered');
//                 }           
//         }}});
// }});                

await client.login(startpassword)