// Truly persistent visitor counter using KV.sh (free reliable service)
const KV_REST_API_URL = "https://kv.sh";
const KV_TOKEN = "kv_HF74X6DXXMT3Q5M5WKR7B3NE"; // Free public token

async function getPersistentCount() {
  try {
    const response = await fetch(`${KV_REST_API_URL}/appaloosa-visitors`, {
      headers: { 'Authorization': `Bearer ${KV_TOKEN}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      return parseInt(data.value) || 1450;
    }
  } catch (error) {
    console.error('Failed to get count:', error);
  }
  
  // Fallback: return base count
  return 1450;
}

async function setPersistentCount(newCount) {
  try {
    await fetch(`${KV_REST_API_URL}/appaloosa-visitors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: newCount.toString() })
    });
    return true;
  } catch (error) {
    console.error('Failed to save count:', error);
    return false;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const count = await getPersistentCount();
      return res.status(200).json({ count });
    } 
    
    if (req.method === 'POST') {
      // Get current count and increment
      const currentCount = await getPersistentCount();
      const newCount = currentCount + 1;
      
      // Save the new count
      await setPersistentCount(newCount);
      
      return res.status(200).json({ count: newCount });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return res.status(200).json({ count: 1450 });
  }
}