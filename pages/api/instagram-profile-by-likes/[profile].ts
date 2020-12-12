import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";

import db from "../../../db";
import { Job } from "../../../db/job";

export default async (req, res) => {
  const {
    query: { profile },
  } = req;

  if (!profile) {
    res.status(400).end();
  }

  const job = await db<Job>("jobs")
    .insert({
      uuid: uuidv4(),
      created: new Date(),
      status_id: 0,
      argument: profile,
    })
    .returning(["uuid", "created", "status_id"])
    .then((q) => q[0]);

  const python = spawn("python3", ["python/instagram-likes.py", profile]);

  python.stdout.on("data", async function (data) {
    const str = data.toString();
    if (str) {
      await db<Job>("jobs")
        .where({
          uuid: job.uuid,
        })
        .update({
          status_id: 1,
          output: str,
        });
    }
  });

  res.statusCode = 202;
  res.json(job);
};
