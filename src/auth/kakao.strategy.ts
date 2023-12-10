import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { User } from "src/user/user.entity";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const email: string = profile._json.kakao_account.email;
    const provider: string = profile.provider;
    const socialId: string = profile.id;

    let existingUser: User = await this.userService.findUserByEmailAndProvider(email, provider);

    if (!existingUser) {
      existingUser = await this.userService.createUserBySocial(email, provider, socialId);
    }

    const id: number = existingUser.id;
    const isNew: boolean = !existingUser.nickname;
    const accessTokenInLocal: string = await this.authService.createToken(id, isNew);

    return { accessTokenInLocal, isNew };
  }
}
