import { connectToDatabase } from '../../utils/mongodb.js';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection('moveit_users')
    .find({})
    .limit(20)
    .sort({ totalExperience: -1 })
    .toArray();

  res.json(users);
};
