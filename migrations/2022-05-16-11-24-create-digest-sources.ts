import getMysqlConnection from "@dvargas92495/app/backend/mysql.server";
import type { MigrationProps } from "fuegojs/dist/migrate";

export const migrate = ({ connection }: MigrationProps) => {
  return getMysqlConnection(connection).then((connection) =>
    connection.execute(
      `CREATE TABLE IF NOT EXISTS digest_sources (
          uuid        VARCHAR(36)  NOT NULL,
          digest_uuid VARCHAR(36)  NOT NULL,
          provider_id VARCHAR(64)  NOT NULL,
          resource    VARCHAR(256) NOT NULL,
          identifier  VARCHAR(256) NOT NULL,
  
          PRIMARY KEY (uuid),
          FOREIGN KEY (digest_uuid) REFERENCES \`digests\`(\`uuid\`)
        )`
    )
  );
};

export const revert = ({ connection }: MigrationProps) => {
  return getMysqlConnection(connection).then((connection) =>
    connection.execute(`DROP TABLE IF EXISTS digest_sources`)
  );
};
