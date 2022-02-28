function modifier(listofnum,modify_factor) {
	let newmodified = [];
  for (let i = 0; i < listofnum.length; i++) {
    let a = listofnum[i] + listofnum[i]*modify_factor;
    newmodified.push(a);
  }
  return newmodified;
}  
class One_Star {
  constructor(series, element, uniqueID,rarity,  character, hp, attack, defense, agility,quote,artlink){
  this.series = series;
  this.element = element;
  this.uniqueID = uniqueID
  this.rarity = rarity;
  this.character = character;
  this.hp = hp;
  this.attack = attack;
  this.defense = defense;
  this.agility = agility;
  this.quote = quote
  this.artlink = artlink;
  }

  stats_modifier(rarity) {
    let basic_stats = [this.hp,this.attack,this.defense,this.agility];
    if (rarity === 1) {
      return basic_stats;
    }else if (rarity === 2) {
      let factor = 0.4
      return modifier(basic_stats,factor)
    }else if (rarity === 3) {
      let factor = 0.6
      return modifier(basic_stats,factor)
    }else if (rarity === 4) {
      let factor = 0.8
      return modifier(basic_stats,factor)
    }else if (rarity === 5) {
      let factor = 1
      return modifier(basic_stats,factor)
    }
  }
}
function elements(a,b){if (a =='light'&&b == '<:dark:910723272495222794>'){return 0.25}
else if(a=='<:dark:910723272495222794>'&&b == 'light'){return 0.25}
else if(a == '<:fire:916337311397052416'&&b=='<:wind:916336940343771156>'){return 0.25}
else if(a=='<:wind:916336940343771156>'&&b== '<:nature:910561837492346931>'){return 0.25}
else if (a =='<:nature:910561837492346931>'&&b=='<:download:910194644648861776>'){return 0.25}
else if(a =='<:download:910194644648861776>'&&b ==':zap:'){return 0.25}
else if (a==':zap:'&&b=='<:water:916338240179552267>'){return 0.25}
else if(a == '<:water:916338240179552267>'&&b == '<:fire:916337311397052416'){return 0.25}

else if (a == '<:wind:916336940343771156>'&& b=='<:fire:916337311397052416'){return -0.25}
else if (a=='<:nature:910561837492346931>'&&b=='<:wind:916336940343771156>'){return -0.25}
else if (a=='<:download:910194644648861776>'&&b=='<:nature:910561837492346931>'){return -0.25}
else if (a==':zap:'&&b=='<:download:910194644648861776>'){return -0.25}
else if (a=='<:water:916338240179552267>'&&b==':zap:'){return -0.25}
else if (a=='<:fire:916337311397052416'&&b=='<:water:916338240179552267>'){return -0.25}

else if (a == 'light'&&b=='light'){return 0.15}
else if (a=='<:dark:910723272495222794>'&&b=='<:dark:910723272495222794>'){return -0.15}
else if(a=='<:wind:916336940343771156>'&b=='<:wind:916336940343771156>'){return -0.15}
else if(a=='<:nature:910561837492346931>'&&b=='<:nature:910561837492346931>'){return -0.15}
else if(a=='<:download:910194644648861776>'&&b=='<:download:910194644648861776>'){return -0.15}
else if(a==':zap:'&&b==':zap:'){return -0.15}
else if(a=='<:water:916338240179552267>'&&b=='<:water:916338240179552267>'){return -0.15}
else if (a=='<:fire:916337311397052416>'&&b=='<:fire:916337311397052416>'){return -0.15}
else if (a==':sparkles:'&&b==':sparkles:'){return 0.15}
}
function rarrity() { return Math.floor(Math.random() * (5 - 1 + 1)) + 1};
const Kurisu_Makise = new One_Star('Steins Gate',':leaves:',1,':star:','Kurisu Makise',85,75,90,75,'','https://wallpapercave.com/wp/wp4088492.png');

