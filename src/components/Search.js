import React, { useState } from "react";

export default function Search(props) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // You can add your form submission logic here
    console.log('검색어:', keyword);
    console.log('분야:', category);
  };

  const handleButtonClick = () => {
    const form = document.getElementById("searchForm");

    
    if (form) {
      const formData = new FormData(form);
      
    // FormData에서 필요한 값을 추출하고 상태 변수에 설정합니다.
      setKeyword(formData.get("keyword")); // "field"는 input 요소의 name 속성 값
      setCategory(formData.get("category")); // "category"는 select 요소의 name 속성 값
      handleSubmit(new Event('submit'));
      
    }
  };

  return (
    <div className="bg-white flex flex-col px-20 max-md:px-5">
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="self-center flex w-full max-w-[1078px] flex-col mt-32 mb-24 max-md:max-w-full max-md:my-10">
          <div className="text-black text-5xl max-w-[377px] self-center max-md:text-4xl">
            키워드 검색하기
          </div>
          <div className="flex w-[356px] max-w-full items-start justify-between gap-5 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
            <div className="text-black text-xl leading-8 uppercase self-center my-auto">
              분야
            </div>

            <select
            name="category" 
            onChange={(e) => setCategory(e.target.value)}
            className="text-black text-base font-light leading-6 uppercase self-stretch border w-[269px] max-w-full grow shrink basis-auto items-start justify-between gap-5 pl-32 py-7 rounded-3xl border-solid border-black max-md:pl-5">
              <option value="fashion">패션</option>
              <option value="sports">스포츠</option>
              <option value="home-appliances">가전제품</option>
              <option value="leisure">여가</option>
              <option value="food">음식</option>
            </select>
          </div>
          <div className="self-center flex w-full items-start justify-between gap-5 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <div className="text-black text-xl leading-8 uppercase self-center my-auto">
              검색어
            </div>
            <input
              name="keyword"
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              className="text-black text-xl leading-8 uppercase self-stretch border w-[975px] max-w-full grow shrink basis-auto items-start justify-between gap-5 stroke-[1px] stroke-black pl-5 py-3 rounded-3xl border-solid border-black max-md:pl-3"
              placeholder="검색어를 입력하세요"
            />
          </div>
          <div className="flex w-[953px] max-w-full grow flex-col ml-5 mt-14 self-start max-md:mt-10">
            <div className="self-stretch flex items-start justify-between gap-4 pr-60 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
              <div className="text-black text-xl leading-8 uppercase self-center my-auto">
                기간
              </div>
              <div className="relative">
                <select
                  className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-4 pl-9 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5"
                  defaultValue="일간" // Set the default selected option
                >
                  <option value="date">일간</option>
                  <option value="week">주간</option>
                  <option value="month">월간</option>
                </select>
              </div>
              <select className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
              <select className="text-black text-base font-light leading-6 uppercase self-stretch border w-[83px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <div className="bg-zinc-300 self-center flex w-[45px] h-[7px] flex-col grow shrink-0 basis-auto my-auto" />
              <select className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
              <select className="text-black text-base font-light leading-6 uppercase self-stretch border w-[83px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div className="flex w-[435px] max-w-full items-start justify-between gap-5 mt-14 self-start max-md:flex-wrap max-md:justify-center max-md:mt-10">
              <div className="text-black text-lg self-center my-auto">기기</div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="all-device" name="기기" value="all" />
                <label
                  htmlFor="all-device"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  전체
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="pc-device" name="기기" value="pc" />
                <label
                  htmlFor="pc-device"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  PC
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="mobile-device" name="기기" value="mobile" />
                <label
                  htmlFor="mobile-device"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  모바일
                </label>
              </div>
            </div>
            <div className="flex w-[418px] max-w-full items-start justify-between gap-5 mt-6 self-start max-md:justify-center">
              <div className="text-black text-lg self-center my-auto">성별</div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="all-gender" name="성별" value="all" />
                <label
                  htmlFor="all-gender"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  전체
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="female" name="성별" value="female" />
                <label
                  htmlFor="female"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  여성
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="radio" id="male" name="성별" value="male" />
                <label
                  htmlFor="male"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  남성
                </label>
              </div>
            </div>
            <div className="self-stretch flex w-full items-start justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
              <div className="text-black text-lg self-center my-auto">연령</div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="all-age" name="연령" value="all" />
                <label
                  htmlFor="all-age"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  전체
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="teens" name="연령" value="teens" />
                <label
                  htmlFor="teens"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  10대
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="twenties" name="연령" value="twenties" />
                <label
                  htmlFor="twenties"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  20대
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="thirties" name="연령" value="thirties" />
                <label
                  htmlFor="thirties"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  30대
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="forties" name="연령" value="forties" />
                <label
                  htmlFor="forties"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  40대
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="fifties" name="연령" value="fifties" />
                <label
                  htmlFor="fifties"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  50대
                </label>
              </div>
              <div className="self-stretch flex items-start justify-between gap-2">
                <input type="checkbox" id="sixties" name="연령" value="sixties" />
                <label
                  htmlFor="sixties"
                  className="text-black text-base font-light self-center whitespace-nowrap my-auto"
                >
                  60대
                </label>
              </div>
            </div>

            <div className="flex w-[864px] max-w-full items-start justify-between gap-5 mt-24 self-end max-md:flex-wrap max-md:mt-10">
              <div className="border bg-white flex flex-col flex-1 px-20 py-7 rounded-[30px] border-solid border-black max-md:px-5">
                <div className="self-center flex w-[84px] max-w-full items-start gap-1">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ee4812c-c045-44e9-aa52-0da59d97d0af?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                    className="aspect-[1.05] object-contain object-center w-[21px] overflow-hidden max-w-full self-start"
                  />
                  <div className="text-black text-base font-light whitespace-nowrap mt-1.5 self-start">
                    즐겨찾기
                  </div>
                </div>
              </div>
              <div
                className="border bg-white flex flex-col flex-1 px-20 py-6 rounded-[30px] border-solid border-black max-md:px-5"
                onClick={handleButtonClick}
                style={{ cursor: "pointer" }}
              >
                <div className="self-center flex w-[89px] max-w-full items-start gap-0">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4229ddf-a29f-46af-b439-5fab4021194e?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                    className="aspect-[1.11] object-contain object-center w-[30px] overflow-hidden self-stretch max-w-full"
                  />
                  <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                    조회하기
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
