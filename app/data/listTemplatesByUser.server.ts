import getMysql from "@dvargas92495/app/backend/mysql.server";

const listTemplatesByUser = ({ userId }: { userId: string }) =>
  getMysql()
    .then((cxn) =>
      cxn.execute(
        `SELECT uuid, title, description, created_date, edited_date FROM templates WHERE user_id = ?`,
        [userId]
      )
    )
    .then((records) => {
      const templates = (
        records as {
          uuid: string;
          title: string;
          description: string;
          created_date: Date;
          edited_date: Date;
        }[]
      ).map((a) => ({
        uuid: a.uuid,
        title: a.title,
        description: a.description,
        createdDate: a.created_date.valueOf(),
        editedDate: a.edited_date.valueOf(),
      }));
      return {
        templates,
      };
    });

export default listTemplatesByUser;
