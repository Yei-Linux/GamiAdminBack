import { Schema } from "mongoose";
import MongooseEntity from "../pojos/MongooseEntity";

export const buildUserEntity = <T>(userTypeEntity: T) => {
  const schema = {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userType: {
      type: Schema.Types.ObjectId,
      ref: userTypeEntity,
    },

    names: {
      type: String,
      required: true,
    },
    surnames: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },

    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    joinedAt: {
      type: Date,
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

  const entity = new MongooseEntity(schema, "users");
  return entity.createModel();
};
