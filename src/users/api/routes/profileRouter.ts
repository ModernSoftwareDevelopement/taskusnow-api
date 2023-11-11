import { Router } from 'express';
import multer from 'multer';
import { uploadProfileImageController } from '../controllers/uploadProfileImage';
import { updateProfileInfoController } from '../controllers/updateProfileInfo';
import { validateJwt } from '../../../authService/middleware/auth0.middleware';

const profileRouter = Router();

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

profileRouter.post(
  '/profile/upload',
  validateJwt,
  upload.single('image'),
  (req, res) => {
    uploadProfileImageController.execute(req, res).catch();
  },
);

profileRouter.post('/profile', validateJwt, (req, res) => {
  updateProfileInfoController.execute(req, res).catch();
});

export { profileRouter };
