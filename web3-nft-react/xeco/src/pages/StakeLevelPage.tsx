// src/pages/StakeRangePage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NFT } from "../types/NFT";
import { getImageUrl } from "../getImageUrl";
import usdtLogo from "/assets/img/crypto-logo/tether-usdt-logo.png";
import Wrapper from "../layout/Wrapper";

const StakeRangePage: React.FC = () => {
  // rangeParam might be "2-4" or "5" or "2~4"
  const { rangeParam } = useParams<{ rangeParam: string }>();
  const navigate = useNavigate();
  
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const parseRange = (param: string | undefined): number[] => {
    if (!param) return [];

    if (param.includes("-")) {
      // e.g. "2-4"
      const [startStr, endStr] = param.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end)) return [];
      const result: number[] = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;

    } else if (param.includes("~")) {
      // e.g. "2~4"
      const [startStr, endStr] = param.split("~");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (isNaN(start) || isNaN(end)) return [];
      const result: number[] = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;

    } else {
      // single level
      const num = parseInt(param, 10);
      if (isNaN(num)) return [];
      return [num];
    }
  };

  const validLevels = parseRange(rangeParam);
  // e.g. [2,3,4] => "2, 3, 4"
  const levelsDisplay = validLevels.join(", ");

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
        // Filter: only show NFTs whose level is in [2,3,4], etc.
        const filtered = data.filter((nft) => validLevels.includes(nft.level));
        setNfts(filtered);
      } catch (err: any) {
        setError(err.message || "Error fetching NFTs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNFTs();
  }, [rangeParam]);
  return (
    <Wrapper>
      <section className="container my-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 style={{ fontWeight: 700, fontSize: "2rem", color: "#fff" }}>
            NFTs for Level(s): {levelsDisplay}
          </h2>
          <button onClick={() => navigate(-1)} className="btn">Back</button>
        </div>

        {isLoading && <div className="text-white">Loading NFTs...</div>}
        {error && <div className="text-danger">Error: {error}</div>}
        {!isLoading && !error && (
          <>
            {nfts.length === 0 ? (
              <p className="text-white">No NFTs found for these levels.</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                {nfts.map((nft) => (
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
                          src={getImageUrl(nft.image)}
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
                        <h5
                          className="card-title text-white"
                          style={{ fontWeight: 800, fontSize: "16px" }}
                        >
                          {nft.name}
                        </h5>
                        <p className="card-text mb-2" style={{ color: "#00c087", fontSize: "13px" }}>
                          <img
                            src={usdtLogo}
                            alt="USDT"
                            style={{ width: "16px", marginRight: "2px" }}
                          />
                          <strong>${nft.price_usdt}</strong>
                        </p>
                        <button
                          className="btn-primary btn-sm mt-auto"
                          style={{ width: "100%", borderRadius: "12px" }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </Wrapper>
  );
};

export default StakeRangePage;
