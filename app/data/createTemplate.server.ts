import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";
import { v4 } from "uuid";
import AWS from "aws-sdk";

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
  return getMysqlConnection().then(({ execute, destroy }) =>
    execute(
      `INSERT INTO templates (uuid, name, description, user_id, created_date, updated_date) VALUES (?,?,?, ?, ?, ?)`,
      [uuid, name, description, userId, now, now]
    ).then(() => destroy())
  ).then(() => {
    //   const s3 = new AWS.S3();
    //   s3.upload({
    //       Bucket: process.env.NODE_ENV
    //   })
    //
    // aws-sdk-plus
  });
};

export default createTemplate;
