import getMysql from "@dvargas92495/app/backend/mysql.server";

const getDigest = ({
  userId,
  params,
}: {
  userId: string;
  params: Record<string, string | undefined>;
}) => {
  const uuid = params["uuid"];
  if (!uuid) throw new Response("`uuid` is a required param", { status: 400 });
  return getMysql()
    .then((cxn) =>
      cxn.execute(
        `SELECT name, description, user_id FROM digests WHERE uuid = ?`,
        [uuid]
      )
    )
    .then((records) => {
      const data = records as {
        user_id: string;
        name: string;
        description: string;
      }[];
      if (!data.length)
        throw new Response(`Cannot find digest ${uuid}`, { status: 404 });
      const [digest] = data;
      if (digest.user_id !== userId)
        throw new Response(`User not allowed to access digest ${uuid}`, {
          status: 403,
        });
      return {
        ...digest,
        uuid,
      };
    });
};

export default getDigest;
