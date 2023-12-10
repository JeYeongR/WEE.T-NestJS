import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ResponseLoginDto } from "./dto/response-login.dto";

@Controller("/auth")
export class AuthController {
  @UseGuards(AuthGuard("naver"))
  @Get("/naver/login")
  naverLogin(@Req() req): ResponseLoginDto {
    const { accessTokenInLocal, isNew }: Authentication = req.user;

    return ResponseLoginDto.of(accessTokenInLocal, isNew);
  }

  /**
   * Naver Test 용 API
   */
  @UseGuards(AuthGuard("naver"))
  @Get("/naver")
  naverLoginTest(): void {
    return;
  }

  @UseGuards(AuthGuard("kakao"))
  @Get("/kakao/login")
  kakaoLogin(@Req() req): ResponseLoginDto {
    const { accessTokenInLocal, isNew }: Authentication = req.user;

    return ResponseLoginDto.of(accessTokenInLocal, isNew);
  }

  /**
   * Kakao Test 용 API
   */
  @UseGuards(AuthGuard("kakao"))
  @Get("/kakao")
  kakaoLoginTest(): void {
    return;
  }
}

interface Authentication {
  accessTokenInLocal: string;
  isNew: boolean;
}