const All_Might = new One_Star('My Hero Academia',':sparkles:',2,':star:', 'All Might', 90, 100,100,100,'                      Hey Villain.. Have you ever heard these words ?     **GO BEYOND !!  PLUS ULTRA !!!! **                                                                                           ','https://i.redd.it/yiwh3w1oy9i21.jpg')
const Midoriya_Izuku = new One_Star('My Hero Academia', '<:wind:916336940343771156>',3,':star:', 'Midoriya Izuku', 80, 85, 75, 88,'', 'https://cdn.discordapp.com/attachments/901751803824205865/903833400970997790/AnimeX_920382.jpeg')

const Kamado_Tanjiro = new One_Star('Kimetsu No Yaiba','<:water:916338240179552267>',4,':star:','Tanjiro Kamado', 82, 80, 78, 82,'', 'https://cdn.discordapp.com/attachments/897181776982720563/897181854476689418/dedyiiq-a2f1a41b-1bd2-48f2-99b3-2eee4ba9c95e.jpg')
const Kyoujuro_Rengoku = new One_Star('Kimetsu No Yaiba','<:fire:916337311397052416>',5,':star:','Kyoujuro Rengoku', 85, 90, 85, 92,'', 'https://cdn.discordapp.com/attachments/897181776982720563/910136966497067048/35af966edcd7f824774faf611d6b61da.jpg')
const Kamado_Nezuko = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',6,':star:','Nezuko Kamado',77,82,80,78,'','https://cdn.discordapp.com/attachments/897181776982720563/910156476276940930/dUZATuEbImELKiNYKhqidZvH3Q8oVOqfy7-rNgfGLak.png')
const Zenitsu_Agatsuma = new One_Star('Kimetsu No Yaiba',':zap:',7,';star;','Zenitsu Agatsuma',74,96,78,98,'','https://cdn.discordapp.com/attachments/897181776982720563/910136968376119296/7cb673e1f999ba1b5ae5f6704ec449d8.jpg')
const Tomioka_Giyuu = new One_Star('Kimetsu No Yaiba','<:water:916338240179552267>',17,':star:','Giyuu Tomioka',81,85,80,87,'','https://cdn.discordapp.com/attachments/897181776982720563/910135224627773460/-Giyu-Tomioka-kimetsu-no-yaiba-43457135-564-798.jpg')
const Hashibira_Inosuke = new One_Star('Kimetsu No Yaiba',':sparkles:',8,':star:','Inosuke Hashibira',80,82,90,80,'','https://cdn.discordapp.com/attachments/897181776982720563/944869935358812240/Inosuke.jpg')
const Kocho_Shinobu = new One_Star('Kimetsu No Yaiba','<:nature:910561837492346931>',9,':star:','Shinobu Kocho',75,78,82,86,'You mustn\'t think you are safe just because haven\'t been beheaded ','https://cdn.discordapp.com/attachments/776127159138779146/910133513376895006/02ebca9fb61d8d2bbf1904052c0a0f4b.jpg')
const Tsuyuri_Kanao = new One_Star('Kimetsu No Yaiba',':sparkles:',10,':star:','Kanao Tsuyuri',82,86,85,87,'','https://cdn.discordapp.com/attachments/897181776982720563/910725201963155457/screen-4.jpg')

const Uchiha_Sasuke = new One_Star('Naruto','<:dark:910723272495222794>',11,':star:','Uchiha Sasuke', 75, 87, 95, 90, '', 'https://cdn.discordapp.com/attachments/897181776982720563/910127985582018592/Uchiha_Sasuke_-_NARUTO_-_Image_1746665_-_Zerochan_Anime_Image_Board.jpeg')
const Uchiha_Itachi = new One_Star('Naruto','<:dark:910723272495222794>',12,':star:','Uchiha Itachi', 78, 84, 92, 80, '', 'https://cdn.discordapp.com/attachments/901751803824205865/903832081858199572/AnimeX_926037.jpeg')

