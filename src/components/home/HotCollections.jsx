import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { use } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setCollections(data);
  }

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      {/* Left Arrow */}
      <button
        onClick={() => instanceRef.current?.prev()}
       className="arrow-button left-arrow"
      >
        ◀
      </button>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="relative">
            {/* Carousel */}
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection) => (
                <div key={collection.id} className="keen-slider__slide">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
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
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Arrow */}
      <button
        onClick={() => instanceRef.current?.next()}
        className="arrow-button right-arrow"
      >
        ▶
      </button>
    </section>
  );
};

export default HotCollections;
