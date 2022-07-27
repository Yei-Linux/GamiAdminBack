import { Schema } from "mongoose";
import MongooseEntity from "../pojos/MongooseEntity";

export const buildTagEntity = <T>() => {
  const schema = {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: false,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  };

  const entity = new MongooseEntity(schema, "tags");
  return entity.createModel();
};
