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

export default function TheHerd() {
  const address = useAddress();
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS);
  const [allListings, setAllListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const { connectionStatus, isAutoConnecting } = useWalletPersistence();
  
  const { data: totalListings } = useContractRead(marketplace, "totalListings");

  useEffect(() => {
    async function fetchAllListings() {
      if (!marketplace || !totalListings) return;
      
      console.log("Fetching all", totalListings.toString(), "listings...");
      setLoadingListings(true);
      
      try {
        const listings = [];
        const totalCount = parseInt(totalListings.toString());
        
        for (let i = 0; i < totalCount; i++) {
          try {
            const listing = await marketplace.call("getListing", [i]);
            if (listing && listing.status === 1) {
              listings.push(listing);
              console.log(`Loaded listing ${i}:`, listing);
            }
          } catch (error) {
            console.log(`Listing ${i} failed to load:`, error);
          }
        }
        
        console.log("All listings loaded:", listings);
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
        title="The Stables - Appaloosa Dreams NFT Marketplace"
        description="Discover and purchase mystical Appaloosa horse NFTs. Connect your wallet to explore available horses with sacred runes and ancient wisdom."
        url="https://appaloosadreams.com/thestables"
      />
    <div className="container">
      <header>
        <div className="title-container">
          <h1 className="title-main">The Stables</h1>
        </div>
        <ConnectWallet />
      </header>

      <nav className="main-nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/thestables" className="nav-link primary">The Stables</a>
        <a href="/lore" className="nav-link">Explore the Lore</a>
        <a href="/roadmap" className="nav-link">Roadmap</a>
        <a href="/therunes" className="nav-link">The Runes</a>
      </nav>

      <div className="hero-tagline">
        <p>decentral = decent</p>
      </div>

      <main>
        {!address ? (
          <div className="connect-prompt">
            <h2>Connect your wallet to view and purchase NFTs</h2>
            {isAutoConnecting && (
              <LoadingSpinner size="small" text="Reconnecting to your wallet..." />
            )}
          </div>
        ) : (
          <div>
            <h2>Available NFTs ({allListings.length} showing of {totalListingsString} total)</h2>
            
            {loadingListings ? (
              <GridSkeleton count={6} />
            ) : (
              <div className="nft-grid">
                {allListings.length > 0 ? (
                  allListings.map((listing, index) => (
                    <NFTCard key={index} listing={listing} marketplace={marketplace} />
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3 style={{ color: '#daa520', marginBottom: '20px' }}>No Active Listings</h3>
                    <p style={{ color: '#fff', fontSize: '1.1em' }}>
                      The mystical horses are currently resting in the ethereal realm. 
                      Check back soon for new arrivals! 🐎
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

function NFTCard({ listing, marketplace }) {
  const address = useAddress();
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  
  const priceInEth = listing.pricePerToken ? 
    ethers.utils.formatEther(listing.pricePerToken) : "Loading...";
  
  const tokenId = listing.tokenId ? listing.tokenId.toString() : "Unknown";
  const listingId = listing.listingId ? listing.listingId.toString() : "Unknown";

  const { data: nft, isLoading: nftLoading, error: nftError } = useNFT(nftCollection, tokenId);

  return (
    <div className="nft-card">
      <div style={{
        width: '300px', 
        height: '300px', 
        borderRadius: '10px', 
        marginBottom: '15px', 
        overflow: 'hidden', 
        background: '#f0f0f0'
      }}>
        {nft?.metadata?.image ? (
          <MediaRenderer
            src={nft.metadata.image}
            alt={nft.metadata.name || `NFT #${tokenId}`}
            width="300px"
            height="300px"
            style={{objectFit: 'cover'}}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, #667eea, #764ba2)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            flexDirection: 'column'
          }}>
            <div>NFT #{tokenId}</div>
            <div style={{fontSize: '12px', marginTop: '10px'}}>
              {nftLoading ? 'Loading...' : 'Image not available'}
            </div>
          </div>
        )}
      </div>
      
      <div className="nft-info">
        <h3>{nft?.metadata?.name || `NFT #${tokenId}`}</h3>
        <p className="description">
          {nft?.metadata?.description || "Loading description..."}
        </p>
        
        <div className="price-section">
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
              alert(`Successfully purchased ${nft?.metadata?.name || `NFT #${tokenId}`}! 🎉`);
              window.location.reload();
            }}
            onError={(error) => {
              console.error("Purchase failed:", error);
              alert("Purchase failed. Please try again.");
            }}
          >
            Buy Now - {priceInEth} ETH
          </Web3Button>
        </div>
      </div>
    </div>
  );
}