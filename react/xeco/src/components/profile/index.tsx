import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowUp, FaCopy } from "react-icons/fa";

interface MLMUserProfile {
  username: string;
  first_name: string;
  last_name: string;
  referral_code: string;
  level: number;
  active_a_referrals: number;
  active_bc_referrals: number;
  needed_a: number;
  needed_bc: number;
}

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MLMUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`${BASE_URL}/api/profile/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error! status: ${res.status}`);
      const data: MLMUserProfile = await res.json();
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelUp = async () => {
    setUpgrading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const res = await fetch(`${BASE_URL}/api/level-up/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to level up");
      toast.success(`Level Up Successful! You are now level ${data.new_level}`);
      fetchProfile();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUpgrading(false);
    }
  };

  const handleCopyReferral = () => {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      toast.success("Referral code copied!");
    }
  };

  if (loading) return <div className="text-white text-center mt-5">Loading Dashboard...</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;
  if (!profile) return <div className="text-white text-center mt-5">No profile data found.</div>;

  const displayName = profile.first_name || profile.username;
  const nextLevel = profile.level + 1;

  // Calculate referral percentages, handle division by zero
  const lvAPercentage = profile.needed_a > 0 ? Math.min((profile.active_a_referrals / profile.needed_a) * 100, 100) : 100;
  const lvBCPercentage = profile.needed_bc > 0 ? Math.min((profile.active_bc_referrals / profile.needed_bc) * 100, 100) : 100;
  const avgReferralPercentage = (lvAPercentage + lvBCPercentage) / 2;
  const canLevelUp = avgReferralPercentage >= 100;

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "#1e1e1e" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card text-white" style={{ background: "#2a2a2a", borderRadius: "12px" }}>
              <div className="card-body p-5">
                <h2 className="card-title text-center mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>
                  Welcome, {displayName}! (Level {profile.level})
                </h2>

                <h5 className="mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "500" }}>
                  Progress to Level {nextLevel}
                </h5>

                {/* Referral Progress Bar */}
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
                    Lv.A: {profile.active_a_referrals}/{profile.needed_a} | Lv.(B+C): {profile.active_bc_referrals}/{profile.needed_bc}
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
                      Need {profile.needed_a - profile.active_a_referrals} more Lv.A and {profile.needed_bc - profile.active_bc_referrals} more Lv.(B+C) referrals
                    </p>
                  )}
                </div>

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
                      {profile.referral_code}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;