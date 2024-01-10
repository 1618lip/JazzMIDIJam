import db from "../db/client.js";

export async function createMIDITrack(backingTrack, data) {
  const result = await db.query(
    `insert into midi(track, data) values ($1, $2)`,
    [backingTrack, data]
  );

  if (result.rowCount == 1) {
    return true;
  } else {
    return false;
  }
}
