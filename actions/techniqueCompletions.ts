"use server";

import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import OpenAI from "openai";

export async function mindfulMeditationCompletion(userStress: string) {
  console.log("Mindful Meditaiton - Starting");
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  const OutputSchema = z.object({
    meditationText: z
      .string()
      .describe("The body of the guided meditation, without SSML tags"),
  });
  console.log("Mindful Meditaiton - Calling completion api");
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
            Generate a deeply personalized guided meditation that directly addresses the specific stressors and concerns expressed by the user. The meditation should be calm, relaxing, and around 3-5 minutes long, with language that is soothing, comforting, and empathetic.
  
            The meditation must:
            - Clearly acknowledge the specific stress or concern mentioned by the user.
            - Offer guided breathing exercises and visualization techniques to help the user release their stress.
            - Include both short and longer pauses to allow the listener to breathe deeply, self-reflect, fully relax, and after every sentence by using <break />.
            - <break /> tags should be followed by specific durations such as "1s", "2s", "3s", etc. (eg: <break time="4s" />), and should not appear at the very start or very end of the meditation.
            - Provide reassurances that directly relate to the user's situation, guiding them toward a sense of peace and resolution.
            - **Do not include any <break /> tags at the very start or very end of the meditation.** Breaks should only be used between words and sentences to allow for natural pauses.
          `,
      },
      {
        role: "user",
        content: userStress,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(OutputSchema, "event"),
  });
  console.log("Mindful Meditaiton - Recieved api response");
  const responseContent = completion.choices[0]?.message?.content;

  if (typeof responseContent === "string") {
    const parsedResponse = JSON.parse(responseContent);
    console.log("Mindful Meditaiton - Parsing");
    if (typeof parsedResponse.meditationText === "string") {
      const meditationContent = parsedResponse.meditationText
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"');
      console.log("Mindful Meditaiton - Parsing again");
      console.log("Parsed audio transcript: ", meditationContent);
      return meditationContent;
    } else {
      console.error("Invalid meditation content.");
    }
  } else {
    console.error("No valid content returned from the AI model.");
  }

  return null;
}

export async function cbtCompletion(userStress: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  const OutputSchema = z.object({
    negativeBeliefPrompt: z
      .string()
      .describe(
        "Provide 1 sentence journaling prompt that makes the user think about what negative belief or thought pattern they have based on the situation the user has described."
      ),
    negativeBeliefExample: z
      .string()
      .describe(
        "Provide 1 example of a negative belief or thought pattern based on the user’s situation."
      ),
    contradictBeliefNegativePrompt: z
      .string()
      .describe(
        "Provide a 1 sentence journaling prompt that makes the user explore what evidence they have that contradicts their negative belief regarding the situation."
      ),
    contradictBeliefNegativeExample: z
      .string()
      .describe(
        "Provide 1 example of evidence the user may have that contradicts their negative belief based on the user’s situation."
      ),
    positiveBeliefPrompt: z
      .string()
      .describe(
        "Provide a 1 sentence journaling prompt that makes the user explore what positive thoughts or beliefs they can have regarding the situation."
      ),
    positiveBeliefPromptExample: z
      .string()
      .describe(
        "Provide an example of a positive thoughts or beliefs based on the user’s situation."
      ),
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
              Act as a therapist. Provide a set of 3 deeply personalized CBT based prompts to guide the user through a CBT exercise with examples as specified below:
            
              1. Provide a journaling prompt that makes the user think about what negative belief or thought pattern they have based on the situation the user has described, including an example that is based on the user’s situation.
              2. Provide a 1 sentence journaling prompt that makes the user explore what evidence they have that contradicts their negative belief regarding the situation, including an example that is based on the user’s situation.
              3. Provide a 1 sentence journaling prompt that makes the user explore what positive thoughts or beliefs they can have regarding the situation, including an example that is based on the user’s situation.
            `,
      },
      {
        role: "user",
        content: userStress,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(OutputSchema, "event"),
  });

  const responseContent = completion.choices[0]?.message?.content;
  console.log(responseContent);
  return responseContent;
}

export async function circleOfInfluenceCompletion(userStress: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  const OutputSchema = z.object({
    circleOfInfluencePrompt: z
      .string()
      .describe(
        "Provide 1 sentence journaling prompt that makes the user think about what things are within their control based on the situation the user has described."
      ),
    circleOfInfluenceExample: z
      .string()
      .describe(
        "Provide 1 example of a factor that is their control based on the user’s situation."
      ),
    circleOfConcernPrompt: z
      .string()
      .describe(
        "Provide 1 sentence journaling prompt that makes the user think about what things are out of their control based on the situation the user has described."
      ),
    circleOfConcernExample: z
      .string()
      .describe(
        "Provide 1 example of a factor that is out of their control based on the user’s situation."
      ),
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
              Act as a mindset coach. Provide a set of 2 deeply personalized journaling prompts to guide the user through a circle of influence exercise:
            
              1. Provide 1 sentence journaling prompt that makes the user think about what things are out of their control based on the situation the user has described, including an example that is based on the user’s situation.
              2. Provide 1 sentence journaling promot that makes the user think about what things are within their control based on the situation the user has described, including an example that is based on the user’s situation.
            `,
      },
      {
        role: "user",
        content: userStress,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(OutputSchema, "event"),
  });

  const responseContent = completion.choices[0]?.message?.content;
  console.log(responseContent);
  return responseContent;
}

export async function journalingCompletion(userStress: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  const OutputSchema = z.object({
    journalingPrompt: z
      .string()
      .describe(
        "Provide a 1 sentence journaling prompt based on the situation the user has described to help the user further explore and dive deeper their feelings on the situation."
      ),
    selfReflectionPrompt: z
      .string()
      .describe(
        "Provide a 1 sentence journaling prompt based on the situation the user has described to help the user see the situation in a positive light."
      ),
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
              Act as a therapist. Provide a set of 2 deeply personalized journaling prompts as specified below:
            
              1. Provide a journaling prompt based on the situation the user has described to help the user further explore and dive deeper into their feelings on the situation. 
              2. Provide a journaling prompt based on the situation the user has described to help the user see the situation in a positive light.
            `,
      },
      {
        role: "user",
        content: userStress,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(OutputSchema, "event"),
  });

  const responseContent = completion.choices[0]?.message?.content;
  console.log(responseContent);
  return responseContent;
}

export async function affirmationsCompletion(userStress: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  const OutputSchema = z.object({
    personalizedAffirmations: z
      .array(z.string())
      .describe(
        "Provide a set of 3 deeply personalized positive affirmations based on the situation the user has described, turning any negativity into positivity."
      ),
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
              Act as a mindset coach. Provide a set of 3 deeply personalized positive affirmations based on the situation the user has described, turning any negativity into positivity. 
            `,
      },
      {
        role: "user",
        content: userStress,
      },
    ],
    model: "gpt-4o-mini",
    response_format: zodResponseFormat(OutputSchema, "event"),
  });

  const responseContent = completion.choices[0]?.message?.content;
  console.log(responseContent);

  return responseContent;
}
