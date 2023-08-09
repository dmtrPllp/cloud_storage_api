import { extname } from 'path';

import { fileExtensions } from 'src/api/modules/files/constant/constants';

export class FileService {
  static imageFileFilter(req, file, callback) {
    const filenamePattern = new RegExp(
      String.raw`\.(${fileExtensions.join('|')})$`,
    );

    if (!file.originalname.match(filenamePattern)) {
      return callback(new Error('Only image files are allowed'), false);
    }

    callback(null, true);
  }

  static editFileName(req, file, callback) {
    const fileExtName = extname(file.originalname);

    const randomName = Array(8)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    callback(null, `${randomName}${fileExtName}`);
  }
}
