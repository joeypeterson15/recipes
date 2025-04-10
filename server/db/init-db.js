const mongoose = require('mongoose');
const { spawn } = require('child_process');
const path = require('path');
const seedFilePath = path.resolve(__dirname, 'seed.js');


// Check if MongoDB is running
async function checkMongoDBRunning() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', { 
      serverSelectionTimeoutMS: 2000 
    });
    await mongoose.disconnect();
    return true;
  } catch (err) {
    return false;
  }
}

// Main setup function
async function setup() {
  console.log('Checking if MongoDB is running...');
  const isMongoRunning = await checkMongoDBRunning();
  
  if (!isMongoRunning) {
    console.error('MongoDB is not running. Please start MongoDB first.');
    console.error('On macOS: brew services start mongodb/brew/mongodb-community');
    console.error('On Windows: Start MongoDB service from services.msc');
    console.error('On Linux: sudo systemctl start mongod');
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

// Run setup
setup();