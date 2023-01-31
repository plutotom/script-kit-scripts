// Name: OpenAI Chat GPT
// Description: Query Open AI's API
// Shortcut: cmd ctrl p

import "@johnlindquist/kit";

let { Configuration, OpenAIApi } = await npm("openai");

let configuration = new Configuration({
  apiKey: await env("OPENAI_API_KEY"),
});

let openai = new OpenAIApi(configuration);
let prompt = await arg("Prompt:");

editor(prompt);

setTimeout(() => {
  setLoading(true);
}, 250);
let response = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: `${prompt}

  `,
  temperature: 0.7,
  max_tokens: 512,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

setLoading(false);

let text = response?.data?.choices[0]?.text?.trim();
if (text) {
  await editor(text);
} else {
  dev(response.data);
}
