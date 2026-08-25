import express from "express";
import multer from "multer";
import { exec } from "child_process";
import { createVoiceover } from "./services/openai.js";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const videoPath = req.file.path;

    // Extract audio from video using ffmpeg
    const audioPath = `${videoPath}.mp3`;
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${videoPath} -q:a 0 -map a ${audioPath}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Call OpenAI service to create dubbed audio
    const dubbedAudioPath = await createVoiceover(audioPath, "es"); // Example: Spanish

    // Merge dubbed audio back into video
    const outputVideo = `${videoPath}-dubbed.mp4`;
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${videoPath} -i ${dubbedAudioPath} -c:v copy -map 0:v:0 -map 1:a:0 ${outputVideo}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.download(outputVideo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing video");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
