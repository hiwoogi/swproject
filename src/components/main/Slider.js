import * as React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import styled from "styled-components";

//@@css가 안됨;ㅜㅜㅜ

// const SliderContainer = styled.div`
// .slick-arrow {
//   display: flex;
//   z-index: 10;
//   width: 1vw;
//   height: 1vw;
// }

// .slick-prev {
//   left: -1.2vw;
//   cursor: pointer;
//   &::before {
//     content: '';
//   }
// }

// .slick-next {
//   right: -1.1vw;
//   cursor: pointer;
//   &::before {
//     content: '';
//   }
// }
// `;

export default function MySlider(props) {
  const settings = {
    dots: true, //개수 점 표시
    infinite: true, //계속 캐러셀
    speed: 500, //넘어가는 속도
    slidesToShow: 1, //화면에 보이는 컨텐츠 수
    arrows: true, //좌,우 버튼
    autoplay: true, //자동 캐러셀
    autoplaySpeed: 3000, //자동 캐러셀 속도
    pauseOnHover: true, //hover시 정지
  };
  return (
    <div>
      {/* <SliderContainer> */}
        <Slider {...settings}>
          <div>
            <section className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w"
                className="absolute z-[-1] h-full w-full object-cover object-center inset-0" />
              <div className="relative flex flex-col mt-24 px-5 justify-center items-center max-md:max-w-full max-md:mt-10">
                <div className="text-black text-base uppercase whitespace-nowrap bg-white w-[120px] max-w-full -ml-2.5 px-3 py-1 rounded-3xl self-start font-['NEXON']"> developer </div>
                <h1 className="text-black text-8xl font-light uppercase mt-3.5 self-start max-md:max-w-full max-md:text-4xl font-['NEXON']"> 트렌드 분석 서비스 </h1>
                <div className="self-center flex w-full max-w-[1549px] grow flex-col mt-5 pl-2.5 max-md:max-w-full">
                  <p className="text-black text-xl font-light uppercase self-stretch whitespace-nowrap max-md:max-w-full font-['NEXON']"> 궁금한 트렌드를 쉽게 찾아보세요 </p>
                  <div className="self-center flex w-full max-w-[1539px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                    <a href="#" className="text-black text-base leading-6 uppercase whitespace-nowrap bg-zinc-300 w-[180px] max-w-full mt-44 pl-12 pr-12 py-3.5 self-end max:mt-10 max-md:px-5 font-['NEXON']"> 자세히 보기 </a>
                    <div className="flex flex-col self-end max-md:max-w-full">
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6834a6d3-7128-4650-aa45-e4f63ffe36f1?apiKey=d9a6bade01504f228813cd0dfee9b81b&" className="aspect-[0.53] object-contain object-center w-[30px] stroke-[1px] stroke-white overflow-hidden max-w-full self-end" />
                      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c05547db-41fd-4d1a-8110-0a80fe148927?apiKey=d9a6bade01504f228813cd0dfee9b81b&" className="aspect-[6.75] object-contain object-center w-[108px] overflow-hidden max-w-full grow mt-56 self-start max-md:mt-10" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            <div className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1f69852f-4f37-4915-b0c1-36f28bd5e175?apiKey=d9a6bade01504f228813cd0dfee9b81b&" />
            </div>
          </div>

          <div>
            <div className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b146555b-2628-4d7d-89ab-e203ecc77288?apiKey=d9a6bade01504f228813cd0dfee9b81b&" />
            </div>
          </div>

        </Slider>
      {/* </SliderContainer> */}
    </div>
  );
}
