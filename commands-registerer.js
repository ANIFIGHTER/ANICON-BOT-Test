import REST from '@discordjs/rest';
import Routes from 'discord-api-types/v9';
import dotenv from 'dotenv'
import fs from 'fs';
dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

const commands = []
const commandfiles = fs.readdirSync('./allcommands').filter(file=>file.endsWith('.js'));

for (const file of commandfiles) {
	let command  = await import (`./allcommands/${file}`);
	let a = command.ping
	// console.log(a.data)
	commands.push(a.data.toJSON());
	// console.log(commands)
}

const rest = new REST.REST({ version: '9' }).setToken(token);

rest.put(Routes.Routes.applicationGuildCommands(clientId, guildId), { body: commands})
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
