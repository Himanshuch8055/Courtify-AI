const express = require("express");
const bodyParser = require("body-parser");
import('node-fetch').then(({ default: fetch }) => {
  // Your code using fetch here
});
const {Translate} = require('@google-cloud/translate').v2;
const pdf = require('pdf-parse');
// Remove the multer import as it's not installed
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Hugging Face API key
const HUGGING_FACE_API_KEY = "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const translate = new Translate();

// Remove the multer configuration

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

app.post("/chat", async (req, res) => {
  let message = req.body.message;

  // Detect the language and translate if necessary
  const [detection] = await translate.detect(message);
  const detectedLang = detection.language;

  if (detectedLang !== 'en') {
    const [translation] = await translate.translate(message, 'en');
    message = translation;
  }

  // Call Hugging Face sentiment analysis model
  const sentimentResult = await query({inputs: message});
  console.log(JSON.stringify(sentimentResult, null, 2));

  // Call Hugging Face conversational model API
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    }
  );

  const data = await response.json();
  let reply = data.generated_text;

  // Translate the reply back to the original language
  if (detectedLang !== 'en') {
    const [translatedReply] = await translate.translate(reply, detectedLang);
    reply = translatedReply;
  }

  res.json({ reply, detected_lang: detectedLang, sentiment: sentimentResult });
});

app.post('/summarize', async (req, res) => {
  const documentText = req.body.text;

  // Call Hugging Face summarization API
  const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: documentText }),
  });

  const data = await response.json();
  const summary = data[0].summary_text;

  res.json({ summary });
});

// Remove the '/upload' route as it depends on multer

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
