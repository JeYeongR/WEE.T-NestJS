import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";

describe("AuthController", () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  describe("naverLogin()", () => {
    it("should return token and a value indicating whether it's a new user", async () => {
      // Given
      const req = {
        user: {
          accessTokenInLocal: "fakeToken",
          isNew: true,
        },
      };
      const expectedResult = {
        accessToken: "fakeToken",
        isNew: true,
      };

      // When
      const result = authController.naverLogin(req);

      // Then
      expect(result).toEqual(expectedResult);
    });
  });
});
