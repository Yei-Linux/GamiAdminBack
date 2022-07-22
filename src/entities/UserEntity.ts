import { Schema } from "mongoose";
import Entity from "../pojos/Entity";

export const buildUserEntity = <T>(userTypeEntity: T) => {
  const schema = {
    userName: String,
    email: String,
    userType: {
      type: Schema.Types.ObjectId,
      ref: userTypeEntity,
    },

    age: Number,
    names: String,
    surnames: String,
    birthDate: String,

    description: String,
    photo: String,
    joinedAt: Date,

    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  };

  const entity = new Entity(schema, "user");
  return entity.create();
};
