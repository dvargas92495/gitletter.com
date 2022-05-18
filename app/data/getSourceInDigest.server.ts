import getMysql from "@dvargas92495/app/backend/mysql.server";

const getSourceInDigest = ({
  userId,
  params,
}: {
  userId: string;
  params: Record<string, string | undefined>;
}) => {
  const uuid = params["source"];
  if (!uuid) throw new Response("`uuid` is a required param", { status: 400 });
  return getMysql()
    .then((cxn) =>
      cxn.execute(
        `SELECT s.provider_id, s.resource, s.identifier, d.user_id 
        FROM digest_sources s
        INNER JOIN digests d ON d.uuid = s.digest_uuid 
        WHERE s.uuid = ?`,
        [uuid]
      )
    )
    .then((records) => {
      const data = records as {
        provider_id: string;
        resource: string;
        identifier: string;
        user_id: string;
      }[];
      if (!data.length)
        throw new Response(`Cannot find digest's source ${uuid}`, {
          status: 404,
        });
      const [source] = data;
      if (source.user_id !== userId)
        throw new Response(`User not allowed to access digest ${uuid}`, {
          status: 403,
        });
      return {
        ...source,
        uuid,
      };
    });
};

export default getSourceInDigest;
