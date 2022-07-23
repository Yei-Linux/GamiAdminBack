import mongoose, { Model, Schema } from "mongoose";

type TSchema = Record<string, unknown>;
type TOptions = Record<string, unknown>;

class Entity {
  schema: TSchema = {};
  options: TOptions = {
    autoCreate: true,
  };
  name: string = "";
  EntityDB: Model<any> | null = null;

  constructor(schema: TSchema, name: string, options?: TOptions | null) {
    this.schema = schema;
    this.name = name;
    if (options != null) this.options = options;
  }

  create() {
    const baseSchema = new Schema(this.schema, this.options);
    const EntityDBResult = mongoose.model(this.name, baseSchema);
    this.EntityDB = EntityDBResult;

    return this;
  }

  async add(fields: Record<string, any>) {
    if (!this.EntityDB) return;

    const newEntity = new this.EntityDB(fields);
    const saved = await newEntity.save();

    return saved;
  }

  async addMany(items: Array<Record<string, any>>) {
    if (!this.EntityDB) return;

    const saved = await this.EntityDB.insertMany(items);

    return saved;
  }

  async updateMany(items: Array<Record<string, any>>) {
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

export default Entity;
