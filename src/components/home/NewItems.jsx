import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [perView, setPerView] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function getItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

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

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="carousel-wrapper">
            {/* {!isLoading && items.length > perView && ( */}
            <button
              onClick={() => instanceRef.current?.prev()}
              className="arrow-button left-arrow"
              aria-label="Previous"
            >
              ◀
            </button>
            {/* )} */}

            <div ref={sliderRef} className="keen-slider">
            {isLoading
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
              :
              items.map((item) => (
                <div key={item.id} className="keen-slider__slide">

                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.title}
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">{item.expiryDate}</div>

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

                    <Link to="/item-details">
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
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
            </div>

            <button
              onClick={() => instanceRef.current?.next()}
              className="arrow-button right-arrow"
              aria-label="Next"
            >
              ▶
            </button>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
