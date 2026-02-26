const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function verifyDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('vetpath');
    const coursesCollection = db.collection('courses');

    const courses = await coursesCollection.find({}).toArray();
    console.log(`Found ${courses.length} courses:`);
    courses.forEach(course => {
      console.log(`- ID: ${course.id}, Title: ${course.title}, Provider: ${course.provider}`);
    });

    console.log('Database verification completed');
  } catch (error) {
    console.error('Error verifying database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

verifyDatabase();
