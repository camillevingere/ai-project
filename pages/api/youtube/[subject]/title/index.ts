import type { NextApiRequest, NextApiResponse } from "next";

import openai from "../../../../../lib/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const gptResponse = await openai.createCompletion(
        {
          model: "text-davinci-003",
          prompt: `Tu es mon assistant à la création de contenu. Créé une liste de 10 titres de vidéos youtube avec le sujet : ${req.query.subject}`,
          max_tokens: 1000,
          temperature: 0.9,
        },
        {
          timeout: 60000,
        }
      );

      const text = gptResponse.data?.choices[0]?.text;

      console.log("Idées:", text);

      if (text) {
        const titles = text.split("\n");

        const titlesFormatted = titles
          .filter((title) => title.length > 0)
          .map((title) => {
            return title.replace(/\d{1,2}\.\s/g, "").replace(/"/g, "");
          });
        return res.status(200).json({ results: titlesFormatted });
      }
      return res.status(500).end();
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      return res.status(500).end();
    }
  }
  return res.status(405).end();
}
