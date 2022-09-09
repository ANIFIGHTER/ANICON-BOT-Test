import discord from 'discord.js';
import {userid,gamedata,userdata,stamina,item} from '/Ashwin/JavaScript/models.js'
import dotenv from 'dotenv';
dotenv.config();

  const ping = {data : new discord.SlashCommandBuilder()
    .setName('items')
    .setDescription('View items'),
    async execute(interaction){
        let user_id = interaction.user.id
        let sql = await userid.find({USER_ID:`${user_id}`})
        if (sql.length===0){
            await interaction.reply('Not registered')
        }else{
            const items = await item.find({user_id:user_id})
            let itemmenu = new discord.ActionRowBuilder()
                .addComponents(
                    new discord.SelectMenuBuilder()
                    .setCustomId('itemmenu')
                    .setPlaceholder('Select the Category')
                    .addOptions([{
                        label : 'All Items',
                        value: 'all_items'
                    },{label:'Evolution', value:'evolution'},
                    {label:'Souls',value:'souls'}])
                )
            let allembed = new discord.EmbedBuilder()
            allembed.setAuthor({name:`${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}`})
            allembed.setColor('Red')
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
            allembed.setFooter({text:'Support the bot, contact [    ]#3780'})
        await interaction.reply({content:'***__ITEM INVENTORY__***',components:[itemmenu]})    

            let idofitems
            interaction.fetchReply()
                .then (reply=> idofitems = reply.id)
            const filter = i => i.user.id === interaction.user.id && idofitems===i.message.id 
            
            const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.SelectMenu, time: 180000 });
            collector.on('collect', async i => {
                if (i.values[0] == 'all_items'){
                    await i.update({embeds :[allembed], components:[itemmenu]})}
                else if (i.values[0] == 'evolution' ){
                    let evo = new discord.EmbedBuilder(allembed.data)
                    evo.spliceFields(0,2)
                await i.update({embeds :[evo], components:[itemmenu]})}
                else if (i.values[0] == 'souls' ){
                    let sol = new discord.EmbedBuilder(allembed.data)
                    sol.spliceFields(0,1)
                    sol.spliceFields(1,1)
                    await i.update({embeds :[sol], components:[itemmenu]})}
            })    
        }
    }}
export{ping}