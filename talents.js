//TALENTS
import { All_Cards as cardss,enemyhp,elements} from '/ASHWIN/JavaScript/disc_cards.js';
//return key = [battle detail,[hpposition],[hp]]

function talent(a,p,usermodhp,enemymodhp,cardattacked,usercarddead,
    talentactivationuser,enemydead,manaval,teamcopy,enemycopy,team,enemy,
    enemydamage){
    let line = ''
    let hpposition 
    let hpreturn = 0

if (a.talent_id == 1){        
//overload
if (!talentactivationuser.includes(a.button_id)){
    talentactivationuser.push(a.button_id)
    a.status.push('ravage')
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
if ([2,4].includes(a.talent_id)){
    if (manaval>4){
        manaval = manaval-5   
    let rare = ['',,10,15,20,25]
    let edb
    rare.forEach(element => {
        if (a.rarity == rare.indexOf(element))
        {edb = element}})
        let g = elements(a.element,cardattacked.element)
        if (g==undefined){g = 0}
let dam
if(a.talent_id==2){dam=Math.floor(((edb/100)*a.attack)+((g/5)*a.attack))}
else{dam = Math.floor(((edb/100)*a.defense)+((g/5)*a.defense))}
    enemymodhp[`${cardattacked.button_id}`]=Math.floor(enemymodhp[`${cardattacked.button_id}`]- dam)    
        
    if (enemymodhp[`${cardattacked.button_id}`]<=0){
    enemymodhp[`${cardattacked.button_id}`]=0
    enemydead.push(cardattacked.button_id)
    line = line + `${a.character} uses elemental drive and dealt ${Math.floor((edb/100)*a.attack)} damage.
    ${cardattacked.character} is defeated.`}
    else {line = line + `${a.character} uses elemental drive and dealt ${Math.floor((edb/100)*a.attack)} damage.`}
    hpposition = cardattacked.position
    hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattacked.hp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattacked.hp)}`}
}}
if (a.talent_id==3){
    if ((usermodhp[`${a.button_id}`]/a.hp)*100<40&&!talentactivationuser.includes(a.button_id)){
        talentactivationuser.push(a.button_id)
        let rare = ['',,75,80,85,90]
        let edb    
        rare.forEach(element => {
            if (a.rarity == rare.indexOf(element))
            {edb = element}})
            line = line + `${a.character} uses lifesteal and restores health of whole team by ${edb}%.`}
    }
if (a.talent_id==5){
    if (manaval>4){
        manaval = manaval-5   
    let rare = ['',,10,20,30,40]
    let edb
    if (a.rarity<p){edb = rare[a.rarity]}
    else{
    rare.forEach(element => {
        if (p == rare.indexOf(element))
        {edb = element}})}
    let g = elements(a.element,cardattacked.element)
    if (g==undefined){g = 0}
    let b
    for(let r =0;r<=teamcopy.length-1;r++){
    if (teamcopy[r].unique_ID == a.unique_ID &&teamcopy[r].rarity == a.rarity){b = teamcopy[r]}}

        let dam = Math.floor(((edb/100)*b.attack)+((g/5)*b.attack))
        enemymodhp[`${cardattacked.button_id}`]=Math.floor(enemymodhp[`${cardattacked.button_id}`]- dam)
    if (enemymodhp[`${cardattacked.button_id}`]<=0){
        enemymodhp[`${cardattacked.button_id}`]=0
        enemydead.push(cardattacked.button_id)
    line = line + `${a.character} uses enhanced strike and dealt ${dam} damage.
    ${cardattacked.character} is defeated.`}
    else {line = line + `${a.character} uses enhanced strike and dealt ${dam} damage.`}
    hpposition = cardattacked.position
    hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattacked.hp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattacked.hp)}`}
}}
if (a.talent_id==6){
    if (manaval>4){
        manaval = manaval-5
        let rare = ['',,15,20,25,30]
        if (a.precision.length <=60){
    function number() { return Math.floor(Math.random() * (700 - 1+1)) + 1}
    let list = []
    for (let c = 0;c<=rare[a.rarity];c++){list.push(number())}
if (a.precision.length == 0){a.precision = list}
else{a.precision= a.precision.concat(list)}}
line = line + `${a.character} uses precision and increases their critical rate by ${rare[a.rarity]}%.`
}}
if (a.talent_id==7){
    if (manaval>4){
        manaval = manaval-5
        let rare = ['',15,20,25,30]
    if (a.evasion.length <=60){  
    function number() { return Math.floor(Math.random() * (700 - 1+1)) + 1}    
    let list = []
    for (let c = 0;c<=rare[a.rarity];c++){list.push(number())}
if (a.evasion.length == 0){a.evasion = list}
else{a.evasion= a.evasion.concat(list)}}
line = line + `${a.character} uses evasion and increases their evasion by ${rare[a.rarity]}%.`
    }}
