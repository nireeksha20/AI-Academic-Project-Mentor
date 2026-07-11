import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';
import http from 'http';
import assert from 'assert';

const PORT = 5555;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

let server;
let token = '';
let projectId = '';
let chatId = '';

const testEmail = `test_${Date.now()}@example.com`;
const testPassword = 'Password123!';

const runTests = async () => {
  console.log('Starting Backend API Verification...');

  // Start Server
  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Test Server running on port ${PORT}`);
      resolve();
    });
  });

  try {
    // 1. Auth: Register
    console.log('\n--- 1. Testing POST /auth/register ---');
    const resReg = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: testPassword,
      }),
    });
    const regData = await resReg.json();
    console.log('Status:', resReg.status);
    console.log('Response:', regData);
    assert.strictEqual(resReg.status, 201, 'Registration should return 201');
    assert.strictEqual(regData.success, true);
    assert.ok(regData.data.user);

    // 2. Auth: Login
    console.log('\n--- 2. Testing POST /auth/login ---');
    const resLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    const loginData = await resLogin.json();
    console.log('Status:', resLogin.status);
    assert.strictEqual(resLogin.status, 200, 'Login should return 200');
    assert.ok(loginData.data.token, 'Should return a JWT token');
    token = loginData.data.token;

    // 3. Auth: Get Me
    console.log('\n--- 3. Testing GET /auth/me ---');
    const resMe = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meData = await resMe.json();
    console.log('Status:', resMe.status);
    assert.strictEqual(resMe.status, 200);
    assert.strictEqual(meData.data.user.email, testEmail.toLowerCase());

    // 4. Projects: Create
    console.log('\n--- 4. Testing POST /projects ---');
    const resProj = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Test Project',
        domain: 'AI',
        description: 'Test Description',
      }),
    });
    const projData = await resProj.json();
    console.log('Status:', resProj.status);
    assert.strictEqual(resProj.status, 201);
    projectId = projData.data.project._id;
    console.log('Created Project ID:', projectId);

    // 5. Projects: Get All
    console.log('\n--- 5. Testing GET /projects ---');
    const resProjs = await fetch(`${BASE_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const projsData = await resProjs.json();
    console.log('Status:', resProjs.status);
    assert.strictEqual(resProjs.status, 200);
    assert.ok(Array.isArray(projsData.data.projects));
    assert.ok(projsData.data.projects.length >= 1);

    // 6. Projects: Get By ID
    console.log('\n--- 6. Testing GET /projects/:id ---');
    const resProjId = await fetch(`${BASE_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Status:', resProjId.status);
    assert.strictEqual(resProjId.status, 200);

    // 7. Projects: Update
    console.log('\n--- 7. Testing PUT /projects/:id ---');
    const resProjUpdate = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'In Progress' }),
    });
    const projUpdateData = await resProjUpdate.json();
    console.log('Status:', resProjUpdate.status);
    assert.strictEqual(resProjUpdate.status, 200);
    assert.strictEqual(projUpdateData.data.project.status, 'In Progress');

    // 8. Chat: Add Message
    console.log('\n--- 8. Testing POST /chat/:projectId ---');
    const resChat = await fetch(`${BASE_URL}/chat/${projectId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        message: 'Hello AI',
        sender: 'user',
      }),
    });
    const chatData = await resChat.json();
    console.log('Status:', resChat.status);
    assert.strictEqual(resChat.status, 201);
    assert.strictEqual(chatData.data.chat.message, 'Hello AI');

    // 9. Chat: Get History
    console.log('\n--- 9. Testing GET /chat/:projectId ---');
    const resChatHist = await fetch(`${BASE_URL}/chat/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const chatHistData = await resChatHist.json();
    console.log('Status:', resChatHist.status);
    assert.strictEqual(resChatHist.status, 200);
    assert.strictEqual(chatHistData.data.history.length, 1);

    // 10. Chat: Delete
    console.log('\n--- 10. Testing DELETE /chat/:projectId ---');
    const resChatDel = await fetch(`${BASE_URL}/chat/${projectId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Status:', resChatDel.status);
    assert.strictEqual(resChatDel.status, 200);

    // 11. Projects: Delete
    console.log('\n--- 11. Testing DELETE /projects/:id ---');
    const resProjDel = await fetch(`${BASE_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Status:', resProjDel.status);
    assert.strictEqual(resProjDel.status, 200);

    console.log('\n✅ ALL API TESTS PASSED SUCCESSFULLY');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    console.error(error);
  } finally {
    server.close();
    await mongoose.connection.close();
    process.exit(0);
  }
};

mongoose.connect(process.env.MONGO_URI).then(runTests).catch(console.error);
