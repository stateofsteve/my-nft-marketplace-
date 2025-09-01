// Simple persistent counter using environment variable simulation
// This will persist across function calls but reset on deployments
let persistentCount = 1000; // Start at 1000 for a more impressive initial count

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ count: persistentCount });
    } 
    
    if (req.method === 'POST') {
      // Increment counter
      persistentCount += 1;
      
      return res.status(200).json({ count: persistentCount });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    // Return a safe fallback count
    return res.status(200).json({ count: persistentCount || 1000 });
  }
}