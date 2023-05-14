import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import https from "https";
import express from "express";

import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");
const ORGANIZATION = process.env.ORGANIZATION;
if (!ORGANIZATION) throw new Error("ORGANIZATION not set");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

const DAVINCI_TURBO = "gpt-3.5-turbo";

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/webhook", async (req, res) => {
  res.send("HTTP POST request sent to the webhook URL!");
  // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
  if (req.body.events[0].type === "message") {
    const inputText = req.body.events[0].message.text;

    // OpenAI APIを使って返信メッセージを生成
    const completion = await openai.createChatCompletion({
      model: DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that accurately answers queries.",
        },
        {
          role: "user",
          content: inputText,
        },
      ],
      max_tokens: 150,
      temperature: 0.0,
    });
    const response = completion.data.choices[0].message.content;

    // 文字列化したメッセージデータ
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: response,
        },
      ],
    });

    // リクエストヘッダー
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    // リクエストに渡すオプション
    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    // エラーをハンドル
    request.on("error", (err) => {
      console.error(err);
    });

    // データを送信
    request.write(dataString);
    request.end();
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
