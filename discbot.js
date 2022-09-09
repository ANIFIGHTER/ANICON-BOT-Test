import discord from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import { All_Cards as cards, randomcard} from '/ASHWIN/JavaScript/disc_cards.js';
import {userid,gamedata,userdata,stamina,item,stage} from '/ASHWIN/JavaScript/models.js'
// import mysql from 'mysql2';
dotenv.config();

// //MYSQL PASSWORD
// const possswd = process.env.SQLPASSWD;
// // console.log(possswd)

// // MYSQL CONNECTION
// const con = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password:`${possswd}`,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     database: 'testgame'
//   });

// con.getConnection((err) => {
// if (err) {
//     return console.error('error: ' + err.message);
// }
// // console.log('Connected to the MySQL server.');
// });

await mongoose
  .connect(
    "mongodb+srv://Anicon:botkadb%40479@anicon.hshsz.mongodb.net/testgame?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true }
  ).then(()=>{console.log('connected')},err=>console.log(err,'yftntgbfb'))
    
  
//   let cardsummon = randomcard(cards)
//   let rarity = 4
//   let b = await gamedata.find()
//   let a = b.sort(function(x, y){return parseInt(x.card_id) - parseInt(y.card_id)})
//   let theyid = await userid.find() 
// for (let x = 0;x<theyid.length;x++){
//   await new gamedata({card_id:a[a.length-1].card_id+1,card_unique_id:cardsummon.uniqueID,card_rarity:rarity,card_lvl:20,card_owner:theyid[x].USER_ID}).save()
// await new gamedata({card_id:1,card_unique_id:cardsummon.uniqueID,card_rarity:rarity,card_lvl:20,card_owner:'370958883239231499'}).save()
//   }
// await gamedata.deleteMany()
//   for (let x = 0;x<21;x++)
// await new stage({area:2, stage:1, enemy_unique_id: 1, enemy_lvl:1,	
//     leveluniqueid:1, rarity: 2}).save()
// let mop = await gamedata.find()
// for(let b = 0;b<=mop.length-1;b++){mop[b].familarity = 0
// await mop[b].save()}
//CREATED CLIENT
const client = new discord.Client({
  intents: ['Guilds'
    // discord.Intents.FLAGS.GUILD_MESSAGES,
    // discord.Intents.FLAGS.GUILDS,
    // discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    // discord.Intents.FLAGS.DIRECT_MESSAGES,
    // discord.Intents.FLAGS.GUILD_PRESENCES,
  ],
  restRequestTimeout: 50000,
});

// TOKEN - BOT PASSWORD
const startpassword = process.env.TOKEN;
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});


client.commands = new discord.Collection();
const commandFiles = fs
  .readdirSync("./allcommands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  let command = await import(`./allcommands/${file}`);
  // console.log(command)
  client.commands.set(command.ping.data.name, command);
}
// console.log(client.commands)

//BOT ON READY EVENT
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  // console.log(command)
  if (!command) return;

  try {
    await command.ping.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
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

await client.login(startpassword);
