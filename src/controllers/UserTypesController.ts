import { Controller } from "../decorators/controller";
import { userTypeEntity } from "../entities";
import CrudController from "../pojos/CrudController";

@Controller("/user-types")
class UserTypesController extends CrudController {
  constructor(userTypeEntityProp: any) {
    super(userTypeEntityProp);
  }
}

const userTypeController = new UserTypesController(userTypeEntity);

export { userTypeController };
