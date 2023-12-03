import { sendDailyReport } from "./src/sendDailyReport.ts";

// for debugging
Deno.serve(() =>
  sendDailyReport()
    .then(() => {
      return new Response("ok");
    })
    .catch((e) => {
      console.error(e);
      return new Response(e.message);
    })
    .finally(() => {
      return new Response("done");
    })
);

// Send daily report at 9:00 am (JST)
Deno.cron("Send daily report", "* * * * *", () => {
  sendDailyReport()
    .then(() => {
      console.log("ok");
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.log("done");
    });
});
