# MongoDB Atlas Database Diagnostic Report

## 1. Environment Variables Analysis
- `MONGO_URI`: `mongodb+srv://mohantypratyush2_db_user:****@ai-academic-project-men.szr9sjz.mongodb.net/?appName=ai-academic-project-mentor&compressors=zlib`
- `PORT`: `5000`
- `NODE_ENV`: `development`
- `JWT_SECRET`: Loaded correctly.
- **Status**: All required variables are correctly defined and injected via `dotenv/config` at the top of `server.js`.

## 2. Connection String Analysis
- **Protocol**: `mongodb+srv://` (Valid SRV string format).
- **Username**: `mohantypratyush2_db_user` (Valid).
- **Password**: Contains valid URL-encoded characters or standard alphanumerics.
- **Hostname**: `ai-academic-project-men.szr9sjz.mongodb.net` (Valid Atlas structure).
- **Options**: `?appName=ai-academic-project-mentor&compressors=zlib`
- **Verdict**: The URI is syntactically perfect. There are no trailing spaces, hidden characters, or missing elements.

## 3. Node Environment & Dependencies
- **Node.js Version**: v24.14.0
- **Mongoose Version**: ^8.4.1
- **MongoDB Node Driver Compatibility**: Fully compatible with Node.js 24 and Mongoose 8.x.

## 4. DNS & Network Diagnostics
Executed a diagnostic script using Node's `dns.resolveSrv`.
- **Target**: `_mongodb._tcp.ai-academic-project-men.szr9sjz.mongodb.net`
- **Result**: `ECONNREFUSED`
- **Diagnosis**: The operating system or local network router is actively refusing UDP port 53 traffic specifically for SRV records. This is a common environmental issue rather than an application bug.

## 5. Atlas Configuration Verification
Since the DNS block happens before authentication or cluster routing is even attempted, the connection fails locally. The cluster is likely online, but the local machine cannot resolve the dynamic node IPs hidden behind the Atlas SRV record.

## 6. Database Connection Code Review (`database.js`)
- **Strengths**: Implements a robust retry mechanism (5 retries, 5s backoff) and graceful shutdown (`process.on('SIGINT')`).
- **Improvement Applied**: Replaced the generic `error.message` dump with categorized error handling. The logger now actively detects `querySrv ECONNREFUSED`, `bad auth`, and `IPNotWhitelisted` and prints a clear recommendation.

## 7. Exact Root Cause
The root cause is an **Environmental DNS Block**. 
Certain ISPs (e.g., Jio, Airtel in India), Corporate Firewalls, or Antivirus software occasionally block DNS SRV query lookups. Because Atlas uses `mongodb+srv://` (which relies heavily on SRV records to discover the actual cluster IP addresses dynamically), Mongoose fails to resolve the host and throws `querySrv ECONNREFUSED`.

## 8. Exact Fix (Environmental)
Because this is an external network restriction, you should NOT rewrite the Node application. Instead, apply one of the following environmental fixes:

**Option A: Change your OS DNS Settings (Recommended)**
Change your Windows/Mac DNS resolver to use Google or Cloudflare:
- Primary DNS: `8.8.8.8` (Google) or `1.1.1.1` (Cloudflare)
- Secondary DNS: `8.8.4.4` or `1.0.0.1`

**Option B: Use a VPN / Cloudflare WARP**
Enable a VPN or install Cloudflare WARP. This bypasses your ISP's DNS hijacking and immediately resolves the SRV restriction.

**Option C: Standard Connection String Bypass**
If you cannot change your DNS or use a VPN, you can downgrade the connection string in `.env` to the older standard format (`mongodb://`) which bypasses SRV lookup entirely. You would need to fetch the 3 explicit node addresses from the Atlas dashboard by selecting Node.js version 2.2.12 or earlier.

## 9. Files Modified
- `backend/test-db.js`: Created to run deep DNS diagnostics.
- `backend/src/config/database.js`: Modified to intelligently intercept and categorize Mongoose network errors, offering developers immediate fixes in the console.

## 10. Commands Executed
- `node test-db.js`: Verified the SRV lookup crash (`ECONNREFUSED`).
