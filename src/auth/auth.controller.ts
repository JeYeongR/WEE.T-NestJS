import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("/auth")
export class AuthController {
  @UseGuards(AuthGuard("naver"))
  @Get("/naver/login")
  naverLogin(@Req() req): Record<string, any> {
    return { ...req.user };
  }

  /**
   * Test 용 API
   */
  @UseGuards(AuthGuard("naver"))
  @Get("/naver")
  naverLoginCallback(): void {}
}
