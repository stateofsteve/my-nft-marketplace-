// Persistent visitor counter using JSONBin.io (free service)
const JSONBIN_API_KEY = '$2a$10$lFjIkNu4HL8zWUGVjxDdnOuqlGD4hUBi5FY9Q9xH9E7vgKdLnqN5e'; // Read-only public key
const BIN_ID = '676e1a6aad19ca34f8c4a2e8'; // Public bin for visitor counter

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Get current count from JSONBin
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json({ count: data.record.count || 0 });
      } else {
        return res.status(200).json({ count: 0 });
      }
    } 
    
    if (req.method === 'POST') {
      // Get current count
      const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY
        }
      });
      
      let currentCount = 0;
      if (getResponse.ok) {
        const data = await getResponse.json();
        currentCount = data.record.count || 0;
      }
      
      // Increment and save
      const newCount = currentCount + 1;
      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify({
          count: newCount,
          lastUpdate: new Date().toISOString()
        })
      });
      
      if (updateResponse.ok) {
        return res.status(200).json({ count: newCount });
      } else {
        // Fallback: return incremented count even if save failed
        return res.status(200).json({ count: newCount });
      }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    // Return a safe fallback count
    return res.status(200).json({ count: 0 });
  }
}