import { NowRequest, NowResponse } from '@vercel/node';
import { connectToDatabase } from '../../utils/mongodb.js';

export default async (request: NowRequest, response: NowResponse): Promise<any> => {
  const {
    email,
    name,
    level,
    currentExperience,
    challengesCompleted,
    totalExperience,
  } = request.body;
  const { db } = await connectToDatabase();

  const update_user = {
    email,
    name,
    level,
    currentExperience,
    challengesCompleted,
    totalExperience,
  };

  await db.collection('users').updateOne({ email }, { $set: update_user });

  return response.status(201).json(update_user);
};
