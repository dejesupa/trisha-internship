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

  const [perView, setPerView] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 12 }, //mobile default
    breakpoints: {
    "(min-width: 480px)": { slides: { perView: 2, spacing: 14 } },
    "(min-width: 640px)": { slides: { perView: 3, spacing: 16 } },
    "(min-width: 900px)": { slides: { perView: 4, spacing: 18 } }, // MAX
    "(min-width: 1280px)": { slides: { perView: 4, spacing: 20 } },
    },
    created(slider) {
      updatePerView(slider);
    },
    updated(slider) {
      updatePerView(slider);
    },
  });


  function updatePerView(slider) {
    let currentPerView = 1;
    if (typeof slider.options.slides.perView === "number") {
      currentPerView = slider.options.slides.perView;
    }
    // Clamp to max 4
    setPerView(Math.min(currentPerView, 4));
  }

  const skeletonCount = Math.min(perView, 4);
  
  function SkeletonCard() {
  return (
    <div className="keen-slider__slide">
      <div className="nft_coll skeleton-card">
        <div className="nft_wrap skeleton-img" />
        <div className="nft_coll_pp skeleton-avatar" />
        <div className="nft_coll_info">
          <div className="skeleton-text title"></div>
          <div className="skeleton-text subtitle"></div>
        </div>
      </div>
    </div>
  );
}

  async function getCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setCollections(data);
    setIsLoading(false);
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
          <div className="carousel-wrapper">
            
        {/* Left Arrow */}
          {!isLoading && collections.length > perView && (
            <button
              onClick={() => instanceRef.current?.prev()}
              className="arrow-button left-arrow"
              aria-label="Previous"
            >
              ◀
            </button>
             )}

            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">

              {isLoading
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                :
              
              
              collections.map((collection) => (
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
              {/* Right Arrow */}
              {!isLoading && collections.length > perView && (
              <button
                onClick={() => instanceRef.current?.next()}
                className="arrow-button right-arrow"
                aria-label="Next"
              >
                ▶
              </button>
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
