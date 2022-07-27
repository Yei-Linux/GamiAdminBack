import mongoose, { Model, Schema } from "mongoose";
import BaseEntity, { TOptions, TSchema } from "./BaseEntity";

class MongooseEntity extends BaseEntity<Model<any>> {
  constructor(
    schema: TSchema,
    name: string,
    options: TOptions | null = {
      autoCreate: true,
    }
  ) {
    super(schema, name, options);
  }

  public createModel() {
    const baseSchema = new Schema(this.schema, this.options);
    const EntityDBResult = mongoose.model(this.name, baseSchema);
    this.EntityDB = EntityDBResult;

    return this;
  }
  public async save(fields: Record<string, any>) {
    if (!this.EntityDB) return;

    const newEntity = new this.EntityDB(fields);
    const saved = await newEntity.save();

    return saved;
  }
  public async addMany(items: Record<string, any>[]) {
    if (!this.EntityDB) return;

    const saved = await this.EntityDB.insertMany(items);

    return saved;
  }
  public async updateMany(items: Record<string, any>[]) {
    if (!this.EntityDB) return;

    const itemsBulks = items.map((item: Record<string, any>) => ({
      updateOne: {
        filter: {
          _id: item?._id,
        },
        update: { $set: item },
        upsert: true,
      },
    }));

    const savedOrUpdated = await this.EntityDB.bulkWrite(itemsBulks);

    return savedOrUpdated;
  }
}

export default MongooseEntity;
