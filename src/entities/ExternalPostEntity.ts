import { Schema } from "mongoose";
import Entity from "../pojos/Entity";

export const buildExternalPostEntity = <T>(tagEntity: T) => {
  const ExternalPostTypes = ["JOB", "BLOG"];
  const schema = {
    banner: String,
    title: String,
    post: String,
    postedAt: Date,
    externalUrl: String,
    type: {
      type: String,
      enum: ExternalPostTypes,
    },

    user: {
      user: String,
      photo: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: tagEntity,
      },
    ],

    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  };

  const entity = new Entity(schema, "externalPost");
  return entity.create();
};
