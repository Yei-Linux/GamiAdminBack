import { Schema } from "mongoose";
import MongooseEntity from "../pojos/MongooseEntity";

export const buildPostEntity = <T, U, V>(
  userEntity: T,
  tagEntity: U,
  snippetEntity: V
) => {
  const schema = {
    banner: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: userEntity,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: tagEntity,
      },
    ],
    snippet: {
      type: Schema.Types.ObjectId,
      ref: snippetEntity,
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

  const entity = new MongooseEntity(schema, "posts");
  return entity.createModel();
};
