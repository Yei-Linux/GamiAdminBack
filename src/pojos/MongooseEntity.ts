import mongoose, { Model, Schema } from "mongoose";
import { catchError } from "../decorators";
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

  @catchError("Error on create model!")
  public createModel() {
    const baseSchema = new Schema(this.schema, this.options);
    const EntityDBResult = mongoose.model(this.name, baseSchema);
    this.EntityDB = EntityDBResult;

    return this;
  }

  @catchError("Error on save!")
  public async save(fields: Record<string, any>) {
    if (!this.EntityDB) return;

    const newEntity = new this.EntityDB(fields);
    const saved = await newEntity.save();

    return saved;
  }

  @catchError("Error on find all!")
  public async findAll() {
    if (!this.EntityDB) throw new Error("Entity empty!");

    const documents = await this.EntityDB.find();

    return documents;
  }

  @catchError("Error on find by id!")
  public async findById(id: string) {
    if (!this.EntityDB) throw new Error("Entity empty!");

    const documentFound = await this.EntityDB.findById(id);
    return documentFound;
  }

  @catchError("Error on add many!")
  public async addMany(items: Record<string, any>[]) {
    if (!this.EntityDB) return;

    const saved = await this.EntityDB.insertMany(items);

    return saved;
  }

  @catchError("Error on update one!")
  public async udpateOne(fields: Record<string, any>) {
    if (!this.EntityDB) throw new Error("Entity empty!");

    const documentUpdated = await this.EntityDB.updateOne({}, fields, {
      runValidators: true,
    });

    return documentUpdated;
  }

  @catchError("Error on update many!")
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

  @catchError("Error on delete one!")
  public async deleteOne(id: string) {
    if (!this.EntityDB) throw new Error("Entity empty!");

    const documentUpdated = await this.EntityDB.deleteOne({}, { _id: id });

    return documentUpdated;
  }
}

export default MongooseEntity;
