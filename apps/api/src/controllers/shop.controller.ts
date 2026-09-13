import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ShopModel } from '../models/shop.model';
import { catchAsync } from '../utils/catchAsync';
import { logger } from '../configs/logger';

export const getAllShops = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { mallId, mallName, floorNo, shopType, city } = req.query;
  const filter: any = {};

  if (mallId) filter.mallId = mallId;
  if (mallName) filter.mallName = { $regex: new RegExp(`^${mallName}$`, 'i') };
  if (floorNo && floorNo !== 'ALL') filter.floorNo = { $regex: new RegExp(String(floorNo), 'i') };
  if (shopType && shopType !== 'ALL') filter.shopType = { $regex: new RegExp(String(shopType), 'i') };
  if (city) filter.city = { $regex: new RegExp(`^${city}$`, 'i') };

  const shops = await ShopModel.find(filter).sort({ name: 1 });
  logger.info(`Fetched ${shops.length} shops with filters: ${JSON.stringify(filter)}`);
  res.status(httpStatus.OK).json(shops);
});

export const createShop = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const shopData = { ...req.body };

  if (req.file) {
    shopData.shopImg = `/uploads/shop/${req.file.filename}`;
  } else if (!shopData.shopImg) {
    shopData.shopImg = 'assets/images/m1.jpg'; // fallback
  }

  const newShop = await ShopModel.create(shopData);
  logger.info(`Shop created: ${newShop.name} in ${newShop.mallName}`);

  res.status(httpStatus.CREATED).json({
    msg: 'Shop Added',
    name: newShop.name,
    data: newShop,
  });
});
