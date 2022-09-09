import discord from 'discord.js';
import canvass from 'canvas'
import {userid,gamedata,userdata,stamina,item,stage} from '/Ashwin/JavaScript/models.js'
import { All_Cards as cards, enemy as enemylist,enemyhp,manabar,manavalue,elements} from '/ASHWIN/JavaScript/disc_cards.js';
import {taleffect,talfect} from '/Ashwin/JavaScript/autotalents.js';
import util from 'util'
import dotenv from 'dotenv';
dotenv.config();

const wait = util.promisify(setTimeout);

function number() { return Math.floor(Math.random() * (200 - 1+1)) + 1}

const ping = {
	data: new discord.SlashCommandBuilder()
		.setName('autobattle')
		.setDescription('Start the Battle !!'),
        async execute(interaction) {
            if(interaction.user.id!='370958883239231499'){
                await interaction.reply('command disabled')}
        else{  
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
                                    team[b].status = []
                                team[b].hp = Math.floor(1.5*team[b].hp + (team[b].hp*0.2*teamdata[v].card_rarity)+(team[b].hp*0.01*teamdata[v].card_lvl))
                                team[b].attack = Math.floor(team[b].attack + (team[b].attack*0.2*teamdata[v].card_rarity) + (team[b].attack*0.01*teamdata[v].card_lvl))
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
            // const userbutton = new discord.MessageActionRow()
            // userbutton.addComponents(
            //     new discord.MessageButton()
            //     .setCustomId('deleting')
            //     .setLabel('Forfeit')
            //     .setStyle('DANGER')
            // )
            
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
        test.addFields({name : 'mana', value: `mana ${manabar(manavalenemy)}`},{name:'**Battle Details**', value: `Battle starts in 2 seconds.`})    
        test.setTimestamp()
        test.setFooter({text:'Support the bot, contact [    ]#3780'})
    await interaction.editReply({embeds:[test], files:[attachment]});
await wait (5000)
    let teamcopy = JSON.parse(JSON.stringify(team))
    let enemycopy = JSON.parse(JSON.stringify(enemy))
    let usercard
    let enemycard
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
    let hp
    let dead
    let manasvalue
    let manaposition
    let turnchange = false
    let varendgame
    let alluserded
    let forfeit
    let cardturndone = []
    let enemyturndone =[]
    let enemydied = []
    let usercarddied = []
function critline(a) {if(a ==1){return ''}else{return 'It\'s a **CRITICAL HIT!!**.'}}
function evasline(a,b,c,d){if (a == 1){return `${c.character} attacked ${b.character} and did ${d} damage. `}
else if(a==0){return `${b.character} successfully evaded the ${c.character}'s attack.`}}        

for (let c = 0;c<=team.length-1;c++){
    usermodhp[`${team[c].position}`] = team[c].hp}

for (let c = 0;c<=enemy.length-1;c++){
    enemymodhp[`${enemy[c].position}`] = enemy[c].hp}

async function endgame (){
            let useritem = await item.find({user_id :user_id})
            if (usertabledata[0].max_stage<usertabledata[0].leveluniqueid){
                usertabledata[0].max_stage = usertabledata[0].leveluniqueid
            await usertabledata[0].save()}
            
            useritem[0].gold = useritem[0].gold + 100
        await useritem[0].save()
        // else {}
            if(staminadataexe[0].user_xp < staminadataexe[0].user_xp_limit){
                staminadataexe[0].user_xp = staminadataexe[0].user_xp + 1
                await staminadataexe[0].save()}
            return 'over'}
//     let idofautobattle
//     const filter = i => i.user.id === interaction.user.id&& idofautobattle===i.message.id;
//     const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 300000 });
    p = 1            
    while (p<=20){
//     collector.on('collect', async i => {        
//         if (i.customId === 'deleting'){
//             i.deleteReply()
//         }
//     })
        test.setDescription(`**ROUND ${p}**`)

if (turnchange==false){turnchange = true
    for (let c = 0;c<=team.length-1;c++){
        if (!cardused.includes(team[c].position)&&!usercarddead.includes(team[c].position)){
           usercard = team[c]
        break}}
        
    for (let c = 0;c<=enemy.length-1;c++){
        if(enemymodhp[`${enemy[c].position}`]>0){enemycard = enemy[c]
        break}}

    if (usercard.agility>=enemycard.agility){cardattack = usercard,cardattacked= enemycard
    cardattack.temp = 1,cardattacked.temp = 2,hp = enemymodhp,dead = enemydead
    manaposition = team.length,cardused.push(cardattack.position)
cardturndone.push(`${cardattack.position}${cardattacked.position}`)}
    else{cardattack= enemycard, cardattacked = usercard
    cardattack.temp = 2,cardattacked.temp = 1,hp = usermodhp,dead = usercarddead
       manaposition=team.length+enemy.length+1,enemyturndone.push(`${cardattack.position}${cardattacked.position}`)}}

else if (turnchange == true){
        turnchange = false
    if (hp[`${cardattacked.position}`]<=0){cardattack = undefined}
    else{
        let t = cardattack
        cardattack = cardattacked
        cardattacked = t
        if (cardattack.temp==1){cardused.push(cardattack.position),hp = enemymodhp
            dead = enemydead,manaposition = team.length,turnchange = false
        cardturndone.push(`${cardattack.position}${cardattacked.position}`) }
        else{hp = usermodhp,dead = usercarddead,enemyturndone.push(`${cardattack.position}${cardattacked.position}`)
            manaposition=team.length+enemy.length+1}}}
if (cardattack !=undefined){

    let talenteffect = taleffect(cardattack,cardattacked,manavaluser,manavalenemy,hp)
    if (talenteffect[0].length>1){
        test.data.fields[talenteffect[1]]=talenteffect[2]
        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${talenteffect[0]}`}
        test.data.fields[manaposition]={name:'Mana',value:`mana${manabar(talenteffect[3])}`}
        await interaction.editReply({embeds:[test]})
        await wait(5000)
    }
    if (hp[`${cardattacked.position}`]<=0){
        if (cardattack.temp==2){usercarddead.push(cardattacked.position)
        usercarddied.push(`${cardattacked.position}${cardattack.position}`)
        }else{
        enemydead.push(cardattacked.position)
        enemydied.push(`${cardattacked.position}${cardattack.position}`)}
        if (enemydead.length == enemy.length){
            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${talenteffect[0]}\nALL ENEMIES DEAD. YOU WIN!!`}
            varendgame = await endgame()
            await interaction.editReply({embeds:[test]})        
    await wait (5000)}
    else if(usercarddead.length == team.length){
        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${talenteffect[0]}\nYOU WERE DEFEATED.`}
        await interaction.editReply({embeds:[test]})
    await wait(5000),alluserded = true}}
    else{        
    let elementalDamage = elements(cardattack.element,cardattacked.element)
    if (elementalDamage==undefined){elementalDamage=0}

    let evasion = 1
    let critical = 1
    let iuy = number()
    if (crit.includes(iuy)||cardattack.precision.includes(iuy)){critical = 2}
    else if (evas.includes(iuy)||cardattack.evasion.includes(iuy)){evasion = 0}
if (cardattack.temp==1){
    manavaluser = manavalue(manavaluser,p,evasion,critical)
    manasvalue = manavaluser}
else{manavalenemy = manavalue(manavalenemy,p,evasion,critical)
    manasvalue = manavalenemy}

//DAMAGE FORMULA
carddamage = Math.floor((cardattack.attack-cardattacked.defense)+(cardattack.agility/2 - cardattacked.agility/2)+(elementalDamage*cardattack.attack))*critical*evasion
if(carddamage<0){carddamage = 0} 
hp[`${cardattacked.position}`] = hp[`${cardattacked.position}`]-carddamage
if (hp[`${cardattacked.position}`]<=0){
    hp[`${cardattacked.position}`]=0}

    //IF HP LESS THAN ZERO
    if (hp[`${cardattacked.position}`]<=0){
        if (cardattack.temp==2){usercarddead.push(cardattacked.position)
            usercarddied.push(`${cardattacked.position}${cardattack.position}`)
        }else{
            enemydead.push(cardattacked.position)
        enemydied.push(`${cardattacked.position}${cardattack.position}`)}
        test.data.fields[cardattacked.position]={name:`${cardattacked.character} ${cardattacked.element}`,value :`${hp[`${cardattacked.position}`]}/${cardattacked.hp} ${enemyhp(hp[`${cardattacked.position}`],cardattacked.hp)}`}
        test.data.fields[manaposition]={name:'Mana',value:`mana${manabar(manasvalue)}`}
        if (enemydead.length == enemy.length){
            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${evasline(evasion,cardattacked,cardattack,carddamage)}${critline(critical)}\n${cardattacked.character} is defeated.\nALL ENEMIES DEAD. YOU WIN!!`}
            varendgame = await endgame()
            await interaction.editReply({embeds:[test]})        
    await wait (5000)}
    else if(usercarddead.length == team.length){
        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${evasline(evasion,cardattacked,cardattack,carddamage)}${critline(critical)}\n${cardattacked.character} is defeated.\nYOU WERE DEFEATED.`}
        await interaction.editReply({embeds:[test]})
    await wait(5000),alluserded = true}
    else{test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${evasline(evasion,cardattacked,cardattack,carddamage)}${critline(critical)}\n${cardattacked.character} is defeated.`}
        await interaction.editReply({embeds:[test]})
        await wait(5000)}}
    
//IF HP MORE THAN ZERO
    if (hp[`${cardattacked.position}`]>0){
        test.data.fields[cardattacked.position]={name:`${cardattacked.character} ${cardattacked.element}`,value :`${hp[`${cardattacked.position}`]}/${cardattacked.hp} ${enemyhp(hp[`${cardattacked.position}`],cardattacked.hp)}`}
        test.data.fields[manaposition]={name:'Mana',value:`mana${manabar(manasvalue)}`}
        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${evasline(evasion,cardattacked,cardattack,carddamage)}${critline(critical)}`}
    await interaction.editReply({embeds:[test]})
    await wait(5000)
    }
    }
}if (varendgame=='over'||alluserded == true){break}
    let cardroundset = new Set()
    usercarddead.forEach(element=>cardroundset.add(element))
    cardused.forEach(element=>cardroundset.add(element))

    for(let a = 0;a<=enemydied.length-1;a++){
        if (!enemyturndone.includes(enemydied[a]))
        {enemyturndone.push(enemydied[a])}}
    for(let a = 0;a<=usercarddied.length-1;a++){
        if (!cardturndone.includes(usercarddied[a]))
        {cardturndone.push(usercarddied[a])}}
console.log(cardroundset,  enemyturndone,    cardturndone )
    if(cardroundset.size==team.length&&enemyturndone.length == cardturndone.length){
        cardused = []
        enemyturndone = []
        enemydied = []
        cardturndone = []
        usercarddied=[]
        turnchange = false
let olp = talfect(enemy,team,usermodhp,enemymodhp,p,enemydead)
if(olp[0].length>1){
    for (let j = 0;j<=olp[1].length-1;j++){
        test.data.fields[olp[1][j]]=olp[2][j]}
        test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${olp[0]}`}
        if (enemydead.length == enemy.length){
            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${taleffect[0]}\nALL ENEMIES DEAD. YOU WIN!!`}
            varendgame = await endgame()}
        else if(usercarddead.length == team.length){
            test.data.fields[test.data.fields.length-1] = {name :'BATTLE DETAILS', value :`${olp[0]}\nYOU WERE DEFEATED`}
            alluserded = true
        }await interaction.editReply({embeds:[test]})
    await wait (5000)}
        
if (varendgame=='over'||alluserded == true){break}
        if (forfeit==true){await interaction.deleteReply()}
        p++}
    }
}}}
}}}}}
export {ping}