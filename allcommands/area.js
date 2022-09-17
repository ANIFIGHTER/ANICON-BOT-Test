import discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
import { All_Cards as cards, enemy as enemylist,enemyhp} from '/ASHWIN/JavaScript/disc_cards.js';
import {userid,gamedata,userdata,stamina,item,stage} from '/Ashwin/JavaScript/models.js'

function seriesname(a){
    for (let x = 0;x<=enemylist.length-1;x++){
        if (a == enemylist[x].uniqueID){return enemylist[x].series}
    }}

    const ping = {
        data: new discord.SlashCommandBuilder()
            .setName('area')
            .setDescription('Travel to an area')
            .addStringOption(option => option.setName('area_id').setDescription('Input ID of area').setRequired(true)),
            async execute(interaction){
                let user_id = interaction.user.id
                let area_id = interaction.options.getString('area_id')
                let sql = await userid.find({USER_ID:`${user_id}`})
                if (sql.length==0) {await interaction.reply('Not Registered. Register using /start')}
                else{
                  if (area_id < 1 || area_id >2){await interaction.reply('Area doesn\'t exists.')}
                  else{let usersdata = await userdata.find({user_id : user_id})
                  if (area_id ==1){
                      usersdata[0].area = 1
                      usersdata[0].stage = 1
                      usersdata[0].leveluniqueid = 1
                      await usersdata[0].save()
                      await interaction.reply('You have successfully travelled to Kimetsu No Yaiba Area')
                  }else{ let r = area_id-1
                      let stagedata = await stage.find({area :r})
                  if(stagedata[stagedata.length-1].leveluniqueid<=usersdata[0].max_stage){
                      let sername = await stage.find({area:area_id})
                      usersdata[0].area = 2
                      usersdata[0].stage = 1
                      usersdata[0].leveluniqueid = sername[0].leveluniqueid
                      await usersdata[0].save()
                      await interaction.reply(`You have successfully travelled to ${seriesname(sername[0].enemy_unique_id)} area.`)
                  }else{
                      await interaction.reply('Please clear the previous area first.')
                  }}                     
          }}}}
export{ping}