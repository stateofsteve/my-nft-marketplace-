import fs from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'visitor-count.json');

export default async function handler(req, res) {
  try {
    let visitorData = { count: 0, lastReset: new Date().toISOString() };
    
    // Try to read existing counter file
    if (fs.existsSync(COUNTER_FILE)) {
      const fileContent = fs.readFileSync(COUNTER_FILE, 'utf8');
      visitorData = JSON.parse(fileContent);
    }

    if (req.method === 'GET') {
      return res.status(200).json({ count: visitorData.count });
    } 
    
    if (req.method === 'POST') {
      // Increment counter
      visitorData.count += 1;
      visitorData.lastVisit = new Date().toISOString();
      
      // Save to file
      fs.writeFileSync(COUNTER_FILE, JSON.stringify(visitorData, null, 2));
      
      return res.status(200).json({ count: visitorData.count });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}