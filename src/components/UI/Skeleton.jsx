import React from "react";

const SkeletonCard = () => {
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item skeleton-card">
        <div className="skeleton skeleton-avatar" />
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text short" />
      </div>
    </div>
  );
};

export default SkeletonCard;
