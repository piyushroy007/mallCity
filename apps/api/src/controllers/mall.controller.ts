import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MallModel } from '../models/mall.model';
import { catchAsync } from '../utils/catchAsync';
import { logger } from '../configs/logger';

export const getAllMalls = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { city, cityCode } = req.query;
  const filter: any = {};

  if (city) {
    filter.city = { $regex: new RegExp(`^${city}$`, 'i') };
  }
  if (cityCode) {
    filter.cityCode = Number(cityCode);
  }

  const malls = await MallModel.find(filter).sort({ name: 1 });
  logger.info(`Fetched ${malls.length} malls`);
  res.status(httpStatus.OK).json(malls);
});

export const createMall = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const mallData = { ...req.body };

  if (req.file) {
    mallData.mallImg = `/uploads/mall/${req.file.filename}`;
  } else if (!mallData.mallImg) {
    mallData.mallImg = 'assets/images/m1.jpg'; // fallback
  }

  const newMall = await MallModel.create(mallData);
  logger.info(`Mall created: ${newMall.name} in ${newMall.city}`);

  res.status(httpStatus.CREATED).json({
    msg: 'Mall Added',
    name: newMall.name,
    data: newMall,
  });
});
