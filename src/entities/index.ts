import { buildExternalPostEntity } from "./ExternalPostEntity";
import { buildSnippetEntity } from "./SnippetEntity";
import { buildTagEntity } from "./TagEntity";
import { buildUserEntity } from "./UserEntity";
import { buildUserTypeEntity } from "./UserTypeEntity";
import { buildPostEntity } from "./PostEntity";

const userTypeEntity = buildUserTypeEntity();
const userEntity = buildUserEntity(userTypeEntity.EntityDB);
const tagEntity = buildTagEntity();
const snippetEntity = buildSnippetEntity();
const postEntity = buildPostEntity(
  userEntity.EntityDB,
  tagEntity.EntityDB,
  snippetEntity.EntityDB
);
const externalPostEntity = buildExternalPostEntity(tagEntity.EntityDB);

export {
  userTypeEntity,
  userEntity,
  tagEntity,
  snippetEntity,
  postEntity,
  externalPostEntity,
};
