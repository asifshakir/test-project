import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseAdmin } from '../config/firebase.setup';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly admin: FirebaseAdmin,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    const authHeader = context.getArgs()[0]?.headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const idToken = authHeader.split(' ')[1];
    try {
      await app.auth().verifyIdToken(idToken);
      return true;
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
