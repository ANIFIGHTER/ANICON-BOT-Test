import discord from 'discord.js';
import canvass from 'canvas'
import {userid,gamedata,userdata,stamina,item,stage} from '/Ashwin/JavaScript/models.js'
import { All_Cards as cards, enemy as enemylist,enemyhp,manabar,manavalue,elements} from '/ASHWIN/JavaScript/disc_cards.js';
import {talent,talenteffect as talfect,surge} from '/Ashwin/JavaScript/talents.js';
import util from 'util'
import dotenv from 'dotenv';
dotenv.config();

const wait = util.promisify(setTimeout);


function number() { return Math.floor(Math.random() * (200 - 1+1)) + 1}

const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('battle')
		.setDescription('Start the Battle !!'),
        async execute(interaction) {
            let user_id = interaction.user.id
            let enemy = []
            let userloc
            let usertabledata
        const sqlexe = await userid.find({USER_ID:`${user_id}`})
            if (sqlexe.length === 0){
                await interaction.reply('Not registered')}
                else{
                let cardsinteam = await gamedata.find({card_owner:user_id,team_status:{$ne:null}})
                if (cardsinteam.length==0){
                    await interaction.reply('Your team is empty. Use /team set to equip cards in your team.')}
                    else{ let teamdata = cardsinteam.sort(function(b, a){return b.team_status - a.team_status}) 
                    let staminadataexe = await stamina.find({user_id :user_id})
                   
                if (staminadataexe[0].stamina!=staminadataexe[0].stamlimit){
                    let newstam =Math.floor((Date.now()-Date.parse(String(staminadataexe[0].lastupstam)))/240000+staminadataexe[0].stamina)    
                    if (newstam>=staminadataexe[0].stamlimit){newstam = staminadataexe[0].stamlimit-1}
                    if(newstam<3){await interaction.reply({content:'You don\'t have enough tickets to join a battle'})}
                    else{
                        staminadataexe[0].stamina = newstam-3
                        staminadataexe[0].lastupstam = Date.now() 
                    await staminadataexe[0].save()

                const xyzexe = await userdata.find({user_id :user_id})
                    userloc = xyzexe[0].leveluniqueid
                    if(userloc==0){await interaction.reply('You have yet to enter a stage.')}
                else{    
                usertabledata = xyzexe
                    interaction.deferReply()
                    //TEAM BUILDING
                    let team = []
                    for (let k = 0; k<=teamdata.length-1;k++){
                    for (let l = 0;l<=cards.length-1;l++ ){
                        if (teamdata[k].card_unique_id== cards[l].uniqueID){
                            team.push({...cards[l]})
                        }}}

                        for (let b = 0; b<=team.length-1;b++){
                            for (let v = 0;v<=teamdata.length-1;v++){
                                if (team[b].uniqueID==teamdata[v].card_unique_id&&b==v)
                                {team[b].rarity = teamdata[v].card_rarity
                                    team[b].position = b
                                    team[b].evasion = []
                                    team[b].precision = []
                                    team[b].status=[]
                                team[b].hp = Math.floor(1.5*team[b].hp + (team[b].hp*0.2*teamdata[v].card_rarity)+(team[b].hp*0.01*teamdata[v].card_lvl))
                                team[b].attack = Math.floor((team[b].attack + (team[b].attack*0.2*teamdata[v].card_rarity) + (team[b].attack*0.01*teamdata[v].card_lvl)))
                                team[b].defense = Math.floor(team[b].defense + (team[b].defense*0.2*teamdata[v].card_rarity) + (team[b].defense*0.01*teamdata[v].card_lvl))
                                team[b].agility = Math.floor(team[b].agility + (team[b].agility*0.2*teamdata[v].card_rarity) + (team[b].agility*0.01*teamdata[v].card_lvl)) 
                            }}} 
            

            const enemies = await stage.find({leveluniqueid:userloc})
                for(let x = 0; x <= enemies.length-1;x++){
                for (let k = 0; k<=enemylist.length-1;k++){
                if (enemies[x].enemy_unique_id == enemylist[k].uniqueID ){
                    enemy.push({...enemylist[k]})
                }}} 
         
            for (let b = 0; b<=enemy.length-1;b++){
                    for (let v = 0;v<=enemies.length-1;v++){
                        if(enemy[b].uniqueID==enemies[v].enemy_unique_id){
                            enemy[b].rarity = enemies[v].rarity
                            enemy[b].position = team.length+b+1
                            enemy[b].evasion = []
                            enemy[b].precision = []
                            enemy[b].status = []
                    enemy[b].hp = Math.floor(1.5*enemy[b].hp + enemies[v].enemy_lvl*0.01*enemy[b].hp+enemies[v].rarity*0.2*enemy[b].hp)
                    enemy[b].attack = Math.floor(1.5*(enemy[b].attack + enemies[v].enemy_lvl*0.01*enemy[b].attack+enemies[v].rarity*0.2*enemy[b].attack))
                    enemy[b].defense = Math.floor(enemy[b].defense + enemies[v].enemy_lvl*0.01*enemy[b].defense+enemies[v].rarity*0.2*enemy[b].defense)
                    enemy[b].agility = Math.floor(enemy[b].agility + enemies[v].enemy_lvl*0.01*enemy[b].agility+enemies[v].rarity*0.2*enemy[b].agility)
                        }}} 
   
            let manavaluser = 0
            let manavalenemy = 0
            let canvaslength
            let enemycanvas = enemy.length*300
            let usercanvas = team.length*300
            if (enemycanvas>=usercanvas){canvaslength = enemycanvas}else{canvaslength = usercanvas}
            const canvas = canvass.createCanvas(canvaslength+50, 825);
            const context = canvas.getContext('2d')
            const background = await canvass.loadImage('https://cdn.discordapp.com/attachments/897181776982720563/900386586074693652/gradienta-LeG68PrXA6Y-unsplash_1.jpg')
            context.drawImage(background, 0, 0, canvas.width, canvas.height)
            for (let x = 0;x<=4;x++){
                if (team.length==x){break;}else{
            const hijk = await canvass.loadImage(team[x].artlink)
            let vbn = (25+(300*x))
            context.drawImage(hijk,vbn,25,300,375)}}

            for (let x = 0;x<=4;x++){
                if (enemy.length == x){break;}else{
            const kjhu = await canvass.loadImage(enemy[x].artlink)
            let vbn = (25+(300*x))
            context.drawImage(kjhu,vbn,425,300,375)}}
            
            const attachment = new discord.AttachmentBuilder(canvas.toBuffer());
            attachment.setName('test.png')
            
            const userbutton = new discord.ActionRowBuilder()
            for (let i = 0;i<=team.length-1; i++){
                team[i].button_id = `card${i+1}`
                userbutton.addComponents(
                    new discord.ButtonBuilder()
                    .setCustomId(`card${i+1}`)
                    .setLabel(`${team[i].character}`)
                    .setStyle(discord.ButtonStyle.Primary)
                    .setDisabled(true)
                )
            }
            userbutton.addComponents(
                new discord.ButtonBuilder()
                .setCustomId('deleting')
                .setLabel('Forfeit')
                .setStyle(discord.ButtonStyle.Danger)
            )
            const enemybutton = new discord.ActionRowBuilder()
            for (let i = 0; i <= enemy.length-1;i++){  
                enemy[i].button_id =  `enemy${i+1}`
                enemybutton.addComponents(
                     new discord.ButtonBuilder()
                    .setCustomId(`enemy${i+1}`)
                    .setLabel(`${enemy[i].character}`)
                    .setStyle(discord.ButtonStyle.Primary)
                )
            }
            let p = 1
            const test = new discord.EmbedBuilder();
                test.setTitle(`**__Challenging ${usertabledata[0].area}-${usertabledata[0].stage}__**`)
                test.setDescription(`**ROUND ${p}**`)    
                test.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`})
                test.setImage('attachment://test.png')
            
            for (let i = 0;i<=team.length-1; i++){
            test.addFields({name:`${team[i].character} ${team[i].element}`, value:`${team[i].hp}/${team[i].hp} ${enemyhp(team[i].hp,team[i].hp)}`})}
            test.addFields({name : 'mana', value: `mana ${manabar(manavaluser)}`})
            for (let i = 0;i<=enemy.length-1;i++){
            test.addFields({name:`${enemy[i].character} ${enemy[i].element}`,value:`${enemy[i].hp}/${enemy[i].hp} ${enemyhp(enemy[i].hp,enemy[i].hp)}`})}
            test.addFields({name : 'mana', value: `mana ${manabar(manavalenemy)}`},{name:'battle details', value: `<@${user_id}>'s team attacks first.`})    
            test.setTimestamp()
            test.setFooter({text:'Support the bot, contact [    ]#3780'})
            await interaction.editReply({embeds:[test], components:[userbutton,enemybutton], files:[attachment]});           
            let idofbottleinteraction
            interaction.fetchReply()
        .then (reply=> idofbottleinteraction = reply.id)
        let teamcopy = JSON.parse(JSON.stringify(team))
        let enemycopy = JSON.parse(JSON.stringify(enemy))
        let cardattacked
        let cardattackedoghp
        let cardused=new Array()
        let cardattack
        let enemymodhp = new Object()
        let carddamage
        let enemydamage = 0
        let userattackedcard
        let enemyattack
        let usercarddead = []
        let usermodhp = new Object()
        let enemydead = [];
        let livingenemy = []
        let livingcard = []
        let talentactivationuser = []
        let stunned = []
        let crit = [12,32,97,47,37]
        let evas = [1,5,95,45,27]
function critline(a) {if(a ==1){return ''}else{return 'It\'s a **CRITICAL HIT!!**.'}}
function evasline(a,b,c,d){if (a == 1){return `${c.character} attacked ${b.character} and did ${d} damage.`}
else if(a==0){return `${b.character} successfully evaded the ${c.character}'s attack.`}}
        async function endgame (){
            let useritem = await item.find({user_id :user_id})
            if (usertabledata[0].max_stage<usertabledata[0].leveluniqueid){
                usertabledata[0].max_stage = usertabledata[0].leveluniqueid
            await usertabledata[0].save()
            
            useritem[0].gold = useritem[0].gold + 50
        await useritem[0].save()}
        // else {}
            if(staminadataexe[0].user_xp < staminadataexe[0].user_xp_limit){
                staminadataexe[0].user_xp = staminadataexe[0].user_xp + 1
                await staminadataexe[0].save()}
            
                collector.stop()}
        
        for (let c = 0;c<=userbutton.components.length-2;c++){
            usermodhp[`${userbutton.components[c].customId}`] = team[c].hp}

        for (let c = 0;c<=enemybutton.components.length-1;c++){
            enemymodhp[`${enemybutton.components[c].customId}`] = enemy[c].hp}    

        const filter = i => i.user.id === interaction.user.id&& idofbottleinteraction===i.message.id;
        const collector = interaction.channel.createMessageComponentCollector({filter, componentType: discord.ComponentType.Button, time: 300000 });
        collector.on('collect', async i => {
            let abilityactivate = false

            if (['enemy1', 'enemy2', 'enemy3'].includes(i.customId)) {
                console.log('nbgrfbrs')
                cardattack = undefined
                for (let j = 0; j<=enemybutton.components.length-1;j++){
                for (let kbc = 0; kbc <= enemy.length-1;kbc++){
                    console.log(enemybutton.components)
                    if(enemybutton.components[j].customId==i.customId && enemybutton.components[j].label == enemy[kbc].character){

                cardattacked= enemy[kbc]
                cardattacked.button_id = i.customId
                cardattackedoghp = enemy[kbc].hp         }}}

                for (let abi =0;abi<=enemybutton.components.length-1;abi++){
                    enemybutton.components[abi].setDisabled(true)}
                for (let pi = 0; pi<= userbutton.components.length-1; pi++){
                    if (cardused.includes(userbutton.components[pi].customId)||usercarddead.includes(userbutton.components[pi].customId)
                    ||stunned.includes(userbutton.components[pi].customId))
                        {userbutton.components[pi].setDisabled(true)}
                    else {userbutton.components[pi].setDisabled(false)}}
                        i.fetchReply()
                .then(reply=> reply.removeAttachments())
                        await i.update({embeds:[test],components:[userbutton,enemybutton]})}

let stunset  = new Set()
usercarddead.forEach(element=>{stunset.add(element)})
stunned.forEach(element=>{stunset.add(element)})
cardused.forEach(element=>{stunset.add(element)})
            if(['card1','card2','card3'].includes(i.customId)||stunset.size==team.length){
                for (let j = 0; j<=userbutton.components.length-1;j++){
                    if (i.customId == userbutton.components[j].customId){
                        cardused.push(i.customId)
                        for (let kbc = 0; kbc <= team.length-1;kbc++){
                            if(userbutton.components[j].label == team[kbc].character && j==kbc){
                                    cardattack = team[kbc]
                                cardattack.button_id= userbutton.components[j].customId}}}}

            for(let f = 0;f<=userbutton.components.length-1;f++){
                userbutton.components[f].setDisabled(true)}
            for (let f = 0;f<=enemybutton.components.length-1;f++){
                enemybutton.components[f].setDisabled(true)}

if (cardattack == undefined){
    await wait(2000)
    for (let y = 0;y<=stunned.length-1;y++){
        if (!cardused.includes(stunned[y])){
        for (let l =0;l<=team.length-1;l++){if (stunned[y]==team[l].button_id){
            cardused.push(stunned[y])
            cardattack = team[l]
            cardattack.stun = false
            cardattack.element = cardattack.orielement
            test.data.fields[l]={name:`${cardattack.character} ${cardattack.element}`,value :`${usermodhp[`${cardattack.button_id}`]}/${cardattack.hp} ${enemyhp(usermodhp[`${cardattack.button_id}`],cardattack.hp)}`}
            stunned.splice(y,1)
            break}}
            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${cardattack.character} is stunned. It cannot attack.`}
           await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
           await wait(3000)           
        }}
    }else{            
            //ELEMENTAL DAMAGE/CRIT/EVASION OF ENEMY
            let elementalDamage = elements(cardattack.element,cardattacked.element)
            if (elementalDamage==undefined){elementalDamage=0}            

            
            //TALENT ACTIVATION

                    let talenteffect =talent(cardattack,p,usermodhp,enemymodhp,
                        cardattacked,usercarddead,talentactivationuser,
                        enemydead,manavaluser,teamcopy,enemycopy,team,enemy,enemydamage)
                    if (talenteffect[0].length>0){
                        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${talenteffect[0]}`}
                        manavaluser = talenteffect[3]
                        test.data.fields[team.length]={name:'Mana',value:`mana${manabar(talenteffect[3])}`}
                    if (talenteffect[1]!=undefined){test.data.fields[talenteffect[1]]=talenteffect[2]}
                    await i.update({embeds:[test],components:[userbutton,enemybutton]})
                    abilityactivate = true      
                    await wait(3000)}
            let evasion = 1
            let critical = 1
            let iuy = number()
            if (crit.includes(iuy)||cardattack.precision.includes(iuy)){critical = 2}
            else if (evas.includes(iuy)||cardattack.evasion.includes(iuy)){evasion = 0}                
                manavaluser = manavalue(manavaluser,p,evasion,critical)
                
            // surge(cardattack,cardattack.rarity,carddamage,usermodhp)
            
            //ABILITY KILL
            if (enemymodhp[`${cardattacked.button_id}`] <=0){
                if (enemydead.length == enemybutton.components.length){
                    test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${talenteffect[0]}\nALL ENEMIES DEAD. YOU WIN!!`}
                endgame()
                await i.editReply({embeds:[test],components:[]})
                return
                }else{
                    enemy.forEach(element=>{
                        if (!enemydead.includes(element.button_id)){cardattacked = element
                            cardattackedoghp = element.hp}
            })}}    
                                
            //DAMAGE FORMULA FOR USERS
            carddamage = Math.floor((cardattack.attack-cardattacked.defense)+(cardattack.agility/2 - cardattacked.agility/2)+(elementalDamage*cardattack.attack))*critical*evasion
            if(carddamage<0){carddamage = 0} 
            
            enemymodhp[`${cardattacked.button_id}`] = enemymodhp[`${cardattacked.button_id}`]-carddamage
            if (enemymodhp[`${cardattacked.button_id}`]<=0){
                enemymodhp[`${cardattacked.button_id}`]=0}

            //IF ENEMY HP LESS THAN ZERO
            if (enemymodhp[`${cardattacked.button_id}`]<=0){
                enemydead.push(cardattacked.button_id)
                test.data.fields[cardattacked.position]={name:`${cardattacked.character} ${cardattacked.element}`,value :`0/${cardattackedoghp} ${enemyhp(0,cardattackedoghp)}`}
                test.data.fields[team.length]={name:'Mana',value:`mana${manabar(manavaluser)}`}
                if (enemydead.length != enemybutton.components.length){
                test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did ${carddamage} damage.${critline(critical)}\n${cardattacked.character} is defeated`}
                if (abilityactivate == true&&enemydead.length != enemybutton.components.length){await i.editReply({embeds:[test],components:[userbutton,enemybutton]})}
                    else{await i.update({embeds:[test],components:[userbutton,enemybutton]})}
                }else if (enemydead.length == enemybutton.components.length){  
                    test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did ${carddamage} damage.${critline(critical)}\n${cardattacked.character} is defeated\nALL ENEMIES DEAD. YOU WIN!!`}
                    endgame()
                    if (abilityactivate == true){await i.editReply({embeds:[test],components:[]})}
                        else{await i.update({embeds:[test],components:[]})}
                            return }}
                            
            //IF ENEMY HP MORE THAN ZERO
            if(enemymodhp[`${cardattacked.button_id}`]>0){
            test.data.fields[team.length]={name:'Mana',value:`mana ${manabar(manavaluser)}`}
            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${evasline(evasion,cardattacked,cardattack,carddamage)}${critline(critical)}`}
            test.data.fields[cardattacked.position]= {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattackedoghp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattackedoghp)}`}
                                
            if (abilityactivate == true){await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
            }else{await i.update({embeds:[test],components:[userbutton,enemybutton]})}}    
}                    
        //Selecting the enemy
            for (let z = 0; z<=enemy.length-1;z++){
                if (!enemydead.includes(enemy[z].button_id)){
                        livingenemy.push(enemy[z])}}

            let enemyattacktemp
            if (livingenemy.length>1){
                enemyattacktemp = livingenemy[Math.floor(Math.random()*livingenemy.length)]
                enemyattack = enemyattacktemp}
            else {enemyattack=livingenemy[0]}
            livingenemy=[]

            if (enemyattack.stun == true){
                await wait(3000)
                enemyattack.stun = false
                enemyattack.element = enemyattack.orielement
                let t = enemyattack.button_id.split('')
                test.data.fields[enemyattack.position] = {name:`${enemyattack.character} ${enemyattack.element}` ,value :`${enemymodhp[`${enemyattack.button_id}`]}/${enemyattack.hp} ${enemyhp(enemymodhp[`${enemyattack.button_id}`],enemyattack.hp)}`}
                test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} is stunned so it cannot attack.`}
                await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                await wait(3000)
            }else{
                    //SELECTING USERCARD THAT IS TO BE ATTACKED
                    for (let z = 0; z<=team.length-1;z++){
                        if (!usercarddead.includes(team[z].button_id)){
                        livingcard.push(team[z])}
                    }
                    
                    let lk
                    if (livingcard.length==1){lk=47}            
                    else{ lk = number()}
                    //Selecting random usercard
                    if (lk>70){
                            userattackedcard = livingcard[Math.floor(Math.random()*livingcard.length)]
                            livingcard=[]}
                    //Selecting first character of team            
                    else if(lk<=70){
                        userattackedcard = livingcard[0]
                                livingcard=[]}
                
                    //crit evasion of user and elemental damage to user
                    
                        let enemyelementalDamage = elements(enemyattack.element,userattackedcard.element)
                        if (enemyelementalDamage==undefined){enemyelementalDamage=0}

            let enemytalenteffect =talent(enemyattack,p,enemymodhp,usermodhp,
                     userattackedcard,enemydead,talentactivationuser,
                     usercarddead,manavalenemy,enemycopy,teamcopy,enemy,team,carddamage)
                     if (enemytalenteffect[0].length>0){
                        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemytalenteffect[0]}`}
                        manavalenemy = enemytalenteffect[3]
                        test.data.fields[team.length+enemybutton.components.length+1]={name:'Mana',value:`mana${manabar(enemytalenteffect[3])}`}
                    if (enemytalenteffect[1]!=undefined){test.data.fields[enemytalenteffect[1]]=enemytalenteffect[2]}
                    await wait(3000)
                    await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                    abilityactivate = true      
                    }
            if (userattackedcard.stun ==true&&!stunned.includes(userattackedcard.button_id))
            {stunned.push(userattackedcard.button_id)}

            let evasion = 1
            let critical = 1
                    let yui = number()    
                    if (evas.includes(yui)||enemyattack.evasion.includes(yui)){ 
                        evasion = 0}
                    if (crit.includes(yui)||enemyattack.precision.includes(yui)){
                        critical = 2}
                await wait(3000)    
                manavalenemy = manavalue(manavalenemy,p,evasion,critical)
                test.data.fields[team.length+enemybutton.components.length+1]={name:'Mana',value:`mana${manabar(manavalenemy)}`}
                       
                if (usermodhp[`${userattackedcard.button_id}`] <=0){
                        if (usercarddead.length == userbutton.components.length-1){
                            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemytalenteffect[0]}\nYOU WERE DEFEATED!!`}
                        await i.editReply({embeds:[test],components:[]})
                        return
                        }else{team.forEach(element=>{
                            if (!usercarddead.includes(element.button_id)){userattackedcard=element}
                        })}
                    }   
                
                //Damage formula for enemy
                enemydamage = Math.floor((enemyattack.attack-userattackedcard.defense-(enemyattack.agility/2 - userattackedcard.agility/2))+(enemyelementalDamage*enemyattack.attack))*critical*evasion
                if (enemydamage<0){enemydamage=0}

                usermodhp[`${userattackedcard.button_id}`] = (usermodhp[`${userattackedcard.button_id}`]-enemydamage)
                
                if (enemyattack.talent_id==3){
                    let hpregen = surge(enemyattack,enemydamage,enemymodhp,userbutton.components.length,enemy,talentactivationuser)
                for (let o = 0;o<=hpregen[0].length-1;o++){
                    test.data.fields[hpregen[0][o]] = hpregen[1][o]
                }}

                if (usermodhp[`${userattackedcard.button_id}`]<=0){ 
                                usercarddead.push(userattackedcard.button_id)
                                test.data.fields[userattackedcard.position]={name:`${userattackedcard.character} ${userattackedcard.element}` ,value :`0/${userattackedcard.hp} ${enemyhp(0,userattackedcard.hp)}`}
                                if (usercarddead.length!=userbutton.components.length-1){
                                test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did ${enemydamage} damage.${critline(critical)}\n${userattackedcard.character} is defeated`}
                                await i.editReply({embeds:[test],components:[userbutton,enemybutton]})}
                                else if (usercarddead.length==userbutton.components.length-1){
                                       test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did ${enemydamage} damage.${critline(critical)}\n${userattackedcard.character} is defeated\nYOU WERE DEFEATED`}
                                       await i.editReply({embeds:[test],components:[]})
                                       return
                                    }}

                if (usermodhp[`${userattackedcard.button_id}`]>0){
                        test.data.fields[userattackedcard.position]={name:`${userattackedcard.character} ${userattackedcard.element}` ,value :`${usermodhp[`${userattackedcard.button_id}`]}/${userattackedcard.hp} ${enemyhp(usermodhp[`${userattackedcard.button_id}`],userattackedcard.hp)}`}
                        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${evasline(evasion,cardattacked,cardattack,carddamage)}${critline(critical)}`}
                        await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                }}
                let roundchange = new Set()
                cardused.forEach(element=>{roundchange.add(element)})
                usercarddead.forEach(element=>{roundchange.add(element)})
                if (roundchange.size==userbutton.components.length-1){
                    let taleffect = talfect(talentactivationuser,userbutton,team,p,usermodhp,enemymodhp
                        ,cardattacked,usercarddead,enemydead,enemybutton,enemy)
                    if (taleffect[0].length>1){
                        await wait(3000)
                        for (let j = 0;j<=taleffect[1].length-1;j++){
                        test.data.fields[taleffect[1][j]]=taleffect[2][j]}
                        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${taleffect[0]}`}        
                        if (usercarddead.length==userbutton.components.length-1){
                            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${taleffect[0]}\nYOU WERE DEFEATED`}   
                            await i.editReply({embeds:[test],components:[]})
                            return
                        }else if(enemydead.length == enemybutton.components.length){
                            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${taleffect[0]}\nALL ENEMIES DEAD. YOU WIN!!`}
                            await i.editReply({embeds:[test],components:[]})
                            endgame()
                        return}
                        await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                    await wait(3000)}
                    p = p +1
                    test.setDescription(`**ROUND ${p}**`)
                        cardused = []
                }
                for (let k = 0;k<=enemybutton.components.length-1;k++){
                    if(enemydead.includes(enemybutton.components[k].customId)){
                        enemybutton.components[k].setDisabled(true)
                    }else{enemybutton.components[k].setDisabled(false)}}
                    for (let k = 0;k<=userbutton.components.length-1;k++){
                        if(userbutton.components[k].customId=='deleting'){
                            userbutton.components[k].setDisabled(false)}}

                    await i.editReply({embeds:[test],components:[userbutton,enemybutton]})}
            else if (i.customId === 'deleting'){
                i.fetchReply()
                .then(reply=> reply.removeAttachments(),
                collector.stop())             
                await i.update({content:'You forfeit the battle',embeds:[],components:[]})}       
    })

    }}}}}
}}

export{ping}