import { UserTokenTypesEnum } from "Entities/UserTokens";
import { DateTime } from "luxon";
import DbQueryRunner from "Logic/Services/TypeChecking/QueryRunner";

export type CreateUserTokenArgs = {
  userId: number;
  tokenType: UserTokenTypesEnum;
  expiresOn: DateTime;
} & DbQueryRunner;
