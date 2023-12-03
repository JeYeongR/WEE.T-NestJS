import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;

  const mockUserRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const email: string = "test@test.com";
  const provider: string = "naver";
  const socialId: string = "test1234";
  const user: Partial<User> = {
    email,
    provider,
    socialId,
  };
  const mockedUser: Partial<User> = {
    email,
    socialId,
    provider,
    deletedAt: null,
    nickname: null,
    height: null,
    goalWeight: null,
    goalSkeletalMuscleMass: null,
    birthYear: null,
    createdAt: new Date("2023-12-02T12:54:59.566Z"),
    updatedAt: new Date("2023-12-02T12:54:59.566Z"),
    id: 1,
  };

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  describe("createUserBySocial()", () => {
    it("should be created user", async () => {
      // Given
      const spyCreateFn = jest.spyOn(mockUserRepository, "create");
      spyCreateFn.mockReturnValue(user);
      const spySaveFn = jest.spyOn(mockUserRepository, "save");
      spySaveFn.mockResolvedValue(mockedUser);

      // When
      const result = await userService.createUserBySocial(email, provider, socialId);

      // Then
      expect(result).toEqual(mockedUser);
      expect(spyCreateFn).toHaveBeenCalledTimes(1);
      expect(spyCreateFn).toHaveBeenCalledWith({ email, provider, socialId });
      expect(spySaveFn).toHaveBeenCalledTimes(1);
      expect(spySaveFn).toHaveBeenCalledWith(user);
    });
  });

  describe("findUserByEmailAndProvider()", () => {
    it("should be found user", async () => {
      // Given
      const spyFindOneByFn = jest.spyOn(mockUserRepository, "findOneBy");
      spyFindOneByFn.mockReturnValue(mockedUser);

      // When
      const result = await userService.findUserByEmailAndProvider(email, provider);

      // Then
      expect(result).toEqual(mockedUser);
      expect(spyFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyFindOneByFn).toHaveBeenCalledWith({ email, provider });
    });

    it("should not be found user", async () => {
      // Given
      const spyFindOneByFn = jest.spyOn(mockUserRepository, "findOneBy");
      spyFindOneByFn.mockReturnValue(null);

      // When
      const result = await userService.findUserByEmailAndProvider(email, provider);

      // Then
      expect(result).toBeNull();
      expect(spyFindOneByFn).toHaveBeenCalledTimes(1);
      expect(spyFindOneByFn).toHaveBeenCalledWith({ email, provider });
    });
  });
});
