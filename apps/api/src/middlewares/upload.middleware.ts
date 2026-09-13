import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ApiError } from '../utils/ApiError';
import httpStatus from 'http-status';

const mallUploadDir = path.resolve(process.cwd(), 'uploads/mall');
const shopUploadDir = path.resolve(process.cwd(), 'uploads/shop');

// Ensure upload folders exist
if (!fs.existsSync(mallUploadDir)) fs.mkdirSync(mallUploadDir, { recursive: true });
if (!fs.existsSync(shopUploadDir)) fs.mkdirSync(shopUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'mallImg') {
      cb(null, mallUploadDir);
    } else if (file.fieldname === 'shopImg') {
      cb(null, shopUploadDir);
    } else {
      cb(null, path.resolve(process.cwd(), 'uploads'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(httpStatus.BAD_REQUEST, 'Only image files are allowed!') as any, false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter,
});
