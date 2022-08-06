import { Controller } from "../decorators/controller";
import { tagEntity } from "../entities";
import CrudController from "../pojos/CrudController";

@Controller("/tags")
class TagsController extends CrudController {
  constructor(tagEntityProp: any) {
    super(tagEntityProp);
  }
}

const tagsController = new TagsController(tagEntity);

export { tagsController };
