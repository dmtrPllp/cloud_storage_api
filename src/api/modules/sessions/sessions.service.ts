import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  public async createOrUpdateSessionByUserId(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.sessionsRepository.createOrUpdateSessionByUserId(
      userId,
      refreshToken,
    );
  }

  public async getRefreshToken(userId: number): Promise<string> {
    const session =
      await this.sessionsRepository.findSessionByUserIdAndFingerprint(userId);

    if (!session) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return session.refreshToken;
  }

  public async removeRefreshToken(userId: number): Promise<void> {
    await this.sessionsRepository.removeRefreshToken(userId);
  }
}
