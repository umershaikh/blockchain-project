import React, { useEffect, useState } from "react";
import { NFT } from "../../types/NFT";
import { getImageUrl } from "../../getImageUrl";
import { Link } from "react-router-dom";
import usdtLogo from "/assets/img/crypto-logo/tether-usdt-logo.png";

const Marketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/nfts/");
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data: NFT[] = await response.json();
        setNfts(data);
      } catch (err: any) {
        setError(err.message || "Error fetching NFTs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const displayedNfts = nfts.slice(0, 8); // Show only the first 8 NFTs

  if (isLoading) {
    return <div className="marketplace-loading">Loading NFTs...</div>;
  }

  if (error) {
    return <div className="marketplace-error">Error: {error}</div>;
  }

  return (
    <section id="explore" className="marketplace-section container mb-5">
      <h2
        className="title text-center mt-5 mb-4"
        style={{
          fontWeight: 700,
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          fontSize: "3rem",
          lineHeight: 1.2,
        }}
      >
        NFT Marketplace
      </h2>
      <hr />

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {displayedNfts.map((nft) => {
          const imageUrl = getImageUrl(nft.image);
          return (
            <div className="col" key={nft.id}>
              <div
                className="nft-card card border-0 h-100"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 0 0.5rem 0.2rem rgba(154, 159, 185, 0.38)",
                  backgroundColor: "#222",
                }}
              >
                <div className="position-relative">
                  <img
                    src={imageUrl}
                    alt={nft.name}
                    className="card-img-top nft-card-img"
                    style={{
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.png";
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#333",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      opacity: 0.85,
                    }}
                  >
                    Level {nft.level}
                  </span>
                </div>

                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-white" style={{ fontWeight: 800, fontSize: "16px" }}>
                    {nft.name}
                  </h5>
                  <p className="card-text mb-2" style={{ color: "#00c087", fontSize: "13px" }}>
                    <img src={usdtLogo} alt="USDT" style={{ width: "16px", marginRight: "2px" }} />
                    <strong>${nft.price_usdt}</strong>
                  </p>
                  <button className="btn-primary btn-sm mt-auto" style={{ width: "100%", borderRadius: "12px" }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <Link to="/discover" className="btn px-4 py-2">
          View All
        </Link>
      </div>
    </section>
  );
};

export default Marketplace;
