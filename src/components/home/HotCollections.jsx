import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { use } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import "../css/HotCollections.css"; 

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 15 },
    created(slider) {
      console.log("keen slider created", slider);
    },
  });


async function getCollections() {
  const { data } = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);

      setCollections(data.slice(0, 6));
  }

  useEffect(() => {
    getCollections();
  }, []);


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="relative w-full flex items-center">
            {/* Carousel */}
            <div ref={sliderRef} className="keen-slider">
            {collections.map((collection) => (
              <div key={collection.id} className="keen-slider__slide">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
              </div>
            
          ))}
          </div>

          {/* Left Arrow */}
          <button 
      
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-20 disabled:opacity-50">
          ◀
        </button>

        {/* Right Arrow */}
        <button 
        onClick={() => instanceRef.current?.next()}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full z-20 disabled:opacity-50">
          ▶
        </button>
          </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
