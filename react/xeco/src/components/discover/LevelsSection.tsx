// src/components/UniverseStakesSection.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaMoneyBillWave, FaPercent, FaToolbox } from "react-icons/fa";

/** Data Model */
interface StakeInfo {
  rangeParam: string;    // e.g. "2-4" or "2~4"
  title: string;         // "Universe Stake 1"
  levelRange: string;    // "LV2~LV4" (display text)
  status: string;        // "Open" or "Closed"
  priceRange: string;    // "$250 - $1150"
  weeklyIncome: string;  // "5.8% ~ 6.1%"
  handlingFee: string;   // "1%"
  img: string;           // path to the stake banner image
}

/** Example data */
const STAKE_DATA: StakeInfo[] = [
  {
    rangeParam: "1",
    title: "Universe Stake 1",
    levelRange: "LV2~LV4",
    status: "Open",
    priceRange: "$250 - $1150",
    weeklyIncome: "5.8% ~ 6.1%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake1.png",
  },
  {
    rangeParam: "2",
    title: "Universe Stake 2",
    levelRange: "LV3~LV4",
    status: "Open",
    priceRange: "$500 - $1800",
    weeklyIncome: "6.2% ~ 6.6%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake2.png",
  },
  {
    rangeParam: "3",
    title: "Universe Stake 3",
    levelRange: "LV4~LV5",
    status: "Open",
    priceRange: "$800 - $2100",
    weeklyIncome: "6.8% ~ 7.2%",
    handlingFee: "1%",
    img: "/assets/img/stakes/stake3.png",
  },
  {
    rangeParam: "4",
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

/** The main component that renders all stake cards */
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
        {STAKE_DATA.map((stake, idx) => (
          <div key={idx} className="col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center">
            <FancyStakeCard stake={stake} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default UniverseStakesSection;

/**
 * A sub-component that combines:
 *  - Banner Image on top (with hover zoom),
 *  - A "levelRange" badge in top-right,
 *  - Gradient background,
 *  - Icons for each detail line (priceRange, weeklyIncome, handlingFee),
 *  - A status pill, and
 *  - A CTA link at bottom.
 */
interface FancyStakeCardProps {
  stake: StakeInfo;
}

const FancyStakeCard: React.FC<FancyStakeCardProps> = ({ stake }) => {
  const isOpen = stake.status.toLowerCase() === "open";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "340px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #2b2f3a 0%, #3a3e4a 100%)",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
        color: "#fff",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.transform = "translateY(-3px)";
        card.style.boxShadow = "0 12px 28px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";
      }}
    >
      {/* Top Banner Image with level range */}
      <div style={{ position: "relative", height: "170px", overflow: "hidden" }}>
        <img
          src={stake.img}
          alt={stake.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.0)";
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "#000000cc",
            padding: "4px 10px",
            borderRadius: "16px",
            fontSize: "0.75rem",
          }}
        >
          {stake.levelRange}
        </span>
      </div>

      {/* Card Body / Info */}
      <div style={{ padding: "1.2rem" }}>
        {/* Title & Status */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>{stake.title}</h4>
          <span
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: isOpen ? "#00c087" : "#777",
              color: "#fff",
              borderRadius: "1rem",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {isOpen && <FaCheckCircle style={{ marginRight: "0.3rem" }} />}
            {stake.status}
          </span>
        </div>

        {/* Detailed Info (icon-based lines) */}
        <div style={{ display: "grid", rowGap: "0.5rem", marginBottom: "1rem" }}>
          <DetailLine
            icon={<FaMoneyBillWave style={{ color: "#bbb" }} />}
            label="Price Range"
            value={stake.priceRange}
          />
          <DetailLine
            icon={<FaPercent style={{ color: "#bbb" }} />}
            label="Weekly Income"
            value={stake.weeklyIncome}
          />
          <DetailLine
            icon={<FaToolbox style={{ color: "#bbb" }} />}
            label="Handling Fee"
            value={stake.handlingFee}
          />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link
            className="btn"
            to={`/stake/${stake.rangeParam}`}
            style={{
              display: "inline-block",
              width: "100%",
              color: "#000",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "0.6rem 1rem",
              textDecoration: "none",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.0)";
            }}
          >
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

/** A small helper for detail lines (icon + label + value) */
interface DetailLineProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailLine: React.FC<DetailLineProps> = ({ icon, label, value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "0.6rem", fontSize: "1rem" }}>{icon}</span>
      <span style={{ color: "#bbb", marginRight: "0.3rem", fontSize: "0.9rem" }}>
        {label}:
      </span>
      <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{value}</span>
    </div>
  );
};
