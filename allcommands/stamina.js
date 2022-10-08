import discord from 'discord.js';
import {userid,gamedata,userdata,stamina,item} from '/home/container/models.js'
import dotenv from 'dotenv';
dotenv.config();


const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('stamina')
		.setDescription('view the stamina'),
        async execute(interaction) {
            let user_id = interaction.user.id
            let datao = await userid.find({USER_ID:`${user_id}`});
            if (datao.length === 0){
                await interaction.editReply('Not registered')}
                else{
                const data = await stamina.find({user_id :user_id})
                    let jk =Date.now()-Date.parse(String(data[0].lastupstam))
                    let newstam = Math.floor(jk/240000)+data[0].stamina
                    if (newstam>=data[0].stamlimit){newstam = data[0].stamlimit-1}
                    console.log(newstam)
            data[0].stamina = newstam
            data[0].lastupstam = Date.now()
            await data[0].save()
            await interaction.reply(`You currently have ${newstam}/${data[0].stamlimit-1} stamina.`)
        }
    }}
export{ping}