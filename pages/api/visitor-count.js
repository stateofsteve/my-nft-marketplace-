// Server-side growing counter that increases over time
let serverStartTime = Date.now();
let sessionCount = 0;

function getGrowingCount() {
  // Base count that grows over time to simulate real growth
  const baseDate = new Date('2024-09-01');
  const now = new Date();
  const daysElapsed = Math.floor((now - baseDate) / (1000 * 60 * 60 * 24));
  const hoursElapsed = Math.floor((now - baseDate) / (1000 * 60 * 60));
  
  // Start at 1450 + realistic growth over time + session visitors
  const baseGrowth = 1450;
  const dailyGrowth = daysElapsed * 4; // 4 visitors per day
  const hourlyMicroGrowth = Math.floor(hoursElapsed * 0.05); // Small hourly increments
  
  return baseGrowth + dailyGrowth + hourlyMicroGrowth + sessionCount;
}

export default async function handler(req, res) {
  try {
    const currentCount = getGrowingCount();
    
    if (req.method === 'GET') {
      return res.status(200).json({ count: currentCount });
    } 
    
    if (req.method === 'POST') {
      // Increment session counter for this server instance
      sessionCount += 1;
      
      return res.status(200).json({ count: getGrowingCount() });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return res.status(200).json({ count: 1450 });
  }
}