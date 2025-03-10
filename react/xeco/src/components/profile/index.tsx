import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReferralProgress from "./ReferralProgress";
import ReferralCode from "./ReferralCode";
import Deposit from "./Deposit";

interface MLMUserProfile {
  id: number;
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
  const location = useLocation();
  const [profile, setProfile] = useState<MLMUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const BASE_URL = "https://everydaynft.com";

  useEffect(() => {
    fetchProfile();
    fetchBalance();
    // Check for success parameter in URL
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('deposit_success') === 'true') {
      toast.success("Deposit was successful!", {
        position: "top-right",
        autoClose: 5000,
      });
      // Remove the parameter from the URL
      navigate('/profile', { replace: true });
    }
  }, [location.search, navigate]);

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

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token || !profile) return;
      const res = await fetch(`${BASE_URL}/api/user-balance/?user_id=${profile.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error! status: ${res.status}`);
      const data = await res.json();
      setBalance(data.balance);
    } catch (err: any) {
      console.error("Error fetching balance:", err.message);
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

  const handleWithdraw = () => {
    alert("Withdraw functionality coming soon!");
  };

  const handleOrderHistory = () => {
    alert("Order History functionality coming soon!");
  };

  const openDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  if (loading) return <div className="text-white text-center mt-5">Loading Dashboard...</div>;
  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;
  if (!profile) return <div className="text-white text-center mt-5">No profile data found.</div>;

  const displayName = profile.first_name || profile.username;
  const nextLevel = profile.level + 1;

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ background: "#1e1e1e" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* Profile Card */}
          <div className="col-md-8 col-lg-6 mb-4">
            <div className="card text-white shadow-lg" style={{ background: "#2a2a2a", borderRadius: "12px" }}>
              <div className="card-body p-5">
                <h2 className="card-title text-center mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>
                  Welcome, {displayName}! (Level {profile.level})
                </h2>
                <ReferralProgress
                  activeAReferrals={profile.active_a_referrals}
                  activeBCReferrals={profile.active_bc_referrals}
                  neededA={profile.needed_a}
                  neededBC={profile.needed_bc}
                  nextLevel={nextLevel}
                  handleLevelUp={handleLevelUp}
                  upgrading={upgrading}
                />
                <ReferralCode referralCode={profile.referral_code} />
              </div>
            </div>
          </div>

          {/* Payment Actions Card */}
          <div className="col-md-8 col-lg-6">
            <div className="card text-white shadow-lg" style={{ background: "#2a2a2a", borderRadius: "12px" }}>
              <div className="card-body p-5">
                <h3 className="card-title text-center mb-5" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>
                  Manage Your Funds
                </h3>
                {/* Balance Display (OKX Style) */}
                <div className="text-center mb-4" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
                  Balance: ${balance !== null ? balance.toFixed(2) : '0.00'}
                </div>
                <div className="d-flex justify-content-center gap-4">
                  {/* Deposit Button */}
                  <div className="text-center">
                    <button
                      onClick={openDepositModal}
                      className="btn-outline-secondary rounded-circle p-3"
                      style={{ width: "60px", height: "60px", borderWidth: "2px" }}
                    >
                      <i className="fas fa-plus fa-lg" style={{ fontSize: "1.5rem" }}></i>
                    </button>
                    <div className="mt-2" style={{ fontSize: "0.9rem", fontWeight: "500", color: "#fff" }}>
                      Deposit
                    </div>
                  </div>

                  {/* Withdraw Button */}
                  <div className="text-center">
                    <button
                      onClick={handleWithdraw}
                      className="btn-outline-secondary rounded-circle p-3"
                      style={{ width: "60px", height: "60px", borderWidth: "2px" }}
                    >
                      <i className="fas fa-minus fa-lg" style={{ fontSize: "1.5rem" }}></i>
                    </button>
                    <div className="mt-2" style={{ fontSize: "0.9rem", fontWeight: "500", color: "#fff" }}>
                      Withdraw
                    </div>
                  </div>

                  {/* Order History Button */}
                  <div className="text-center">
                    <button
                      onClick={handleOrderHistory}
                      className="btn-outline-secondary rounded-circle p-3"
                      style={{ width: "60px", height: "60px", borderWidth: "2px" }}
                    >
                      <i className="fas fa-history fa-lg" style={{ fontSize: "1.5rem" }}></i>
                    </button>
                    <div className="mt-2" style={{ fontSize: "0.9rem", fontWeight: "500", color: "#fff" }}>
                      Order History
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Render Deposit Modal Outside the Button Structure */}
            <Deposit
              isModalOpen={isDepositModalOpen}
              closeModal={closeDepositModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;