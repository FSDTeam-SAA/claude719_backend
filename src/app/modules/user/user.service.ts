import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';

import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  if (!result) {
    throw new AppError(400, 'Failed to create user');
  }
  return result;
};

const getAllUser = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondition: any[] = [];
  const userSearchableFields = ['firstName', 'lastName', 'email', 'role'];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await User.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any);

  if (!result) {
    throw new AppError(404, 'Users not found');
  }

  const total = await User.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getUserById = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

const updateUserById = async (
  id: string,
  payload: IUser,
  file?: Express.Multer.File,
  videos?: Express.Multer.File[],
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (file) {
    const uploadProfile = await fileUploader.uploadToCloudinary(file);
    if (!uploadProfile?.url) {
      throw new AppError(400, 'Failed to upload profile image');
    }
    payload.profileImage = uploadProfile.url;
  }
  if (videos) {
    if (videos && videos.length > 0) {
      const videoUpload = await Promise.all(
        videos.map(async (video) => {
          const uploadVideo = await fileUploader.uploadToCloudinary(video);
          if (!uploadVideo?.url) {
            throw new AppError(400, 'Failed to upload video');
          }
          return uploadVideo.url;
        }),
      );
      payload.playingVideo = videoUpload;
    }
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

const deleteUserById = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

const profile = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

const updateMyProfile = async (
  id: string,
  payload: IUser,
  file?: Express.Multer.File,
  videos?: Express.Multer.File[],
) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (file) {
    const uploadProfile = await fileUploader.uploadToCloudinary(file);
    if (!uploadProfile?.url) {
      throw new AppError(400, 'Failed to upload profile image');
    }
    payload.profileImage = uploadProfile.url;
  }
  if (videos && videos.length > 0) {
    const videoUpload = await Promise.all(
      videos.map(async (video) => {
        const uploadVideo = await fileUploader.uploadToCloudinary(video);
        if (!uploadVideo?.url) {
          throw new AppError(400, 'Failed to upload video');
        }
        return uploadVideo.url;
      }),
    );
    payload.playingVideo = videoUpload;
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(404, 'User not found');
  }
  return result;
};

const videoAdd = async (id: string, videos: Express.Multer.File[]) => {
  const user = await User.findById(id);
  if (!user) throw new AppError(404, 'User not found');
  if (videos && videos.length > 0) {
    const videoUpload = await Promise.all(
      videos.map(async (video) => {
        const uploadVideo = await fileUploader.uploadToCloudinary(video);
        if (!uploadVideo?.url) {
          throw new AppError(400, 'Failed to upload video');
        }
        return uploadVideo.url;
      }),
    );
    user?.playingVideo?.push(...videoUpload);
    const result = await user.save();
    if (!result) throw new AppError(400, 'Failed to add video');
    return result;
  }
};

const removedVideo = async (id: string, videoUrls: string[]) => {
  const user = await User.findById(id);
  if (!user) throw new AppError(404, 'User not found');
  user.playingVideo = (user.playingVideo || []).filter(
    (url) => !videoUrls.includes(url),
  );
  const result = await user.save();
  if (!result) throw new AppError(400, 'Failed to remove video');
  return result;
};

export const userService = {
  createUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  profile,
  updateMyProfile,
  videoAdd,
  removedVideo,
};
