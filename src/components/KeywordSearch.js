import * as React from "react";

export default function KeywordSearch(props) {
  return (
    <div className="bg-white flex flex-col px-20 max-md:px-5">
      <div className="self-center flex w-full max-w-[1078px] flex-col mt-32 mb-24 max-md:max-w-full max-md:my-10">
        <div className="text-black text-5xl max-w-[377px] self-center max-md:text-4xl">
          키워드 검색하기
        </div>
        <div className="flex w-[356px] max-w-full items-start justify-between gap-5 ml-5 mt-20 self-start max-md:ml-2.5 max-md:mt-10">
          <div className="text-black text-xl leading-8 uppercase self-center my-auto">
            분야
          </div>
          
          <select className="text-black text-base font-light leading-6 uppercase self-stretch border w-[269px] max-w-full grow shrink basis-auto items-start justify-between gap-5 pl-32 py-7 rounded-3xl border-solid border-black max-md:pl-5">
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
            <div className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-4 pl-9 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
              일간
            </div>
            <div className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
              2023
            </div>
            <div className="text-black text-base font-light leading-6 uppercase self-stretch border w-[83px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
              09
            </div>
            <div className="bg-zinc-300 self-center flex w-[45px] h-[7px] flex-col grow shrink-0 basis-auto my-auto" />
            <div className="text-black text-base font-light leading-6 uppercase self-stretch border w-[102px] max-w-full items-start justify-between gap-2.5 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
              2023
            </div>
            <div className="text-black text-base font-light leading-6 uppercase self-stretch border w-[83px] max-w-full items-start justify-between gap-3 pl-8 pr-2.5 py-8 rounded-3xl border-solid border-black max-md:pl-5">
              10
            </div>
          </div>
          <div className="flex w-[435px] max-w-full items-start justify-between gap-5 mt-14 self-start max-md:flex-wrap max-md:justify-center max-md:mt-10">
            <div className="text-black text-lg self-center my-auto">기기</div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                전체
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6be3dcf6-a0bb-4903-86fb-5eb366cde215?apiKey=d9a6bade01504f228813cd0dfee9b81b&"
                className="aspect-[0.94] object-contain object-center w-full stroke-[1px] stroke-black overflow-hidden flex-1"
              />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                PC
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                모바일
              </div>
            </div>
          </div>
          <div className="flex w-[418px] max-w-full items-start justify-between gap-5 mt-6 self-start max-md:justify-center">
            <div className="text-black text-lg self-center my-auto">성별</div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                전체
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                여성
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                남성
              </div>
            </div>
          </div>
          <div className="self-stretch flex w-full items-start justify-between gap-5 mt-6 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="text-black text-lg self-center my-auto">연령</div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                전체
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                10대
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                20대
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                30대
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                40대
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                50대
              </div>
            </div>
            <div className="self-stretch flex items-start justify-between gap-2">
              <div className="border flex h-[35px] flex-col grow shrink-0 basis-auto flex-1 border-solid border-black" />
              <div className="text-black text-base font-light self-center whitespace-nowrap my-auto">
                60대
              </div>
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
            <div className="border bg-white flex flex-col flex-1 px-20 py-6 rounded-[30px] border-solid border-black max-md:px-5">
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
    </div>
  );
}