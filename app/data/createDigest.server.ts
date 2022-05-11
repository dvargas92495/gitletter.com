import getMysql from "@dvargas92495/app/backend/mysql.server";
import { v4 } from "uuid";

const createDigest = ({
  userId,
  data,
}: {
  userId: string;
  data: Record<string, string[]>;
}) =>
  getMysql()
    .then((cxn) =>
      Promise.resolve(v4()).then((uuid) =>
        cxn
          .execute(
            `INSERT INTO digests (uuid, name, description, user_id) VALUES (?,?,?,?)`,
            [uuid, data.name[0] || "", data.description[0] || "", userId]
          )
          .then(() => uuid)
      )
    )
    .then((uuid) => {
      return {
        uuid,
      };
    });

export default createDigest;
