import express from "express";
import companyRouter from "./companyRouter.js";
import companyProfileRouter from "./companyProfileRouter.js";

const router = express.Router();

router.use(companyRouter);
router.use(companyProfileRouter);

router.all("*", (req, res) => {
  res.status(404).json("Route nut exist");
});

export default router;