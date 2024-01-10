import db from "./client.js";

export async function setup() {
  const result = await db.query(
    `select exists (select from pg_tables where schemaname = 'public' and tablename = 'midi')`
  );

  if (result.rows[0].exists) return;

   console.log('Table does not exist. Creating table');

  await db.query(`
        create table midi(
            id serial primary key,
            track varchar(40) not null check (track <> ''),
            data json
        );
  `);

  console.log('Created Table MIDI');
}
