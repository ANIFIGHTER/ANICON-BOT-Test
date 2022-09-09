import discord from 'discord.js';
import {userid,gamedata,userdata,stamina,item} from '/Ashwin/JavaScript/models.js'
import { All_Cards as cards,skillfunc} from '/ASHWIN/JavaScript/disc_cards.js';

let stars = ['',':star:',':star::star:',':star::star::star:',':star::star::star::star:',':star::star::star::star::star:']
const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('info')
		.setDescription('View stats of crystals you own')
        .addStringOption(option => option.setName('card_no').setDescription('Input card serial no.').setRequired(true)),
        async execute(interaction){
            let card_id = interaction.options.getString('card_no')
            let user_id = interaction.user.id;
        let carddata
        const fet = await userid.findOne({USER_ID:`${user_id}`})
        if (fet==undefined) {
            await interaction.reply('Register yourself first using the command /start !!!');            
        }else{
                let userdata = await gamedata.find({card_owner:user_id}).exec()
                for (let x = 0;x<=userdata.length-1;x++){if (x == (card_id-1)){carddata = userdata[x]}}
                if (carddata==undefined){await interaction.reply('You Don\'t Own That Card')}
                else{
                    let card
        for (let o =0;o<=cards.length-1;o++){
if (cards[o].uniqueID==carddata.card_unique_id){card={...cards[o]}}}

        card.hp = Math.floor(card.hp + carddata.card_lvl*0.01*card.hp+carddata.card_rarity*0.2*card.hp)
        card.attack = Math.floor(card.attack + carddata.card_lvl*0.01*card.attack+carddata.card_rarity*0.2*card.attack)
        card.defense = Math.floor(card.defense + carddata.card_lvl*0.01*card.defense+carddata.card_rarity*0.2*card.defense)
        card.agility = Math.floor(card.agility + carddata.card_lvl*0.01*card.agility+carddata.card_rarity*0.2*card.agility)        
        
        let details = new discord.EmbedBuilder();
        details.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`});
        details.setColor('Random');
        details.setTitle(`**${card.character}**\nSERIES:${card.series}`);
        details.addFields({name:'Card Details',value:`RARITY: ${stars[carddata.card_rarity]} \nLIMITBREAK: ${carddata.limitbreak}  \nLEVEL: ${carddata.card_lvl}  \nELEMENT: ${card.element}  \nSKIN:  \nFRIENDSHIP: ${carddata.familarity}  `},
        {name: 'CARD STATS', value: `HP: ${card.hp}  \nATTACK: ${card.attack}  \nDEFENSE: ${card.defense}  \nAGILITY: ${card.agility}`},
        {name: `SKILL`, value : `${skillfunc(card.talent_id,carddata.card_rarity)}`})
        details.setImage(`${card.artlink}`)
        details.setTimestamp()
        details.setThumbnail('https://static.zerochan.net/Nakajima.Atsushi.%28Bungou.Stray.Dogs%29.full.2028610.jpg')
        details.setFooter({text:`${card.quote} |Card ID: ${carddata.card_id}`, iconURL:'https://static.zerochan.net/Nakajima.Atsushi.%28Bungou.Stray.Dogs%29.full.2028610.jpg'})
            await interaction.reply({embeds:[details]})
                }
        }
    }}
    export{ping}