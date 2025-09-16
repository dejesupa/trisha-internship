import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import SkeletonCard from "../UI/SkeletonCard";

const AuthorItems = ({ nftCollection = [], isLoading }) => {
  console.log("Rendering AuthorItems. Full collection:", nftCollection); 

  const skeletonCount = 8;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

        {isLoading &&
            Array(skeletonCount)
              .fill(0)
              .map((_, index) => (
                <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={`skeleton-${index}`}
              >
                <SkeletonCard />
              </div>
              ))}

          {!isLoading &&
            nftCollection  &&
            nftCollection.length > 0 &&
           nftCollection.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.nftId}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy" src={item.nftImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}
                  onClick={() =>
                          console.log(`Navigating to item-details/${item.nftId}`)
                        }>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && nftCollection.length === 0 && (
            <p style={{ textAlign: "center", marginTop: "2rem", width: "100%" }}>
              This author has no NFTs yet.
            </p>
          )}
        </div>
      </div>
       <style>{`
        .skeleton-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
          background: #f5f5f5;
          border-radius: 10px;
        }
        .skeleton {
          background: #e0e0e0;
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }
        .skeleton::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(
            90deg,
            rgba(224, 224, 224, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(224, 224, 224, 0) 100%
          );
          animation: shimmer 1.5s infinite;
        }
        .skeleton-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .skeleton-image {
          width: 100%;
          height: 180px;
          border-radius: 10px;
        }
        .skeleton-text {
          height: 12px;
          width: 80%;
        }
        .skeleton-text.short {
          width: 50%;
        }
        @keyframes shimmer {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AuthorItems;
