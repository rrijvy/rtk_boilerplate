import React from "react";
import HTMLFlipBook from "react-pageflip";
import PageImage1 from "../assets/images/omar_grandema/P1.png";
import PageImage2 from "../assets/images/omar_grandema/P2.png";
import PageImage3 from "../assets/images/omar_grandema/P3.png";
import PageImage4 from "../assets/images/omar_grandema/P4.png";
import PageImage5 from "../assets/images/omar_grandema/P5.png";
import PageImage6 from "../assets/images/omar_grandema/P6.png";
import PageImage7 from "../assets/images/omar_grandema/P7.png";
import PageImage8 from "../assets/images/omar_grandema/P8.png";
import PageImage9 from "../assets/images/omar_grandema/P9.png";
import PageImage10 from "../assets/images/omar_grandema/P10.png";
import PageImage11 from "../assets/images/omar_grandema/P11.png";
import PageImage12 from "../assets/images/omar_grandema/P12.png";
import PageImage13 from "../assets/images/omar_grandema/P13.png";
import PageImage14 from "../assets/images/omar_grandema/P14.png";
import PageImage15 from "../assets/images/omar_grandema/P15.png";

const Book: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-300 via-blue-200 to-blue-400 overflow-hidden">
      <HTMLFlipBook
        width={650}
        height={650}
        size="fixed"
        className="my-flipbook"
        style={{}}
        startPage={0}
        drawShadow={true}
        flippingTime={750}
        useMouseEvents={true}
        swipeDistance={200}
        minWidth={400}
        maxWidth={1000}
        minHeight={500}
        maxHeight={1200}
        maxShadowOpacity={0.7}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={false}
        showPageCorners={true}
        disableFlipByClick={true}
      >
        <div className="page">
          <img src={PageImage1} alt="Page 1" />
        </div>
        <div className="page">
          <img src={PageImage2} alt="Page 2" />
        </div>
        <div className="page">
          <img src={PageImage3} alt="Page 3" />
        </div>
        <div className="page">
          <img src={PageImage4} alt="Page 4" />
        </div>
        <div className="page">
          <img src={PageImage5} alt="Page 5" />
        </div>
        <div className="page">
          <img src={PageImage6} alt="Page 6" />
        </div>
        <div className="page">
          <img src={PageImage7} alt="Page 7" />
        </div>
        <div className="page">
          <img src={PageImage8} alt="Page 8" />
        </div>
        <div className="page">
          <img src={PageImage9} alt="Page 9" />
        </div>
        <div className="page">
          <img src={PageImage10} alt="Page 10" />
        </div>
        <div className="page">
          <img src={PageImage11} alt="Page 11" />
        </div>
        <div className="page">
          <img src={PageImage12} alt="Page 12" />
        </div>
        <div className="page">
          <img src={PageImage13} alt="Page 13" />
        </div>
        <div className="page">
          <img src={PageImage14} alt="Page 14" />
        </div>
        <div className="page">
          <img src={PageImage15} alt="Page 15" />
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
