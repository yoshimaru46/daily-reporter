import { ENV } from "./config.ts";

export const notifyToSlack = async (message: string) => {
  const payload = {
    text: message,
  };

  const response = await fetch(ENV.SLACK_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to send a message to Slack. status=${response.status}`
    );
  }
};
