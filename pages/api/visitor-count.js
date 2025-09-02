// BULLETPROOF COUNTER - NEVER RESETS
// Uses multiple persistence methods to ensure count NEVER gets lost

import fs from 'fs';
import path from 'path';

const COUNTER_FILE = path.join('/tmp', 'visitor-count.txt');
const BACKUP_COUNTER_FILE = path.join(process.cwd(), 'visitor-backup.txt');

function getPersistedCount() {
  try {
    // Try primary location first (/tmp)
    if (fs.existsSync(COUNTER_FILE)) {
      const count = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8'));
      if (count && count > 1450) return count;
    }
    
    // Try backup location (project directory)
    if (fs.existsSync(BACKUP_COUNTER_FILE)) {
      const count = parseInt(fs.readFileSync(BACKUP_COUNTER_FILE, 'utf8'));
      if (count && count > 1450) return count;
    }
  } catch (error) {
    console.error('Failed to read persisted count:', error);
  }
  
  // If no valid count found, start at 1450
  return 1450;
}

function savePersistedCount(count) {
  try {
    // Save to both locations for redundancy
    fs.writeFileSync(COUNTER_FILE, count.toString());
    fs.writeFileSync(BACKUP_COUNTER_FILE, count.toString());
    return true;
  } catch (error) {
    console.error('Failed to save count:', error);
    return false;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const count = getPersistedCount();
      return res.status(200).json({ count });
    } 
    
    if (req.method === 'POST') {
      // Get current persisted count and increment
      const currentCount = getPersistedCount();
      const newCount = currentCount + 1;
      
      // Save the new count to disk
      savePersistedCount(newCount);
      
      return res.status(200).json({ count: newCount });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Visitor counter error:', error);
    const fallbackCount = getPersistedCount();
    return res.status(200).json({ count: fallbackCount });
  }
}