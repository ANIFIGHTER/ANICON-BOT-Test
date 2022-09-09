import { All_Cards as cardss,enemyhp,elements} from '/ASHWIN/JavaScript/disc_cards.js';

function taleffect(cardattack,cardattacked,manavaluser,manavalenemy,hp){
    let manaval
    let line = ''
    let hpposition 
    let hpreturn = 0
//RAVAGE       
if (cardattack.talent_id == 1){
    if (!cardattack.status.includes('ravage')){
cardattack.status.push('ravage')
let rare = ['',,60,70,80,90]
cardattack.attack = cardattack.attack*((100+rare[cardattack.rarity])/100)
line = line + `${cardattack.character} uses ravage and increases their attack by ${rare[cardattack.rarity]}%.`}
}
//ELEMENTAL DRIVE
else if ([2,4].includes(cardattack.talent_id)){
    if (cardattack.temp==1){manaval = manavaluser}
    else{manaval = manavalenemy}
    if (manaval>4){
        manaval = manaval-5   
    let rare = ['',,10,15,20,25]
    let edb
    let dam
    rare.forEach(element => {
        if (cardattack.rarity == rare.indexOf(element))
        {edb = element}})
        let g = elements(cardattack.element,cardattacked.element)
        if (g==undefined){g = 0}
        
        if(cardattack.talent_id==2){dam=Math.floor(((edb/100)*cardattack.attack)+((g/5)*cardattack.attack))}
        else{dam = Math.floor(((edb/100)*cardattack.defense)+((g/5)*cardattack.defense))}
            hp[`${cardattacked.position}`]=Math.floor(hp[`${cardattacked.position}`]- dam)    
                
            if (hp[`${cardattacked.position}`]<=0){
            hp[`${cardattacked.position}`]=0
            line = line + `${cardattack.character} uses elemental drive and dealt ${dam} damage.
            ${cardattacked.character} is defeated.`}
            else {line = line + `${cardattack.character} uses elemental drive and dealt ${dam} damage to ${cardattacked.character}.`}
            hpposition = cardattacked.position
            hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${hp[`${cardattacked.position}`]}/${cardattacked.hp} ${enemyhp(hp[`${cardattacked.position}`],cardattacked.hp)}`}
    }
}

return [line,hpposition,hpreturn,manaval]
}


function talfect(enemy,team,usermodhp,enemymodhp,p,usercarddead,enemydead){
    let hp
    let line = ''
    let hpposition = []
    let hpreturn = []
    let add = team.concat(enemy)

    add.forEach(a => {
    if (a.status.includes('ravage')){        
        if(a.temp == 1){
            hp = usermodhp}else {hp = enemymodhp}
    //OVERLOAD
        if (hp[`${a.position}`]>0){
            if (p<6){hp[`${a.position}`]= Math.floor(hp[`${a.position}`]-(a.hp*0.2))
        if (hp[`${a.position}`]<=0){hp[`${a.position}`]=0
        if (hp == usermodhp){
        usercarddead.push(a.position)}else{enemydead.push(a.position)}
            line = line + `${a.character}'s HP decreases by 20 %. ${a.character} is defeated.`}
        else {line = line +`${a.character}'s HP decreases by 20 %.`}
            hpposition.push(a.position)
            hpreturn.push({name:`${a.character} ${a.element}`,value :`${hp[`${a.position}`]}/${a.hp} ${enemyhp(hp[`${a.position}`],a.hp)}`}) }
    }}
        
    });
    return [line,hpposition,hpreturn]
}

export{taleffect,talfect}