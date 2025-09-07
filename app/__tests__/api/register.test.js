import request from 'supertest';

// Replace with the URL of your local Next.js dev server
const app = 'http://localhost:3001';

describe('POST /api/register', () => {

  it('should successfully register a new user', async () => {
    const newUser = {
      email: `test-${Date.now()}@example.com`,
      username: `testuser-${Date.now()}`,
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser)
      .expect(201); // Expect a 201 Created status code

    // Further assertions on the response body
    expect(res.body).toEqual({ message: 'User registered successfully!' });
  });

  it('should return a 409 error for a duplicate email', async () => {
    // First, register a user to ensure a duplicate exists
    const existingUser = {
      email: 'duplicate@example.com',
      username: 'duplicateuser',
      password: 'Password123!',
    };
    await request(app)
      .post('/api/auth/register')
      .send(existingUser)
      .expect(201);

    // Now, try to register with the same email again
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        ...existingUser,
        username: 'anotherusername', // Change username to isolate email duplicate error
      })
      .expect(409); // Expect a 409 Conflict status code

    // Assert that the response body contains the correct error message
    expect(res.body).toEqual({ error: 'Email already exists' });
  });

  it('should return a 400 error for missing fields', async () => {
    const incompleteUser = {
      username: 'incompleteuser',
      password: 'Password123!',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(incompleteUser)
      .expect(400); // Expect a 400 Bad Request status code

    expect(res.body).toEqual({ error: 'Missing required fields' });
  });

});