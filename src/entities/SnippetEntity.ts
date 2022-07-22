import Entity from "../pojos/Entity";

export const buildSnippetEntity = () => {
  const schema = {
    snippet: String,
    externalUrl: String,
  };

  const entity = new Entity(schema, "snippet");
  return entity.create();
};
