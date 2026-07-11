import 'dotenv/config';
import mongoose from 'mongoose';

const verifyDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');
    
    const db = mongoose.connection.db;
    
    console.log('\n--- Checking Collections ---');
    const collections = await db.listCollections().toArray();
    collections.forEach(c => console.log(`- ${c.name}`));
    
    console.log('\n--- Checking Indexes ---');
    for (const c of collections) {
      console.log(`\nIndexes for collection: ${c.name}`);
      const indexes = await db.collection(c.name).indexes();
      indexes.forEach(idx => console.log(`  - ${idx.name} (Keys: ${JSON.stringify(idx.key)})`));
    }
    
    console.log('\n✅ Database Verification Complete.');
  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

verifyDatabase();
