const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
    
module.exports = {
    data: new SlashCommandBuilder()
        .setName('deckbuild')
        .setDescription('Ask Chat Gpt to create a custom deck builder for the user based on account specifications')
        .addStringOption(option =>
            option.setName('question')
            .setDescription('What you asked Chat Gpt')
            .setRequired(true)
        ),
        
        async execute(interaction) {
            const userQuestion = interaction.options.getString('question');

            await interaction.deferReply();

            try {
                const response = await openai.createChatCompletion({
                    model: "gpt-4.0",
                    messages: [{ role: "user", content: userQuestion}],
                    max_tokens: 400
                });
                
                const gptReply = response.data.choices[0].message.content;

                await interaction.editReply(gptReply);
            } catch(error) {
                console.error("Chat Gpt is on break try again", error);
                await interaction.editReply("Sorry, but i was playing mirror match and cant answer your question.")
            }    
        },
    };


    // command format  --------> /chatgpt question: "your question" //

