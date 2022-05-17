import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";

const listSourcesInDigests = ({
  params,
}: {
  params: Record<string, string | undefined>;
}) =>
  getMysqlConnection().then((con) =>
    con
      .execute(
        `SELECT uuid, provider_id, resource, identifier FROM digest_sources WHERE digest_uuid = ?`,
        [params["uuid"] || ""]
      )
      .then((records) => {
        con.destroy();
        const sources = records as {
          uuid: string;
          provider_id: string;
          resource: string;
          identifier: string;
        }[];
        return {
          sources,
        };
      })
  );

export default listSourcesInDigests;
