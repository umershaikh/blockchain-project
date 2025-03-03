// src/components/BetterLookingSection.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NFT {
  id: number;
  name: string;
  image: string;
  price_usdt: number;
  highest_bid?: number;
  // Add more fields if needed
}

const BetterLookingSection: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://everydaynft.com/api/nfts/");
        if (!response.ok) {
          throw new Error(`Error fetching NFTs: ${response.status}`);
        }
        const data: NFT[] = await response.json();
        // We'll just keep the first 8 items
        setNfts(data.slice(0, 8));
      } catch (err: any) {
        setError(err.message || "Error loading NFTs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNFTs();
  }, []);

  if (isLoading) {
    return (
      <section style={{ padding: "2rem", color: "#fff", textAlign: "center" }}>
        Loading...
      </section>
    );
  }
  if (error) {
    return (
      <section style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        {error}
      </section>
    );
  }

  // If we don't have enough items, handle gracefully
  const featuredNft = nfts[0];                  // Big NFT (like the monkey)
  const middleList = nfts.slice(1, 4);          // 3 items for the middle
  const topCollections = nfts.slice(4, 8);      // Up to 4 items for right

  return (
    <section
      style={{
        backgroundColor: "#14141f", // site dark
        borderRadius: "12px",
        padding: "2rem",
        maxWidth: "1400px", // center if you want
        margin: "0 auto",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 1fr) minmax(300px, 1fr) minmax(320px, 1fr)",
          gap: "1.5rem",
        }}
      >
        {/* Left Column: BIG FEATURED NFT */}
        <div
          style={{
            backgroundColor: "#1f1f2e",
            borderRadius: "12px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {featuredNft ? (
            (() => {
              return (
                <>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "320px",
                      height: "320px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      marginBottom: "1rem",
                    }}
                  >
                    <img
                      src={featuredNft.image}
                      alt={featuredNft.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h2 style={{ fontWeight: 700, marginBottom: "0.5rem", textAlign: "center" }}>
                    {featuredNft.name}
                  </h2>
                  <p style={{ color: "#00c087", fontWeight: 600, textAlign: "center" }}>
                    Highest Bid: $
                    {(featuredNft.highest_bid || featuredNft.price_usdt).toLocaleString(
                      undefined,
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}
                  </p>
                </>
              );
            })()
          ) : (
            <p>No featured NFT</p>
          )}
        </div>

        {/* Middle Column: Some NFT listings (like "Lucky Monkey #3598 - club", etc.) */}
        <div
          style={{
            backgroundColor: "#1f1f2e",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          {middleList.length === 0 ? (
            <p>No middle NFTs found</p>
          ) : (
            <>
              {middleList.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    {/* NFT image */}
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginRight: "0.8rem",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    {/* NFT info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
                        {item.name}
                      </h4>
                      <p style={{ color: "#00c087", margin: "0.2rem 0 0" }}>
                        $
                        {item.price_usdt.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Right Column: TOP COLLECTIONS OVER LAST 24 HOURS */}
        <div
          style={{
            backgroundColor: "#1f1f2e",
            borderRadius: "12px",
            padding: "1.5rem",
            position: "relative",
          }}
        >
          {/* "More" gradient button at top-right */}
          <Link
            to="/discover"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "linear-gradient(90deg, #d96eff 0%, #ff7ac6 100%)",
              color: "#fff",
              fontWeight: 600,
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            More
          </Link>

          <h3 style={{ marginBottom: "1.5rem", fontWeight: 700, fontSize: "1.2rem" }}>
            Top Collections Over <br />
            Last 24 Hours
          </h3>

          {topCollections.length === 0 ? (
            <p>No top collections found</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {topCollections.map((item, index) => {
                // For demonstration, we pretend we have "growth" or "marketCap"
                // but if you don't, you can remove these
                const randomGrowth = (Math.random() * 500).toFixed(2); // e.g. "253.12"
                return (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "#999" }}>{index + 1}.</span>
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "6px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: "0.95rem" }}>
                          {item.name}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#aaa" }}>
                          ~ Market Cap Placeholder
                        </p>
                      </div>
                    </div>
                    {/* Right side: Price + growth */}
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          color: "#00c087",
                          margin: 0,
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        $
                        {item.price_usdt.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p style={{ color: "#00c087", margin: 0, fontSize: "0.8rem" }}>
                        {randomGrowth}% (1y)
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default BetterLookingSection;
