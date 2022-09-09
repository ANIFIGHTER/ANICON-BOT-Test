import discord from 'discord.js';
import {userid,gamedata,userdata,stamina,item,dailytab} from '/Ashwin/JavaScript/models.js'

function randomlist(array) { return array[Math.floor(Math.random()*array.length)]};

const ping = {data : new discord.SlashCommandBuilder()
    .setName('slots')
    .setDescription('Play slot to get random reward'),
    async execute(interaction){
        let user_id = interaction.user.id
        let sqexe = await userid.find({USER_ID:`${user_id}`})
      if (sqexe.length == 0){await interaction.reply('Not registered')} 
      else{let itemdata = await item.find({user_id :user_id})
      if (itemdata[0].localgold<1000){
        await interaction.reply('You don\'t have enough gold.')}
      else{
        itemdata[0].localgold = itemdata[0].localgold-1000
        await itemdata[0].save()
        let data = await dailytab.find({user_id :user_id})
        if(data.length==0){await new dailytab({user_id:user_id,lottery:new Date(Date.now()-1000000)}).save()
        data = await dailytab.find({user_id :user_id})}

        let jk =Date.now()-Date.parse(String(data[0].lottery))
        let timeleft = Math.floor((900000-jk)/60000)
        if (jk<900000){await interaction.reply(`It\'s still on cooldown. You can use it after ${timeleft} minutes.`)}
      else{data[0].lottery= Date.now()
        await data[0].save()
        function number() { return Math.floor(Math.random() * (100 - 1+1)) + 1}
let randomno = number()
let typesoul
if (randomno<=60){typesoul = randomlist(['light','dark','fire','wind','nature','ground','zap','water','neutral'])}
else if (randomno>60&&randomno<99){typesoul = 'localgold'}
else if (randomno>98){typesoul = 'gold'}
let soulnorandom = number()
let souladd
if (['light','dark','fire','wind','nature','ground','zap','water','neutral'].includes(typesoul)){
if (soulnorandom>60){souladd = Math.floor(Math.random() * (400 - 200+1)) + 200}
else{souladd = Math.floor(Math.random() * (200 - 100+1)) + 100}
itemdata[0][`${typesoul}`] = itemdata[0][`${typesoul}`]+souladd
typesoul = `${typesoul} souls`
}
else if (typesoul = 'localgold'){souladd = Math.floor(Math.random() * (3000 - 1500+1)) + 1500
  itemdata[0][`${typesoul}`] = itemdata[0][`${typesoul}`]+souladd
typesoul = 'gold'}
else if(typesoul = 'gold'){souladd = Math.floor(Math.random() * (200 - 100+1)) + 100
  itemdata[0][`${typesoul}`] = itemdata[0][`${typesoul}`]+souladd
typesoul = 'tricons'}

await itemdata[0].save()
        await interaction.reply(`You won ${souladd} ${typesoul}.`)
      }
    }}       

}}

export{ping}