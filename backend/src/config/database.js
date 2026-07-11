import mongoose from 'mongoose';
import { logger } from './logger.js';

export const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      retries += 1;
      
      let categorizedError = error.message;
      let fixRecommendation = '';

      if (error.message.includes('querySrv ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        categorizedError = 'DNS Resolution Failed (SRV Record Blocked)';
        fixRecommendation = 'Likely blocked by ISP (e.g., Jio/Airtel), Corporate Firewall, or VPN. Fix: Change OS DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare).';
      } else if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
        categorizedError = 'Atlas Authentication Failed';
        fixRecommendation = 'Check your username, password, and MongoDB Atlas Database Access permissions.';
      } else if (error.message.includes('IPNotWhitelisted') || error.code === 'IPNotFound') {
        categorizedError = 'IP Not Whitelisted';
        fixRecommendation = 'Go to MongoDB Atlas -> Network Access -> Add your current IP Address.';
      } else if (error.message.includes('ECONNRESET') || error.message.includes('TLS')) {
        categorizedError = 'TLS Handshake Failed or Connection Reset';
        fixRecommendation = 'Check your firewall/antivirus which might be intercepting SSL connections.';
      } else if (error.message.includes('timeout')) {
        categorizedError = 'Network Timeout';
        fixRecommendation = 'Check internet connectivity or Atlas cluster status (could be paused/offline).';
      } else if (error.message.includes('bad URI') || error.message.includes('Invalid scheme')) {
        categorizedError = 'Invalid URI';
        fixRecommendation = 'Ensure the URI starts with mongodb+srv:// and contains no spaces or hidden characters.';
      }

      logger.error(`MongoDB connection attempt ${retries} failed: [${categorizedError}] - ${error.message}`);
      if (fixRecommendation) {
        logger.warn(`Recommendation: ${fixRecommendation}`);
      }
      if (retries === maxRetries) {
        logger.error('Max retries reached. Could not connect to MongoDB. Exiting...');
        process.exit(1);
      }
      
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Graceful shutdown handling
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to application termination');
  process.exit(0);
});