if ([8,9].includes(a.talent_id)){
    let rare = ['',,0.10,0.15,0.20,0.25]
    let edb = rare[a.rarity]
    if (usermodhp[`${a.button_id}`]/a.hp<0.61&&usermodhp[`${a.button_id}`]/a.hp>0.3){
        if (a.talent_id==8){
        a.attack =  Math.floor(a.attack+((a.attack*edb)/3))
    line = line + `${a.character} uses adaptation and increases their attack by ${edb*100}%.`}
        else{a.defense = Math.floor(a.defense+((a.defense*edb)/3))
            line = line + `${a.character} uses adaptation and increases their defense by ${edb*100}%.`}
    }else if(usermodhp[`${a.button_id}`]/a.hp<0.31){
        if(a.talent_id==8){
            a.defense = Math.floor(a.defense+((a.defense*edb)/3))
            line = line + `${a.character} uses adaptation and increases their defense by ${edb*100}%.`}
        else{a.attack = Math.floor(a.attack+((a.attack*edb)/3))
            line = line + `${a.character} uses adaptation and increases their attack by ${edb*100}%.`}
    }}
if ([10,11].includes(a.talent_id)){
    if(manaval>4){
        manaval = manaval-5
        let rare = ['',,20,25,30,35]
        let edb = rare[a.rarity]
        for (let g = 0; g<=team.length-1;g++){
            if(!usercarddead.includes(team[g].button_id)){
                if(a.talent_id==10){
                    team[g].defense = team[g].defense + team[g].defense*edb/100}
                else{team[g].attack = team[g].attack + team[g].attack*edb/100}
                
            }}
            if(a.talent_id==10){line = line + `${a.character} uses assist and increases the defense of all team familiars by ${edb}%.`}
            else {line = line + `${a.character} uses assist and increases the attack of all team familiars by ${edb}%.`}
    }}
if(a.talent_id == 12){
    if(manaval>4){
        manaval = manaval-5
        line = line + `${a.character} inflicts poison on ${cardattacked.character}.`
        hpposition = cardattacked.position
        if (!cardattacked.status.includes('poison')){cardattacked.acti = 1
            cardattacked.status.push('poison')
            if(!talentactivationuser.includes(cardattacked.button_id)){
            talentactivationuser.push(cardattacked.button_id)}
        for (let j =0;j<=enemycopy.length-1;j++){if(cardattacked.button_id==enemycopy[j].button_id){ 
        cardattacked.orielement = enemycopy[j].element}}
    cardattacked.element = `${cardattacked.element} :biohazard:`}
            else{if(cardattacked.acti<4){cardattacked.acti = cardattacked.acti + 1}}            
        hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattacked.hp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattacked.hp)}`}
                    
}}if (a.talent_id == 13){
    if(manaval>5){
        manaval = manaval-6
        if (cardattacked.stun == true){
            line = line +`${a.character} stuns ${cardattacked.character}, but ${cardattacked.character} is already stunned.`
        }else{
        function number() { return Math.floor(Math.random() * (100 - 1+1)) + 1}
        for (let j =0;j<=enemycopy.length-1;j++){if(cardattacked.button_id==enemycopy[j].button_id){ 
            cardattacked.orielement = enemycopy[j].element}}
        let l = ''
        if([5,52,6,85,63].includes(number)){cardattacked.element = cardattacked.orielement
            l = `But ${cardattacked.character} successfully resisted the stun.`}
        else{
            cardattacked.stun = true
            cardattacked.element = `${cardattacked.element} :dizzy:`
            hpposition = cardattacked.position
            hpreturn = {name:`${cardattacked.character} ${cardattacked.element}`,value :`${enemymodhp[`${cardattacked.button_id}`]}/${cardattacked.hp} ${enemyhp(enemymodhp[`${cardattacked.button_id}`],cardattacked.hp)}`}}
            line = line + `${a.character} stuns ${cardattacked.character}.${l} `}
}}if(a.talent_id==14){
    if ((usermodhp[`${a.button_id}`]/a.hp)>=enemymodhp[`${cardattacked.button_id}`]/cardattacked.hp){
        let rare = ['',,0.1,0.15,0.2,0.25]
        a.attack = a.attack = Math.floor(a.attack+((a.attack*rare[a.rarity])/3))
        line = `${a.character} overpowers ${cardattacked.character} and increases it's attack by ${rare[a.rarity]*100}%.`
}}if(a.talent_id==15){
    let ded=[]
    for (let x = 0;x<=team.length-1;x++){
        if (usermodhp[`${team[x].button_id}`]<=0){ded.push(team[x].button_id)}}
        
    if (ded.length>0&&a.rage==undefined){
        a.rage = true
        let rare = ['',,25,30,35,40]
        a.attack = a.attack + a.attack*(rare[a.rarity]/100)
        line = line + `${a.character} is enraged and increases their attack by ${rare[a.rarity]}%.`
}}if (a.talent_id==16){
        if (usermodhp[`${a.button_id}`]/a.hp<0.3){
            let rare = ['',,8,10,12,15]
            if (a.precision.length <=40){
                function number() { return Math.floor(Math.random() * (700 - 1+1)) + 1}            
                let list = []
                for (let c = 0;c<=rare[a.rarity];c++){list.push(number())}
            if (a.precision.length == 0){a.precision = list}
            else{a.precision= a.precision.concat(list)}}
        let raare = ['',,0.20,0.25,0.30,0.35]
        a.attack = a.attack+ (a.attack*raare[a.rarity]/1.5)
line = line + `${a.character} uses berserker and increases their attack by ${raare[a.rarity]*100}% and evasion by ${rare[a.rarity]}%.`
}}

