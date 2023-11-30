export class ResponseLoginDto {
  accessToken: string;

  isNew: boolean;

  static of(accessToken: string, isNew: boolean): ResponseLoginDto {
    return {
      accessToken,
      isNew,
    };
  }
}
