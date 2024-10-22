export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Call Hugging Face's API with your input message
      const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
        method: 'POST',
        headers: {
          Authorization: `Bearer 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`, // Replace with your Hugging Face API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: message, // Send the message directly as the input
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Hugging Face API');
      }

      const data = await response.json();
      
      // Check if the response contains 'generated_text' or it's in an array
      const reply = data?.generated_text || data[0]?.generated_text || 'Sorry, I did not understand that.';

      // Return the response to the frontend
      res.status(200).json({ reply });
    } catch (error) {
      console.error('Error fetching from Hugging Face:', error);
      res.status(500).json({ error: 'Failed to fetch response' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
