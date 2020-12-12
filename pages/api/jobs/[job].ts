import db from "../../../db";
import { Job } from "../../../db/job";

export default async (req, res) => {
  const {
    query: { job },
  } = req;

  const jobDao = await db
    .select("uuid", "created", "status_id")
    .from<Job>("jobs")
    .where({
      uuid: job,
    })
    .first();

  return res.status(200).send(jobDao);
};
