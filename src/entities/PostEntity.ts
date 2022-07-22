import { Schema } from "mongoose";
import Entity from "../pojos/Entity";

export const buildPostEntity = <T, U, V>(
  userEntity: T,
  tagEntity: U,
  snippetEntity: V
) => {
  const schema = {
    banner: String,
    title: String,
    post: String,
    postedAt: Date,

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

    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  };

  const entity = new Entity(schema, "post");
  return entity.create();
};
