// src/components/profile/ProfileCard.tsx
import React from "react";
import { FaCopy } from "react-icons/fa";

interface ProfileCardProps {
  referralCode: string;
  onCopy: () => void;
  currentLevel: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  referralCode,
  onCopy,
  currentLevel,
}) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Your Referral Code</h2>

      <div style={{ marginTop: "1rem" }}>
        <span style={styles.refBox}>{referralCode}</span>
        <button style={styles.copyBtn} onClick={onCopy}>
          <FaCopy /> Copy
        </button>
      </div>

      <p style={{ marginTop: "1rem" }}>
        Current Level: <strong>{currentLevel}</strong>
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#1f2129",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    padding: "1.5rem",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginTop: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "1rem",
  },
  refBox: {
    backgroundColor: "#282c39",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    fontWeight: 600,
    fontSize: "1rem",
    marginRight: "0.5rem",
  },
  copyBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    background: "#ff7ac6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.8rem",
    cursor: "pointer",
    fontWeight: 600,
    transition: "transform 0.2s ease",
  },
};

export default ProfileCard;
