import SEOHead from '../components/SEOHead';

export default function Roadmap() {
  return (
    <>
      <SEOHead 
        title="Roadmap - The Journey Ahead | Appaloosa Dreams NFT"
        description="Explore the five-season journey of Appaloosa Dreams NFT. From awakened horses to Elder Futhark runes, discover upcoming real horse NFTs, exclusive collections, and community-driven experiences."
        url="https://appaloosadreams.com/roadmap"
      />
    <div className="container">
      <header>
        <div className="title-container">
          <h1 className="title-main">Roadmap</h1>
        </div>
      </header>

      <nav className="main-nav">
  <a href="/" className="nav-link">Home</a>
  <a href="/thestables" className="nav-link">The Stables</a>
  <a href="/lore" className="nav-link">Explore the Lore</a>
  <a href="/roadmap" className="nav-link primary">Roadmap</a>
  <a href="/therunes" className="nav-link">The Runes</a>
  <a href="/thepixels" className="nav-link">The Pixels</a>
</nav>

      <main>
        {/* Hero Section */}
        <div className="roadmap-hero">
          <h2>The Journey Ahead</h2>
          <p>Five seasons of awakening, each bringing new chapters to the legend of Appaloosa Dreams</p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          
          {/* Season 1 - Completed */}
          <div className="season-block completed">
            <div className="season-badge">
              <span className="season-number">I</span>
            </div>
            <div className="season-content">
              <div className="season-header">
                <h3>The Foundation</h3>
                <span className="season-status completed">Complete</span>
              </div>
              <p className="season-description">The first stones stirred, and twenty-four guardians emerged from the space between dreams and waking.</p>
              <div className="milestone-list">
                <div className="milestone done">✅ 24 Appaloosa Dreams horses awakened</div>
                <div className="milestone done">✅ The Stables marketplace established</div>
                <div className="milestone done">✅ Community foundation laid</div>
                <div className="milestone done">✅ Ancient lore documented</div>
              </div>
            </div>
          </div>

          {/* Season 2 - NOW COMPLETED */}
          <div className="season-block completed">
            <div className="season-badge">
              <span className="season-number">II</span>
            </div>
            <div className="season-content">
              <div className="season-header">
                <h3>The Stones Awaken</h3>
                <span className="season-status completed">Complete</span>
              </div>
              <p className="season-description">The sacred circle called forth its power. Twenty-four rune stones emerged, each bearing the weight of ancient wisdom.</p>
              <div className="milestone-list">
                <div className="milestone done">✅ 24 Elder Futhark Rune Stones launched</div>
                <div className="milestone done">✅ Sacred marketplace established</div>
                <div className="milestone done">✅ Ancient powers awakened</div>
              </div>
            </div>
          </div>

          {/* Season 3 - Now Upcoming */}
          <div className="season-block upcoming">
            <div className="season-badge">
              <span className="season-number">III</span>
            </div>
            <div className="season-content">
              <div className="season-header">
                <h3>The Living Legacy</h3>
                <span className="season-status upcoming">Fall 2025</span>
              </div>
              <p className="season-description">When legend touches reality, and the physical realm joins the digital awakening.</p>
              <div className="milestone-list">
                <div className="milestone">🐎 Real horses transformed into NFTs</div>
                <div className="milestone">📜 Expanded lore experiences</div>
                <div className="milestone">🤝 Strategic partnerships revealed</div>
              </div>
            </div>
          </div>

          {/* Season 4 - Mystery */}
          <div className="season-block mystery">
            <div className="season-badge">
              <span className="season-number">IV</span>
            </div>
            <div className="season-content">
              <div className="season-header">
                <h3>When Legends Become Legends</h3>
                <span className="season-status mystery">Winter 2025</span>
              </div>
              <p className="season-description">Ancient spirits take new forms... The realm expands beyond the sacred circles... Some say warriors from a forgotten age stir...</p>
              <div className="milestone-list">
                <div className="milestone">👾 A new 1,000 NFTs collection awakens</div>
                <div className="milestone">🏆 Community-driven events</div>
                <div className="milestone">🔮 Secrets of the ancients revealed</div>
              </div>
            </div>
          </div>

          {/* Season 5 - Distant Future */}
          <div className="season-block distant">
            <div className="season-badge">
              <span className="season-number">V</span>
            </div>
            <div className="season-content">
              <div className="season-header">
                <h3>The Expanding Realm</h3>
                <span className="season-status distant">Beyond 2026</span>
              </div>
              <p className="season-description">The awakening spreads. New realms beckon. The story continues beyond the horizon of current imagination.</p>
              <div className="milestone-list">
                <div className="milestone">🌟 Additional mystical collections</div>
                <div className="milestone">🔗 Ecosystem integrations</div>
                <div className="milestone">🗺️ Uncharted territories explored</div>
                <div className="milestone">∞ The legend grows eternal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="community-section">
          <h3>Join The Journey</h3>
          <p>Holders shape the path ahead. Your voice guides the awakening.</p>
          <div className="community-benefits">
            <div className="benefit-card">
              <h4>🎁 Holder Rewards</h4>
              <p>Exclusive airdrops, early access, and special privileges for loyal guardians</p>
            </div>
            <div className="benefit-card">
              <h4>🗳️ Community Voice</h4>
              <p>Help shape future collections and experiences through holder governance</p>
            </div>
            <div className="benefit-card">
              <h4>🤝 Real Connections</h4>
              <p>Meet fellow collectors at exclusive events and gatherings</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="roadmap-cta">
          <h3>Begin Your Journey</h3>
          <p>Every legend starts with a single step. Which guardian calls to you?</p>
          <a href="/thestables" className="cta-button">Enter The Stables</a>
        </div>
      </main>
    </div>
    </>
  );
}