return [line,hpposition,hpreturn,manaval]
}

function talenteffect(talentactivationuser,userbutton,team,p,usermodhp,enemymodhp,
    cardattacked,usercarddead,enemydead,enemybutton,enemy){
        let cards = []
        let line = ''
        let hp
        let button
    let hpreturn = []
    let hpposition = []
    
    talentactivationuser.forEach(element => {
        for (let x = 0;x<=userbutton.components.length -1;x++){
    if (userbutton.components[x].customId==element)
            {cards.push(team[x]) }}
            for (let x =0;x<=enemybutton.components.length-1;x++){
                if (enemybutton.components[x].customId==element)
                {cards.push(enemy[x]) }}})

cards.forEach(a=>{ 
    if (a.status.includes('ravage')){
    if(['card1','card2','card3'].includes(a.button_id)){
        hp = usermodhp}else {hp = enemymodhp}
//OVERLOAD
    if (hp[`${a.button_id}`]>0){
        if (p<6){hp[`${a.button_id}`]= Math.floor(hp[`${a.button_id}`]-(a.hp*0.2))
    if (hp[`${a.button_id}`]<=0){hp[`${a.button_id}`]=0
    if (hp == usermodhp){
    usercarddead.push(a.button_id)}else{enemydead.push(a.button_id)}
        line = line + `${a.character}'s HP decreases by 20 %. ${a.character} is defeated.`}
    else {line = line +`${a.character}'s HP decreases by 20 %.`}
        hpposition.push(a.position)
        hpreturn.push({name:`${a.character} ${a.element}`,value :`${hp[`${a.button_id}`]}/${a.hp} ${enemyhp(hp[`${a.button_id}`],a.hp)}`}) }
}   else if (p>=6){cardss.forEach(element=>{if (a.unique_ID == element.unique_ID){
    a.attack = element.attack}})
}}
if(a.status.includes('poison')){
    function number() { return Math.floor(Math.random() * (100 - 1+1)) + 1}
    function rem() {
        a.element = a.orielement
        for(let y =0;y<=a.status.length-1;y++){
            if (a.status[y]=='poison'){a.status.slice(y,1)}
        }}
    let resist = [41,85,63,91,2]
    if(['card1','card2','card3'].includes(a.button_id)){
        hp = usermodhp}else {hp = enemymodhp}
    if (hp[`${a.button_id}`]>0){
if(resist.includes(number())){
    rem()
        hpposition.push(a.position)
        hpreturn.push({name:`${a.character} ${a.element}`,value :`${hp[`${a.button_id}`]}/${a.hp} ${enemyhp(hp[`${a.button_id}`],a.hp)}`})
    line = line + `${a.character} successfully resisted.` }
else{
    let rare = ['',0.15,0.20,0.25,0.30]
    hp[`${a.button_id}`]= Math.floor(hp[`${a.button_id}`]-(a.hp*rare[a.acti]))
    hpposition.push(a.position)
    hpreturn.push({name:`${a.character} ${a.element}`,value :`${hp[`${a.button_id}`]}/${a.hp} ${enemyhp(hp[`${a.button_id}`],a.hp)}`}) 
    if (hp[`${a.button_id}`]<=0){hp[`${a.button_id}`]=0
    if (hp == usermodhp){usercarddead.push(a.button_id)}else{enemydead.push(a.button_id)}
    rem()    
    hpreturn.push({name:`${a.character} ${a.element}`,value :`${hp[`${a.button_id}`]}/${a.hp} ${enemyhp(hp[`${a.button_id}`],a.hp)}`})
    line = line + `${a.character}'s hp decreases by ${rare[a.acti]*100} %. ${a.character} is defeated.`}
    else {line = line +`${a.character}'s hp decreases by ${rare[a.acti]*100} %.`}
}}}
})
return [line,hpposition,hpreturn]}

function surge(attackingcard,damage,hp,position,team,talentactivationuser){
    let positioning = []
    let value = []
    if ((hp[`${attackingcard.button_id}`]/attackingcard.hp)*100<40&&talentactivationuser.includes(attackingcard.button_id)){
    
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