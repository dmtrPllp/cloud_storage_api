import { Request } from 'express';

import { UserResponse } from '../../users/response/user.response';

interface RequestWithUser extends Request {
  user: UserResponse;
}

export default RequestWithUser;
