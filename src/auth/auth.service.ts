import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string): Promise<User | null> {
    return await this.userService.findUserByEmail(userEmail);
  }

  async createUser(user: User): Promise<any> {
    return await this.userService.createUser(user);
  }

  async createToken(id: number, isNew: boolean): Promise<string> {
    const payload = {
      id,
      isNew,
    };

    return await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: "1h",
    });
  }
}
