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
import { GridSkeleton, LoadingSpinner } from "../components/LoadingSkeleton";
import { useWalletPersistence } from "../hooks/useWalletPersistence";
import SEOHead from "../components/SEOHead";

const NFT_COLLECTION_ADDRESS = "0x0031eE064Fc9aB096cf1D58Be09037Aa13d11Da7";
const MARKETPLACE_ADDRESS = "0x54d4043B7aE1ed9750b051F74852f2C30EF02Fa9";

export default function ThePixels() {
  const address = useAddress();
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const [allListings, setAllListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { connectionStatus, isAutoConnecting } = useWalletPersistence();
  
  const { data: totalListings } = useContractRead(marketplace, "totalListings");

  useEffect(() => {
    async function fetchAllListings() {
      if (!marketplace || !totalListings) return;
      
      console.log("Fetching all", totalListings.toString(), "listings...");
      setLoadingListings(true);
      setLoadingProgress(0);
      
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
        
        // Process results and filter for NFT collection token IDs 24-71 only
        results.forEach(({ listing, error, index, success }) => {
          if (!success) {
            console.log(`Listing ${index} failed to load:`, error);
          } else if (listing && listing.status === 1) {
            const tokenId = listing.tokenId ? parseInt(listing.tokenId.toString()) : -1;
            // Only include NFTs with collection token ID 24-71
            if (tokenId >= 24 && tokenId <= 71) {
              listings.push(listing);
              console.log(`Loaded listing ${index} with collection token ID ${tokenId}:`, listing);
            } else {
              console.log(`Filtered out listing ${index} with token ID ${tokenId}`);
            }
          }
        });
        
        console.log("Filtered pixel listings (token IDs 24-71):", listings);
        setAllListings(listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
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
        title="The Pixels - Appaloosa Dreams NFT Marketplace"
        description="Discover and purchase pixel art Appaloosa NFTs. Connect your wallet to explore available pixel horses and digital collectibles."
        url="https://appaloosadreams.com/thepixels"
      />
    <div className="container">
      <header>
        <div className="title-container">
          <h1 className="title-main">The Pixels</h1>
        </div>
        <ConnectWallet />
      </header>

      <nav className="main-nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/thestables" className="nav-link">The Stables</a>
        <a href="/lore" className="nav-link">Explore the Lore</a>
        <a href="/roadmap" className="nav-link">Roadmap</a>
        <a href="/therunes" className="nav-link">The Runes</a>
        <a href="/thepixels" className="nav-link primary">The Pixels</a>
      </nav>

      <div className="hero-tagline">
        <p>decentral = decent</p>
      </div>

      <main>
        {!address ? (
          <div className="connect-prompt">
            <h2>Connect your wallet to view and purchase pixel NFTs</h2>
            {isAutoConnecting && (
              <LoadingSpinner size="small" text="Reconnecting to your wallet..." />
            )}
          </div>
        ) : (
          <div>
            
            {loadingListings ? (
              <div>
                <GridSkeleton count={6} />
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '20px', 
                  color: '#daa520',
                  fontSize: '1.1em'
                }}>
                  Loading pixel art collection...
                </div>
              </div>
            ) : (
              <div className="nft-grid">
                {allListings.length > 0 ? (
                  allListings.map((listing, index) => (
                    <PixelNFTCard key={index} listing={listing} marketplace={marketplace} />
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3 style={{ color: '#daa520', marginBottom: '20px' }}>No Active Pixel Listings</h3>
                    <p style={{ color: '#fff', fontSize: '1.1em' }}>
                      The pixel art companions are currently being crafted in the digital realm. 
                      Check back soon for new creations!
                    </p>
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

function PixelNFTCard({ listing, marketplace }) {
  const address = useAddress();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  
  const priceInEth = listing.pricePerToken ? 
    ethers.utils.formatEther(listing.pricePerToken) : "Loading...";
  
  const tokenId = listing.tokenId ? listing.tokenId.toString() : "Unknown";
  const listingId = listing.listingId ? listing.listingId.toString() : "Unknown";

  // Load actual NFT data from collection
  const { data: nft, isLoading: nftLoading, error: nftError } = useNFT(nftCollection, tokenId);

  // Debug function to check listing validity
  const debugListing = async () => {
    try {
      console.log("=== LISTING DEBUG INFO ===");
      console.log("Listing ID:", listingId);
      console.log("Token ID:", tokenId);
      console.log("Price (ETH):", priceInEth);
      console.log("Buyer address:", address);
      
      // Check if listing still exists and is valid
      const listingInfo = await marketplace.call("getListing", [listingId]);
      console.log("Current listing status:", listingInfo);
      
      // Check buyer's ETH balance using Web3
      try {
        const provider = marketplace.getProvider?.() || marketplace.provider;
        if (provider) {
          const balance = await provider.getBalance(address);
          const balanceInEth = ethers.utils.formatEther(balance);
          console.log("Buyer balance:", balanceInEth, "ETH");
          
          // Check if buyer has enough ETH
          const requiredETH = parseFloat(priceInEth) + 0.01; // price + estimated gas
          console.log("Required ETH (including gas):", requiredETH);
          console.log("Has enough balance?", parseFloat(balanceInEth) >= requiredETH);
        } else {
          console.log("Cannot check balance - provider not available");
        }
      } catch (balanceError) {
        console.log("Could not check balance:", balanceError.message);
      }
      
      // Check marketplace contract state
      const totalListings = await marketplace.call("totalListings");
      console.log("Total listings in marketplace:", totalListings.toString());
      
      // Check the specific listing details
      console.log("=== DETAILED LISTING INFO ===");
      console.log("Listing object:", listing);
      console.log("Listing status:", listingInfo.status);
      console.log("Listing seller:", listingInfo.listingCreator);
      console.log("Asset contract:", listingInfo.assetContract);
      console.log("Token ID in listing:", listingInfo.tokenId?.toString());
      
    } catch (error) {
      console.error("Debug error:", error);
    }
  };

  return (
    <div className="nft-card pixel-card">
      <div style={{
        width: '300px', 
        height: '300px', 
        borderRadius: '10px', 
        marginBottom: '15px', 
        overflow: 'hidden'
      }}>
        {nft?.metadata?.image ? (
          <MediaRenderer
            src={nft.metadata.image}
            alt={nft.metadata.name || `Pixel Appaloosa #${tokenId}`}
            width="300px"
            height="300px"
            style={{objectFit: 'cover', borderRadius: '10px', imageRendering: 'pixelated'}}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #8B4513, #CD853F)',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            flexDirection: 'column'
          }}>
            <div>Pixel #{tokenId}</div>
            <div style={{fontSize: '14px', marginTop: '10px'}}>
              {nftLoading ? 'Loading pixel data...' : 'Digital Companion'}
            </div>
            {nftError && (
              <div style={{fontSize: '12px', marginTop: '5px', color: '#ffcccc'}}>
                Error loading metadata
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="nft-info">
        <h3>{nft?.metadata?.name || `Pixel Appaloosa #${tokenId}`}</h3>
        <p className="description">
          {nft?.metadata?.description || 'A digital companion piece featuring pixel art interpretation of the mystical horses.'}
        </p>
        
        {/* DEBUG SECTION - Add this temporarily */}
        <div style={{ background: '#333', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
          <button 
            onClick={debugListing}
            style={{ 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              padding: '5px 10px', 
              borderRadius: '3px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            🔍 Debug This Listing
          </button>
          <div style={{ fontSize: '12px', color: '#ccc' }}>
            <div>Listing ID: {listingId}</div>
            <div>Token ID: {tokenId}</div>
            <div>Price: {priceInEth} ETH</div>
          </div>
        </div>
        
        <div className="price-section">
          <Web3Button
            contractAddress={MARKETPLACE_ADDRESS}
            action={async (contract) => {
              try {
                console.log("🔥 ATTEMPTING PURCHASE...");
                console.log("Listing ID:", listingId);
                console.log("Token ID:", tokenId);
                console.log("Buyer:", address);
                console.log("Price:", listing.pricePerToken?.toString());
                
                // Verify the listing exists first
                const listingData = await contract.call("getListing", [listingId]);
                console.log("Listing verification:", listingData);
                
                // Make sure we're using the correct listing ID (convert to number)
                const numericListingId = parseInt(listingId);
                
                const tx = await contract.call("buyFromListing", [
                  numericListingId,  // Use numeric listing ID
                  address,
                  1,
                  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                  listing.pricePerToken
                ]);
                
                console.log("✅ Purchase transaction successful:", tx);
                return tx;
              } catch (error) {
                console.error("❌ Purchase failed:", error);
                console.error("Error details:", {
                  listingId,
                  tokenId,
                  address,
                  price: listing.pricePerToken?.toString()
                });
                throw error;
              }
            }}
            onSuccess={(result) => {
              console.log("🎉 Purchase confirmed:", result);
              alert(`Successfully purchased ${nft?.metadata?.name || `Pixel #${tokenId}`}!`);
              window.location.reload();
            }}
            onError={(error) => {
              console.error("💥 Purchase error:", error);
              alert(`Purchase failed: ${error.message || "Unknown error"}. Check console for details.`);
            }}
          >
            Buy Now - {priceInEth} ETH
          </Web3Button>
        </div>
      </div>
    </div>
  );
}