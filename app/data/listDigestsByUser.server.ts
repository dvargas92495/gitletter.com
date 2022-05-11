import getMysql from "@dvargas92495/app/backend/mysql.server";

const listDigestsByUser = ({ userId }: { userId: string }) =>
  getMysql()
    .then((cxn) =>
      cxn.execute(
        `SELECT uuid, name, description FROM digests WHERE user_id = ?`,
        [userId]
      )
    )
    .then((records) => {
      const data = records as {
        uuid: string;
        name: string;
        description: string;
      }[];
      return {
        data,
        columns: [
          { Header: "Name", accessor: "name" },
          { Header: "Description", accessor: "description" },
        ],
        count: data.length,
      };
    });

export default listDigestsByUser;
