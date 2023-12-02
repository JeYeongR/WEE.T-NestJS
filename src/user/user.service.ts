import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: userEmail });
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
