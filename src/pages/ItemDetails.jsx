import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchItem() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/item?id=${id}`);
        console.log("useParams id:", id);
        console.log("Fetched NFT details:", data);
        setItem(data);
      } catch (err) {
        console.error("Error fetching NFT item:", err);
      } finally {
        setIsLoading(false);
      }
    }
    window.scrollTo(0, 0);
    fetchItem();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container" style={{ marginTop: "3rem" }}>
        <div className="row">
          {/* Image Skeleton */}
          <div className="col-md-6 text-center">
            <div className="skeleton skeleton-image" />
          </div>

          {/* Info Skeleton */}
          <div className="col-md-6">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-avatar" />
            <div className="skeleton skeleton-price" />
            <div className="skeleton skeleton-button" />
          </div>
        </div>

        {/* Skeleton Styles */}
        <style>{`
          .skeleton {
            background: #e0e0e0;
            border-radius: 6px;
            position: relative;
            overflow: hidden;
            margin-bottom: 12px;
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
          .skeleton-image {
            width: 100%;
            height: 350px;
            border-radius: 10px;
          }
          .skeleton-title {
            width: 70%;
            height: 28px;
            margin-bottom: 16px;
          }
          .skeleton-line {
            width: 100%;
            height: 14px;
          }
          .skeleton-line.short {
            width: 60%;
          }
          .skeleton-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-top: 20px;
          }
          .skeleton-price {
            width: 120px;
            height: 20px;
            margin-top: 20px;
          }
          .skeleton-button {
            width: 150px;
            height: 40px;
            border-radius: 20px;
            margin-top: 20px;
          }
          @keyframes shimmer {
            0% { transform: translateX(0); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  if (!item) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Item not found.</p>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts d-flex gap-4 mb-3">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                       {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img className="lazy" src={item.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                          {item.authorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId || item.authorId}`}>
                            <img className="lazy" src={item.creatorImage || item.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId || item.authorId}`}> 
                          {item.creatorName || item.authorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
