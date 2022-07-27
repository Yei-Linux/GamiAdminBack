import { Schema } from "mongoose";
import MongooseEntity from "../pojos/MongooseEntity";

export const buildExternalPostEntity = <T>(tagEntity: T) => {
  const ExternalPostTypes = ["JOB", "BLOG"];
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
    externalUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ExternalPostTypes,
    },

    user: {
      user: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: false,
      },
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: tagEntity,
      },
    ],

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

  const entity = new MongooseEntity(schema, "externalPosts");
  return entity.createModel();
};
