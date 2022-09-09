import {SlashCommandBuilder} from '@discordjs/builders';
import { All_Cards as cards,randomcard} from '/ASHWIN/JavaScript/disc_cards.js';
import {userid,gamedata,userdata,stamina,item,userido,userdatao,staminao} from '/ASHWIN/JavaScript/models.js'

const ping = {
	data: new SlashCommandBuilder()
		.setName('fix')
		.setDescription('fix a bug'),
    async execute(interaction) {
        let id = interaction.user.id;
        const jet = await userido.findOne({USER_ID:id})
        const fet = await userid.findOne({USER_ID:id})
        if (fet!=undefined||jet==undefined) {
                await interaction.reply('This command not for you./You have already fixed.');            
            }else{
                await new userid({USER_ID:interaction.user.id,_id:jet._id,
                    joining_date:jet.joining_date}).save()
        let udata = await userdatao.find({user_id:id})
        await new userdata({user_id:id,area:udata[0].area,stage:udata[0].stage,leveluniqueid:udata[0].leveluniqueid,
            max_stage:udata[0].max_stage}).save()
        let stam = await staminao.find({user_id:id})
        await new stamina({user_id:id,user_lvl:stam[0].user_lvl,user_xp:stam[0].user_xp,
            user_xp_limit:stam[0].user_xp_limit,stamina:stam[0].stamina,
            lastupstam:stam[0].lastupstam,stamlimit:stam[0].stamlimit}).save();
        await new item({user_id:id,gold:5000}).save()
        const randomcarrd = randomcard(cards);
        let b = await gamedata.find()
        let a = b.sort(function(x, y){return parseInt(x.card_id) - parseInt(y.card_id)})
        let thenewid = parseInt(a[a.length-1].card_id)+1
        await new gamedata({card_id:JSON.stringify(thenewid),card_unique_id:randomcarrd.uniqueID,card_rarity:4,card_lvl:20,card_owner:id}).save();
        
        await interaction.reply('FIXED!!')
            }    
        }}
export {ping}