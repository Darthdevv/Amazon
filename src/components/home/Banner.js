import Slider from "react-slick";
import { CgChevronLeft } from "react-icons/cg";
const data = [
  "https://m.media-amazon.com/images/I/71m5s4DCkfL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61fuygyR4lL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61J5yIX+A5L._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/61um60VOoeL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/612-T5YABuL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71DQMiLiGZL._SX3000_.jpg",
];

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1 left-1 w-20 lgl:h-[345px] mdl:h-[275px] sml:h-[255px] xs:h-[150px] xl:h-[235px] border-2 border-transparent hover:border-[#007185] z-10 cursor-pointer flex items-center justify-center duration-300 rounded-md active:border-[#007185]"
    >
      <CgChevronLeft className="text-6xl z-10" />
      <CgChevronLeft className="text-6xl absolute left-[12px] text-whiteText" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute top-1 right-1 w-20 lgl:h-[345px] mdl:h-[275px] sml:h-[255px] xs:h-[150px] xl:h-[235px] border-2 border-transparent hover:border-[#007185] z-10 cursor-pointer flex items-center justify-center duration-300 rounded-md active:border-[#007185]"
    >
      <CgChevronLeft className="text-6xl rotate-180 z-10" />
      <CgChevronLeft className="text-6xl rotate-180 absolute right-[12px] text-whiteText" />
    </div>
  );
}
const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="max-w-container mx-auto relative">
      <Slider {...settings}>
        <div>
          <img src={data[0]} priority={true} alt="bannerOne" />
        </div>
        <div>
          <img src={data[1]} alt="bannerTwo" />
        </div>
        <div>
          <img src={data[2]} alt="bannerThree" />
        </div>
        <div>
          <img src={data[3]} alt="bannerFour" />
        </div>
        <div>
          <img src={data[4]} alt="bannerFive" />
        </div>
        <div>
          <img src={data[5]} alt="bannerSix" />
        </div>
        <div>
          <img src={data[6]} alt="bannerSeven" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
