import { BaseController } from "./BaseController";
import MongooseEntity from "./MongooseEntity";
import Express from "express";
import { Delete, Get, Post, Put } from "../decorators/router-binder";

export interface ICrudController {
  create?: (req: Express.Request, res: Express.Response) => void;
  read?: (req: Express.Request, res: Express.Response) => void;
  readById?: (req: Express.Request, res: Express.Response) => void;
  update?: (req: Express.Request, res: Express.Response) => void;
  delete?: (req: Express.Request, res: Express.Response) => void;
}

class CrudController extends BaseController implements ICrudController {
  public entity: MongooseEntity;

  constructor(entity: MongooseEntity) {
    super();
    this.entity = entity;
  }

  @Post("/")
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

  @Get("/")
  async read(req: Express.Request, res: Express.Response) {
    try {
      const documents = await this.entity.findAll();

      BaseController.jsonResponse({
        res,
        code: 200,
        bodyResponse: {
          message: "Documents gotten succesfull!",
          data: documents,
        },
      });
    } catch (error) {
      this.fail(res, `${error}`);
    }
  }

  @Get("/:id")
  async readById(req: Express.Request, res: Express.Response) {
    try {
      const documentFound = await this.entity.findById(req.params.id);

      BaseController.jsonResponse({
        res,
        code: 200,
        bodyResponse: {
          message: "Document gotten succesfull!",
          data: documentFound,
        },
      });
    } catch (error) {
      this.fail(res, `${error}`);
    }
  }

  @Put("/")
  async update(req: Express.Request, res: Express.Response) {
    try {
      const documentUpdated = await this.entity.udpateOne(req.body);

      BaseController.jsonResponse({
        res,
        code: 200,
        bodyResponse: {
          message: "Document updated succesfull!",
          data: documentUpdated,
        },
      });
    } catch (error) {
      this.fail(res, `${error}`);
    }
  }

  @Delete("/:id")
  async delete(req: Express.Request, res: Express.Response) {
    try {
      const documentUpdated = await this.entity.deleteOne(req.params.id);

      BaseController.jsonResponse({
        res,
        code: 200,
        bodyResponse: {
          message: "Document deleted succesfull!",
          data: documentUpdated,
        },
      });
    } catch (error) {
      this.fail(res, `${error}`);
    }
  }
}

export default CrudController;
