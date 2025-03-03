import { FC } from "react";
import { Link } from "react-router-dom";

const Banner: FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="banner-area banner-bg d-flex align-items-center"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/img/banner/banner_bg.jpg') center center / cover no-repeat",
        minHeight: "100vh",
        position: "relative",
        color: "#fff",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8 text-center">
            <div className="logo" style={{ width: "100%"}}>
                <Link to="/"><img src="/assets/img/logo/logo.png" style={{ width: "150px"}} alt="Logo" /></Link>
            </div>
            {/* Main Heading */}
            <h2
              className="title"
              style={{
                fontWeight: 700,
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                fontSize: "3rem",
                lineHeight: 1.2,
              }}
            >
              Explore, Discover & Earn Big 
              <br />
              <span style={{ display: "inline-block", marginTop: "0.1em", marginBottom: "0.5em" }}>
                on our Web3 NFT Marketplace
              </span>
            </h2>
            <div className="banner-cta-wrapper mt-4">
              <button
                className="btn btn-outline-light btn-lg me-3"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
                onClick={() => scrollToSection("explore")}
              >
                Explore Marketplace
              </button>
            </div>

            {/* Info Highlights (like the attached example) */}
            <div className="row mt-5 text-start justify-content-center">
              <div className="col-md-6 col-lg-5 mb-4">
                <h4 className="fw-bold mb-2">Multi-Reward</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                  Everyday NFT leverages a proprietary AI-powered algorithmic 
                  trading model, and provides a dual earnings mechanism with 
                  trading rewards as well as referral rewards.
                </p>
              </div>
              <div className="col-md-6 col-lg-5 mb-4">
                <h4 className="fw-bold mb-2">Earn Future Value</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                  Everyday NFT reduces the entry hurdles of the NFT market and 
                  expands the boundaries of NFT collecting and trading through 
                  its innovative AI trading process and rewarding financial model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-down indicator (optional) */}
      <div
        className="banner-scroll-down"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <a
          href="#explore"
          className="section-link"
          aria-label="Scroll to explore"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("explore");
          }}
        >
          <span className="scroll-dot"></span>
          <span className="scroll-dot"></span>
          <span className="scroll-dot"></span>
        </a>
      </div>

      {/* Decorative Shapes */}
      <div className="banner-shape-wrap">
        <img
          src="/assets/img/banner/banner_shape01.png"
          alt="Shape 1"
          className="leftToRight"
        />
        <img
          src="/assets/img/banner/banner_shape02.png"
          alt="Shape 2"
          className="alltuchtopdown"
        />
      </div>
    </section>
  );
};

export default Banner;
