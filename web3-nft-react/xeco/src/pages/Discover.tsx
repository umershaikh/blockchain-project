// src/pages/Discover.tsx
import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import SEO from "../components/SEO";
import LevelsSection from "../components/discover/LevelsSection"; // <--- import here

const Discover: React.FC = () => {

  return (
    <main>
      <SEO pageTitle="Discover NFTs" />
      <Breadcrumb title="Discover NFTs" />
      <LevelsSection />
    </main>
  );
};

export default Discover;
