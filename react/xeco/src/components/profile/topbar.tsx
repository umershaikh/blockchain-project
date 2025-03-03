// src/components/layout/TopBar.tsx
import React from "react";

interface TopBarProps {
  displayName: string; 
}

const TopBar: React.FC<TopBarProps> = ({ displayName }) => {
  return (
    <header style={styles.topBar}>
      <h3 style={{ margin: 0, fontWeight: 400 }}>
        Welcome, {displayName}!
      </h3>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  topBar: {
    height: "60px",
    backgroundColor: "#14141f",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    color: "#fff",
  },
  logoutBtn: {
    backgroundColor: "#d96eff",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
};

export default TopBar;
