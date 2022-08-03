import { userTypeEntity } from "../entities";
import CrudController from "../pojos/CrudController";

class UserTypesController extends CrudController {
  constructor(userTypeEntityProp: any) {
    super(userTypeEntityProp);
  }
}

const userTypeController = new UserTypesController(userTypeEntity);

export { userTypeController };
