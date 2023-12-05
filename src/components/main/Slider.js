import * as React from "react";
import { Link } from "react-router-dom"

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";

const SliderContainer = styled.div`
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;

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
      <SliderContainer>
        <Slider {...settings}>

          {/* 슬라이드 창 1 */}
          <div>
            <section className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1ba9aa69-bab9-48ac-af50-8dfae301870a?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w"
                className="absolute z-[-1] h-full w-full object-cover object-center inset-0" />
              <div className="relative flex flex-col mt-20 px-5 justify-center items-center max-md:max-w-full max-md:mt-10">
                <div className="text-black text-base uppercase whitespace-nowrap bg-white w-[160px] max-w-full -ml-2 px-3 py-1 rounded-3xl self-start font-['NEXON']">Trend analysis</div>
                <h1 className="text-black text-8xl font-light uppercase mt-3.5 self-start max-md:max-w-full max-md:text-4xl font-['NEXON']"> 트렌드 분석</h1>
                <div className="self-center flex w-full max-w-[1549px] grow flex-col mt-5 pl-2.5 max-md:max-w-full">
                  <p className="text-black text-xl font-light uppercase self-stretch whitespace-nowrap max-md:max-w-full font-['NEXON']"> 궁금한 트렌드 실시간 순위를 알아보세요 </p>
                  <div className="self-center flex w-full max-w-[1539px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                    <Link to="/trend"
                      className="text-black text-base leading-6 uppercase whitespace-nowrap bg-zinc-300 w-[180px] max-w-full mt-44 pl-12 pr-12 py-3.5 self-end max:mt-10 max-md:px-5 font-['NEXON']"> 자세히 보기 </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 슬라이드 창 2 */}
          <div>
            <section className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e8e0b44b-56ff-430f-a9c1-22cc68a1a547?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w"
                className="absolute z-[-1] h-full w-full object-cover object-center inset-0" />
              <div className="relative flex flex-col mt-20 px-5 justify-center items-center max-md:max-w-full max-md:mt-10">
                <div className="text-black text-base uppercase whitespace-nowrap bg-white w-[90px] max-w-full -ml-2 px-3 py-1 rounded-3xl self-start font-['NEXON']">search</div>
                <h1 className="text-black text-8xl font-light uppercase mt-3.5 self-start max-md:max-w-full max-md:text-4xl font-['NEXON']"> 키워드 분석</h1>
                <div className="self-center flex w-full max-w-[1549px] grow flex-col mt-5 pl-2.5 max-md:max-w-full">
                  <p className="text-black text-xl font-light uppercase self-stretch whitespace-nowrap max-md:max-w-full font-['NEXON']"> 궁금한 키워드를 검색해서 데이터를 찾아보세요 </p>
                  <div className="self-center flex w-full max-w-[1539px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                    <Link to="/keyword"
                      className="text-black text-base leading-6 uppercase whitespace-nowrap bg-zinc-300 w-[180px] max-w-full mt-44 pl-12 pr-12 py-3.5 self-end max:mt-10 max-md:px-5 font-['NEXON']"> 자세히 보기 </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 슬라이드 창 3 */}
          <div>
            <section className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/85c452619d1e013a8109f960b82b52d095acc9891a16da6c499147bd7fcf3fc9?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w"
                className="absolute z-[-1] h-full w-full object-cover object-center inset-0" />
              <div className="relative flex flex-col mt-20 px-5 justify-center items-center max-md:max-w-full max-md:mt-10">
                <div className="text-black text-base uppercase whitespace-nowrap bg-white w-[125px] max-w-full -ml-2 px-3 py-1 rounded-3xl self-start font-['NEXON']">Comparing</div>
                <h1 className="text-black text-8xl font-light uppercase mt-3.5 self-start max-md:max-w-full max-md:text-4xl font-['NEXON']"> 비교분석</h1>
                <div className="self-center flex w-full max-w-[1549px] grow flex-col mt-5 pl-2.5 max-md:max-w-full">
                  <p className="text-black text-xl font-light uppercase self-stretch whitespace-nowrap max-md:max-w-full font-['NEXON']"> 비교하고 싶은 데이터의 클릭량을 비교해보세요 </p>
                  <div className="self-center flex w-full max-w-[1539px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                    <Link to="/comparing"
                      className="text-black text-base leading-6 uppercase whitespace-nowrap bg-zinc-300 w-[180px] max-w-full mt-44 pl-12 pr-12 py-3.5 self-end max:mt-10 max-md:px-5 font-['NEXON']"> 자세히 보기 </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 슬라이드 창 4 */}
          <div>
            <section className="flex flex-col min-h-[580px] items-center justify-center gap-5 max-md:flex-wrap overflow-hidden relative">
              <img loading="lazy" srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9623e7a4-24ed-4f47-9343-2d024d9279a1?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w"
                className="absolute z-[-1] h-full w-full object-cover object-center inset-0" />
              <div className="relative flex flex-col mt-20 px-5 justify-center items-center max-md:max-w-full max-md:mt-10">
                <div className="text-black text-base uppercase whitespace-nowrap bg-white w-[110px] max-w-full -ml-2 px-3 py-1 rounded-3xl self-start font-['NEXON']">Favorites</div>
                <h1 className="text-black text-8xl font-light uppercase mt-3.5 self-start max-md:max-w-full max-md:text-4xl font-['NEXON']"> 즐겨찾기</h1>
                <div className="self-center flex w-full max-w-[1549px] grow flex-col mt-5 pl-2.5 max-md:max-w-full">
                  <p className="text-black text-xl font-light uppercase self-stretch whitespace-nowrap max-md:max-w-full font-['NEXON']"> 매일 궁금한 트렌드를 즐겨찾기 해두고 쉽게 체크해보세요 </p>
                  <div className="self-center flex w-full max-w-[1539px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                    <Link to="/favorites"
                      className="text-black text-base leading-6 uppercase whitespace-nowrap bg-zinc-300 w-[180px] max-w-full mt-44 pl-12 pr-12 py-3.5 self-end max:mt-10 max-md:px-5 font-['NEXON']"> 자세히 보기 </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </Slider>
      </SliderContainer>
    </div>
  );
}
