import { 
  ConnectWallet, 
  Web3Button, 
  useContract, 
  useContractRead,
  MediaRenderer,
  useAddress,
  useNFT
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import SEOHead from "../components/SEOHead";

const NFT_COLLECTION_ADDRESS = "0xf78f017B9894311B702e0CF297b72a2ACA592226";
const MARKETPLACE_ADDRESS = "0x440C67F5838f9F60779A17629650c59EfF6576e6";

export default function TheRunes() {
  const address = useAddress();
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const [allListings, setAllListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  
  const { data: totalListings } = useContractRead(marketplace, "totalListings");

  useEffect(() => {
    async function fetchAllListings() {
      if (!marketplace || !totalListings) return;
      
      console.log("Fetching all", totalListings.toString(), "rune listings...");
      setLoadingListings(true);
      
      try {
        const listings = [];
        const totalCount = parseInt(totalListings.toString());
        
        // Create all promises at once for parallel execution
        const listingPromises = [];
        for (let i = 0; i < totalCount; i++) {
          listingPromises.push(
            marketplace.call("getListing", [i])
              .then(listing => ({ listing, index: i, success: true }))
              .catch(error => ({ error, index: i, success: false }))
          );
        }
        
        // Wait for all listings to load in parallel
        const results = await Promise.all(listingPromises);
        
        // Process results
        results.forEach(({ listing, error, index, success }) => {
          if (!success) {
            console.log(`Rune listing ${index} failed to load:`, error);
          } else if (listing && listing.status === 1) {
            listings.push(listing);
            console.log(`Loaded rune listing ${index}:`, listing);
          }
        });
        
        console.log("All rune listings loaded:", listings);
        setAllListings(listings);
      } catch (error) {
        console.error("Error fetching rune listings:", error);
      } finally {
        setLoadingListings(false);
      }
    }

    fetchAllListings();
  }, [marketplace, totalListings]);

  const totalListingsString = totalListings ? totalListings.toString() : "Loading...";

  return (
    <>
      <SEOHead 
        title="The Runes - Sacred Elder Futhark Stones | Appaloosa Dreams"
        description="Discover 24 legendary Elder Futhark rune stones - sacred 1/1 NFT artifacts imbued with ancient wisdom. Connect your wallet to purchase these mystical vessels of power from the awakened stone circle."
        url="https://appaloosadreams.com/therunes"
      />
    <div className="container">
      <header>
        <div className="title-container">
          <h1 className="title-main">The Runes</h1>
        </div>
        <ConnectWallet />
      </header>

      <nav className="main-nav">
  <a href="/" className="nav-link">Home</a>
  <a href="/thestables" className="nav-link">The Stables</a>
  <a href="/lore" className="nav-link">Explore the Lore</a>
  <a href="/roadmap" className="nav-link primary">Roadmap</a>
  <a href="/therunes" className="nav-link">The Runes</a>
  <a href="/thepixels" className="nav-link">The Pixels</a>
</nav>

      <div className="hero-tagline">
        <p>Elder Futhark Awakens</p>
      </div>

      <main>
        {!address ? (
          <div className="connect-prompt">
            <h2>Connect your wallet to view and purchase the sacred rune stones</h2>
            <p>Twenty-four legendary artifacts await worthy guardians</p>
          </div>
        ) : (
          <div>
            <div className="runes-intro">
              <h2>The Sacred Stone Circle</h2>
              <p>Each rune stone is a 1/1 legendary artifact, carved with the power of the Elder Futhark. These are not mere collectibles, but vessels of ancient wisdom waiting for their chosen guardians.</p>
            </div>
            
            <h3 className="collection-title">Available Rune Stones ({allListings.length} of {totalListingsString})</h3>
            
            {loadingListings ? (
              <div className="loading-state">
                <p>The ancient stones are stirring... Loading {totalListingsString} sacred artifacts...</p>
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '15px', 
                  color: '#daa520',
                  fontSize: '0.95em'
                }}>
                  Fetching blockchain data in parallel for faster loading ⚡
                </div>
              </div>
            ) : (
              <div className="nft-grid">
                {allListings.length > 0 ? (
                  allListings.map((listing, index) => (
                    <RuneCard key={index} listing={listing} marketplace={marketplace} />
                  ))
                ) : (
                  <div className="no-listings">
                    <p>The rune stones rest in silence. None are currently offered for guardianship.</p>
                    <p>Check back soon, as the ancient powers may stir at any moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
    </>
  );
}

function RuneCard({ listing, marketplace }) {
  const address = useAddress();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  
  const priceInEth = listing.pricePerToken ? 
    ethers.utils.formatEther(listing.pricePerToken) : "Loading...";
  
  const tokenId = listing.tokenId ? listing.tokenId.toString() : "Unknown";
  const listingId = listing.listingId ? listing.listingId.toString() : "Unknown";

  const { data: nft, isLoading: nftLoading, error: nftError } = useNFT(nftCollection, tokenId);

  return (
    <div className="nft-card rune-card">
      <div className="rune-image-container">
        {nft?.metadata?.image ? (
          <MediaRenderer
            src={nft.metadata.image}
            alt={nft.metadata.name || `Rune Stone #${tokenId}`}
            width="300px"
            height="300px"
            style={{objectFit: 'cover', borderRadius: '15px'}}
          />
        ) : (
          <div className="rune-placeholder">
            <div className="rune-symbol">ᚱ</div>
            <div className="placeholder-text">
              <div>Rune Stone #{tokenId}</div>
              <div style={{fontSize: '12px', marginTop: '10px'}}>
                {nftLoading ? 'Ancient power awakening...' : 'Sacred symbol materializing...'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="nft-info rune-info">
        <h3>{nft?.metadata?.name || `Elder Futhark Stone #${tokenId}`}</h3>
        <p className="description rune-description">
          {nft?.metadata?.description || "A legendary rune stone from the Elder Futhark collection. Each stone is a 1/1 artifact imbued with ancient power and wisdom."}
        </p>
        
        <div className="price-section rune-price-section">
          <Web3Button
            contractAddress={MARKETPLACE_ADDRESS}
            action={async (contract) => {
              const tx = await contract.call("buyFromListing", [
                listingId,
                address,
                1,
                "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                listing.pricePerToken
              ]);
              return tx;
            }}
            onSuccess={() => {
              alert(`Purchase successful! ${nft?.metadata?.name || `Rune Stone #${tokenId}`} is now yours! 🗿✨`);
              window.location.reload();
            }}
            onError={(error) => {
              console.error("Purchase failed:", error);
              alert("Purchase failed. Please try again.");
            }}
            className="rune-buy-button"
          >
            Buy Now - {priceInEth} ETH
          </Web3Button>
        </div>
      </div>
    </div>
  );
}