import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createVoiceover(audioPath, targetLang) {
  // Step 1: Transcribe original audio
  const transcription = await client.audio.transcriptions.create({
    model: "gpt-4o-mini-transcribe",
    file: fs.createReadStream(audioPath),
  });

  // Step 2: Translate text
  const translation = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: `Translate this text into ${targetLang}` },
      { role: "user", content: transcription.text },
    ],
  });

  const translatedText = translation.choices[0].message.content;

  // Step 3: Generate voiceover
  const outputFile = `${audioPath}-dubbed.mp3`;
  const speech = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: translatedText,
  });

  const buffer = Buffer.from(await speech.arrayBuffer());
  fs.writeFileSync(outputFile, buffer);

  return outputFile;
}
