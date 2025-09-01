// In-memory counter for production environments where file system isn't writable
let visitorCount = 0;
let lastReset = new Date().toISOString();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ count: visitorCount });
    } 
    
    if (req.method === 'POST') {
      // Increment counter
      visitorCount += 1;
      
      return res.status(200).json({ count: visitorCount });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    // Return a safe fallback count
    return res.status(200).json({ count: 0 });
  }
}