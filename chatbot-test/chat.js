import fetch from 'node-fetch';

// running chatbot-test/chat.js

// This is the URL of your Next.js API route.
// Make sure your Next.js development server is running on port 3000.
const API_URL = 'http://localhost:3000/api/chat';

const testChatbot = async (prompt) => {
  console.log(`Sending prompt to chatbot: "${prompt}"`);
  let messages = []
  messages = [...messages, { role: 'user', content: prompt }]

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: messages }),
    });

    if (!response.ok) {
      // If the response status is not in the 200-299 range, it's an error.
      const errorData = await response.json();
      throw new Error(`HTTP Error: ${response.status} - ${errorData.error}`);
    }

    const data = await response.json();
    console.log("Chatbot's full response object:", data);
    
    // The actual message is nested inside the `assistantMessage` key
    const assistantMessage = data.assistantMessage;
    console.log("Chatbot's message:", assistantMessage);
    
    return assistantMessage;

  } catch (error) {
    console.error("An error occurred while calling the chatbot:", error.message);
    throw error;
  }
};

// You can call the function with any prompt you want to test.
const testPrompt = "";
callLogoutAPI();
testChatbot(testPrompt);