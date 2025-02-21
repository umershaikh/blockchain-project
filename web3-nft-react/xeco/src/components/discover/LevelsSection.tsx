// src/components/UniverseStakesSection.tsx
import React from "react";
import { Link } from "react-router-dom";

interface StakeInfo {
  rangeParam: string;     // e.g. "2-4" or "2~4"
  title: string;          // "Universe Stake 1"
  levelRange: string;     // "LV2~LV4" (display text)
  status: string;         // "Open" or "Closed"
  priceRange: string;     // "$250 - $1150"
  weeklyIncome: string;   // "5.8% ~ 6.1%"
  handlingFee: string;    // "1%"
  img: string;            // path to the stake banner image
}

// Example data, each item includes a `rangeParam` that the next page will parse
const STAKE_DATA: StakeInfo[] = [
  {
    rangeParam: "2-4",   // for route param => "/stake/2-4"
    title: "Universe Stake 1",
    levelRange: "LV2~LV4",
    status: "Open",
    priceRange: "$250 - $1150",
    weeklyIncome: "5.8% ~ 6.1%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake1.png",
  },
  {
    rangeParam: "3-4",
    title: "Universe Stake 2",
    levelRange: "LV3~LV4",
    status: "Open",
    priceRange: "$500 - $1800",
    weeklyIncome: "6.2% ~ 6.6%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake2.png",
  },
  {
    rangeParam: "4-5",
    title: "Universe Stake 3",
    levelRange: "LV4~LV5",
    status: "Open",
    priceRange: "$800 - $2100",
    weeklyIncome: "6.8% ~ 7.2%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake3.png",
  },
  {
    rangeParam: "4", // If you want just single level 4
    title: "Universe Stake 4",
    levelRange: "LV~4",
    status: "Open",
    priceRange: "$980 - $2500",
    weeklyIncome: "8% ~ 8.5%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake4.png",
  },
  {
    rangeParam: "5",
    title: "Universe Stake 5",
    levelRange: "LV~5",
    status: "Open",
    priceRange: "$1500 - $4500",
    weeklyIncome: "9.5% ~ 10%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake5.png",
  },
  {
    rangeParam: "6",
    title: "Universe Stake 6",
    levelRange: "LV~6",
    status: "Open",
    priceRange: "$1850 - $6500",
    weeklyIncome: "11% ~ 13.5%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake6.png",
  },
];

const UniverseStakesSection: React.FC = () => {
  return (
    <section className="container my-5">
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: 700,
          fontSize: "2.2rem",
          color: "#fff",
        }}
      >
        Universe Zone
      </h2>

      <div className="row g-4">
        {STAKE_DATA.map((stake, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-4">
            <div
              className="card border-0 h-100"
              style={{
                borderRadius: "12px",
                backgroundColor: "#2b2f3a",
                color: "#fff",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                overflow: "hidden",
              }}
            >
              {/* Banner Image */}
              <div style={{ position: "relative" }}>
                <img
                  src={stake.img}
                  alt={stake.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                {/* e.g. Level Range at top-right corner */}
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "#00000099",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                  }}
                >
                  {stake.levelRange}
                </span>
              </div>

              {/* Card Body */}
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  {stake.title}
                </h5>
                {/* Status row */}
                <p
                  style={{
                    marginBottom: "0.5rem",
                    color: stake.status === "Open" ? "#00c087" : "#ccc",
                  }}
                >
                  <strong>Status:</strong> {stake.status}
                </p>

                {/* Price Range */}
                <p style={{ marginBottom: "0.4rem" }}>
                  <strong>Price Range:</strong> {stake.priceRange}
                </p>
                {/* Weekly Income */}
                <p style={{ marginBottom: "0.4rem" }}>
                  <strong>Weekly Income:</strong> {stake.weeklyIncome}
                </p>
                {/* Handling Fee */}
                <p style={{ marginBottom: "0.4rem" }}>
                  <strong>Handling Fee:</strong> {stake.handlingFee}
                </p>

                <Link
                  // Instead of "/stake/:levelId", we do "/stake/:rangeParam"
                  to={`/stake/${stake.rangeParam}`}
                  className="btn btn-light mt-3 d-flex align-items-center justify-content-center"
                  style={{
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  Click here
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UniverseStakesSection;
