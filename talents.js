//TALENTS
import { All_Cards as cardss,enemyhp,elements} from '/ASHWIN/JavaScript/disc_cards.js';
//return key = [battle detail,[hpposition],[hp]]

function talent(a,p,usermodhp,enemymodhp,cardattacked,usercarddead,
    talentactivationuser,enemybutton,userbutton,enemydead,manaval){
    let line = ''
    let hpposition = 0
    let hpreturn = 0

if (a.talent_id == 1){        
//overload
if (!talentactivationuser.includes(a.button_id)){
    talentactivationuser.push(a.button_id)
    let rare = ['',,60,70,80,90]
    let edb
    rare.forEach(element => {
        if (a.rarity == rare.indexOf(element))
        {edb = element
            a.attack = a.attack*((100+element)/100)}})
        line = line + `${a.character} uses ravage and increases their attack by ${edb}%.`
    }    
        }
//elemental attack
if (a.talent_id == 2){
    if (manaval>4){
        manaval = manaval-5   
    let rare = ['',,10,15,20,25]
    let edb
    rare.forEach(element => {
        if (a.rarity == rare.indexOf(element))
        {edb = element}})

        enemymodhp[`${cardattacked.button_id}`]=enemymodhp[`${cardattacked.button_id}`]- (Math.floor((edb/100)*a.attack)+((elements(a.element,cardattacked.element)/5)*a.attack))
        for (let x =0;x<=enemybutton.components.length-1;x++){
            if (enemybutton.components[x].customId==cardattacked.button_id){
            hpposition = userbutton.components.length+x}}
            hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattacked.hp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattacked.hp)}`}
    if (enemymodhp[`${cardattacked.button_id}`]<=0){
        enemymodhp[`${cardattacked.button_id}`]=0
        hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattacked.hp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattacked.hp)}`}
        enemydead.push(cardattacked.button_id)
    line = line + `${a.character} uses elemental drive and dealt ${Math.floor((edb/100)*a.attack)} damage.
    ${cardattacked.character} is defeated.`}
    else {line = line + `${a.character} uses elemental drive and dealt ${Math.floor((edb/100)*a.attack)} damage.`}
    }}
if (a.talent_id==3){
    if ((usermodhp[`${a.button_id}`]/a.hp)*100<50&&!talentactivationuser.includes(a.button_id)){
        talentactivationuser.push(a.button_id)
        let rare = ['',,75,80,85,90]
        let edb    
        rare.forEach(element => {
            if (a.rarity == rare.indexOf(element))
            {edb = element}})
            line = line + `${a.character} uses lifesteal and restores health of whole team by ${edb}%.`
    }
        
}
// if (firstimeactivate==false){
// for (let x = 0;x<enemy.length;x++){
//     if (enemy[x].talent_id==4){line = line + `${enemy[x].character} uses **Fighting Sprit** and increases their defense by 20%. `}}
// for (let x = 0;x<team.length;x++){
//     if (team[x].talent_id==4){line = line + `${team[x].character} uses **Fighting Sprit** and increases their defense by 20%. `}}
    // }
return [line,hpposition,hpreturn,manaval]
}

function talenteffect(talentactivationuser,userbutton,team,p,usermodhp,enemymodhp,
    cardattacked,usercarddead,enemydead){
        let cards = []
        let line = ''
        let hp
        let button
    let hpreturn
    let hpposition
    
    talentactivationuser.forEach(element => {
        for (let x = 0;x<=userbutton.components.length -1;x++){
    if (userbutton.components[x].customId==element)
            {team[x].team_id = element
            cards.push(team[x]) }}})

cards.forEach(a=>{ 
    if(['card1','card2','card3','card4'].includes(a.team_id)){
        hp = usermodhp
    button = [userbutton,0]}else {hp = enemymodhp
    button=[enemybutton,userbutton.components.length]}
if (a.talent_id == 1){
//OVERLOAD
    if (hp[`${a.team_id}`]>0){
        if (p<6){hp[`${a.team_id}`]= Math.floor(hp[`${a.team_id}`]-(a.hp*0.1))
    if (hp[`${a.team_id}`]<=0){hp[`${a.team_id}`]=0
    if (hp == usermodhp){
    usercarddead.push(a.team_id)}else{enemydead.push(a.team_id)}
        line = line + `${a.character}'s hp decreases by 10 %. ${a.character} is defeated.`}
    else {line = line +`${a.character}'s hp decreases by 10 %.`}
    for (let x =0;x<=button[0].components.length-1;x++){
        if (button[0].components[x].customId==a.team_id){
        hpposition = button[1]+x}
        hpreturn = {name:`${a.character} ${a.element}`,value :`${hp[`${a.team_id}`]}/${a.hp} ${enemyhp(hp[`${a.team_id}`],a.hp)}`} }
}   else if (p>=6){cardss.forEach(element=>{if (a.unique_ID == element.unique_ID){
    a.attack = element.attack}})
}}}
})
return [line,hpposition,hpreturn]}

function surge(attackingcard,damage,hp,position,team,talentactivationuser){
    let positioning = []
    let value = []
    if ((hp[`${attackingcard.button_id}`]/attackingcard.hp)*100<50&&talentactivationuser.includes(attackingcard.button_id)){
    let rare = ['',,0.75,0.8,0.85,0.90]
    let edb    
    rare.forEach(element => {
        if (attackingcard.rarity == rare.indexOf(element))
        {edb = element}})
let hpregen = edb*damage
        let living = []
        for(let x = 0;x<=team.length-1;x++){if (hp[`${team[x].button_id}`]>0){living.push(team[x].button_id)}}
        for (let y= 0;y<=living.length-1;y++){
        hp[`${living[y]}`]=Math.floor(hp[`${living[y]}`]+(hpregen/living.length)) 
        for(let x = 0;x<=team.length-1;x++){if (living[y]==team[x].button_id){
        if (hp[`${living[y]}`]>=team[x].hp){hp[`${living[y]}`]=team[x].hp}
    
    positioning.push((position+parseInt(living[y].split('')[living[y].split('').length-1]))-1)
    
    value.push({name:`${team[x].character} ${team[x].element}`,value :`${hp[`${living[y]}`]}/${team[x].hp} ${enemyhp(hp[`${living[y]}`],team[x].hp)}`})
        }}}}return [positioning,value]
}

export{talent,talenteffect,surge}