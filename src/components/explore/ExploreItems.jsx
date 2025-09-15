import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Countdown from "../Countdown";

const ExploreItems = () => {

  const [exploreItems, setExploreItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  
    async function getExplore() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
      console.log("Fetch explore items:", data)
      setExploreItems(data);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getExplore();
        // Does this work?
      }, []);

    
    const handleLoadMore = () => {
      setVisibleCount((prev) => prev + 4);
    }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.slice(0, visibleCount).map((exploreItem) => (
        <div
          key={exploreItem.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${exploreItem.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={exploreItem.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            
            {exploreItem.expiryDate && (
            <div className="de_countdown">
              <Countdown expiryDate={exploreItem.expiryDate}  />
              </div>
               )}

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
              <Link to={`/item-details/${exploreItem.nftId}`}>
                <img src={exploreItem.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${exploreItem.nftId}`}>
                <h4>{exploreItem.title}</h4>
              </Link>
              <div className="nft__item_price">{exploreItem.price}</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{exploreItem.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {visibleCount < exploreItems.length && (
      <div className="col-md-12 text-center">
        <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
