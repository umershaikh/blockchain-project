// src/components/profile/LevelChecklist.tsx
import React from "react";
import { FaArrowUp } from "react-icons/fa";

interface Requirement {
  label: string;
  current: number;
  needed: number;
}

interface LevelChecklistProps {
  nextLevel: number;
  requirements: Requirement[]; // e.g. points, direct referrals, etc.
  onLevelUp: () => void;
  upgrading: boolean;
}

const LevelChecklist: React.FC<LevelChecklistProps> = ({
  nextLevel,
  requirements,
  onLevelUp,
  upgrading,
}) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Requirements for Level {nextLevel}</h2>
      {requirements.map((req, idx) => {
        const isMet = req.current >= req.needed;
        return (
          <div key={idx} style={styles.reqRow}>
            <span style={{ color: isMet ? "#00c087" : "#ff7ac6" }}>
              {req.label}:
            </span>
            <span style={{ marginLeft: "0.5rem" }}>
              {req.current}/{req.needed}
            </span>
          </div>
        );
      })}

      <button
        style={styles.upBtn}
        onClick={onLevelUp}
        disabled={upgrading}
      >
        <FaArrowUp />
        {upgrading ? "Upgrading..." : "Level Up"}
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    maxWidth: "400px",
    margin: "2rem auto 0",
    backgroundColor: "#1f2129",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    padding: "1.5rem",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginTop: 0,
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "1rem",
  },
  reqRow: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "0.4rem",
  },
  upBtn: {
    marginTop: "1rem",
    backgroundColor: "#00c087",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
  },
};

export default LevelChecklist;
