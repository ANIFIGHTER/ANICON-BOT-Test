import discord from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import { All_Cards as cards} from '/ASHWIN/JavaScript/disc_cards.js';

const ping = {
	data: new SlashCommandBuilder()
		.setName('cinfo')
		.setDescription('Replies with Details!')
		.addStringOption(option => option.setName('cardname').setDescription('Card Details').setRequired(true)),
    async execute(interaction) {
        let cardnamelist = new Object()
        let card;
        let theid
        const userinput = interaction.options.getString('cardname');
        let a = userinput.split(' ')
        for (let i = 0; i <cards.length; i++){
            let x = cards[i].character.split(' ')
            for (let y =0;y<=x.length-1;y++){
                cardnamelist[`${x[y].toLowerCase()}`]=cards[i].uniqueID
            }}
            
    for (let x =0;x<=Object.getOwnPropertyNames(cardnamelist).length;x++){
            if (Object.getOwnPropertyNames(cardnamelist)[x] === a[0] ){
                theid = cardnamelist[`${Object.getOwnPropertyNames(cardnamelist)[x]}`]}}
        for (let i = 0; i <cards.length; i++){
            if (cards[i].uniqueID==theid){
                card = cards[i]}}
        if (card == undefined){await interaction.reply('This character doesnot exist in the game.')}
        else{    
        let details = new discord.MessageEmbed();
        details.setAuthor({name:`${interaction.user.tag}`, iconURL:`${interaction.user.avatarURL()}`});
        details.setColor('RED');
        details.setTitle(`${card.character}`);
        details.setDescription(`**Series** : ${card.series}\n**Element** : ${card.element}\n**Rarity** : **${card.rarity}**\n**HP** : ${card.hp}\n**Attack** : ${card.attack}\n**Defense** : ${card.defense}\n**Agility** : ${card.agility}`);
        details.setImage(`${card.artlink}`)
        details.setThumbnail('https://static.zerochan.net/Nakajima.Atsushi.%28Bungou.Stray.Dogs%29.full.2028610.jpg')
        details.setFooter({text:`${card.quote}`, iconURL:'https://static.zerochan.net/Nakajima.Atsushi.%28Bungou.Stray.Dogs%29.full.2028610.jpg'})
            await interaction.reply({embeds:[details]})
        }}
    };
export{ping};