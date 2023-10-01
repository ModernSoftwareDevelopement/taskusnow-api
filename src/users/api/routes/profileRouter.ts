import { Router } from 'express';
import multer from 'multer';
import { uploadProfileImageController } from '../controllers/uploadProfileImage';

const profileRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // limit file size to 5MB
  },
});

profileRouter.get('/', (req, res) => {
  res.send('Hello World!');
});

profileRouter.post('/profile/upload', upload.single('image'), (req, res) => {
  uploadProfileImageController.execute(req, res).catch();
});

export { profileRouter };
