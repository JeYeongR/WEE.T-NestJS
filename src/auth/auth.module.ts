import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { KakaoStrategy } from "./kakao.strategy";
import { NaverStrategy } from "./naver.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy, KakaoStrategy],
})
export class AuthModule {}
