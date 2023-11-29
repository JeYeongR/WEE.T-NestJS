import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import { AuthService } from "./auth.service";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const email = profile.emails[0].value;
    const provide = profile.provider;
    const socialId = profile.id;
    const userProfile = {
      email,
      provide,
      socialId,
    };

    let existingUser = await this.authService.validateUser(email);

    if (!existingUser) {
      existingUser = await this.authService.createUser(userProfile);
    }

    const id = existingUser.id;
    const isNew = !existingUser.nickname;

    accessToken = await this.authService.createToken(id, isNew);

    return { accessToken, isNew };
  }
}
