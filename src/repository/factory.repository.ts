import { getRepository } from "typeorm";
import { Factory } from "../entity/fatcory";

export class FactoryRepository {

  private factoryRepository = getRepository(Factory) 

  public findOne(filters: any): Promise<Factory> {
    return this.factoryRepository.findOne(filters)
  }

  public find(filters?: any): Promise<Factory[]> {
    return this.factoryRepository.find(filters)
  }

  public save(data: any): Promise<Factory> {
    return this.factoryRepository.save(data)
  }
}
