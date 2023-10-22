import pino from "npm:pino@8";
import pretty from "npm:pino-pretty@10";

const stream = pretty({
  colorize: true,
});
export const initLogger = (level: pino.Level) =>
  pino(
    {
      level,
    },
    stream,
  );
