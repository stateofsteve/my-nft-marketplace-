import Image from 'next/image';
import { useState } from 'react';
import { validateEmail, sanitizeInput } from '../utils/validation';
import SEOHead from '../components/SEOHead';

export default function Home() {
  const [emailError, setEmailError] = useState('');
  return (
    <>
      <SEOHead />
    
    <div className="container">
      <header>
        <div className="header-with-logo">
          <Image 
            src="/images/logo.jpg" 
            alt="Appaloosa Dreams Logo" 
            className="site-logo"
            width={100}
            height={100}
            priority
          />
          <div className="title-container">
            <h1 className="title-main">Appaloosa Dreams</h1>
            <nav className="header-nav">
             <a href="/thestables" className="nav-link primary">The Stables</a>
              <a href="/lore" className="nav-link">Explore the Lore</a>
              <a href="/roadmap" className="nav-link">Roadmap</a>
              <a href="/therunes" className="nav-link">The Runes</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="hero-tagline">
        <p>decentral = decent</p>
      </div>

      <main>
        {/* Hero Video Section */}
        <div className="hero-video-section" style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            controls
            style={{
              width: '100%',
              maxWidth: '800px',
              height: 'auto',
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '15px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.3)'
            }}
          >
            <source src="/videos/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="welcome-section">
          <h2>Welcome to the Realm Between Dreams and Reality</h2>
          <p>In the ethereal mists where ancient magic flows through moonlit meadows, 24 mystical Appaloosa horses await their chosen guardians. Each magnificent creature carries the essence of primal forces, marked by sacred runes that whisper tales of power, wisdom, and untold adventures.</p>
          
          <p>These are not mere digital artifacts—they are mystical companions, each with their own story, their own sacred symbol, and their own unique connection to the ancient energies that flow through our world.</p>
          
          <p>Step into a world where every pixel pulses with magic, where ancient wisdom meets digital artistry, and where your journey with The Herd begins.</p>
        </div>

        <div className="email-capture">
          <h3>Join The Mystical Journey</h3>
          <p>Get early access to new drops, exclusive lore, and updates from The Herd</p>
          
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              
              const email = sanitizeInput(e.target.email.value);
              const validation = validateEmail(email);
              
              // Clear previous errors
              setEmailError('');
              
              if (!validation.isValid) {
                setEmailError(validation.error);
                return;
              }
              
              const submitBtn = e.target.querySelector('.subscribe-btn');
              const successMsg = document.getElementById('success-message');
              
              // Show loading state
              submitBtn.textContent = 'Subscribing...';
              submitBtn.disabled = true;
              successMsg.style.display = 'none';
              
              try {
                // Send to our custom backend
                const response = await fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                  // Show success message (same styling as before!)
                  successMsg.style.display = 'block';
                  e.target.reset();
                } else {
                  setEmailError(data.error || 'Something went wrong. Please try again.');
                }
              } catch (error) {
                setEmailError('Network error. Please try again.');
                console.error('Subscription error:', error);
              }
              
              // Reset button
              submitBtn.textContent = 'Subscribe';
              submitBtn.disabled = false;
            }}
            className="email-form"
          >
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email address" 
              className="email-input" 
              required 
            />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
          
          {emailError && (
            <div className="error-message" style={{
              marginTop: '15px',
              padding: '12px',
              background: 'rgba(220, 53, 69, 0.2)',
              color: '#dc3545',
              textAlign: 'center',
              borderRadius: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              ⚠️ {emailError}
            </div>
          )}
          
          <div id="success-message" style={{
            display: 'none', 
            marginTop: '15px', 
            padding: '12px',
            background: 'rgba(40, 167, 69, 0.2)',
            color: '#28a745', 
            textAlign: 'center',
            borderRadius: '8px',
            fontFamily: 'Georgia, serif'
          }}>
            🐎 Welcome to The Herd! We'll keep you updated on all mystical happenings.
          </div>
        </div>
      </main>
      {/* SOCIAL MEDIA FOOTER WITH PROFILE LOGO - REPLACE YOUR CURRENT FOOTER WITH THIS */}
      <footer className="social-footer">
        <div className="social-container">
          <h3>Follow Our Journey</h3>
          <div className="social-buttons">
            <a 
              href="https://discord.gg/6dtPV2Jn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn discord-btn"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Discord</span>
            </a>
            
            {/* Profile Logo in the Middle */}
            <div className="footer-profile-logo-center">
              <a 
                href="http://byeffect.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-logo-link"
              >
                <Image 
                  src="/images/profile-photo.jpg" 
                  alt="Profile" 
                  className="profile-logo"
                  width={60}
                  height={60}
                />
              </a>
            </div>
            
            <a 
              href="https://x.com/theunfoldingai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn twitter-btn"
            >
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Follow on X</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}