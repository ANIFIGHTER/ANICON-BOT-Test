import {SlashCommandBuilder} from '@discordjs/builders';
import { All_Cards as cards,randomcard} from '/home/container/disc_cards.js';
import {userid,gamedata,userdata,stamina,item,dailytab} from '/home/container/models.js'

const ping = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Register Yourself!'),
    async execute(interaction) {
        let id = interaction.user.id;
        const fet = await userid.findOne({USER_ID:id})
            if (fet!=undefined) {
                await interaction.reply('Already Registered');            
            }else{
                let userinsert = new userid()
                userinsert.USER_ID = id
                await userinsert.save()
                const randomcarrd = randomcard(cards);
                let b = await gamedata.find()
                let a = b.sort(function(x, y){return parseInt(x.card_id) - parseInt(y.card_id)})
                let thenewid = parseInt(a[a.length-1].card_id)+1
                await new gamedata({card_id:JSON.stringify(thenewid),card_unique_id:randomcarrd.uniqueID,card_rarity:4,card_lvl:20,card_owner:id}).save();
                await new userdata({user_id:id,area:0,stage:0,leveluniqueid:0,max_stage:0}).save();
                await new stamina({user_id:id,user_lvl:1,user_xp:0,user_xp_limit:100,stamina:60,lastupstam:Date.now(),stamlimit:61}).save();
                await new item({user_id:id,gold:5000}).save()
                await new dailytab({user_id:id,lottery:Date.now(),invsort:'id'})
                await interaction.reply(`Summoner <@${id}>, welcome to the Necropsis! Check out your inventory for your new soul crystal using /inv`);
        }   
    }
}
export{ping}