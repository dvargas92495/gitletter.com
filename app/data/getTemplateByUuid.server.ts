import getMysql from "@dvargas92495/app/backend/mysql.server";
import {
  ForbiddenResponse,
  NotFoundResponse,
} from "@dvargas92495/app/backend/responses.server";
import { downloadFileContent } from "@dvargas92495/app/backend/downloadFile.server";

const getTemplateByUuid = ({
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
        `SELECT name, description, user_id, created_date, edited_date FROM templates WHERE uuid = ?`,
        [uuid]
      )
    )
    .then((records) => {
      const data = records as {
        user_id: string;
        name: string;
        description: string;
        created_date: Date;
        edited_date: Date;
      }[];
      if (!data.length)
        throw new NotFoundResponse(`Cannot find digest ${uuid}`);
      const [template] = data;
      if (template.user_id !== userId)
        throw new ForbiddenResponse(
          `User not allowed to access digest ${uuid}`
        );
      return downloadFileContent({ Key: `templates/${uuid}.html` }).then(
        (content) => {
          return {
            name: template.name,
            description: template.description,
            createdDate: template.created_date.toLocaleString(),
            editedDate: template.edited_date.toLocaleString(),
            content,
            uuid,
          };
        }
      );
    });
};

export default getTemplateByUuid;
