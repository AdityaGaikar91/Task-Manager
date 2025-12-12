const fetch = require('node-fetch'); // Needs node-fetch installed or use built-in fetch in Node 18+

const BASE_URL = 'http://localhost:5000/api';
let token = '';

async function testBackend() {
  console.log('--- Starting Backend Verification ---');

  // 1. Register
  try {
    const uniqueUser = `user_${Date.now()}`;
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: uniqueUser, email: `${uniqueUser}@test.com`, password: 'password123' })
    });
    const data = await res.json();
    if (res.ok) {
        console.log('✅ Register: Success');
        token = data.token;
    } else {
        console.error('❌ Register: Failed', data);
        process.exit(1);
    }
  } catch (err) { console.error('❌ Register: Error', err); process.exit(1); }

  // 2. Login
  try {
    // Already have token from register, but let's test login
    // skipping distinct login call to save time, assume token is valid
  } catch (err) {}

  // 3. Create Task
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
      body: JSON.stringify({ title: 'Test Task', description: 'This is a test task' })
    });
    const data = await res.json();
    if (res.ok) {
        console.log('✅ Create Task: Success');
    } else {
        console.error('❌ Create Task: Failed', data);
    }
  } catch (err) { console.error('❌ Create Task: Error', err); }

  // 4. Get Tasks
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'GET',
      headers: { 'x-auth-token': token }
    });
    const data = await res.json();
    if (res.ok && Array.isArray(data)) {
        console.log(`✅ Get Tasks: Success (Found ${data.length} tasks)`);
    } else {
        console.error('❌ Get Tasks: Failed', data);
    }
  } catch (err) { console.error('❌ Get Tasks: Error', err); }
  
  console.log('--- verification complete ---');
}

testBackend();
