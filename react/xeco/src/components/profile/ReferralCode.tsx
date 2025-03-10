import React from "react";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";

interface ReferralCodeProps {
  referralCode: string;
}

const ReferralCode: React.FC<ReferralCodeProps> = ({ referralCode }) => {
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied!");
  };

  return (
    <div className="text-center">
      <p className="mb-1" style={{ fontSize: "14px", color: "#b0bec5", fontFamily: "'Roboto', sans-serif" }}>
        <strong>Your Referral Code:</strong>
      </p>
      <div className="d-inline-flex align-items-center">
        <span
          className="badge"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid #ffffff",
            color: "#ffffff",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {referralCode}
        </span>
        <button
          className="btn btn-sm ms-2"
          style={{
            background: "linear-gradient(to right, #2196F3, #64B5F6)",
            color: "#ffffff",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
          onClick={handleCopyReferral}
        >
          <FaCopy className="me-1" /> Copy
        </button>
      </div>
    </div>
  );
};

export default ReferralCode;