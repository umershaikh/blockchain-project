// src/pages/ReservePage.tsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Sample chart data
const sampleData = [
  { date: "Jan", usdt: 5000 },
  { date: "Feb", usdt: 7000 },
  { date: "Mar", usdt: 5200 },
  { date: "Apr", usdt: 9000 },
  { date: "May", usdt: 6000 },
  { date: "Jun", usdt: 12000 },
  { date: "Jul", usdt: 15000 },
  { date: "Aug", usdt: 19000 },
];

const ReservePage: React.FC = () => {
  return (
    <main
      style={{
        backgroundColor: "#0b0f18",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        {/* Page Title */}
        <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Reserve Overview
        </h2>

        {/* Main Row: Chart + Stats */}
        <div className="row g-4">
          {/* Left Column: Chart */}
          <div className="col-md-8">
            <div
              className="card border-0"
              style={{
                backgroundColor: "#222",
                borderRadius: "12px",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                padding: "1rem",
              }}
            >
              <h4 style={{ fontWeight: 600 }}>USDT Balance / Income</h4>
              <div style={{ width: "100%", height: "300px", marginTop: "1rem" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
                    <Line type="monotone" dataKey="usdt" stroke="#00c087" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column: Stat Cards */}
          <div className="col-md-4">
            {/* Today Earning */}
            <div
              className="card border-0 mb-3"
              style={{
                backgroundColor: "#222",
                borderRadius: "12px",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                padding: "1rem",
              }}
            >
              <h5 style={{ fontWeight: 600 }}>Today Earning</h5>
              <p style={{ fontSize: "1.1rem", margin: 0 }}>50 - 150</p>
            </div>

            {/* Cumulative Income */}
            <div
              className="card border-0 mb-3"
              style={{
                backgroundColor: "#222",
                borderRadius: "12px",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                padding: "1rem",
              }}
            >
              <h5 style={{ fontWeight: 600 }}>Cumulative Income</h5>
              <p style={{ fontSize: "1.1rem", margin: 0 }}>$ 8,200</p>
            </div>

            {/* Team Data */}
            <div
              className="card border-0 mb-3"
              style={{
                backgroundColor: "#222",
                borderRadius: "12px",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                padding: "1rem",
              }}
            >
              <h5 style={{ fontWeight: 600 }}>Team Data</h5>
              <p style={{ fontSize: "1.1rem", margin: 0 }}>150 members</p>
            </div>

            {/* Wallet Balance */}
            <div
              className="card border-0"
              style={{
                backgroundColor: "#222",
                borderRadius: "12px",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                padding: "1rem",
              }}
            >
              <h5 style={{ fontWeight: 600 }}>Wallet Balance</h5>
              <p style={{ fontSize: "1.1rem", margin: 0 }}>$ 1,230</p>
            </div>
          </div>
        </div>

        {/* Another Row: "Today's Collection" or "Data Available" */}
        <div className="row g-4 mt-4">
          <div className="col">
            <div
              className="card border-0"
              style={{
                backgroundColor: "#222",
                borderRadius: "12px",
                boxShadow: "0 0 0.7rem rgba(0, 0, 0, 0.4)",
                padding: "1rem",
              }}
            >
              <h5 style={{ fontWeight: 600 }}>Today’s Collection</h5>
              <p style={{ margin: 0 }}>
                No data available <br />
                (CNT#2323 - 2025-02-18 08:31)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReservePage;
