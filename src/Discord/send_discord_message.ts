import * as https from "https";

interface WebhookData {
  content?: string;
  avatar_url?: string;
  username?: string;
}

export default function sendDiscordMessage(data: WebhookData) {
  let stringified = JSON.stringify(data);
  console.log(stringified);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Content-Length": stringified.length,
    },
  };

  const req = https.request(process.env.WEBHOOK as string, options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(stringified);
  req.end();
}

console.log(process.env.WEBHOOK);
