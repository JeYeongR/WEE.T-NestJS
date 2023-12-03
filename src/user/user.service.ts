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

  async createUserBySocial(email: string, provider: string, socialId: string): Promise<User> {
    const user: User = this.userRepository.create({
      email,
      provider,
      socialId,
    });

    return await this.userRepository.save(user);
  }

  async findUserByEmailAndProvider(email: string, provider: string): Promise<User | null> {
    return await this.userRepository.findOneBy({
      email,
      provider,
    });
  }
}
