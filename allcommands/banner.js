import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
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
let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
function number() { return Math.floor(Math.random() * (100 - 1+1)) + 1}
const ping = {data : new SlashCommandBuilder()
    .setName('banners')
    .setDescription('View the shop'),
    async execute(interaction){
        console.log(Object.keys(interaction.member.presence.clientStatus)[0])
        let user_id = interaction.user.id
        let sql = await dbQuery(`SELECT * FROM users WHERE USER_ID = '${user_id}'`)
        if (sql.length===0){
            await interaction.reply('Not registered')
        }else{
            let usercardsquery = `Select * from gamedata where card_owner = ${user_id}`
                    let usercards = await dbQuery(usercardsquery)
                    let usercardsidlist = []
                    for (let a =0;a<=usercards.length-1;a++){usercardsidlist.push(usercards[a].card_unique_id) }
                let bannerlist = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageSelectMenu()
                    .setCustomId('bannerlist')
                    .setPlaceholder('Select the banner')
                    .addOptions([{
                        label : 'ALL CARDS',
                        value: 'banner1'
                    }])
                )
                let opener = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageButton()
                    .setCustomId('1')
                    .setLabel('Open Pack')
                    .setStyle('PRIMARY')
                ).addComponents(
                    new discord.MessageButton()
                    .setCustomId('2')
                    .setLabel('Open Pack')
                    .setStyle('PRIMARY')
                ).addComponents(
                    new discord.MessageButton()
                    .setCustomId('3')
                    .setLabel('Open Pack')
                    .setStyle('PRIMARY')
                ).addComponents(
                    new discord.MessageButton()
                    .setCustomId('4')
                    .setLabel('Open Pack')
                    .setStyle('SECONDARY')
                ).addComponents(
                    new discord.MessageButton()
                    .setCustomId('deletings')
                    .setLabel('Delete')
                    .setStyle('DANGER')
                )
                const rows = new discord.MessageActionRow()
                .addComponents( 
                new discord.MessageButton()
                .setCustomId('backs')
                .setLabel('Previous Page')
                .setStyle('PRIMARY')
                .setDisabled(true)
            )
                .addComponents(
                new discord.MessageButton()
                .setCustomId('deletings')
                .setLabel('Delete')
                .setStyle('PRIMARY')
            )
                .addComponents(
                new discord.MessageButton()
                .setCustomId('nexts')
                .setLabel('Next Page')
                .setStyle('PRIMARY')
            );
            let bannerinfo = new discord.MessageEmbed()
            bannerinfo.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
            bannerinfo.setColor('GREEN')
            bannerinfo.setTimestamp()
            bannerinfo.setTitle('***__BANNER INFO__***')
            bannerinfo.setDescription(`All cards in the game are available in this banner`)
            bannerinfo.setFooter({text:'Support the bot, contact [    ]#3780'})
            await interaction.reply({content:'Select the banner',components: [bannerlist]})

    let idofinteraction
    interaction.fetchReply()
        .then (reply=> idofinteraction = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofinteraction===i.message.id 

    const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'SELECT_MENU', time: 180000 });
    collector.on('collect', async i => {
        if (i.values[0] == 'banner1'){
            await i.update({embeds :[bannerinfo], components:[opener]})            
        }})
    
    let cardspulled = []
    let pagesnos = -1
    const collector2 = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 180000 });    
            collector2.on('collect', async i =>{
                if (['1','2','3','4'].includes(i.customId)){
                    let currencycheck = await dbQuery(`Select * from useritems where user_id= ${user_id}`)
                    if (currencycheck[0].gold<1000){
                        await i.update({content:`You only have ${currencycheck[0].gold} tricons.`,embeds :[], components:[]})}
                    else{   
                        await dbQuery(`Update useritems set gold = ${currencycheck[0].gold-1000} where user_id = ${user_id}`)
                    cardspulled[5] = new discord.MessageEmbed()
                    cardspulled[5].setTitle(`***YOUR SUMMONS***`)
                    cardspulled[5].setAuthor({name:`${i.user.tag}`,iconURL:`${i.user.avatarURL()}`})
                    cardspulled[5].setColor('GREEN')
                    cardspulled[5].setDescription('You Summoned following cards')
                    cardspulled[5].setTimestamp()
                    for(let x = 0;x <=4;x++){
                    let cardsummon = randomcard(cards)
                    let updated
                    let rarity
                    let f = number()
                    if (f == 37){rarity = 5}else if (f>=1&&f<=10){rarity = 4}else if (f>10&&f<=36){rarity = 3}
                    else if (f>37&&f<=50){rarity = 3}else if (f>51&&f<=100){rarity = 2}
if (usercardsidlist.includes(cardsummon.uniqueID)){
                    for(let jk = 0;jk<=usercards.length-1;jk++){
                        if(usercards[jk].card_unique_id == cardsummon.uniqueID && usercards[jk].card_rarity == rarity){
                        if (usercards[jk].limitbreak>9){
                            let useritemdata = await dbQuery(`Select * from useritems where user_id = ${user_id}`)
                            if ([2,3].includes(rarity)){
                                await dbQuery(`update useritems set limit_break_small = ${useritemdata.limit_break_small+1} where user_id = ${user_id}`)
                            }else if ([4].includes(rarity)){
                                await dbQuery(`update useritems set limit_break_medium = ${useritemdata.limit_break_medium+1} where user_id = ${user_id}`)
                            }else{await dbQuery(`update useritems set limit_break_medium = ${useritemdata.limit_break_medium+1} where user_id = ${user_id}`)}
                        }
                        let wed = `Update gamedata set limitbreak = ${usercards[jk].limitbreak+1} where card_id = ${usercards[jk].card_id} and card_owner = ${user_id} `
                        await dbQuery(wed)
                    updated = 'yes'}}}
                    if (updated == undefined){let cardsinsert =  `INSERT INTO gamedata (card_unique_id, card_rarity, card_lvl,limitbreak, card_owner) VALUES('${cardsummon.uniqueID}', '${rarity}','20',0, ${user_id})`;
                    await dbQuery(cardsinsert)
                    usercards = await dbQuery(usercardsquery)
                usercardsidlist.push(cardsummon.uniqueID)}
                    cardspulled[x] = new discord.MessageEmbed()        
                    cardspulled[x].setTitle(`***${cardsummon.character}*** (Card ${x+1} of 5)`)
                    cardspulled[x].setAuthor({name:`${i.user.tag}`,iconURL: `${i.user.avatarURL()}`})
                    if (updated == 'yes'){
                    cardspulled[x].setDescription(`Skin name maybe\n${stars[rarity]}\n **LIMIT BREAK**`)}
                    else{cardspulled[x].setDescription(`Skin name maybe\n${stars[rarity]}\n **NEW SUMMON!**`)}
                    cardspulled[x].setColor('GREEN')
                    cardspulled[x].setTimestamp()
                    cardspulled[x].setImage(`${cardsummon.artlink}`)

                    cardspulled[5].addField(`${x+1} | ***__${cardsummon.character}__***`,`Series: ${cardsummon.series} | ${cardsummon.element} | ${stars[rarity]}`)
                    }
 
                    await i.update({embeds:[cardspulled[5]],components:[rows]})}}
                
            if (i.customId == 'nexts'){
                pagesnos = pagesnos+1
                if (pagesnos ==4){
                rows.components[0].setDisabled(false)
                rows.components[2].setDisabled(true)
                await i.update({embeds:[cardspulled[pagesnos]],components:[rows]})}
                else{rows.components[0].setDisabled(false)
                    rows.components[2].setDisabled(false)
                await i.update({embeds:[cardspulled[pagesnos]],components:[rows]})}
            }else if (i.customId == 'backs'){
                pagesnos = pagesnos-1
                if (pagesnos==-1){
                    await i.update({embeds:[cardspulled[5]],components:[rows]})
                }else{rows.components[0].setDisabled(false)
                    rows.components[2].setDisabled(false)
                    await i.update({embeds:[cardspulled[pagesnos]],components:[rows]})}
            }else if (i.customId == 'deletings'){
                collector.stop()
                collector2.stop()
                await i.update({content:'Deleted',embeds:[],components:[]})
            }
            })
}}}
export{ping}