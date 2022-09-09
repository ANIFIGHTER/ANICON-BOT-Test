import discord from 'discord.js';
import { All_Cards as cards,enemy as enemylist,randomcard,skill} from '/ASHWIN/JavaScript/disc_cards.js';
import {userid,gamedata,userdata,stamina,item,stage} from '/Ashwin/JavaScript/models.js'
import canvass from'canvas'
import dotenv from 'dotenv';
dotenv.config();

let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']

let enemytype
const ping = {data: new discord.SlashCommandBuilder()
    .setName('next_stage')
    .setDescription('Move to Next Stage!'),
async execute(interaction) {
    let id = interaction.user.id;
    const sqlexe = await userid.find({USER_ID:`${id}`})
    if  (sqlexe.length == 0){await interaction.reply('YOU ARE NOT REGISTERED')}
    else{
        const datauser = await userdata.find({user_id : id})
        let currentareaid = datauser[0].area
        let currentstageid = datauser[0].stage
        let usermaxstage = datauser[0].max_stage
      if (currentareaid==0||currentstageid==0){
        await interaction.reply('You haven\'t entered any stage.')}
       else{
      const stagedata = await stage.find({area:currentareaid,stage:currentstageid})
      if (stagedata[0].leveluniqueid <= usermaxstage){
        let abcexe = await stage.find({area:currentareaid,stage:currentstageid+1})
        if(abcexe.length===0){
          await interaction.reply('You have cleared all the stages within this area')}
      else{datauser[0].stage = currentstageid+1
        datauser[0].leveluniqueid = datauser[0].leveluniqueid+1
    await datauser[0].save()
    let stagembed = new discord.EmbedBuilder()
                stagembed.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
                stagembed.setColor('Random')
                stagembed.setTimestamp()
                stagembed.setFooter({text:'Support the bot, contact [    ]#3780'})

  await interaction.deferReply()
  let uniqueidfetch = await stage.find({area:currentareaid,leveluniqueid:datauser[0].leveluniqueid})
        let enemy = []
        for(let x = 0; x <= uniqueidfetch.length-1;x++){
            for (let k = 0; k<=enemylist.length-1;k++){
            if (uniqueidfetch[x].enemy_unique_id == enemylist[k].uniqueID ){
                enemy.push({...enemylist[k]})
            }}}
            let enemies=uniqueidfetch
            for (let b = 0; b<=enemy.length-1;b++){
                for (let v = 0;v<=enemies.length-1;v++){
                    if(enemy[b].uniqueID==enemies[v].enemy_unique_id){
                enemy[b].hp = Math.floor(enemy[b].hp + enemies[v].enemy_lvl*0.02*enemy[b].hp+enemies[v].rarity*0.2*enemy[b].hp)
                enemy[b].attack = Math.floor(enemy[b].attack + enemies[v].enemy_lvl*0.02*enemy[b].attack+enemies[v].rarity*0.2*enemy[b].attack)
                enemy[b].defense = Math.floor(enemy[b].defense + enemies[v].enemy_lvl*0.02*enemy[b].defense+enemies[v].rarity*0.2*enemy[b].defense)
                enemy[b].agility = Math.floor(enemy[b].agility + enemies[v].enemy_lvl*0.02*enemy[b].agility+enemies[v].rarity*0.2*enemy[b].agility)
                    }}}
    if (uniqueidfetch[0].leveluniqueid%5!=0){enemytype = '**__STAGE DEFENDER__**'}else{enemytype = '**__BOSS__**'}
    stagembed.setTitle(`**${enemytype}**\n **AREA:** ${uniqueidfetch[0].area}\n**STAGE:** ${uniqueidfetch[0].stage}`)
    
        const canvas = canvass.createCanvas((enemies.length*300+20), 395);
            const context = canvas.getContext('2d')
            const background = await canvass.loadImage('https://cdn.discordapp.com/attachments/897181776982720563/900386586074693652/gradienta-LeG68PrXA6Y-unsplash_1.jpg')
            context.drawImage(background, 0, 0, canvas.width, canvas.height)
            for (let x = 0;x<=enemy.length-1;x++){
            const hijk = await canvass.loadImage(enemy[x].artlink)
            let vbn = (10+(300*x))
            context.drawImage(hijk,vbn,10,300,375)}
            const attachment = new discord.AttachmentBuilder(canvas.toBuffer());
            attachment.setName('test.png')
            stagembed.setImage('attachment://test.png')
        for (let v =0;v<=enemy.length-1;v++){
            stagembed.addFields({name:`${enemy[v].character} ${enemy[v].element}`,
            value:`**RARITY:** ${stars[uniqueidfetch[v].rarity]}\n**LEVEL:** ${uniqueidfetch[v].enemy_lvl}\n**HP:** ${enemy[v].hp}\n**ATTACK:** ${enemy[v].attack}\n**DEFENSE:** ${enemy[v].defense}
        **AGILITY:** ${enemy[v].agility}\n**SKILL:** ${skill[enemy[v].talent_id-1]}`,inline:true})
        }
        
        await interaction.editReply({embeds:[stagembed],files:[attachment]})
    }
  }else{await interaction.reply('Please clear the current stage first.')}
}}
}}

export {ping}