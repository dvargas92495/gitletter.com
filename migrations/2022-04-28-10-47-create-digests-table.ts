import getMysqlConnection from "@dvargas92495/api/mysql";
import type { MigrationProps } from "fuegojs/dist/migrate";

export const migrate = ({ connection }: MigrationProps) => {
  return getMysqlConnection(connection).then((connection) =>
    connection.execute(
      `CREATE TABLE IF NOT EXISTS digests (
          uuid        VARCHAR(36)  NOT NULL,
          name        VARCHAR(64)  NOT NULL,
          description VARCHAR(256) NOT NULL,
          user_id     VARCHAR(32)  NOT NULL,
  
          PRIMARY KEY (uuid),
          CONSTRAINT UC_name UNIQUE (name,user_id)
        )`
    )
  );
};

export const revert = ({ connection }: MigrationProps) => {
  return getMysqlConnection(connection).then((connection) =>
    connection.execute(`DROP TABLE IF EXISTS digests`)
  );
};
