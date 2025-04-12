# Recipe App

## Server Setup Instructions

1. Install MongoDB
   - On macOS: 
     ```
     brew tap mongodb/brew
     brew install mongodb-community
     brew services start mongodb-community
     ```
   - On Windows: Download and install from the MongoDB website
   - On Linux: `sudo apt install mongodb` (or equivalent for your distro)

2. Clone the repository and install dependencies
   ```
   git clone https://github.com/yourusername/recipe-app.git
   cd recipe-app
   npm install
   ```

3. Initialize the database with recipe data
   ```
   npm run init-db
   ```
   This will seed the database with recipes from the CSV file.

4. Start the application
   ```
   npm start
   ```

The application should now be running with a fully seeded database!