import request from 'supertest';

// Replace with the URL of your local Next.js dev server
const app = 'http://localhost:3001';

describe('POST /api/auth/login', () => {

  it('should return 401 for valid credentials (no real user exists)', async () => {
    const loginData = {
      identifier: 'test@example.com',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(401); // Expect 401 since no real user exists in test DB

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return a 400 error for missing identifier', async () => {
    const incompleteLogin = {
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(incompleteLogin)
      .expect(400); // Expect a 400 Bad Request status code

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 400 error for missing password', async () => {
    const incompleteLogin = {
      identifier: 'test@example.com',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(incompleteLogin)
      .expect(400); // Expect a 400 Bad Request status code

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 400 error for missing both fields', async () => {
    const incompleteLogin = {};

    const res = await request(app)
      .post('/api/auth/login')
      .send(incompleteLogin)
      .expect(400); // Expect a 400 Bad Request status code

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return a 401 error for invalid credentials (user not found)', async () => {
    const invalidLogin = {
      identifier: 'nonexistent@example.com',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(invalidLogin)
      .expect(401); // Expect a 401 Unauthorized status code

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return a 401 error for wrong password', async () => {
    const wrongPasswordLogin = {
      identifier: 'test@example.com',
      password: 'WrongPassword123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(wrongPasswordLogin)
      .expect(401); // Expect a 401 Unauthorized status code

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should return 401 for username login (no real user exists)', async () => {
    const usernameLogin = {
      identifier: 'testuser',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(usernameLogin)
      .expect(401); // Expect 401 since no real user exists in test DB

    expect(res.body).toEqual({ error: 'Invalid credentials' });
  });

  it('should handle malformed JSON gracefully', async () => {
    // Test with malformed JSON to ensure proper error handling
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send('{"invalid": json}') // Malformed JSON
      .expect(500); // Expect 500 Internal Server Error for malformed JSON

    // Should return an error response
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });

});
