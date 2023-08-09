import { Injectable } from '@nestjs/common';

import { Session } from '@prisma/client';

import { PrismaService } from 'src/common/modules/db/prisma.service';

@Injectable()
export class SessionsRepository {
  constructor(private readonly db: PrismaService) {}

  public async createOrUpdateSessionByUserId(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.db.session.upsert({
      where: {
        userId,
      },
      update: { refreshToken },
      create: { refreshToken, userId },
    });
  }

  public async findSessionByUserIdAndFingerprint(
    userId: number,
  ): Promise<Session> {
    const session = await this.db.session.findUnique({
      where: {
        userId,
      },
    });

    return session;
  }

  public async removeRefreshToken(userId: number): Promise<void> {
    await this.db.session.delete({
      where: { userId },
    });
  }
}
