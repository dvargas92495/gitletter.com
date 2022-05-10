import getMysql from "@dvargas92495/app/backend/mysql.server";

const listDigestsByUser = () =>
  getMysql()
    .then((cxn) => cxn.execute(`SELECT * FROM digests`))
    .then((records) => {
      const data = records as {}[];
      return {
        data,
        columns: data.length
          ? Object.keys(data[0]).map((k) => ({ Header: k, accessor: k }))
          : [],
        count: data.length,
      };
    });

export default listDigestsByUser;
