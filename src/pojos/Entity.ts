import mongoose, { Schema } from "mongoose";

type TSchema = Record<string, unknown>;
type TOptions = Record<string, unknown>;

class Entity {
  schema: TSchema = {};
  options: TOptions = {
    autoCreate: true,
  };
  name: string = "";

  constructor(schema: TSchema, name: string, options?: TOptions | null) {
    this.schema = schema;
    this.name = name;
    if (options != null) this.options = options;
  }

  create() {
    const baseSchema = new Schema(this.schema, this.options);
    const entityDB = mongoose.model(this.name, baseSchema);

    return entityDB;
  }
}

export default Entity;
