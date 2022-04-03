//TALENTS
import { All_Cards as cardss,enemyhp} from '/ASHWIN/JavaScript/disc_cards.js';
//return key = [battle detail,[hpposition],[hp],manachange]

function talent(a,rarity,p,usermodhp,enemymodhp,cardattackedID
    ,cardattacked,usercarddead,talentactivationuser ,teamposition,userattackedid,
    userattackedcard,enemybutton,userbutton,enemydead,manaval  ){
    let line = ''
    let hpposition = 0
    let hpreturn = 0
    let manachange = false

if (a.talent_id == 1){        
//overload
if (p==1){
    talentactivationuser.push({[`${a.button_id}`]:teamposition})
    let rare = ['',,60,70,80,90]
    let edb
    rare.forEach(element => {
        if (rarity == rare.indexOf(element))
        {edb = element
            a.attack = a.attack*((100+element)/100)}})
        line = line + `${a.character} uses ${a.talentname} and increases their attack by ${edb}%.`
    }    
        }
//elemental attack
if (a.talent_id == 2){
    manachange = true
    let hp
    let button
    let cardidenti
    if (manaval>4){
        manaval = manaval-5
    if(['card1','card2','card3','card4'].includes(a.button_id)){
        hp = enemymodhp
        cardidenti = cardattackedID
    button = [enemybutton,userbutton.components.length]}
    else {hp = usermodhp
        cardidenti = userattackedid
    button=[userbutton,0]
cardattacked = userattackedcard}
    let rare = ['',,10,15,20,25]
    let edb
    rare.forEach(element => {
        if (rarity == rare.indexOf(element))
        {edb = element}})
        hp[`${cardidenti}`]=hp[`${cardidenti}`]- (Math.floor((edb/100)*a.attack))
        for (let x =0;x<=button[0].components.length-1;x++){
            if (button[0].components[x].customId==cardidenti){
            hpposition = button[1]+x}
            hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${hp[`${cardidenti}`]}/${cardattacked.hp} ${enemyhp(hp[`${cardidenti}`],cardattacked.hp)}`}}
    if (hp[`${cardidenti}`]<=0){
        hp[`${cardidenti}`]=0
        if (hp == usermodhp){
            usercarddead.push(a.team_id)}else{enemydead.push(a.team_id)}
    line = line + `${a.character} uses ${a.talentname} and does ${Math.floor((edb/100)*a.attack)} damage.
    ${cardattacked.character} is defeated.`}
    else {line = line + `${a.character} uses ${a.talentname} and does ${Math.floor((edb/100)*a.attack)} damage.`}
    }}
if (a.talent_id==3){
    if(['card1','card2','card3','card4'].includes(a.button_id)){
        hp = usermodhp}else{hp = enemymodhp}
        
}
return [line,hpposition,hpreturn,manachange]
}

function talenteffect(talentactivationuser,userbutton,team,p,usermodhp,enemymodhp,cardattackedID
    ,cardattacked,usercarddead,enemydead){
        let cards = []
        let line = ''
        let hp
        let button
    let hpreturn
    let hpposition
    talentactivationuser.forEach(element => {
        for (let x = 0;x<=userbutton.components.length -1;x++){
    if (userbutton.components[x].customId==Object.getOwnPropertyNames(element)[0])
            {team[x].team_id = Object.getOwnPropertyNames(element)[0]
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

function surge(){}

export{talent,talenteffect,surge}