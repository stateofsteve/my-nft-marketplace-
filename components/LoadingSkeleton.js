export function NFTCardSkeleton() {
  return (
    <div className="nft-card skeleton-card">
      <div className="skeleton-image"></div>
      <div className="nft-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = "medium", text = "Loading..." }) {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner"></div>
      {text && <p>{text}</p>}
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="nft-grid">
      {Array.from({ length: count }).map((_, index) => (
        <NFTCardSkeleton key={index} />
      ))}
    </div>
  );
}