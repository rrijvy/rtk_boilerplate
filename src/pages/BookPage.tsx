import React from "react";
import HTMLFlipBook from "react-pageflip";
import PageImage1 from "../assets/images/P1.png";
import PageImage2 from "../assets/images/P2.png";
import PageImage3 from "../assets/images/P3.png";
import PageImage4 from "../assets/images/P4.png";
import PageImage5 from "../assets/images/P5.png";
import PageImage6 from "../assets/images/P6.png";
import PageImage7 from "../assets/images/P7.png";
import PageImage8 from "../assets/images/P8.png";
import PageImage9 from "../assets/images/P9.png";
import PageImage10 from "../assets/images/P10.png";

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
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
