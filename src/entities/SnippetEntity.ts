import MongooseEntity from "../pojos/MongooseEntity";

export const buildSnippetEntity = () => {
  const schema = {
    snippet: {
      type: String,
      required: true,
    },
    externalUrl: {
      type: String,
      required: false,
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

  const entity = new MongooseEntity(schema, "snippets");
  return entity.createModel();
};
