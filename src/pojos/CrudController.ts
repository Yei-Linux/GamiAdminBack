import { BaseController } from "./BaseController";
import MongooseEntity from "./MongooseEntity";
import Express from "express";

export interface ICrudController {
  create: (req: Express.Request, res: Express.Response) => void;
  read: (req: Express.Request, res: Express.Response) => void;
  readById: (req: Express.Request, res: Express.Response) => void;
  update: (req: Express.Request, res: Express.Response) => void;
  delete: (req: Express.Request, res: Express.Response) => void;
}

class CrudController extends BaseController implements ICrudController {
  entity: MongooseEntity;

  constructor(entity: MongooseEntity) {
    super();
    this.entity = entity;
  }

  async create(req: Express.Request, res: Express.Response) {
    try {
      const documentSaved = await this.entity.save(req.body);

      BaseController.jsonResponse({
        res,
        code: 201,
        bodyResponse: {
          message: "Document created succesfull!",
          data: documentSaved,
        },
      });
    } catch (error) {
      this.fail(res, "Document could not be saved succesfull");
    }
  }
  read: (req: Express.Request, res: Express.Response) => {};
  readById: (req: Express.Request, res: Express.Response) => {};
  update: (req: Express.Request, res: Express.Response) => {};
  delete: (req: Express.Request, res: Express.Response) => {};
}

export default CrudController;
