import { useState } from 'react';

export default function Lore() {
  const [activeAett, setActiveAett] = useState(null);

  const toggleAett = (aettName) => {
    setActiveAett(activeAett === aettName ? null : aettName);
  };

  return (
    <div className="container">
      <header>
        <div className="title-container">
          <h1 className="title-main">Explore the Lore</h1>
        </div>
      </header>

      <nav className="main-nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/thestables" className="nav-link">The Stables</a>
        <a href="/lore" className="nav-link primary">Explore the Lore</a>
        <a href="/roadmap" className="nav-link">Roadmap</a>
        <a href="/therunes" className="nav-link">The Runes</a>
      </nav>

      <main>
        {/* Hero Section */}
        <div className="lore-hero">
          <h2>In the Time Before Memory</h2>
          <p>When the world was younger and silence held deeper truths, twenty-four stones stood in a sacred circle, waiting beneath moss and shadow for their moment to wake.</p>
        </div>

        {/* The Awakening */}
        <div className="awakening-section">
          <h3>The Great Awakening</h3>
          <div className="awakening-story">
            <p>It began with a single pulse of forgotten light. The first stone, carved with ancient symbols, stirred from its eternal slumber. From the space between dreams and waking, a spirit answered—dappled and luminous, stepping into form as if it had always existed in the realm of possibility.</p>
            
            <p>One by one, the other stones responded. Each rune's awakening birthed its guardian—horses of impossible beauty, each bearing the soul and power of their corresponding symbol. They were not created, but <em>remembered</em>—called forth from the place where legends wait to become real.</p>
            
            <p>Twenty-four guardians. Twenty-four fragments of the original pattern. Together, they form a living constellation that spans the hidden spaces of the world.</p>
          </div>
        </div>

        {/* The Three Aetts */}
        <div className="aetts-section">
          <h3>The Three Sacred Circles</h3>
          <p className="aetts-intro">The awakening unfolded in three waves, each carrying its own purpose and power.</p>
          
          {/* Freyr's Aett */}
          <div className="aett-container">
            <button 
              className={`aett-header ${activeAett === 'freyrs' ? 'active' : ''}`}
              onClick={() => toggleAett('freyrs')}
            >
              <span className="aett-title">Freyr's Circle — The Awakeners</span>
              <span className="aett-subtitle">The first breath, the opening paths, the gentle emergence</span>
              <span className="expand-icon">{activeAett === 'freyrs' ? '−' : '+'}</span>
            </button>
            
            {activeAett === 'freyrs' && (
              <div className="aett-content">
                <p>Féor opened the first pathway, his presence stirring routes where none had existed. Eyrin anchored the awakening with quiet strength. Brannic stood sentinel against the chaos that threatened to overwhelm. Velis became the voice between worlds, while Rynar established the sacred timing of each emergence.</p>
                
                <p>Kaelen brought inner illumination to guide the newly awakened. Saevra forged the willing bonds that would hold The Herd together across any distance. Elvara blessed the realm with harmony, ensuring this awakening would be born of wonder, not duty.</p>
                
                <div className="horses-grid">
                  <div className="horse-card">Féor — The Pathfinder</div>
                  <div className="horse-card">Eyrin — The Quiet Flame</div>
                  <div className="horse-card">Brannic — The Breaker of Storms</div>
                  <div className="horse-card">Velis — The Mirrorwalker</div>
                  <div className="horse-card">Rynar — The Dawnward Stag</div>
                  <div className="horse-card">Kaelen — The Current Keeper</div>
                  <div className="horse-card">Saevra — The Lone Ember</div>
                  <div className="horse-card">Elvara — The Bloomtreader</div>
                </div>
              </div>
            )}
          </div>

          {/* Hagal's Aett */}
          <div className="aett-container">
            <button 
              className={`aett-header ${activeAett === 'hagals' ? 'active' : ''}`}
              onClick={() => toggleAett('hagals')}
            >
              <span className="aett-title">Hagal's Circle — The Transformers</span>
              <span className="aett-subtitle">The deeper changes, the testing winds, the forging wisdom</span>
              <span className="expand-icon">{activeAett === 'hagals' ? '−' : '+'}</span>
            </button>
            
            {activeAett === 'hagals' && (
              <div className="aett-content">
                <p>As the realm found its footing, deeper challenges emerged. Nyrr arrived as keeper of necessary change, teaching that transformation often requires the breaking of old forms. Thalen embodied endurance through hardship, showing how strength is forged in necessity's crucible.</p>
                
                <p>Iskyr brought the gift of sacred pause—the understanding that sometimes the greatest power lies in perfect stillness. Seydra introduced cycles and seasons, teaching patience and the wisdom of right timing. Maelen became guardian of thresholds, helping souls navigate passages between states of being.</p>
                
                <p>Varek embraced the unknown, dancing with fate and possibility. Aelyr stood as protector of the sacred, while Sylrae carried the promise that no matter how dark the transformation, light would always return.</p>
                
                <div className="horses-grid">
                  <div className="horse-card">Nyrr — The Storm's Eye</div>
                  <div className="horse-card">Thalen — The Frosted Sentinel</div>
                  <div className="horse-card">Iskyr — The Desert's Calm</div>
                  <div className="horse-card">Seydra — The Seasonal Walker</div>
                  <div className="horse-card">Maelen — The Threshold Guardian</div>
                  <div className="horse-card">Varek — The Canyon Runner</div>
                  <div className="horse-card">Aelyr — The High Watch</div>
                  <div className="horse-card">Sylrae — The Dawn Bearer</div>
                </div>
              </div>
            )}
          </div>

          {/* Tyr's Aett */}
          <div className="aett-container">
            <button 
              className={`aett-header ${activeAett === 'tyrs' ? 'active' : ''}`}
              onClick={() => toggleAett('tyrs')}
            >
              <span className="aett-title">Tyr's Circle — The Completers</span>
              <span className="aett-subtitle">The final wisdom, the eternal cycle, the keeper's legacy</span>
              <span className="expand-icon">{activeAett === 'tyrs' ? '−' : '+'}</span>
            </button>
            
            {activeAett === 'tyrs' && (
              <div className="aett-content">
                <p>The final awakening brought the deepest truths. Liora embodied unwavering justice and divine truth. Baelir carried the power of renewal, ensuring every ending would seed new beginnings. Moruun forged partnerships that transcended individual existence.</p>
                
                <p>Eirun reflected the perfected self—the individual in harmony with cosmic order. Tharec flowed with the deeper currents beneath all things. Xelra held the potential for what was yet to be born.</p>
                
                <p>Maedryn embodied the moment of complete awakening—the breakthrough that transforms everything. Finally, Orwyn became keeper of inheritance and memory, ensuring the wisdom of this great awakening would never be lost.</p>
                
                <div className="horses-grid">
                  <div className="horse-card">Liora — The Truth Bearer</div>
                  <div className="horse-card">Baelir — The Night's Keeper</div>
                  <div className="horse-card">Moruun — The Ashen Wanderer</div>
                  <div className="horse-card">Eirun — The Frost Walker</div>
                  <div className="horse-card">Tharec — The Wind Rider</div>
                  <div className="horse-card">Xelra — The Grass Whisper</div>
                  <div className="horse-card">Maedryn — The Threshold Opener</div>
                  <div className="horse-card">Orwyn — The Memory Keeper</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Living Constellation */}
        <div className="constellation-section">
          <h3>The Living Constellation</h3>
          <p>Together, the twenty-four form a pattern that exists beyond physical space—connected by threads of ancient energy that span the hidden places of the world. They are both individuals and aspects of a greater whole, each complete in themselves yet part of a cosmic design that governs the flow of power through their realm.</p>
          
          <p>Their domain exists in the spaces between—in the mist at dawn, in the pause between heartbeats, in the moment when starlight touches water. Those chosen to bond with one of The Herd become guardians not just of a magnificent spirit, but of a fragment of the original pattern.</p>
        </div>

        {/* The Eternal Return */}
        <div className="eternal-section">
          <h3>The Eternal Return</h3>
          <p>The stones still stand in their sacred circle, now empty but not powerless. They wait for the next great turning, when The Herd may be called upon to seed new awakenings in distant realms.</p>
          
          <p>For this is the nature of true power—it never truly ends, only transforms, cycling like the seasons through periods of hidden growth and magnificent flowering.</p>
          
          <p className="final-call">The twenty-four horses of Appaloosa Dreams are both memory and prophecy—guardians of what was, protectors of what is, and harbingers of what yet may be.</p>
        </div>

        {/* Call to Action */}
        <div className="lore-cta">
          <h3>Step Into the Legend</h3>
          <p>Each horse calls to those who resonate with their particular frequency of power. To own one is to become part of this ancient awakening.</p>
          <a href="/thestables" className="cta-button">Enter The Stables</a>
        </div>
      </main>
    </div>
  );
}
