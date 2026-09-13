import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CityModel } from '../models/city.model';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';
import { logger } from '../configs/logger';
import path from 'path';
import fs from 'fs';
import { CheckCityResponseDTO } from '@mallcity/shared';

// Load Indian cities dataset safely
let citiesData: { cities: any[] } = { cities: [] };
try {
  const dataPath = path.resolve(__dirname, '../assets/cities.json');
  if (fs.existsSync(dataPath)) {
    citiesData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }
} catch (err: any) {
  logger.warn(`Could not load cities.json: ${err.message}`);
}

export const getAllCities = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const cities = await CityModel.find().sort({ name: 1 });
  logger.info(`Fetched ${cities.length} cities`);
  res.status(httpStatus.OK).json(cities);
});

export const getOneCity = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { cityId } = req.params;

  let city = null;
  if (!isNaN(Number(cityId))) {
    city = await CityModel.findOne({ cityCode: Number(cityId) });
  } else if (cityId.match(/^[0-9a-fA-F]{24}$/)) {
    city = await CityModel.findById(cityId);
  }

  if (city) {
    const response: CheckCityResponseDTO = {
      value: true,
      msg: 'City Already Present',
      name: city.name,
      state: city.state,
      cityCode: city.cityCode,
      id: city.id,
    };
    res.status(httpStatus.OK).json(response);
  } else {
    const response: CheckCityResponseDTO = {
      value: false,
      msg: 'cityId is new',
      name: '',
      state: '',
      cityCode: isNaN(Number(cityId)) ? 0 : Number(cityId),
    };
    res.status(httpStatus.OK).json(response);
  }
});

export const createCity = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { name, cityCode, state } = req.body;

  const existingCity = await CityModel.findOne({
    $or: [{ cityCode }, { name: { $regex: new RegExp(`^${name}$`, 'i') } }],
  });

  if (existingCity) {
    throw new ApiError(httpStatus.CONFLICT, `City with code ${cityCode} or name "${name}" already exists`);
  }

  const newCity = await CityModel.create({ name, cityCode, state });
  logger.info(`New city created: ${newCity.name} (${newCity.cityCode}) by admin`);

  res.status(httpStatus.CREATED).json({
    msg: 'City Added',
    name: newCity.name,
    data: newCity,
  });
});

export const updateCity = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { cityId } = req.params;
  const updateData = req.body;

  const updatedCity = await CityModel.findByIdAndUpdate(cityId, updateData, { new: true, runValidators: true });

  if (!updatedCity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
  }

  logger.info(`City updated: ${updatedCity.name} (${updatedCity.id})`);
  res.status(httpStatus.OK).json({
    msg: 'City Updated',
    data: updatedCity,
  });
});

export const getIndianCities = catchAsync(async (req: Request, res: Response): Promise<void> => {
  res.status(httpStatus.OK).json(citiesData);
});

export const getIndianCitiesByState = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const state = req.params.state.toLowerCase();
  const filtered = citiesData.cities.filter((c: any) => c.State && c.State.toLowerCase() === state);
  res.status(httpStatus.OK).json(filtered);
});

export const getIndianCitiesByDistrict = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const district = req.params.district.toLowerCase();
  const filtered = citiesData.cities.filter((c: any) => c.District && c.District.toLowerCase() === district);
  res.status(httpStatus.OK).json(filtered);
});
