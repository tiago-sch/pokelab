import express from 'express'

const router = express.Router();

router.get("/", (_, res) => res.send("pokedex!"));

router.get("/pokemon/:name", (_, res) => res.send("pokemon!"));

router.post("/matchup/", (_, res) => res.send("matchup!"));

router.get("*", (_, res) => res.redirect("/api"))

export default router;
