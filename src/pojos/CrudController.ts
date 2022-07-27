import { BaseController } from "./BaseController";

export interface ICrudController {
  create: (req: Express.Request, res: Express.Response) => void;
  read: (req: Express.Request, res: Express.Response) => void;
  readById: (req: Express.Request, res: Express.Response) => void;
  update: (req: Express.Request, res: Express.Response) => void;
  delete: (req: Express.Request, res: Express.Response) => void;
}

class CrudController extends BaseController implements ICrudController {
  entityName: string;

  public CrudController(entityName: string) {
    this.entityName = entityName;
  }

  create: (req: Express.Request, res: Express.Response) => {
    
  };
  read: (req: Express.Request, res: Express.Response) => void;
  readById: (req: Express.Request, res: Express.Response) => void;
  update: (req: Express.Request, res: Express.Response) => void;
  delete: (req: Express.Request, res: Express.Response) => void;
}

export default CrudController;
