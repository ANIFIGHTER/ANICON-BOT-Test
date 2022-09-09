// import dotenv from 'dotenv';
// import mysql from 'mysql2';
// dotenv.config();

// //MYSQL PASSWORD
// const possswd = process.env.SQLPASSWD;
// // console.log(possswd)

// // MYSQL CONNECTION
// const con = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password:`${possswd}`,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     database: 'testgame'
//   });
  
// con.getConnection((err) => {
// if (err) {
//     return console.error('error: ' + err.message);
// }
// // console.log('Connected to the MySQL server.');
// });

// const dbQuery = (query) => new Promise((resolve, reject) => {
//   con.query(query, (error, data) => {
//     if(error) reject(error);
//     else resolve(data);
//   })
// });

function modifier(listofnum,modify_factor) {
	let newmodified = [];
  for (let i = 0; i < listofnum.length; i++) {
    let a = listofnum[i] + listofnum[i]*modify_factor;
    newmodified.push(a);
  }
  return newmodified;
}  
class One_Star {
  constructor(series, element, uniqueID,rarity,  character, hp, attack,
     defense, agility,quote,artlink,talent_id){
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
  this.talent_id = talent_id
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
function elements(a,b){if (a ==':sunny:'&&b == '<:dark:910723272495222794>'){return 0.25}
else if(a=='<:dark:910723272495222794>'&&b == ':sunny:'){return 0.25}
else if(a == '<:fire:916337311397052416'&&b=='<:wind:916336940343771156>'){return 0.25}
else if(a=='<:wind:916336940343771156>'&&b== '<:nature:910561837492346931>'){return 0.25}
else if (a =='<:nature:910561837492346931>'&&b=='<:earth:910194644648861776>'){return 0.25}
else if(a =='<:earth:910194644648861776>'&&b ==':zap:'){return 0.25}
else if (a==':zap:'&&b=='<:water:916338240179552267>'){return 0.25}
else if(a == '<:water:916338240179552267>'&&b == '<:fire:916337311397052416'){return 0.25}

else if (a == '<:wind:916336940343771156>'&& b=='<:fire:916337311397052416'){return -0.25}
else if (a=='<:nature:910561837492346931>'&&b=='<:wind:916336940343771156>'){return -0.25}
else if (a=='<:earth:910194644648861776>'&&b=='<:nature:910561837492346931>'){return -0.25}
else if (a==':zap:'&&b=='<:earth:910194644648861776>'){return -0.25}
else if (a=='<:water:916338240179552267>'&&b==':zap:'){return -0.25}
else if (a=='<:fire:916337311397052416'&&b=='<:water:916338240179552267>'){return -0.25}

else if (a == ':sunny:'&&b==':sunny:'){return 0.15}
else if (a=='<:dark:910723272495222794>'&&b=='<:dark:910723272495222794>'){return -0.15}
else if(a=='<:wind:916336940343771156>'&b=='<:wind:916336940343771156>'){return -0.15}
else if(a=='<:nature:910561837492346931>'&&b=='<:nature:910561837492346931>'){return -0.15}
else if(a=='<:earth:910194644648861776>'&&b=='<:earth:910194644648861776>'){return -0.15}
else if(a==':zap:'&&b==':zap:'){return -0.15}
else if(a=='<:water:916338240179552267>'&&b=='<:water:916338240179552267>'){return -0.15}
else if (a=='<:fire:916337311397052416>'&&b=='<:fire:916337311397052416>'){return -0.15}
else if (a==':sparkles:'&&b==':sparkles:'){return 0.15}
}
function rarrity() { return Math.floor(Math.random() * (5 - 1 + 1)) + 1};
const Kurisu_Makise = new One_Star('Steins Gate','<:nature:910561837492346931>',1,':star:','Kurisu Makise',85,75,90,75,'You can run away, but that’ll just make it worse!','https://cdn.discordapp.com/attachments/977784101274783795/977784957382582373/kurisu.png',13);

const All_Might = new One_Star('My Hero Academia',':sparkles:',2,':star:', 'All Might', 90, 100,100,100,'                      Hey Villain.. Have you ever heard these words ?     **GO BEYOND !!  PLUS ULTRA !!!! **','https://cdn.discordapp.com/attachments/977784101274783795/977804918331146240/allmight.jpg','')
const Midoriya_Izuku = new One_Star('My Hero Academia', '<:wind:916336940343771156>',3,':star:', 'Midoriya Izuku', 80, 85, 75, 88,' ', 'https://cdn.discordapp.com/attachments/977784101274783795/977805443244122183/izuku.jpeg','')

const Kamado_Tanjiro = new One_Star('Kimetsu No Yaiba','<:water:916338240179552267>',4,':star:','Tanjiro Kamado', 82, 80, 78, 82,' ', 'https://cdn.discordapp.com/attachments/977784101274783795/977805788565372958/tanjiro.jpg',9)
const Kyoujuro_Rengoku = new One_Star('Kimetsu No Yaiba','<:fire:916337311397052416>',5,':star:','Kyoujuro Rengoku', 85, 90, 85, 92,' ', 'https://cdn.discordapp.com/attachments/977784101274783795/977806424702853120/rengoku.jpg',8)
const Kamado_Nezuko = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',6,':star:','Nezuko Kamado',77,82,80,78,' ','https://cdn.discordapp.com/attachments/977784101274783795/992724052814868540/nezuko.jpg',15)
const Zenitsu_Agatsuma = new One_Star('Kimetsu No Yaiba',':zap:',7,':star:','Zenitsu Agatsuma',74,96,78,98,' ','https://cdn.discordapp.com/attachments/977784101274783795/977807846609653830/zenitsu.jpg',6)
const Tomioka_Giyuu = new One_Star('Kimetsu No Yaiba','<:water:916338240179552267>',17,':star:','Giyuu Tomioka',81,85,80,87,' ','https://cdn.discordapp.com/attachments/977784101274783795/977808278778179584/giyu.jpg',2)
const Hashibira_Inosuke = new One_Star('Kimetsu No Yaiba',':sparkles:',8,':star:','Inosuke Hashibira',85,78,82,75,' ','https://cdn.discordapp.com/attachments/977784101274783795/977808910457139220/Inosuke.jpg',10)
const Kocho_Shinobu = new One_Star('Kimetsu No Yaiba','<:nature:910561837492346931>',9,':star:','Shinobu Kocho',75,78,82,86,'You mustn\'t think you are safe just because haven\'t been beheaded ','https://cdn.discordapp.com/attachments/977784101274783795/992719551609446421/shinobu.jpg',12)
const Tsuyuri_Kanao = new One_Star('Kimetsu No Yaiba',':sparkles:',10,':star:','Kanao Tsuyuri',82,86,85,87,' ','https://cdn.discordapp.com/attachments/977784101274783795/977813816672923648/kanao.jpg',11)
const Mitsuri_Kanroji = new One_Star('Kimetsu No Yaiba',':sparkles:',38,':star:','Mitsuri Kanroji',92,72,82,72,' ','https://cdn.discordapp.com/attachments/977784101274783795/977902709963374674/mitsuri.jpg',7)
const Himejima_Gyoumei =new One_Star('Kimetsu No Yaiba', '<:earth:910194644648861776>',39,':star:','Himejima Gyoumei',89,85,80,83,' ','https://cdn.discordapp.com/attachments/977784101274783795/977906150026674256/gyomei.jpg',1)

const Uchiha_Sasuke = new One_Star('Naruto','<:dark:910723272495222794>',11,':star:','Uchiha Sasuke', 75, 87, 95, 90, ' ', 'https://cdn.discordapp.com/attachments/977784101274783795/977812508196868116/sasuke.jpeg','')
const Uchiha_Itachi = new One_Star('Naruto','<:dark:910723272495222794>',12,':star:','Uchiha Itachi', 78, 84, 92, 80, ' ', 'https://cdn.discordapp.com/attachments/977784101274783795/977813071705833532/itachi.jpeg',14)

const Asta = new One_Star('Black Clover', '<:dark:910723272495222794>',13, ':star:', 'Asta', 89,84,77,75,' ','https://cdn.discordapp.com/attachments/977784101274783795/977814475459670036/asta.jpeg',15)

const Son_Goku = new One_Star('Dragon Ball Super', '<:fire:916337311397052416>',14,':star:', 'Son Goku', 98,95,75,100,'I ain\'t no hero of justice, but anyone who tries to hurt my friends, IS GONNA PAY!!!','https://cdn.discordapp.com/attachments/977784101274783795/977819188838146068/goku_ssj.jpg',16)
const Vegeta = new One_Star('Dragon Ball Super', '<:fire:916337311397052416>',15, ':star:', 'Vegeta', 90,85,85,90,' ','https://cdn.discordapp.com/attachments/977784101274783795/977821408023412836/vegeta.jpg',17)

const Gojo_Satoru = new One_Star('Jujutsu Kaisen',':zap:',16,':star:','Gojo Satoru',80,93,78,93,'Dying to win and risking death to win are completely different, Megumi','https://cdn.discordapp.com/attachments/977784101274783795/977822039396196382/gojo.jpeg',2)
const Fushiguro_Megumi = new One_Star('Jujutsu Kaisen',':sparkles:',36,':star:','Fushiguro Megumi',81,97,79,69,' ','https://cdn.discordapp.com/attachments/977784101274783795/977822766596231188/megumi.jpg','')
const Yuji_Itadori = new One_Star('Jujutsu Kaisen','<:dark:910723272495222794>',37,':star:','Yuji Itadori',69,91,91,91,' ','https://cdn.discordapp.com/attachments/977784101274783795/977821595550748692/yuji.jpg','')

const Emiya_Shirou = new One_Star('Fate/stay night: Unlimited Blade Works','<:fire:916337311397052416>',18,':star:','Emiya Shirou',78,82,85,83,'I don\'t create swords. I create a world that contains infinite swords. This is the only magic allowed for me.','https://cdn.discordapp.com/attachments/977784101274783795/977823014718685215/shirou.jpg',19)

const Megumin = new One_Star('Kono Subarashii Sekai ni Shukufuku wo!','<:fire:916337311397052416>',19,':star:','Megumin',75,92,80,80,'EXPLOSION!!!','https://cdn.discordapp.com/attachments/977784101274783795/977823477887287346/megumin.jpg',1)

const Falco_Grice = new One_Star('Attack on Titan','<:wind:916336940343771156>',21,':star:','Falco Grice',78,82,86,80,' ','https://cdn.discordapp.com/attachments/977784101274783795/977826927601672242/falco.jpg','')
const Gabi_Braun = new One_Star('Attack on Titan',':sparkles:',22,':star:','Gabi Braun',81,75,80,77,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827032203399168/gabi.jpg','')
const Ymir = new One_Star('Attack on Titan','<:dark:910723272495222794>',23,':star:','Ymir',84,83,85,82,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827156233175050/ymir.jpg','')
const Zeke_Jaeger = new One_Star('Attack on Titan',':sunny:',24,':star:','Zeke Jaeger',81,81,82,80,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827248004534282/zeke.png','')
const Bertolt_Hoover = new One_Star('Attack on Titan','<:earth:910194644648861776>',25,':star:','Bertolt Hoover',88,79,90,70,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827373045121064/bertolt.jpg','')
const Reiner_Braun = new One_Star('Attack on Titan',':sparkles:',26,':star:','Reiner Braun',78,88,87,90,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827497834078218/reiner.jpg','')
const Annie_Leonhart = new One_Star('Attack on Titan',':zap:',27,':star:','Annie Leonhart',81,82,88,89,' ','https://cdn.discordapp.com/attachments/977784101274783795/992709540657254460/annie_leonhart.jpg','')
const Historia_Reiss = new One_Star('Attack on Titan',':sunny:',28,':star:','Historia Reiss',80,81,79,78,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827699928219648/historia.jpg','')
const Erwin_Smith = new One_Star('Attack on Titan',':sunny:',29,':star:','Erwin Smith',82,83,81,80,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827807222710323/erwin.jpg','')
const Levi_Ackerman= new One_Star('Attack on Titan','<:fire:916337311397052416>',30,':star:','Levi Ackerman',80,90,88,94,' ','https://cdn.discordapp.com/attachments/977784101274783795/977827935698448434/levi.jpg','')
const Armin_Arlert = new One_Star('Attack on Titan','<:dark:910723272495222794>',31,':star:','Armin Arlert',77,78,84,80,' ','https://cdn.discordapp.com/attachments/977784101274783795/977826634860228658/armin.jpg','')
const Sasha_Braus = new One_Star('Attack on Titan',':sunny:',32,':star:','Sasha Braus',84,85,82,81,' ','https://cdn.discordapp.com/attachments/977784101274783795/977828094146666516/sasha.jpg','')
const Jean_Kirstein = new One_Star('Attack on Titan','<:wind:916336940343771156>',33,':star','Jean Kirstein',81,82,83,84,' ','https://cdn.discordapp.com/attachments/977784101274783795/977828209804587058/jean.jpg','')
const Mikasa_Ackerman = new One_Star('Attack on Titan',':sparkles:',34,':star:','Mikasa Ackerman',88,92,85,93,' ','https://cdn.discordapp.com/attachments/977784101274783795/977828292356882443/mikasa.jpg',13)
const Eren_Jaeger = new One_Star('Attack on Titan','<:dark:910723272495222794>',35,':star:','Eren Jaeger',89,82,80,85,' ','https://cdn.discordapp.com/attachments/977784101274783795/985863372513902682/Eren.png','')


const Temple_Demon = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',701,':star:','Temple Demon',100,75,75,75,' ','https://cdn.discordapp.com/attachments/897181776982720563/910719423197900800/Temple_Demon.jpg',3)
const Sakonji_Urokodaki = new One_Star('Kimetsu No Yaiba',':sparkles:',702,':star:','Sakonji Urokodaki',80,75,74,74,' ','https://cdn.discordapp.com/attachments/897181776982720563/910560913474584636/Urokodaki_-_Kimetsu_no_Yaiba_by_A2T-will-Draw_on_DeviantArt.jpg',4)
const Hand_Demon = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',703,':star:','Hand Demon',81,83,88,72,' ','https://cdn.discordapp.com/attachments/977784101274783795/991607898276888687/hand_demon.jpg',3)
const Swamp_Demon = new One_Star('Kimetsu No Yaiba','<:earth:910194644648861776>',704,':star:','Swamp Demon',76,88,80,90,' ','https://cdn.discordapp.com/attachments/897181776982720563/978473130169368586/images.jpg',3)
const susamaru = new One_Star('Kimetsu No Yaiba','<:earth:910194644648861776>',705,':star:','Susamaru', 80,85,78,75,' ','https://cdn.discordapp.com/attachments/977784101274783795/991605482479439872/Susamaru.jpg',5)
const yahaba = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',706,':star:','Yahaba',75,78,88,70,' ','https://cdn.discordapp.com/attachments/977784101274783795/991606512822779955/yahaba.jpg',7)
const kyogai = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',707,':star:','Kyogai',75,86,90,70,' ','https://cdn.discordapp.com/attachments/897181776982720563/944868474151387160/kyogai.jpg',5)
const rui = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',708,':star:','Rui',77,86,79,83,' ','https://cdn.discordapp.com/attachments/897181776982720563/910136236419723294/e8513b282544798debebdeb47dcdb86f.jpg',14)
const enmu = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',40,':star:','Enmu',78,81,87,86,' ','https://cdn.discordapp.com/attachments/977784101274783795/977950217418702879/enmu.jpg',13)
const daki = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',41,':star:','Daki',78,89,82,94,' ','https://cdn.discordapp.com/attachments/977784101274783795/977950839199117442/daki.jpeg',7)
const gyutaro = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',42,':star:','Gyutaro',88,80,81,86,' ','https://cdn.discordapp.com/attachments/977784101274783795/977952367725117520/gyuutaro.jpg',12)
const akaza = new One_Star('Kimetsu No Yaiba','<:water:916338240179552267>',43,':star:','Akaza',89,92,78,87,' ','https://cdn.discordapp.com/attachments/977784101274783795/977953119663169616/akaza.jpg',15)
const kokushibo = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',44,':star:','Kokushibo',90,90,90,90,' ','https://cdn.discordapp.com/attachments/977784101274783795/977959657916223578/kokushibo.jpg',16)
const muzan = new One_Star('Kimetsu No Yaiba','<:dark:910723272495222794>',45,':star:','Kibutsuji Muzan',92,94,94,90,' ','https://cdn.discordapp.com/attachments/977784101274783795/978875720497524806/download_2.jpg',14)

const Porco_Galliard = new One_Star('Attack on Titan','<:earth:910194644648861776>',20,':star:','Porco Galliard',85,80,82,78,' ','https://cdn.discordapp.com/attachments/977784101274783795/977826810794479616/porco.jpg','')

const Allen_Walker = new One_Star('D.Gray-Man',':sparkles:',46,':star:','Allen Walker',80,87,77,80,' ','https://www.reddit.com/r/WhatWouldYouBuild/comments/ol5y2h/hwyb_allen_walker_from_dgrayman_in_5e/','')

const All_Cards = [Kurisu_Makise,All_Might,Kamado_Tanjiro,Kyoujuro_Rengoku,Uchiha_Sasuke,Uchiha_Itachi,Midoriya_Izuku,Asta,
  Son_Goku,Vegeta,Kamado_Nezuko,Zenitsu_Agatsuma,Tomioka_Giyuu,Hashibira_Inosuke,Kocho_Shinobu,Tsuyuri_Kanao,Gojo_Satoru,Emiya_Shirou,
  Megumin,Fushiguro_Megumi,Yuji_Itadori,Reiner_Braun,Annie_Leonhart,Historia_Reiss,Erwin_Smith,Levi_Ackerman,Armin_Arlert,Sasha_Braus,
  Jean_Kirstein,Mikasa_Ackerman,Eren_Jaeger,Mitsuri_Kanroji,Himejima_Gyoumei,Allen_Walker]

const enemy = [Temple_Demon,Hand_Demon,Sakonji_Urokodaki,Swamp_Demon,susamaru,yahaba,kyogai,rui,
  All_Might,Kamado_Tanjiro,Kyoujuro_Rengoku,Uchiha_Sasuke,Uchiha_Itachi,Midoriya_Izuku,Asta,
  Son_Goku,Vegeta,Kamado_Nezuko,Zenitsu_Agatsuma,Tomioka_Giyuu,Hashibira_Inosuke,Kocho_Shinobu,Tsuyuri_Kanao,Gojo_Satoru,Emiya_Shirou,
  Megumin,Fushiguro_Megumi,Yuji_Itadori,Porco_Galliard,Falco_Grice,Gabi_Braun,Ymir,Zeke_Jaeger,
  Bertolt_Hoover,Reiner_Braun,Annie_Leonhart,Historia_Reiss,Erwin_Smith,Levi_Ackerman,Armin_Arlert,Sasha_Braus,
  Jean_Kirstein,Mikasa_Ackerman,Eren_Jaeger,Mitsuri_Kanroji,Himejima_Gyoumei,enmu,daki,gyutaro,akaza,kokushibo,muzan]
// console.log(All_Cards.length)

var waaa = ['Kamado Tanjiro', 'Kurisu Makise'];
for (let i = 0; i < All_Cards.length; i++) {
  let klab = All_Cards[i];
  for (let j = 0; j < waaa.length; j++){
    if (waaa[j] === klab.character) {
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
    else if (crit == 2){manaval = manaval+5
    if (manaval>=12){return 12}else{return manaval}}
    else{manaval= manaval+4
      if (manaval>=12){return 12}else{return manaval}}
  }else{
    if(evasion == 0){return manaval}
    else if (crit == 2){manaval = manaval+3
      if (manaval>=12){return 12}else{return manaval}}
    else{manaval = manaval+2
      if (manaval>=12){return 12}else{return manaval}}
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
  if (a >= 12){
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

let skill = ['RAVAGE','ELEMENTAL DRIVE','LIFESTEAL','ELEMENTAL DRIVE','ENHANCED STRIKE','PRECISION','EVASION',
'ADAPTATION','ADAPTATION','ASSIST','ASSIST','POISON','STUN','OVERPOWER','RAGE','BERSERKER']

function skillfunc(talent,rarity){
  if (talent == 1){
    let u = ['',,60,70,80,90]
    return `**RAVAGE:** [PSV] increase your attack by ${u[rarity]}% at the START of the battle and decreases your basic hp by 20% each round.`
  }else if (talent == 2){
    let rare = ['',,10,15,20,25]
    return `**ELEMENTAL DRIVE:** [ACT] deal ${rare[rarity]}% elemental  damage based on your current attack.`
  }else if (talent == 3){
    let rare = ['',,75,80,85,90]
    return `**LIFESTEAL:** [PSV] when your hp is below 40% it increases the lifesteal by ${rare[rarity]}% and these lifesteal effects got equally distributed in your team .`
  }else if (talent == 4){
    let rare = ['',,10,15,20,25]
    return `**ELEMENTAL DRIVE:** [ACT] deal ${rare[rarity]}% elemental  damage based on your current defense.`
  }else if (talent==5){
    let rare = ['',,10,20,30,40]
    return `**ENHANCED STRIKE:** [ACT] deal 10% elemental damage based on your base attack. Each round passed increases the damage by 10% upto ${rare[rarity]}%`
  }else if (talent == 6){
    let rare = ['',,15,20,25,30]
    return `**PRECISION:** [ACT] increase your critical rate by ${rare[rarity]}%.`
  }else if (talent == 7){
    let rare = ['',,15,20,25,30]
    return `**EVASION:** [ACT] increase your evasion rate by ${rare[rarity]}%.`
  }else if (talent == 8){
    let rare = ['',,10,15,20,25]
    return `**ADAPTATION:** [PSV] when your hp is below 60% increase your attack by ${rare[rarity]}% and if hp is below 30% increase your defense by ${rare[rarity]}%.`
  }else if (talent == 9){
    let rare = ['',,10,15,20,25]
    return `**ADAPTATION:** [PSV] when your hp is below 60% increase your defense by ${rare[rarity]}% and if hp is below 30% increase your attack by ${rare[rarity]}%.`
  }else if (talent == 10){
    let rare = ['',,25,30,35,40]
    return `**ASSIST:** [ACT] Increase the defense of all members of the team by ${rare[rarity]}%.`
  }else if (talent == 11){
    let rare = ['',,25,30,35,40]
    return `**ASSIST:** [ACT] Increase the attack of all members of the team by ${rare[rarity]}%.`
  }else if(talent ==12){
    return `**POISON:** [ACT] Inflict a stack of poison on enemy, which deals an initial true damage of 15% of enemy's maximum HP and goes upto 30% with each stack.`
  }else if (talent == 13){
    return `**STUN:** [ACT] Inflict stun on enemy, making them unable to attack for next turn. This can be resisted.`
  }else if (talent ==14){
    let rare = ['',,10,15,20,25]
    return `**OVERPOWER:** [PSV] Overpower your enemy if your HP is higher than enemy HP and increase your attack by ${rare[rarity]}%.`
  }else if (talent ==15){
    let rare = ['',,25,30,35,40]
    return `**RAGE:** [PSV] Become enraged if an ally is defeated. Increases your attack by ${rare[rarity]}%.`
  }else if (talent==16){
    let rare = ['',,8,10,12,15]
    let rare1 = ['',,20,25,30,35]
    return `**BERSERKER:** [PSV] While HP is below 30% increase your attack by ${rare1[rarity]}% and evasion by ${rare[rarity]}%.`
  }
}

export{All_Cards, enemy, convertToString, numsArr,randomcard,rarrity,enemyhp,manabar,
elements,manavalue,skill,skillfunc};
