import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";
import { ForbiddenResponse } from "@dvargas92495/app/backend/responses.server";

const deleteTemplateByUuid = ({
  userId,
  params,
}: {
  userId: string;
  params: Record<string, string | undefined>;
}) =>
  getMysqlConnection()
    .then((con) => {
      const templateUuid = params["uuid"];
      if (!templateUuid) throw new Error(`Template uuid is required`);
      return con
        .execute(`SELECT user_id FROM templates WHERE uuid = ?`, [templateUuid])
        .then((recs) => {
          const [template] = recs as { user_id: string }[];
          if (template.user_id !== userId)
            throw new ForbiddenResponse(
              `User is not allowed to delete this template`
            );
          return con
            .execute(`DELETE FROM templates WHERE uuid = ?`, [templateUuid])
            .then(() => con.destroy()); // NOTE: Data still lives in S3
        });
    })
    .then(() => ({ success: true }));

export default deleteTemplateByUuid;
