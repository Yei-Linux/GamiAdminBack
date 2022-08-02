import { userTypeEntity } from "../entities";
import CrudController from "../pojos/CrudController";

class UserTypesController extends CrudController {
  constructor() {
    super(userTypeEntity);
  }
}

export default UserTypesController;
