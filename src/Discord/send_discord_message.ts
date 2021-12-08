import { post } from "../requests";

interface WebhookData {
  content?: string;
  avatar_url?: string;
  username?: string;
}

export default function sendDiscordMessage(data: WebhookData) {
  post(process.env.WEBHOOK as string, data);
}
