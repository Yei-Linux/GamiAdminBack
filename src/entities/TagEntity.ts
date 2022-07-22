import { Schema } from "mongoose";
import Entity from "../pojos/Entity";

export const buildTagEntity = <T>() => {
  const schema = {
    title: String,
    description: String,

    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  };

  const entity = new Entity(schema, "tag");
  return entity.create();
};
