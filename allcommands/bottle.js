import discord from 'discord.js';
import canvass from 'canvas'
import SlashCommandBuilder from '@discordjs/builders';
import mysql from 'mysql2';
import { All_Cards as cards, enemy as enemylist,enemyhp,manabar,manavalue,elements} from '/ASHWIN/JavaScript/disc_cards.js';
import util from 'util'
import dotenv from 'dotenv';
dotenv.config();

const wait = util.promisify(setTimeout);

//MYSQL PASSWORD
const possswd = process.env.SQLPASSWD;
// console.log(possswd)

// MYSQL CONNECTION
const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password:`${possswd}`,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    database: 'testgame'
  });
  
con.getConnection((err) => {
if (err) {
    return console.error('error: ' + err.message);
}
// console.log('Connected to the MySQL server.');
});

const dbQuery = (query) => new Promise((resolve, reject) => {
    con.query(query, (error, data) => {
      if(error) reject(error);
      else resolve(data);
    })
  });

function number() { return Math.floor(Math.random() * (100 - 1+1)) + 1}

const ping = {
	data: new SlashCommandBuilder.SlashCommandBuilder()
		.setName('bottle')
		.setDescription('Start the Battle !!'),
        async execute(interaction) {
            let user_id = interaction.user.id
            let enemy = []
            let userloc
            let usertabledata
            // interaction.client.options.restRequestTimeout(60000)
            let sql = `SELECT * FROM users WHERE USER_ID = '${user_id}'`;
        const sqlexe = await dbQuery(sql)
            if (sqlexe.length === 0){
                await interaction.reply('Not registered')}
                else{
                let cardsinteam = `Select * from gamedata where card_owner = ${user_id} and team_status is NOT NULL ORDER BY team_status`
                const cardsinteamexe = await dbQuery(cardsinteam)
                if (cardsinteamexe.length==0){
                    await interaction.reply('Your team is empty. Use /team set to equip cards in your team.')}
                    else{ let teamdata = cardsinteamexe
                    let staminadata = `SELECT * from userstamina where user_id = ${user_id}`
                    const staminadataexe = await dbQuery(staminadata)
                if (staminadataexe[0].stamina!=staminadataexe[0].stamlimit){
                    let newstam =Math.floor((Date.now()-Date.parse(String(staminadataexe[0].lastupstam)))/2400000+staminadataexe[0].stamina)
                    let staminaupdate = `UPDATE userstamina set stamina = ${newstam}, lastupstam = now() where user_id = ${user_id}`
                    await dbQuery(staminaupdate)
                    if (newstam>=staminadataexe[0].stamlimit){newstam = staminadataexe[0].stamlimit-1}
                    if(newstam<2){await interaction.reply({content:'You don\'t have enough tickets to join a battle'})}
                    else{ 
                    let staminaincrease = `UPDATE userstamina set stamina = ${newstam-2}, lastupstam = now() where user_id = ${user_id}`
                    await dbQuery(staminaincrease)
                    let xyz = `Select * from userdata where user_id =${user_id}`;
                const xyzexe = await dbQuery(xyz)
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
                                if (team[b].uniqueID==teamdata[v].card_unique_id&&b+1==teamdata[v].team_status)
                                {team[b].hp = Math.floor(team[b].hp + (0.02*teamdata[v].card_lvl*team[b].hp)+(team[b].hp*0.2*teamdata[v].card_rarity))
                                team[b].attack = Math.floor(team[b].attack + (team[b].attack*0.2*teamdata[v].card_rarity) + (team[b].attack*0.02*teamdata[v].card_lvl))
                                team[b].defense = Math.floor(team[b].defense + (team[b].defense*0.2*teamdata[v].card_rarity) + (team[b].defense*0.02*teamdata[v].card_lvl))
                                team[b].agility = Math.floor(team[b].agility + (team[b].agility*0.2*teamdata[v].card_rarity) + (team[b].agility*0.02*teamdata[v].card_lvl)) 
                            }}}
                            
            let enemiesquery = `Select * from stages where leveluniqueid = ${userloc}`
            const enemies = await dbQuery(enemiesquery)
                for(let x = 0; x <= enemies.length-1;x++){
                for (let k = 0; k<=enemylist.length-1;k++){
                if (enemies[x].enemy_unique_id == enemylist[k].uniqueID ){
                    enemy.push({...enemylist[k]})
                }}} 
            for (let b = 0; b<=enemy.length-1;b++){
                    for (let v = 0;v<=enemies.length-1;v++){
                        if(enemy[b].uniqueID==enemies[v].enemy_unique_id){
                    enemy[b].hp = Math.floor(2*enemy[b].hp + enemies[v].enemy_lvl*0.02*enemy[b].hp)
                    enemy[b].attack = Math.floor(1.2*enemy[b].attack + enemies[v].enemy_lvl*0.02*enemy[b].attack)
                    enemy[b].defense = Math.floor(1.5*enemy[b].defense + enemies[v].enemy_lvl*0.02*enemy[b].defense)
                    enemy[b].agility = Math.floor(1.5*enemy[b].agility + enemies[v].enemy_lvl*0.02*enemy[b].agility)
                        }}} 

            let manavaluser = 0
            let manavalenemy = 0
            const canvas = canvass.createCanvas(1150, 675);
            const context = canvas.getContext('2d')
            const background = await canvass.loadImage('https://cdn.discordapp.com/attachments/897181776982720563/900386586074693652/gradienta-LeG68PrXA6Y-unsplash_1.jpg')
            context.drawImage(background, 0, 0, canvas.width, canvas.height)
            for (let x = 0;x<=4;x++){
                if (team.length==x){break;}else{
            const hijk = await canvass.loadImage(team[x].artlink)
            let vbn = (25+(275*x))
            context.drawImage(hijk,vbn,25,275,300)}}

            for (let x = 0;x<=4;x++){
                if (enemy.length == x){break;}else{
            const kjhu = await canvass.loadImage(enemy[x].artlink)
            let vbn = (25+(275*x))
            context.drawImage(kjhu,vbn,350,275,300)}}
            
            const attachment = new discord.MessageAttachment(canvas.toBuffer());
            attachment.setName('test.png')
            
            const mainbar = new discord.MessageActionRow()
            mainbar
            
            const userbutton = new discord.MessageActionRow()
            for (let i = 0;i<=team.length-1; i++){
                userbutton.addComponents(
                    new discord.MessageButton()
                    .setCustomId(`card${i+1}`)
                    .setLabel(`${team[i].character}`)
                    .setStyle('PRIMARY')
                    .setDisabled(true)
                )
            }
            userbutton.addComponents(
                new discord.MessageButton()
                .setCustomId('deleting')
                .setLabel('Forfeit')
                .setStyle('DANGER')
            )
            const enemybutton = new discord.MessageActionRow()
            for (let i = 0; i <= enemy.length-1;i++){   
                enemybutton.addComponents(
                     new discord.MessageButton()
                    .setCustomId(`enemy${i+1}`)
                    .setLabel(`${enemy[i].character}`)
                    .setStyle('PRIMARY')
                )
            }
            let p = 1

            const test = new discord.MessageEmbed();
                test.setTitle(`**__Challenging ${usertabledata[0].location}-${usertabledata[0].area}-${usertabledata[0].stage}__**`)
                test.setDescription('Select your target')    
                test.setAuthor(interaction.user.tag,interaction.user.avatarURL())
                test.setImage('attachment://test.png')
            
            for (let i = 0;i<=team.length-1; i++){
            test.addFields({name:`${team[i].character} ${team[i].element}`, value:`${team[i].hp}/${team[i].hp} ${enemyhp(team[i].hp,team[i].hp)}`})}
            test.addFields({name : 'mana', value: `mana ${manabar(manavaluser)}`})
            for (let i = 0;i<=enemy.length-1;i++){
            test.addFields({name:`${enemy[i].character} ${enemy[i].element}`,value:`${enemy[i].hp}/${enemy[i].hp} ${enemyhp(enemy[i].hp,enemy[i].hp)}`})}
            test.addFields({name : 'mana', value: `mana ${manabar(manavalenemy)}`},{name:'battle details', value: 'details'})    
            test.setTimestamp()
            test.setFooter('Support the bot, contact [    ]#3780')
            await interaction.editReply({embeds:[test], components:[userbutton,enemybutton], files:[attachment]});           
            let idofbottleinteraction
            interaction.fetchReply()
        .then (reply=> idofbottleinteraction = reply.id)

        let cardattacked
        let cardattackedoghp
        let cardused=new Array()
        let cardattack
        let enemymodhp = new Object()
        let carddamage
        let cardattackedID
        let enemydamage = 0
        let userattackedcard
        let userattackedid
        let enemyattack
        let usercarddead = []
        let usermodhp = new Object()
        let enemydead = [];
        let crit = [12,32,97,47,37]
        let evas = [1,5,95,45,27,]
        
        for (let c = 0;c<=userbutton.components.length-2;c++){
            usermodhp[`${userbutton.components[c].customId}`] = team[c].hp}
        for (let c = 0;c<=enemybutton.components.length-1;c++){
            enemymodhp[`${enemybutton.components[c].customId}`] = enemy[c].hp}    

        const filter = i => i.user.id === interaction.user.id&& idofbottleinteraction===i.message.id;
        const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 300000 });
        collector.on('collect', async i => {
            let evasion = 1
            let critical = 1
            let abilityactivate = false
            
            if (['enemy1', 'enemy2', 'enemy3', 'enemy4'].includes(i.customId)) {
                for (let j = 0; j<=enemybutton.components.length-1;j++){
                for (let kbc = 0; kbc <= enemy.length-1;kbc++){
                    if(enemybutton.components[j].customId==i.customId && enemybutton.components[j].label == enemy[kbc].character){

                cardattacked= enemy[kbc]
                cardattackedoghp = enemy[kbc].hp
                cardattackedID = i.customId                            }}}

                for (let abi =0;abi<=enemybutton.components.length-1;abi++){
                    enemybutton.components[abi].setDisabled(true)}
                for (let pi = 0; pi<= userbutton.components.length-1; pi++){
                    if (cardused.includes(userbutton.components[pi].customId)||usercarddead.includes(userbutton.components[pi].customId))
                        {userbutton.components[pi].setDisabled(true)}
                    else {userbutton.components[pi].setDisabled(false)}}
                        test.setDescription(`**ROUND ${p}**`)
                        i.fetchReply()
                .then(reply=> reply.removeAttachments())
                        await i.update({embeds:[test],components:[userbutton,enemybutton]})}
            else if(['card1','card2','card3','card4'].includes(i.customId)){
                for (let j = 0; j<=userbutton.components.length-1;j++){
                    if (i.customId == userbutton.components[j].customId){
                        cardused.push(i.customId)
                        for (let kbc = 0; kbc <= team.length-1;kbc++){
                            if(userbutton.components[j].label == team[kbc].character && j==kbc)
                                {cardattack = team[kbc]}}}}
            
            for(let f = 0;f<=userbutton.components.length-1;f++){
                userbutton.components[f].setDisabled(true)}
            for (let f = 0;f<=enemybutton.components.length-1;f++){
                enemybutton.components[f].setDisabled(true)}
            let iuy = number()
            if (crit.includes(iuy)){ critical = 2}
            else if (evas.includes(iuy)){evasion = 0}
            let elementalDamage = elements(cardattack.element,cardattacked.element)
            if (elementalDamage==undefined){elementalDamage=1}
            else{elementalDamage= Math.floor(elementalDamage*cardattack.attack)}
            //DAMAGE FORMULA FOR USERS         
            carddamage = Math.floor((cardattack.attack-cardattacked.defense)+(cardattack.agility - cardattacked.agility))*critical*evasion+elementalDamage
            console.log(evasion,critical,iuy,carddamage,'urefj')
            evasion=1
            critical=1
            enemymodhp[`${cardattackedID}`] = enemymodhp[`${cardattackedID}`]-carddamage
            console.log(enemymodhp)
            if (manavaluser >4){
                manavaluser = manavaluser - 5
            test.fields[team.length]={name:'Mana',value:`mana ${manabar(manavaluser)}`}
            test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} activates their ability.`}
            await i.update({embeds:[test],components:[userbutton,enemybutton]})
            abilityactivate = true      
            await wait(3000)}
            else{
            manavaluser = manavalue(manavaluser,p,evasion,critical)}
            console.log(enemymodhp[`${cardattackedID}`])    
            //IF ENEMY HP LESS THAN ZERO
            if (enemymodhp[`${cardattackedID}`] <=0){
                enemydead.push(cardattackedID)
                for (let x = 0; x<=enemybutton.components.length-1;x++){
                    if (cardattackedID === enemybutton.components[x].customId){
                        test.fields[team.length+1+x]={name:`${cardattacked.character} ${cardattacked.element}`,value :`0/${cardattackedoghp} ${enemyhp(0,cardattackedoghp)}`}}}
                        test.fields[team.length]={name:'Mana',value:`mana${manabar(manavaluser)}`}
                        if (enemydead.length != enemybutton.components.length){
                        if (critical == 2){
                            test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did critical ${carddamage} damage\n${cardattacked.character} is defeated`}}
                        else{test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did ${carddamage} damage\n${cardattacked.character} is defeated`}}
                        if (abilityactivate == true){await i.editReply({embeds:[test],components:[]})}
                                        else{await i.update({embeds:[test],components:[userbutton,enemybutton]})}
                        }if (enemydead.length == enemybutton.components.length){
                            console.log('it entered final stage')
                            if (critical == 2){
                                test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did critical ${carddamage} damage\n${cardattacked.character} is defeated\nALL ENEMIES DEAD. YOU WIN!!`}}
                            else{    
                            test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did ${carddamage} damage\n${cardattacked.character} is defeated\nALL ENEMIES DEAD. YOU WIN!!`}}
                                if (usertabledata[0].max_stage<usertabledata[0].leveluniqueid){
                                let maxstageupdate = `update userdata set max_stage = ${usertabledata[0].leveluniqueid} where user_id = ${user_id}`
                            await dbQuery(maxstageupdate)
                            let useritem = await dbQuery(`Select * from useritems where user_id = ${user_id}`)
                        await dbQuery(`update useritems set gold = ${useritem[0].gold+50} where user_id = ${user_id}`)}
                        // else {}
                            if(staminadataexe[0].user_xp < staminadataexe[0].user_xp_limit){
                                await dbQuery(`update userstamina set user_xp = ${parseInt(staminadataexe[0].user_xp)+1} where user_id = ${user_id}`)}
                            
                                collector.stop()}
                                if (abilityactivate == true){await i.editReply({embeds:[test],components:[]})}
                                        else{await i.update({embeds:[test],components:[]})}}
                            
                            //IF ENEMY HP MORE THAN ZERO
                            if(enemymodhp[`${cardattackedID}`]>0){
                                console.log('9684598656')
                                test.fields[team.length]={name:'Mana',value:`mana ${manabar(manavaluser)}`}
                                if(critical==2){
                                    test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did critical ${carddamage} damage`}}
                                else if (evasion==0){
                                    test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} but ${cardattacked.character} evaded`}}
                                else{
                                    test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${i.component.label} attacked ${cardattacked.character} and did ${carddamage} damage`}}    
                                for (let x = 0; x<=enemybutton.components.length-1;x++){
                                    if (cardattackedID === enemybutton.components[x].customId){
                                    test.fields[team.length+1+x]= {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattackedID}`]}/${cardattackedoghp} ${enemyhp(enemymodhp[`${cardattackedID}`],cardattackedoghp)}`}}}
                                
                                if (abilityactivate == true){await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                                }else{await i.update({embeds:[test],components:[userbutton,enemybutton]})}}    
                                
                    //Selecting the enemy
                    while (enemydead.length<enemybutton.components.length){
                    let enemyattacktemp = enemybutton.components[Math.floor(Math.random()*enemybutton.components.length)]
                    if (enemymodhp[`${enemyattacktemp.customId}`]>0){   
                    for(let m = 0;m<=enemy.length-1;m++){
                            if (enemyattacktemp.label==enemy[m].character){
                                enemyattack = enemy[m]}}break}}
                
                    //SELECTING USERCARD THAT IS TO BE ATTACKED
                    let lk
                    if (userbutton.components.length-1==1){lk=47}            
                    else{ lk = number()}
                    //Selecting random usercard
                    if (lk>50){
                        while(usercarddead.length<userbutton.components.length-1){
                            let userattackedtemp = userbutton.components[Math.floor(Math.random()*userbutton.components.length-1)]
                        console.log(userattackedtemp,'rtsefhyt')
                            if(usermodhp[`${userattackedtemp.customId}`]>0){
                            for(let m = 0;m<=team.length-1;m++){
                            if (userattackedtemp.label==team[m].character){
                                userattackedid = userattackedtemp.customId
                                userattackedcard = team[m]}}}break}}
                    //Selecting first character of team            
                    else if(lk<=50){
                        for (let cv = 0; cv <= userbutton.components.length-2;cv++){
                        if (usermodhp[`${userbutton.components[cv].customId}`]>0){
                            userattackedid = userbutton.components[cv].customId
                            for (let d = 0;d<=team.length-1;d++){
                                if (userbutton.components[cv].label == team[d].character){userattackedcard = team[d]
                                    break
                                }}
                        }}}
                
                    //Damage formula for enemy
                    let yui = number()    
                    if (evas.includes(yui)){ 
                        evasion = 0}
                    if (crit.includes(yui)){
                        critical = 2}
                enemydamage = Math.floor(((enemyattack.attack*1.5)-userattackedcard.defense-(enemyattack.agility - userattackedcard.agility))*critical*evasion)
                   console.log(yui,evasion,critical,enemydamage)
                   console.log(usermodhp)     
                    // const elementalDamage = elements(enemyattack.element,userattackedcard.element)
                    // if (elementalDamage==true){enemydamage= enemydamage+Math.floor(enemydamage/4)}
                    // else if (elementalDamage==false){enemydamage= enemydamage-Math.floor(enemydamage/4)}
                    // else if(elementalDamage==1){enemydamage= enemydamage-Math.floor(enemydamage/10)}
                    // else{enemydamage = enemydamage+0}
                usermodhp[`${userattackedid}`] = (usermodhp[`${userattackedid}`]-enemydamage)
                
                await wait(3000)
                
                if (manavalenemy >4){
                    manavalenemy = manavalenemy - 5
                test.fields[team.length]={name:'Mana',value:`mana ${manabar(manavalenemy)}`}
                test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} activates their ability.`}
                await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                abilityactivate = true
                await wait(3000)}
                else{
                manavalenemy = manavalue(manavalenemy,p,evasion,critical)}
                test.fields[team.length+enemybutton.components.length+1]={name:'Mana',value:`mana ${manabar(manavalenemy)}`}
                
                if (usermodhp[`${userattackedid}`]<=0){ 
                        for (let x = 0; x<=userbutton.components.length-1;x++){
                            if (userattackedid==userbutton.components[x].customId){
                                usercarddead.push(userattackedid)
                                test.fields[x]={name:`${userattackedcard.character} ${userattackedcard.element}` ,value :`0/${userattackedcard.hp} ${enemyhp(0,userattackedcard.hp)}`}}}
                                if (usercarddead.length!=userbutton.components.length-1){
                                if (critical==2){
                                    test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did critical damage ${enemydamage} damage\n${userattackedcard.character} is defeated`}
                                    await i.editReply({embeds:[test],components:[userbutton,enemybutton]})}
                                    else{
                                test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did ${enemydamage} damage\n${userattackedcard.character} is defeated`}}}
                                if (usercarddead.length==userbutton.components.length-1){
                                    if (critical==2){
                                        test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did critical damage ${enemydamage} damage\n${userattackedcard.character} is defeated`}}
                                    else{
                                       test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did ${enemydamage} damage\n${userattackedcard.character} is defeated\n YOU WERE DEFEATED`}}
                                       await i.editReply({embeds:[test],components:[]})
                                    }
                                await i.editReply({embeds:[test],components:[userbutton,enemybutton]})}
                if (usermodhp[`${userattackedid}`]>0){
                    for (let x = 0; x<=userbutton.components.length-1;x++){
                        if (userattackedid==userbutton.components[x].customId){
                            test.fields[x]={name:`${userattackedcard.character} ${userattackedcard.element}` ,value :`${usermodhp[`${userattackedid}`]}/${userattackedcard.hp} ${enemyhp(usermodhp[`${userattackedid}`],userattackedcard.hp)}`}}}
                            if (critical==2){
                                test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did critical damage ${enemydamage} damage.`}}
                            else if (evasion==0){
                                test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} but ${userattackedcard.character} evaded the attack successfuly.`}}
                            else{
                            test.fields[test.fields.length-1] = {name :'BATTLE DETAILS', value :`${enemyattack.character} attacked ${userattackedcard.character} and did ${enemydamage} damage.`}}
                            await i.editReply({embeds:[test],components:[userbutton,enemybutton]})
                }
                if (cardused.length+usercarddead.length==userbutton.components.length-1){
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