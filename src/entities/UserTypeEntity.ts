import Entity from "../pojos/Entity";

export const buildUserTypeEntity = <T>() => {
  const schema = {
    userType: String,
    description: String,

    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  };

  const entity = new Entity(schema, "userType");
  return entity.create();
};
