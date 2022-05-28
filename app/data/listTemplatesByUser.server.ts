import getMysql from "@dvargas92495/app/backend/mysql.server";

const listTemplatesByUser = ({ userId }: { userId: string }) =>
  getMysql().then((cxn) =>
    cxn
      .execute(
        `SELECT uuid, name, description, created_date, edited_date FROM templates WHERE user_id = ?`,
        [userId]
      )
      .then((records) => {
        cxn.destroy();
        const templates = (
          records as {
            uuid: string;
            name: string;
            description: string;
            created_date: Date;
            edited_date: Date;
          }[]
        ).map((a) => ({
          uuid: a.uuid,
          name: a.name,
          description: a.description,
          createdDate: a.created_date.valueOf(),
          editedDate: a.edited_date.valueOf(),
        }));
        return {
          templates,
        };
      })
  );

export default listTemplatesByUser;
