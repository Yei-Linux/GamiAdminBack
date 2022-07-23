import Entity from "../pojos/Entity";

export const buildUserTypeEntity = <T>() => {
  const schema = {
    userType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

  const entity = new Entity(schema, "userType");
  return entity.create();
};
