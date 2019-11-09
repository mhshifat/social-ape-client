import React from "react";
import ScreamCard from "../components/Cards/ScreamCard";

export const renderScreams = screams => {
  return screams.map(scream => (
    <ScreamCard key={scream.screamId} {...scream} />
  ));
};
