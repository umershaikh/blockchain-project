import React from "react";
import { FaArrowUp } from "react-icons/fa";

interface ReferralProgressProps {
  activeAReferrals: number;
  activeBCReferrals: number;
  neededA: number;
  neededBC: number;
  nextLevel: number;
  handleLevelUp: () => Promise<void>;
  upgrading: boolean;
}

const ReferralProgress: React.FC<ReferralProgressProps> = ({
  activeAReferrals,
  activeBCReferrals,
  neededA,
  neededBC,
  nextLevel,
  handleLevelUp,
  upgrading,
}) => {
  const lvAPercentage = neededA > 0 ? Math.min((activeAReferrals / neededA) * 100, 100) : 100;
  const lvBCPercentage = neededBC > 0 ? Math.min((activeBCReferrals / neededBC) * 100, 100) : 100;
  const avgReferralPercentage = (lvAPercentage + lvBCPercentage) / 2;
  const canLevelUp = avgReferralPercentage >= 100;

  return (
    <>
      <h5 className="mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "500" }}>
        Progress to Level {nextLevel}
      </h5>

      <div className="mb-4">
        <label style={{ fontFamily: "'Roboto', sans-serif", color: "#b0bec5" }}>
          Referral Progress ({Math.round(avgReferralPercentage)}%)
        </label>
        <div className="progress" style={{ height: "20px", backgroundColor: "#4a4a4a", borderRadius: "5px" }}>
          <div
            className="progress-bar"
            style={{
              width: `${avgReferralPercentage}%`,
              background: "linear-gradient(to right, #2196F3, #64B5F6)",
              borderRadius: "5px",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>
        <small className="mt-2 d-block" style={{ color: "#b0bec5" }}>
          Lv.A: {activeAReferrals}/{neededA} | Lv.(B+C): {activeBCReferrals}/{neededBC}
        </small>
      </div>

      <div className="text-center mb-4">
        <button
          className="btn"
          onClick={handleLevelUp}
          disabled={!canLevelUp || upgrading}
          style={{
            background: canLevelUp ? "linear-gradient(to right, #2196F3, #64B5F6)" : "#4a4a4a",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "5px",
            transition: "background 0.3s ease-in-out",
          }}
        >
          <FaArrowUp className="me-2" />
          {upgrading ? "Upgrading..." : "Level Up"}
        </button>
        {!canLevelUp && !upgrading && (
          <p className="text-warning mt-2 small">
            Need {neededA - activeAReferrals} more Lv.A and {neededBC - activeBCReferrals} more Lv.(B+C) referrals
          </p>
        )}
      </div>
    </>
  );
};

export default ReferralProgress;