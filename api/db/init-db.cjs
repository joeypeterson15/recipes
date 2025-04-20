const dotenv = require('dotenv')
const mongoose = require('mongoose');
const { spawn } = require('child_process');
const path = require('path');
const seedFilePath = path.resolve(__dirname, 'seed.cjs');

dotenv.config()

// const localMongoURI = 'mongodb://localhost:27017/recipes_db';
const mongoAtlas = process.env.MONGO_CONNECTION
console.log('ASGFKJASDG', mongoAtlas)

async function checkMongoDBRunning() {
  try {
    await mongoose.connect(mongoAtlas, { 
      serverSelectionTimeoutMS: 2000 
    });
    await mongoose.disconnect();
    return true;
  } catch (err) {
    return false;
  }
}

async function setup() {
  console.log('Checking if MongoDB is running...');
  const isMongoRunning = await checkMongoDBRunning();
  
  if (!isMongoRunning) {
    console.error('MongoDB is not running. Please start MongoDB first.');
    process.exit(1);
  }
  
  console.log('MongoDB is running!');
  
  // Run the seed script
  console.log('Running seed script...');
  const seedProcess = spawn('node', [seedFilePath], { stdio: 'inherit' });
  
  seedProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Database initialized successfully!');
    } else {
      console.error('Failed to seed database.');
    }
  });
}

setup();