// __tests__/register.test.ts

import request from 'supertest';

// Replace with the URL of your local Next.js dev server
const app = 'http://localhost:3000';

describe('POST /api/auth/register', () => {

  it('should successfully register a new user', async () => {
    // 1. Adjusted fields to match your new route
    const newUser = {
      email: `test-${Date.now()}@example.com`,
      firstName: `test-${Date.now()}`,
      lastName: `user`,
      password: 'Password123!',
    };

    const res = await request(app)
      // CORRECTED: Changed endpoint to /api/auth/register
      .post('/api/auth/register') 
      .send(newUser)
      .expect(201); // Expect a 201 Created status code

    // 3. Updated expected response body
    expect(res.body).toEqual({ message: 'User registered successfully!' });
  });

  it('should return a 409 error for a duplicate email', async () => {
    // Register a new user with a unique email for this test
    const duplicateEmail = `duplicate-${Date.now()}@example.com`;
    const existingUser = {
      email: duplicateEmail,
      firstName: 'Duplicate',
      lastName: 'Test',
      password: 'Password123!',
    };

    // First, register a user to ensure a duplicate exists
    await request(app)
      // CORRECTED: Changed endpoint to /api/auth/register
      .post('/api/auth/register')
      .send(existingUser)
      .expect(201);

    // Now, try to register with the same email again
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: duplicateEmail,
        firstName: 'Another',
        lastName: 'User',
        password: 'AnotherPassword123!',
      })
      .expect(409); // Expect a 409 Conflict status code

    // Assert that the response body contains the correct error message
    expect(res.body).toEqual({ error: 'Email already exists' });
  });

  it('should return a 400 error for missing fields', async () => {
    // Missing 'email', 'firstName', and 'lastName' fields
    const incompleteUser = {
      password: 'Password123!',
    };

    const res = await request(app)
      // CORRECTED: Changed endpoint to /api/auth/register
      .post('/api/auth/register')
      .send(incompleteUser)
      .expect(400); // Expect a 400 Bad Request status code

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });
});