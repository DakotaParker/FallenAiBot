const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]

})

client.on("ready", (c) =>{
    console.log(`${c.user.username} is online`);
});



client.login("MTM0MTA5MjczMzQ0MzYzNzI4MA.GX-xo0.k5y9W2weRjR4W_u89pKNahj3rOiKobQwqGLTlw");

