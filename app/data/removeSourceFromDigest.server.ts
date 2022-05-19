import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";

const removeSourceFromDigest = ({
  userId,
  params,
}: {
  userId: string;
  params: Record<string, string | undefined>;
}) =>
  getMysqlConnection()
    .then((con) => {
      const digestUuid = params["uuid"];
      if (!digestUuid) throw new Error(`Digest uuid is required`);
      const sourceUuid = params["source"];
      if (!sourceUuid) throw new Error(`Source uuid is required`);
      return con
        .execute(`SELECT user_id FROM digests WHERE uuid = ?`, [digestUuid])
        .then((recs) => {
          const [digest] = recs as { user_id: string }[];
          if (digest.user_id !== userId)
            throw new Error(
              `User is not allowed to remove a source from this digest`
            );
          return con
            .execute(`DELETE FROM digest_sources WHERE uuid = ?`, [sourceUuid])
            .then(() => con.destroy());
        });
    })
    .then(() => ({ success: true }));

export default removeSourceFromDigest;
