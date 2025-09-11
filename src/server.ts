/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

/**
 * Custom modules
 */
import config from "@/config";
import limiter from "@/lib/express_rate_limit";

/**
 * Types
 */
import type { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !requestOrigin ||
      config.WHITELIST_ORIGINS.includes(requestOrigin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${requestOrigin} is not allowed by CORS`),
        false,
      );
      console.log(`CORS error: ${requestOrigin} is not allowed by CORS`);
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
  }),
);
app.use(helmet());

app.use(limiter);

(async () => {
  try {
    app.get("/", (req, res) => {
      res.json({
        message: "Hello world",
      });
    });

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.log("Failed to start the server", err);

    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();

// const handleServerShutdown = async () => {
//   try {
//     process.exit(0);
//   } catch (err) {}
// };

// process.on("SIGTERM", handleServerShutdown);
// process.on("SIGINT", handleServerShutdown);
