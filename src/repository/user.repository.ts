import { getRepository } from "typeorm";
import { users } from "../entity/user";

export class UserRepository {

  private userRepository = getRepository(users) 

  public findOne(filters: any): Promise<users> {
    return this.userRepository.findOne(filters)
  }

  public find(filters?: any): Promise<users[]> {
    return this.userRepository.find(filters)
  }

  public save(data: any): Promise<users> {
    return this.userRepository.save(data)
  }
}
