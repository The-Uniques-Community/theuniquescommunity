import 'dotenv/config';
import mongoose from 'mongoose';

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Member = mongoose.connection.db.collection('members');
  const counts = await Member.aggregate([
    { $group: { _id: "$batch", count: { $sum: 1 } } }
  ]).toArray();
  console.log('Batch counts:', counts);
  process.exit(0);
}
check();

