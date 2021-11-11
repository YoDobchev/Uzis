import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

// Каквът тип работи ще прави ъзис
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () =>{
    console.log("Ъзис се събуди")
    const guildId = '772563336243707905'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if(guild){
        commands = guild.commands
    }else{
        commands = client.application?.commands
    }
    
    commands?.create({
        name: 'sex',
        description: 'Ъзис ще ти открадне децата'
    })
    commands?.create({
        name: 'gei',
        description: 'прави яки работи',
        options: [{
            name: 'text',
            description: 'Това е текст',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        }]
    })

});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return // Проверяваме ако interaction-а е команда

    const { commandName, options } = interaction

    if(commandName == 'sex'){
        await interaction.reply({
            content: 'I WILL SEX YOU',
            ephemeral: false, //true - само този който праща ще го вижда
        })
    }else if(commandName == 'gei'){

        const str = options.getString('text')! // Взима стрингът от text, ! значи че сме сигурни че не е null
        const year = Math.floor(Math.random() * 2021);
        await interaction.reply({
            content: `_" ${str} "_ - **Гошо от почивка ${year}г.**"`
        })
    }


});

client.login(process.env.TOKEN)