// Corrected JavaScript Test File

import { POST } from '../../api/chat/route';
import { NextResponse } from 'next/server';

// Mock the OpenAI module
const mockOpenAICreate = jest.fn();
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockOpenAICreate,
      },
    },
  }));
});

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({ body, init })),
  },
}));

describe('Chat API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenAICreate.mockReset();
    NextResponse.json.mockReset();
  });

  // Test case for a successful API call
  it('should return an assistant message on a successful OpenAI API call', async () => {
    // Corrected: Removed `as unknown as NextRequest`
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ prompt: 'Hello, world!' }),
    };

    const mockOpenAIResponse = {
      choices: [
        {
          message: {
            content: 'Hello! How can I help you today?',
          },
        },
      ],
    };
    mockOpenAICreate.mockResolvedValue(mockOpenAIResponse);

    await POST(mockRequest);

    expect(mockRequest.json).toHaveBeenCalledTimes(1);
    expect(mockOpenAICreate).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello, world!' }],
      max_tokens: 150,
      temperature: 0.8,
    });
    expect(NextResponse.json).toHaveBeenCalledWith(
      { assistantMessage: 'Hello! How can I help you today?' },
      { status: 200 }
    );
  });

  // Test case for an API call failure
  it('should return a 500 error if the OpenAI API call fails', async () => {
    // Corrected: Removed `as unknown as NextRequest`
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ prompt: 'Test prompt' }),
    };

    const apiError = new Error('OpenAI API Error');
    mockOpenAICreate.mockRejectedValue(apiError);

    // Mock console.error to prevent test output clutter
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await POST(mockRequest);

    expect(consoleSpy).toHaveBeenCalledWith(apiError);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Failed to generate response from the AI' },
      { status: 500 }
    );

    consoleSpy.mockRestore();
  });
  
  // Test case for a request body parsing failure
  it('should return a 500 error if parsing the request body fails', async () => {
    const requestError = new Error('Invalid JSON');
    // Corrected: Removed `as unknown as NextRequest`
    const mockRequest = {
      json: jest.fn().mockRejectedValue(requestError),
    };

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    await POST(mockRequest);
    
    expect(consoleSpy).toHaveBeenCalledWith(requestError);
    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Failed to generate response from the AI' },
      { status: 500 }
    );
    
    consoleSpy.mockRestore();
  });
});