import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import AppRouters from "../api/index";
import Logger from "./logger";

export default async ({ app }: { app: express.Application }) => {
  const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 15 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: function (req, res) {
      Logger.info(`Search limit ::: ${req}`);
      return res.status(429).json({
        error: "Search limit triggered.",
      });
    },
  });

  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.enable("trust proxy");

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/recipes", limiter);
  app.use("/information", limiter);
  app.use(AppRouters());
  return app;
};
