import { QueryRunner } from "typeorm";
import { User } from "Entities/User";

export type CreateCustomerArgs = {
  user: User;
  phoneNumber: string;
  queryRunner: QueryRunner;
};
