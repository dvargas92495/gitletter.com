import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";
import { v4 } from "uuid";
import uploadFile from "@dvargas92495/app/backend/uploadFile.server";

const createTemplate = ({
  userId,
  data,
}: {
  userId: string;
  data: Record<string, string[]>;
}) => {
  const name = data.name[0] || "";
  const description = data.description[0] || "";
  const content = data.content[0] || "";
  const uuid = v4();
  const now = new Date();
  return getMysqlConnection()
    .then(({ execute, destroy }) =>
      execute(
        `INSERT INTO templates (uuid, name, description, user_id, created_date, edited_date) VALUES (?,?,?, ?, ?, ?)`,
        [uuid, name, description, userId, now, now]
      ).then(() => destroy())
    )
    .then(() => {
      return uploadFile({ Body: content, Key: `templates/${uuid}.html` });
    })
    .then(() => uuid);
};

export default createTemplate;
