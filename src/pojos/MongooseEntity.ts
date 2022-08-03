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
  public async findAll() {
    if (!this.EntityDB) throw new Error("Entity empty!");

    try {
      const documents = await this.EntityDB.find();

      return documents;
    } catch (error) {
      throw new Error("Error on getting documents");
    }
  }
  public async findById(id: string) {
    if (!this.EntityDB) throw new Error("Entity empty!");

    try {
      const documentFound = await this.EntityDB.findById(id);
      return documentFound;
    } catch (error) {
      throw new Error("Error on getting document!");
    }
  }
  public async addMany(items: Record<string, any>[]) {
    if (!this.EntityDB) return;

    const saved = await this.EntityDB.insertMany(items);

    return saved;
  }
  public async udpateOne(fields: Record<string, any>) {
    if (!this.EntityDB) throw new Error("Entity empty!");

    try {
      const documentUpdated = await this.EntityDB.updateOne({}, fields, {
        runValidators: true,
      });

      return documentUpdated;
    } catch (error) {
      console.log(error);
      throw new Error("Error on update one!");
    }
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

  public async deleteOne(id: string) {
    if (!this.EntityDB) throw new Error("Entity empty!");

    try {
      const documentUpdated = await this.EntityDB.deleteOne({}, { _id: id });

      return documentUpdated;
    } catch (error) {
      throw new Error("Error on delete one!");
    }
  }
}

export default MongooseEntity;
