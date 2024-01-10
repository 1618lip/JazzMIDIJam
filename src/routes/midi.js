import express from "express";

import { createMIDITrack } from "../services/midi.js";

const router = express.Router();

router.post("/upload", async (req, res, next) => {
  const body = req.body;

  const backingTrack = body["backing_track"];
  const data = body["data"];

  const result = await createMIDITrack(backingTrack, data);

  res.send({
    inserted: result,
  });
});

export default router;
