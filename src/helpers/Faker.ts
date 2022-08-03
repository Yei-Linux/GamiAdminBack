import { ObjectId } from "mongodb";

class Faker {
  static get mongoObjectId(): string {
    const idGenerated = new ObjectId();
    return idGenerated.toString();
  }
}

export default Faker;
