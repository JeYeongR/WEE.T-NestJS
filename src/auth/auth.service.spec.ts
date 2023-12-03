import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let authService: AuthService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  const id: number = 1;
  const isNew: boolean = true;
  const accessToken: string = "fakeToken";
  const payload = {
    id,
    isNew,
  };
  const options = {
    secret: process.env.SECRET_KEY,
    expiresIn: "1h",
  };

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("createToken()", () => {
    it("should be created token", async () => {
      // Given
      const spySignAsyncFn = jest.spyOn(mockJwtService, "signAsync");
      spySignAsyncFn.mockResolvedValue(accessToken);

      // When
      const result = await authService.createToken(id, isNew);

      // Then
      expect(result).toEqual(accessToken);
      expect(spySignAsyncFn).toHaveBeenCalledTimes(1);
      expect(spySignAsyncFn).toHaveBeenCalledWith(payload, options);
    });
  });
});
