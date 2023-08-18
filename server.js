const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/get_response', async (req, res) => {
    try {
        const userMessage = req.body.user_input;

        // Replace this with actual bot logic or API call
        const botResponse = await generateBotResponse(userMessage);

        res.json({ response: botResponse });
    } catch (error) {
        console.error("Error generating bot response:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Implement your bot logic or API call here
async function generateBotResponse(userMessage) {
    try {
        const OPENAI_API_KEY = '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'; // Replace with your actual API key

        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 50,
            }),
        });

        const responseData = await response.json();

        if (responseData.choices && responseData.choices[0] && responseData.choices[0].text) {
            return responseData.choices[0].text.trim();
        } else {
            console.error("Invalid response data:", responseData);
            return "Error generating bot response";
        }
    } catch (error) {
        console.error("Error generating bot response:", error);
        return "Error generating bot response";
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