const Asta = new One_Star('Black Clover', '<:dark:910723272495222794>',13, ':star:', 'Asta', 89,84,77,75,'','https://cdn.discordapp.com/attachments/901751803824205865/903834262002876508/AnimeX_919194.jpeg')

const Son_Goku = new One_Star('Dragon Ball Super', '<:fire:916337311397052416>',14,':star:', 'Son Goku', 98,95,75,100,'','https://cdn.discordapp.com/attachments/901751803824205865/910098740403126282/1658412902_BoilingPowerSuperSaiyanGodGokuArtDragonBallZDokkanBattle.jpg.3f152d0d629b448d228979692a8255a6.jpg')
const Vegeta = new One_Star('Dragon Ball Super', '<:fire:916337311397052416>',15, ':star:', 'Vegeta', 90,85,85,90,'','https://cdn.discordapp.com/attachments/897181776982720563/900934385522602045/23b07582de80aee1a628828fc5961686.jpg')

const Satoru_Gojo = new One_Star('Jujutsu Kaisen',':zap:',16,':star:','Satoru Gojo',80,93,78,93,'Dying to win and risking death to win are completely different, Megumi','https://cdn.discordapp.com/attachments/897181776982720563/944872606136430612/AnimeX_932399.jpeg')


const Temple_Demon = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',701,':star:','Temple Demon',100,75,75,75,'','https://cdn.discordapp.com/attachments/897181776982720563/910719423197900800/Temple_Demon.jpg')
const Sakonji_Urokodaki = new One_Star('Kimetsu No Yaiba',':sparkles:',702,':star:','Sakonji Urokodaki',80,75,74,74,'','https://cdn.discordapp.com/attachments/897181776982720563/910560913474584636/Urokodaki_-_Kimetsu_no_Yaiba_by_A2T-will-Draw_on_DeviantArt.jpg')
const Hand_Demon = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',703,':star:','Hand Demon',81,83,88,72,'','https://cdn.discordapp.com/attachments/897181776982720563/910926039528644618/ddf8222d47c1fe0a20b5c0c67f4d048a.jpg')
const Swamp_Demon = new One_Star('Kimetsu No Yaiba','<:download:910194644648861776>',704,':star:','Swamp Demon',76,88,80,90,'','https://cdn.discordapp.com/attachments/897181776982720563/910915537121443860/images.jpg')
const susamaru = new One_Star('Kimetsu No Yaiba','<:download:910194644648861776>',705,':star:','Susamaru', 80,85,78,75,'','https://cdn.discordapp.com/attachments/897181776982720563/910555605347991562/Susamaru_--_Kimetsu_no_Yaiba_by_DinocoZero_on_DeviantArt.jpg')
const yahaba = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',706,':star:','Yahaba',75,78,88,70,'','https://cdn.discordapp.com/attachments/897181776982720563/944866146409127946/yahaba.jpeg')
const kyogai = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',707,':star:','Kyogai',75,86,90,70,'','https://cdn.discordapp.com/attachments/897181776982720563/944868474151387160/kyogai.jpg')
const rui = new One_Star('Kimetsu No Yaiba','',708,':star:','Rui',77,86,79,83,'','https://cdn.discordapp.com/attachments/897181776982720563/910136236419723294/e8513b282544798debebdeb47dcdb86f.jpg')

const All_Cards = [Kurisu_Makise,All_Might,Kamado_Tanjiro,Kyoujuro_Rengoku,Uchiha_Sasuke,Uchiha_Itachi,Midoriya_Izuku,Asta,
Son_Goku,Vegeta,Kamado_Nezuko,Zenitsu_Agatsuma,Tomioka_Giyuu,Hashibira_Inosuke,Kocho_Shinobu,Tsuyuri_Kanao,Satoru_Gojo]
const enemy = [Temple_Demon,Hand_Demon,Sakonji_Urokodaki,Swamp_Demon,susamaru,yahaba,kyogai,rui]
// console.log(All_Cards.length)

