import { tagEntity } from "../entities";
import CrudController from "../pojos/CrudController";

class TagsController extends CrudController {
  constructor(tagEntityProp: any) {
    super(tagEntityProp);
  }
}

const tagsController = new TagsController(tagEntity);

export { tagsController };
