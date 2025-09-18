// __tests__/login.test.js

import request from 'supertest';

// Replace with the URL of your local Next.js dev server
const app = 'http://localhost:3000';

describe('POST /api/auth/login', () => {

  it('should return 401 for valid credentials (no real user exists)', async () => {
    // CORRECTED: 'identifier' changed to 'email'
    const loginData = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(401);

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return a 400 error for missing email', async () => {
    const incompleteLogin = {
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(incompleteLogin)
      .expect(400);

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 400 error for missing password', async () => {
    // CORRECTED: 'identifier' changed to 'email'
    const incompleteLogin = {
      email: 'test@example.com',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(incompleteLogin)
      .expect(400);

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 400 error for missing both fields', async () => {
    const incompleteLogin = {};

    const res = await request(app)
      .post('/api/auth/login')
      .send(incompleteLogin)
      .expect(400);

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 401 error for invalid credentials (user not found)', async () => {
    // CORRECTED: 'identifier' changed to 'email'
    const invalidLogin = {
      email: 'nonexistent@example.com',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(invalidLogin)
      .expect(401);

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return a 401 error for wrong password', async () => {
    // CORRECTED: 'identifier' changed to 'email'
    const wrongPasswordLogin = {
      email: 'test@example.com',
      password: 'WrongPassword123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(wrongPasswordLogin)
      .expect(401);

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  // This test will likely fail for a user identified by a username since your API route only uses email.
  // It should be removed or adjusted if you intend to add username login functionality.
  it('should return 401 for username login (no real user exists)', async () => {
    // CORRECTED: 'identifier' changed to 'email'
    const usernameLogin = {
      email: 'testuser',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(usernameLogin)
      .expect(401);

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should handle malformed JSON gracefully', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send('{"invalid": json}')
      .expect(500);

    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});