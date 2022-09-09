import mongoose from "mongoose"

const userido = mongoose.model('USER_ID',
mongoose.Schema({USER_ID:{type :Number,required:true},joining_date:{type:Date,default:new Date()}}))
const userdatao = mongoose.model('Userdata',
mongoose.Schema({user_id:Number,area:Number,stage:Number,
    leveluniqueid:Number,max_stage:Number}))
const staminao = mongoose.model('Stamina',
mongoose.Schema({user_id:Number,user_lvl:Number,user_xp:Number,
    user_xp_limit:Number,stamina:Number,lastupstam:Date,stamlimit:Number}))
const stage = mongoose.model('Stage',
mongoose.Schema({area:Number, stage:Number, enemy_unique_id: Number, enemy_lvl:Number,	
    leveluniqueid:Number, rarity: Number}))

    const userid = mongoose.model('USER_IDs',
    mongoose.Schema({USER_ID:{type :String,required:true},joining_date:{type:Date,default:new Date()}}),'USER_ID')
    const gamedata = mongoose.model('Gamedatas',
    mongoose.Schema({card_id:{type :String,required:true}, card_unique_id:{type :String,required:true},
        card_rarity:{type :Number,required:true},card_lvl:{type :Number,required:true},
        card_xp:{type :Number,required:true,default:0}, limitbreak:{type :Number,required:true,default:0},	
        card_owner:{type :String,required:true}, team_status:{type:Number,default:null},
        team_name:String,familarity:{type:Number,default:0}}),'Gamedata')
    const userdata = mongoose.model('Userdatas',
    mongoose.Schema({user_id:String,area:Number,stage:Number,
        leveluniqueid:Number,max_stage:Number}),'Userdata')
    const stamina = mongoose.model('Staminas',
    mongoose.Schema({user_id:String,user_lvl:Number,user_xp:Number,
        user_xp_limit:Number,stamina:Number,lastupstam:Date,stamlimit:Number}),'Stamina')
    const item = mongoose.model('UserItems',
    mongoose.Schema({user_id:String,gold:Number,limit_break_small:{type:Number,default:0},
        limit_break_medium:{type:Number,default:0},limit_break_big:{type:Number,default:0},
        light:{type:Number,default:500},dark:{type:Number,default:500},fire:{type:Number,default:500},
        wind:{type:Number,default:500},nature:{type:Number,default:500},ground:{type:Number,default:500},
        zap:{type:Number,default:500},water:{type:Number,default:500},neutral:{type:Number,default:500},
        localgold:{type:Number,default:2500}}),'UserItem')

const dailytab = mongoose.model('dailytab',mongoose.Schema({user_id:String,lottery:Date,invsort:String}))


export{userid,gamedata,userdata,stamina,item,stage,userido,userdatao,staminao,dailytab}