var waaa = ['Kamado Tanjiro', 'Kurisu Makise'];
for (let i = 0; i < All_Cards.length; i++) {
  let klab = All_Cards[i];
  for (let j = 0; j < waaa.length; j++){
    if (waaa[j] === klab.character) {
    // console.log(klab)
  }};
}

function convertToString(array) {
  return array.map(num => String.fromCharCode(65 + num)).join('');
};
function numsArr(bignum) {
  return  Array.from(String(bignum), Number);
};

// let bruh = numsArr(895668536586);

let bla = Kurisu_Makise.stats_modifier(3)
// console.log(Kurisu_Makise.character)

// console.log(bruh);
function randomcard(array) { return All_Cards[Math.floor(Math.random()*All_Cards.length)]};
// console.log (randomcard(All_Cards));
// console.log (randomcard(All_Cards));


function enemyhp(a,b){
  let hp
  let p = (a/b)*100
  if (p<=0){
    hp = '<:frame_150:908195249678082048><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>0&&p<=10){
    hp = '<:frame_146:908396208840659024><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>10&&p<=20){
    hp = '<:1_:908380117921824838><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp 
  }else if (p>20&&p<=30){
    hp = '<:1_:908187337249415239><:2_:908355390222245889><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>30&&p<=40){
    hp = '<:1_:908187337249415239><:2_:908355390222245889><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>40&&p<=50){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:new:912877286917816400><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>50&&p<=60){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:3_:908187061369057390><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  return hp
  }else if (p>60&&p<=70){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:3_:908187061369057390><:4_:908187061700395009><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>70&&p<=80){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:3_:908187061369057390><:4_:908187061700395009><:4_:908187061700395009><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
    return hp
  }else if (p>80&&p<=90){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:3_:908187061369057390><:4_:908187061700395009><:4_:908187061700395009><:4_:908187061700395009><:frame_1504:908196930121773067>'
    return hp
  }else if (p>90&&p<100){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:3_:908187061369057390><:4_:908187061700395009><:4_:908187061700395009><:4_:908187061700395009><:frame_0014Copy:908406036350775306>'
    return hp
  }else if (p==100){
    hp = '<:1_:908187337249415239><:2_:908187062606389278><:3_:908187061369057390><:4_:908187061700395009><:4_:908187061700395009><:4_:908187061700395009><:5_:908187061788504095>'
    return hp
  }
}
function manavalue(manaval,round,evasion,crit,talent){
  if ([1,2].includes(round)){
    if(evasion == 0){return manaval}
    else if (crit == 2){return manaval+5}
    else{return manaval+4}
  }else{
    if(evasion == 0){return manaval}
    else if (crit == 2){return manaval+3}
    else{return manaval+2}
  }
}
function manabar(a){
  if (a == 0){
    return '<:frame_150:908195249678082048><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 1){
    return '<:B1:908779250352541756><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 2){
  return '<:B1:908779250352541756><:B2:908779250390302772><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 3){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 4){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 5){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 6){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 7){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 8){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 9){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 10){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:frame_1502:908196929488449546><:frame_1504:908196930121773067>'
  }
  if (a == 11){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:frame_1504:908196930121773067>'
  }
  if (a == 12){
    return '<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B5:908779251573084171>'
  }
}

'<:B1:908779250352541756><:B2:908779250390302772><:B3:908779250998476840><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B4:908779251283689542><:B5:908779251573084171>'
function enemyhpposition(a){
  if (a ==0){return 2}else if (a == 1){return 3}
  else if (a ==2){return 5}else if(a ==3){return 6}
}
function userhpposition(a){
  if (a ==0){return 1}else if (a == 1){return 3}else if (a == 2){return 4}else if (a == 3){return 6}
}
export{All_Cards, enemy, convertToString, numsArr,randomcard,rarrity,enemyhp,manabar,
elements,manavalue};