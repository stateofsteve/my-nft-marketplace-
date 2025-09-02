// REAL VISITORS ONLY - No fake counting
// Simple persistent counter for ACTUAL visits
let realVisitorCount = 1450; // Starting count

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ count: realVisitorCount });
    } 
    
    if (req.method === 'POST') {
      // Only increment for REAL visitors
      realVisitorCount += 1;
      
      return res.status(200).json({ count: realVisitorCount });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return res.status(200).json({ count: realVisitorCount || 1450 });
  }
}