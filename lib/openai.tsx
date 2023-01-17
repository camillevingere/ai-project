import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-XOMduBNSldawwk7dnhyHfhpV",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
