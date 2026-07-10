import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';

// Loaded via import 'dotenv/config'

const PORT = process.env.PORT || 5000;

// Initialize Server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start Express app
    app.listen(PORT, () => {
      logger.info(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start the server:', error.message);
    process.exit(1);
  }
};

startServer();
