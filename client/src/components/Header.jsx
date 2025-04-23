import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import bFind from "../assets/banner-find-products.png";
import bWelcome from "../assets/banner-welcome.png";
import bFreeShipping from "../assets/banner-free-shipping-costs.png";

const Header = () => {
  const images = [
    {
      original: bWelcome,
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: bFind,
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: bFreeShipping,
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <header
      className={`
            w-full mx-auto mt-28 
            md:w-2/3 md:mt-52
    `}
    >
      <ImageGallery
        items={images}
        autoPlay={true}
        showThumbnails={false}
        showPlayButton={false}
        showNav={false}
        showBullets={true}
        showFullscreenButton={false}
        slideInterval={4000}
        slideDuration={800}
      />
    </header>
  );
};

export default Header;
