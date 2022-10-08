import discord from 'discord.js';
import { All_Cards as cards} from '/home/container/disc_cards.js';
import {userid,gamedata,userdata,stamina,item} from '/home/container/models.js'

function card_name(a) {
    for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].character}}}
function card_element(a) {
        for (let nbv = 0;nbv<=cards.length;nbv++){if (cards[nbv].uniqueID == a){return cards[nbv].element}}}

let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('inventory')
		.setDescription('View your Cards')
        .addStringOption(option => option.setName('sort').setDescription('Sorting Options').setRequired(false)
  .addChoices({name:'Alphabetically',value:'alphabet'},{name:'evolution',value:'evo'},{name:'cardid',value:'id'})),
    async execute(interaction){
        let id = interaction.user.id;
        let sortoption = interaction.options.getString('sort')
        const fet = await userid.findOne({USER_ID:`${id}`})
        if (fet==undefined) {
            await interaction.reply('Register yourself first using the command /start !!!');            
        }else{
            let data = await gamedata.find({card_owner:id}).exec()
            for (let v = 0;v<=data.length-1;v++){data[v].srno = v+1}
            if (sortoption=='alphabet'){data.sort((a,b)=>card_name(a.card_unique_id)>card_name(b.card_unique_id)?1:-1)}
            if (sortoption=='evo'){data = data.sort(function(y,x){return parseInt(x.card_rarity) - parseInt(y.card_rarity)})}
                const row = new discord.ActionRowBuilder()
                    .addComponents( 
                    new discord.ButtonBuilder()
                    .setCustomId('back')
                    .setLabel('Previous Page')
                    .setStyle(discord.ButtonStyle.Primary)
                    .setDisabled(true)
                )
                    .addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('deleting')
                    .setLabel('Delete')
                    .setStyle(discord.ButtonStyle.Danger)
                )
                    .addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next Page')
                    .setStyle(discord.ButtonStyle.Primary)
                );
                let  noofpages;
                let totalinvembeds = [];
                totalinvembeds.push('invembed')
                if (data.length%10 === 0){noofpages = data.length/10
                let j = 0;
                for (let i = 1; i <= noofpages; i++){
                    totalinvembeds[i] = new discord.EmbedBuilder();
                    totalinvembeds[i].setAuthor({name:`${interaction.user.tag}`, iconURL: `${interaction.user.avatarURL()}`});
                    totalinvembeds[i].setTitle('**INVENTORY**');
                    totalinvembeds[i].setColor('Random');
                    totalinvembeds[i].setThumbnail('https://artfiles.alphacoders.com/114/114357.jpg')
                    totalinvembeds[i].setTimestamp()
                    totalinvembeds[i].setFooter({text:`${i} of ${noofpages}`})
                    for (;j < 10*i; j++) {
                        totalinvembeds[i].addField({name:`${data[j].srno} | **${card_name(data[j].card_unique_id)}** | ${stars[data[j].card_rarity]} | ${card_element(data[j].card_unique_id)}`, value:`LEVEL: ${data[j].card_lvl} |ID: ${data[j].card_id} | LIMIT BREAK: ${data[j].limitbreak}`});   
                }}
                }else if (data.length%10 !== 0){noofpages = Math.floor(data.length/10)+1
                    let j = 0;
                    for (let i = 1; i <= noofpages; i++){
                        totalinvembeds[i] = new discord.EmbedBuilder();
                        totalinvembeds[i].setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`});
                        totalinvembeds[i].setThumbnail('https://artfiles.alphacoders.com/114/114357.jpg')
                        totalinvembeds[i].setTitle('**INVENTORY**');
                        totalinvembeds[i].setColor('Random');
                        totalinvembeds[i].setTimestamp()
                        totalinvembeds[i].setFooter({text:`${i} of ${noofpages}`})
                        for (; j < 10*i; j++) {
                            if (j === data.length){break;}
                            else {totalinvembeds[i].addFields({name:`${data[j].srno} | **${card_name(data[j].card_unique_id)}** | ${stars[data[j].card_rarity]} | ${card_element(data[j].card_unique_id)}`, value:`LEVEL: ${data[j].card_lvl} | ID: ${data[j].card_id} | LIMIT BREAK: ${data[j].limitbreak}`});}
                    }}
                }let pageno = 1;
                if (totalinvembeds.length===2){
                    row.components[2].setDisabled(true)
                await interaction.reply({embeds : [totalinvembeds[pageno]] , components :[row]})}
                else{
                    await interaction.reply({embeds : [totalinvembeds[pageno]] , components :[row]})
                }
                let idofinv
                interaction.fetchReply()
                    .then (reply=> idofinv = reply.id)
                const filter = i => i.user.id === interaction.user.id && idofinv === i.message.id;
                const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.Button, time: 90000 });
                collector.on('collect', async i => {
                    if(i.customId === 'next'){
                        pageno = pageno + 1;
                        if (pageno === totalinvembeds.length-1){
                            row.components[0].setDisabled(false)
                            row.components[2].setDisabled(true)
                            await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})
                        }else{
                            row.components[2].setDisabled(false)
                            row.components[0].setDisabled(false)
                        await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})}
                    }else if (i.customId === 'back'){
                        pageno = pageno - 1;
                        if (pageno === 1){row.components[0].setDisabled(true)
                            row.components[2].setDisabled(false)
                            await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})
                        }else{row.components[0].setDisabled(false)
                            row.components[2].setDisabled(false)
                            await i.update({embeds : [totalinvembeds[pageno]] , components :[row]})}
                    }else if (i.customId === 'deleting'){
                        i.update({content : 'Deleted!!', components : [], embeds:[]})
                    }
                        
                })
            }
        }}      

export {ping}