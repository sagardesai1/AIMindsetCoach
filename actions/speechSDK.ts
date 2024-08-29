"use server";

import { auth } from "@clerk/nextjs/server";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { v4 as uuidv4 } from "uuid";
import { adminStorage } from "@/firebaseAdmin";
import path from "path";

import axios from "axios";
import fs from "fs";
import OpenAI from "openai";

export default async function textToSpeech(audioTranscription: string) {
  try {
    console.log("Text To Speech - Starting");
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    // Generate a unique filename for the audio
    // Generate a unique filename for the audio
    const uniqueId = uuidv4();
    const audioFileName = `speech-${uniqueId}.mp3`;

    console.log("Text To Speech - Initalizing OpenAI");
    // Initialize OpenAI
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey });
    console.log("Text To Speech - Calling OpenAI endpoint");
    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: audioTranscription,
    });
    console.log("Text to Speech - Done generating audio");
    // Save the generated audio to the /tmp directory
    // Convert the generated audio to a buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());
    console.log("Text to Speech - buffer finished");

    // Stream the buffer directly to Firebase Storage
    console.log("Text to Speech - Writing to database");

    const bucket = adminStorage.bucket();
    const file = bucket.file(`audio-files/${userId}/${audioFileName}`);

    await new Promise((resolve, reject) => {
      const stream = file.createWriteStream({
        metadata: {
          contentType: "audio/mp3",
        },
      });

      stream.on("finish", resolve);
      stream.on("error", reject);

      stream.end(buffer);
    });

    console.log("Text to Speech - Done writing to database");

    return {
      success: true,
      message: "Audio generation succeeded.",
      audioFileName: audioFileName,
    };
  } catch (error) {
    console.error("Error in textToSpeech:", error);
    return {
      success: false,
      message: "Audio generation failed.",
      audioFileName: "",
    };
  }
}

// export default async function textToSpeech(audioTranscription: string) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("User not found");
//   }

//   const response = await axios.post(
//     `${process.env.AZURE_SPEECH_FUNCTION_URL}/startTextToSpeechFunction`,
//     { audioTranscription, userId },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (response.data.success) {
//     return { jobId: response.data.jobId };
//   } else {
//     throw new Error(response.data.error);
//   }
// }

// export default async function textToSpeech(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { audioTranscription } = req.body;
//     const { userId } = await auth();

//     if (!userId || !audioTranscription) {
//       return res.status(400).json({ success: false, error: "Invalid input" });
//     }

//     // Set the callback URL (endpoint that will handle the webhook)
//     const callbackUrl = `${process.env.AZURE_WEBHOOK_URL}`;

//     // Start the TTS job
//     const startResponse = await axios.post(
//       `${process.env.AZURE_SPEECH_FUNCTION_URL}/startTextToSpeechFunction`,
//       { audioTranscription, userId, callbackUrl },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (startResponse.data.success) {
//       return res
//         .status(200)
//         .json({ success: true, jobId: startResponse.data.jobId });
//     } else {
//       throw new Error(startResponse.data.error);
//     }
//   } catch (error) {
//     console.error("Failed to start TTS:", error);
//     return res
//       .status(500)
//       .json({ success: false, error: "Failed to start TTS" });
//   }
// }

// export default async function textToSpeech(audioTranscription: string) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       throw new Error("User not found");
//     }

//     // Generate a unique filename for the audio
//     const uniqueId = uuidv4();
//     const audioFileName = `speech-${uniqueId}.wav`;
//     const audioFilePath = path.join("/tmp", audioFileName); // Store in /tmp directory

//     // Configure Azure Speech SDK
//     const speechConfig = sdk.SpeechConfig.fromSubscription(
//       process.env.SPEECH_KEY!,
//       process.env.SPEECH_REGION!
//     );
//     const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFilePath);

//     // Create Speech Synthesizer
//     const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

//     // Perform speech synthesis directly using the audioTranscription string
//     await new Promise<void>((resolve, reject) => {
//       synthesizer.speakSsmlAsync(
//         audioTranscription,
//         (result) => {
//           if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
//             console.log("Synthesis finished.");
//             resolve();
//           } else {
//             console.error("Speech synthesis canceled:", result.errorDetails);
//             reject(new Error(result.errorDetails));
//           }
//           synthesizer.close();
//         },
//         (err) => {
//           console.trace("Error:", err);
//           synthesizer.close();
//           reject(err);
//         }
//       );
//     });

//     // Upload the audio file to Firebase Storage
//     const bucket = adminStorage.bucket();
//     const destination = `audio-files/${userId}/${audioFileName}`;
//     await bucket.upload(audioFilePath, {
//       destination,
//       metadata: {
//         contentType: "audio/wav",
//       },
//     });

//     // Optionally clean up the file from /tmp directory after upload
//     // fs.unlinkSync(audioFilePath);

//     // Return success response
//     return { success: true, fileName: audioFileName };
//   } catch (error) {
//     console.error("Failed to synthesize audio:", error);
//     return { success: false, error: "Failed to synthesize audio" };
//   }
// }

export async function deleteAudioFiles() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const bucket = adminStorage.bucket();
  const [files] = await bucket.getFiles({ prefix: `audio-files/${userId}/` });

  // Delete all files in the user's directory
  await Promise.all(
    files.map(async (file) => {
      await file.delete();
    })
  );
}
