import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/modules/db/prisma.service';
import { UserResponse } from './response/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: PrismaService) {}

  public async getUserByEmail(email: string): Promise<UserResponse> {
    return await this.db.user.findUnique({ where: { email } });
  }

  public async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<UserResponse> {
    return await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  }

  public async getUserByEmailWithPassword(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getUserById(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });
  }
}
