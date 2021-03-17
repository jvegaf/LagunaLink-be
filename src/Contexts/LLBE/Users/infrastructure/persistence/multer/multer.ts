import multer from 'multer';
import uuid from 'uuid';
import path from 'path';
import e from 'express';

const storage = multer.diskStorage({
  destination: 'avatars',
  filename(req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, uuid.v4() + path.extname(file.originalname));
  }
});

export default multer({storage});
