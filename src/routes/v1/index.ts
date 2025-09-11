/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { Router } from "express";

/**
 * Types - to prevent error because of pnpm
 */
import { type Router as IRouter } from "express";

const router: IRouter = Router();

/**
 * Root Route
 */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is live",
    status: "ok",
    version: "1.0.0",
    docs: "https://docs.youtube-api.deephiwase.com",
    timestamp: new Date().toISOString(),
  });
});

export default router;
