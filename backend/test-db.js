import 'dotenv/config';
import dns from 'dns/promises';
import mongoose from 'mongoose';

const runDiagnostics = async () => {
  console.log('--- MongoDB Atlas Diagnostic Script ---');
  
  // STEP 2: Verify Environment Variables
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is undefined in .env');
    process.exit(1);
  }
  
  // Mask password
  const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
  console.log(`✅ Loaded MONGO_URI: ${maskedUri}`);

  // STEP 5: DNS Diagnostics
  const srvUrl = new URL(uri);
  const hostname = srvUrl.hostname;
  console.log(`\n🔍 Performing DNS lookups for: ${hostname}`);
  
  try {
    const srvRecords = await dns.resolveSrv(`_mongodb._tcp.${hostname}`);
    console.log('✅ SRV Lookup Successful:');
    console.table(srvRecords);

    for (const record of srvRecords) {
      const aRecords = await dns.resolve4(record.name);
      console.log(`✅ A Record for ${record.name}: ${aRecords.join(', ')}`);
    }
  } catch (error) {
    console.error(`❌ DNS SRV Lookup Failed for _mongodb._tcp.${hostname}`);
    console.error(`Error Code: ${error.code}`);
    console.error('Possible Causes: ISP blocking DNS SRV queries (like Jio/Airtel in India), Corporate Firewall, VPN, or local network restrictions.');
    // We don't exit here, let mongoose attempt it anyway to see the exact mongoose error
  }

  // STEP 9: Connection Attempt
  console.log('\n⏳ Attempting MongoDB Connection...');
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected Successfully');
    console.log(`Connected to Database: ${mongoose.connection.name}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed:');
    console.error(`Name: ${error.name}`);
    console.error(`Message: ${error.message}`);
    
    // Categorize error
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.error('\n--> Diagnosis: DNS SRV resolution was refused by your local network or DNS server.');
      console.error('--> Fix: Change your OS DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare). Alternatively, use the MongoDB standard connection string (mongodb://) instead of the SRV string (mongodb+srv://).');
    } else if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      console.error('\n--> Diagnosis: Atlas Authentication Failed. Check your username, password, and database permissions.');
    } else if (error.message.includes('IPNotWhitelisted') || error.code === 'IPNotFound') {
      console.error('\n--> Diagnosis: IP Not Whitelisted. Go to MongoDB Atlas -> Network Access -> Add IP Address.');
    }
    process.exit(1);
  }
};

runDiagnostics();
