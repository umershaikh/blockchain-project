import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";  // or wherever your AuthContext is

const HoldSellSection: FC = () => {
  // 1) Suppose your AuthContext provides a boolean isAuthenticated or isLoggedIn
  const { isAuthenticated } = useAuth();

  // 2) Set button text and link based on login status
  const buttonText = isAuthenticated ? "Discover Now" : "SIGN UP NOW";
  const buttonLink = isAuthenticated ? "/discover" : "/register";

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #0b0f18 0%, #081221 100%)",
        padding: "5rem 0",
        color: "#fff",
        position: "relative",
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Left Side - Larger Image */}
          <div className="col-md-6 mb-5 mb-md-0 d-flex justify-content-center">
            <div
              style={{
                position: "relative",
                maxWidth: "800px", // control how wide the image can get
                width: "100%",
              }}
            >
              <img
                src="/assets/img/banner/holdsellbanner.png"
                alt="NFT Showcase"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "0.5rem",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLImageElement).style.boxShadow =
                    "0 16px 40px rgba(0, 0, 0, 0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1.0)";
                  (e.currentTarget as HTMLImageElement).style.boxShadow =
                    "0 12px 28px rgba(0, 0, 0, 0.5)";
                }}
              />
            </div>
          </div>

          {/* Right Side - Headline & CTA */}
          <div className="col-md-6 text-center text-md-start">
            <h2
              style={{
                fontSize: "2.7rem",
                fontWeight: 700,
                marginBottom: "1.2rem",
                lineHeight: 1.2,
              }}
            >
              HOLD AND SELL YOUR NFT EASILY
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                maxWidth: "540px",
                marginBottom: "2rem",
              }}
            >
              Making money on EverydayNFT is as easy as <strong>HOLD</strong>, then{" "}
              <strong>TRADE</strong> and <strong>EARN</strong>. Securely store your
              NFTs, list them with a few clicks, and watch your collection grow in
              value over time.
            </p>

            {/* Call to Action - dynamically set text & link */}
            <Link
              to={buttonLink}
              style={{
                display: "inline-block",
                padding: "0.9rem 1.8rem",
                fontWeight: 600,
                borderRadius: "2rem",
                background: "linear-gradient(90deg, #d96eff 0%, #ff7ac6 100%)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(255, 122, 198, 0.4)",
                textDecoration: "none",
                transition: "background 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.0)";
              }}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoldSellSection;
