import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
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
  providers: [AuthService, NaverStrategy],
})
export class AuthModule {}
