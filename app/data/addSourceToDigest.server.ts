import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";
import { v4 } from "uuid";

const addSourceToDigest = ({
  userId,
  params,
  data,
}: {
  userId: string;
  params: Record<string, string | undefined>;
  data: Record<string, string[]>;
}) =>
  getMysqlConnection()
    .then((con) => {
      const digestUuid = params["uuid"];
      if (!digestUuid) throw new Error(`Digest uuid is required`);
      return con
        .execute(`SELECT user_id FROM digests WHERE uuid = ?`, [digestUuid])
        .then((recs) => {
          const [digest] = recs as { user_id: string }[];
          if (digest.user_id !== userId)
            throw new Error(
              `User is not allowed to add a source to this digest`
            );
          const uuid = v4();
          return con
            .execute(
              `INSERT INTO digest_sources (uuid, digest_uuid, provider_id, resource, identifier) VALUES (?,?,?,?,?)`,
              [
                uuid,
                digestUuid,
                data["provider"]?.[0],
                data["resource"]?.[0],
                data["identifier"]?.[0],
              ]
            )
            .then(() => con.destroy());
        });
    })
    .then(() => ({ success: true }));

export default addSourceToDigest;
