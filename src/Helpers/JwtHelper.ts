import { jwtConfig } from "Config/index";
import jwt from "jsonwebtoken";
import { IUser } from "TypeChecking/Users";
import { UnauthenticatedError } from "Exceptions/UnauthenticatedError";

type JwtPayload = {
  identifier: string;
  email: string;
};

export class JwtHelper {
  public static signUser(user: IUser) {
    return jwt.sign(
      {
        identifier: user.identifier,
        email: user.email,
      },
      jwtConfig.jwtSecret,
      {
        expiresIn: "2d",
        algorithm: "HS256",
      }
    );
  }

  public static verifyToken(token: string): JwtPayload {
    const secret = jwtConfig.jwtSecret;
    try {
      return jwt.verify(token, secret, {
        algorithms: ["HS256"],
      }) as JwtPayload;
    } catch (err) {
      throw new UnauthenticatedError();
    }
  }
}
