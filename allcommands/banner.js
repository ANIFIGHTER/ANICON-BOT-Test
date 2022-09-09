import discord from 'discord.js';
import { All_Cards as cards, randomcard} from '/ASHWIN/JavaScript/disc_cards.js';
import {userid,gamedata,userdata,stamina,item} from '/Ashwin/JavaScript/models.js'
import dotenv from 'dotenv';
dotenv.config();


let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
function number() { return Math.floor(Math.random() * (100 - 1+1)) + 1}
const ping = {data : new discord.SlashCommandBuilder()
    .setName('banners')
    .setDescription('View the shop'),
    async execute(interaction){
        // console.log(Object.keys(interaction.member.presence.clientStatus)[0])
        let user_id = interaction.user.id
        let sql = await userid.find({USER_ID:`${user_id}`})
        if (sql.length==0){
            await interaction.reply('Not registered')
        }else{
            let bannerlist = new discord.ActionRowBuilder()
                .addComponents(
                    new discord.SelectMenuBuilder()
                    .setCustomId('bannerlist')
                    .setPlaceholder('Select the banner')
                    .addOptions([{
                        label : 'ALL CARDS',
                        value: 'banner1'
                    }])
                )
                let opener = new discord.ActionRowBuilder()
                .addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Open Pack')
                    .setStyle(discord.ButtonStyle.Primary)
                ).addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('2')
                    .setLabel('Open Pack')
                    .setStyle(discord.ButtonStyle.Primary)
                ).addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('3')
                    .setLabel('Open Pack')
                    .setStyle(discord.ButtonStyle.Primary)
                ).addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('4')
                    .setLabel('Open Pack')
                    .setStyle(discord.ButtonStyle.Secondary)
                ).addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId('deletings')
                    .setLabel('Delete')
                    .setStyle(discord.ButtonStyle.Danger)
                )
                const rows = new discord.ActionRowBuilder()
                .addComponents( 
                new discord.ButtonBuilder()
                .setCustomId('backs')
                .setLabel('Previous Page')
                .setStyle(discord.ButtonStyle.Primary)
                .setDisabled(true)
            )
                .addComponents(
                new discord.ButtonBuilder()
                .setCustomId('deletings')
                .setLabel('Delete')
                .setStyle(discord.ButtonStyle.Danger)
            )
                .addComponents(
                new discord.ButtonBuilder()
                .setCustomId('nexts')
                .setLabel('Next Page')
                .setStyle(discord.ButtonStyle.Primary)
            );
            let bannerinfo = new discord.EmbedBuilder()
            bannerinfo.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
            bannerinfo.setColor('Green')
            bannerinfo.setTimestamp()
            bannerinfo.setTitle('***__BANNER INFO__***')
            bannerinfo.setDescription(`All cards in the game are available in this banner\nCost: 1000 Tricons`)
            bannerinfo.setFooter({text:'Support the bot, contact [    ]#3780'})
            await interaction.reply({content:'Select the banner',components: [bannerlist]})

    async function entry(usercards,cardsummon,rarity,updated,currencycheck,gamedata,user_id){
        for(let jk = 0;jk<=usercards.length-1;jk++){
        if(parseInt(usercards[jk].card_unique_id) == cardsummon.uniqueID && usercards[jk].card_rarity == rarity){
            updated = 'yes'

        if (usercards[jk].limitbreak>9){
            if ([2,3].includes(rarity)){
                    currencycheck[0].limit_break_small=currencycheck[0].limit_break_small+1
                       await currencycheck[0].save()
            }else if ([4].includes(rarity)){
                currencycheck[0].limit_break_medium = currencycheck[0].limit_break_medium + 1
                    await currencycheck[0].save()
            }else{currencycheck[0].limit_break_big = currencycheck[0].limit_break_big+1
                await currencycheck[0].limit_break_big.save()}
            }else{
                let wed = await gamedata.find({_id:usercards[jk]._id})
                wed[0].limitbreak = wed[0].limitbreak + 1 
                    await wed[0].save()                       
            }}}
            if (updated == undefined){
                let b = await gamedata.find()
                let a = b.sort(function(x, y){return parseInt(x.card_id) - parseInt(y.card_id)})
        let thenewid = parseInt(a[a.length-1].card_id)+1
        await new gamedata({card_id:JSON.stringify(thenewid),card_unique_id:cardsummon.uniqueID,card_rarity:rarity,card_lvl:20,card_owner:user_id}).save()
        usercards = await gamedata.find({card_owner:user_id})}
    return updated}       

    let idofinteraction
    interaction.fetchReply()
        .then (reply=> idofinteraction = reply.id)
    const filter = i => i.user.id === interaction.user.id && idofinteraction===i.message.id 

    const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.SelectMenu, time: 180000 });
    collector.on('collect', async i => {
        if (i.values[0] == 'banner1'){
            await i.update({embeds :[bannerinfo], components:[opener]})            
        }})
    
    let cardspulled = []
    let pagesnos = -1
    const collector2 = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.Button, time: 180000 });    
            collector2.on('collect', async i =>{
                if (['1','2','3','4'].includes(i.customId)){
                    let currencycheck = await item.find({user_id:user_id})
                    if (currencycheck[0].gold<1000){
                        await i.update({content:`You have ${currencycheck[0].gold} tricons.`,embeds :[], components:[]})}
                    else{ 
                        currencycheck[0].gold=currencycheck[0].gold-1000
                        await currencycheck[0].save()
                    cardspulled[5] = new discord.EmbedBuilder()
                    cardspulled[5].setTitle(`***YOUR SUMMONS***`)
                    cardspulled[5].setAuthor({name:`${i.user.tag}`,iconURL:`${i.user.avatarURL()}`})
                    cardspulled[5].setColor('Random')
                    cardspulled[5].setDescription('You Summoned following cards')
                    cardspulled[5].setTimestamp()
                    for(let x = 0;x <=4;x++){
                    let cardsummon = randomcard(cards)
                    let updated
                    let rarity
                    let f = number()
                    if (f == 37){rarity = 5}else if (f>=0&&f<=10){rarity = 4}else if (f>10&&f<=36){rarity = 3}
                    else if (f>37&&f<=50){rarity = 3}else if (f>50&&f<=100){rarity = 2}

            let usercards = await gamedata.find({card_owner:user_id})
            updated = await entry(usercards,cardsummon,rarity,updated,currencycheck,gamedata,user_id)

                cardspulled[x] = new discord.EmbedBuilder()        
                cardspulled[x].setTitle(`***${cardsummon.character}*** (Card ${x+1} of 5)`)
                cardspulled[x].setAuthor({name:`${i.user.tag}`,iconURL: `${i.user.avatarURL()}`})
                if (updated == 'yes'){
                cardspulled[x].setDescription(`Skin name maybe\n${stars[rarity]}\n **LIMIT BREAK**`)}
                else{cardspulled[x].setDescription(`Skin name maybe\n${stars[rarity]}\n **NEW SUMMON!**`)}
                cardspulled[x].setColor('Random')
                cardspulled[x].setTimestamp()
                cardspulled[x].setImage(`${cardsummon.artlink}`)

                cardspulled[5].addFields({name:`${x+1} | ***__${cardsummon.character}__***`,value:`Series: ${cardsummon.series} | ${cardsummon.element} | ${stars[rarity]}`})
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