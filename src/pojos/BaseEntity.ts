export type TSchema = Record<string, unknown>;
export type TOptions = Record<string, unknown>;

abstract class BaseEntity<ModelType> {
  schema: TSchema = {};
  options: TOptions = {};
  name: string = "";
  EntityDB: ModelType | null = null;

  constructor(schema: TSchema, name: string, options?: TOptions | null) {
    this.schema = schema;
    this.name = name;
    if (options != null) this.options = options;
  }

  protected abstract createModel(): this;
  protected abstract save(fields: Record<string, any>): Promise<any>;
  protected abstract addMany(items: Array<Record<string, any>>): Promise<any>;
  protected abstract updateMany(
    items: Array<Record<string, any>>
  ): Promise<any>;
}

export default BaseEntity;
