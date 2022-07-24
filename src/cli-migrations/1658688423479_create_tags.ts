import { Db } from "mongodb";
import { MigrationInterface } from "mongo-migrate-ts";
import { migrations } from "../initial-data";

export class create_tags1658688423479 implements MigrationInterface {
  public async up(db: Db): Promise<any> {
    const { tagEntity } = migrations;
    const itemsBulks = tagEntity.map((tag: Record<string, any>) => ({
      updateOne: {
        filter: {
          _id: tag._id,
        },
        update: { $set: tag },
        upsert: true,
      },
    }));
    await db.collection("tags").bulkWrite(itemsBulks);
  }

  public async down(db: Db): Promise<any> {}
}
