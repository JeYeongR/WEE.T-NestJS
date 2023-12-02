import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

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
