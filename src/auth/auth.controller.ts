import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ResponseLoginDto } from "./dto/response-login.dto";

@Controller("/auth")
export class AuthController {
  @UseGuards(AuthGuard("naver"))
  @Get("/naver/login")
  naverLogin(@Req() req): ResponseLoginDto {
    const { accessToken, isNew } = req.user;

    return ResponseLoginDto.of(accessToken, isNew);
  }

  /**
   * Test 용 API
   */
  @UseGuards(AuthGuard("naver"))
  @Get("/naver")
  naverLoginCallback(): void {}
}
