import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe("UserService", () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  const email: string = "test@test.com";
  const provider: string = "naver";
  const socialId: string = "test1234";
  const user: Partial<User> = {
    email,
    provider,
    socialId,
  };
  const mockedUser: User = {
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
    gender: null,
  };

  it("should be defined", () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe("createUserBySocial()", () => {
    it("should be created user", async () => {
      // Given
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(mockedUser);

      // When
      const result = await userService.createUserBySocial(email, provider, socialId);

      // Then
      expect(result).toEqual(mockedUser);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith({ email, provider, socialId });
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe("findUserByEmail()", () => {
    it("should be found user", async () => {
      // Given
      userRepository.findOneBy.mockResolvedValue(mockedUser);

      // When
      const result = await userService.findUserByEmail(email);

      // Then
      expect(result).toEqual(mockedUser);
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: email });
    });

    it("should not be found user", async () => {
      // Given
      userRepository.findOneBy.mockResolvedValue(null);

      // When
      const result = await userService.findUserByEmail(email);

      // Then
      expect(result).toBeNull();
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: email });
    });
  });
});
