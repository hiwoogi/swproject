import * as React from "react";
import { Link } from "react-router-dom";
import Logout from "../user/Logout";
import { useState } from "react";

export default function Header(props) {

  
  const [hasToken, setHasToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  return (
    <div className="border bg-white flex items-start justify-between gap-5 pl-3.5 pr-4 border-solid border-black max-md:flex-wrap max-md:justify-center">
      <div className="text-black text-lg leading-7 uppercase my-auto">
        <Link to="/">
          <span className="font-bold font-['NEXON']">web</span>
          <span className=""> </span>
          <span className="font-['NEXON']">site</span>
        </Link>
      </div>
      <div className="bg-white self-center flex w-5 h-5 flex-col my-auto" />
      <div className="self-stretch flex w-[497px] max-w-full items-start justify-between gap-5 my-4 max-md:flex-wrap max-md:justify-center mx-auto">
        <div className="text-black text-base font-light leading-6 uppercase self-stretch whitespace-nowrap bg-neutral-100 w-[110px] max-w-full pl-6 pr-6 py-3.5 rounded-md max-md:px-5 font-['NEXON']" >
        <Link to="/favorites">즐겨 찾기</Link>
        </div>
        <div className="text-black text-base font-light leading-6 uppercase self-center whitespace-nowrap my-auto font-['NEXON']">
          <Link to="/trend">실시간 트렌드</Link>
        </div>
        <div className="text-black text-base font-light leading-6 uppercase self-center my-auto font-['NEXON']">
          <Link to="/keyword">키워드 분석</Link>
        </div>
      </div>
      
      <div className="text-black text-base leading-6 uppercase self-stretch  border w-[140px] max-w-full my-4 pl-8 pr-9 py-3.5 rounded-[50px] border-solid border-black max-md:px-5 font-['NEXON'] text-center">
      {hasToken ? (
        <Logout
        setHasToken = {setHasToken}
        />
      ) : (
        <Link to="/login">로그인</Link>
      )}
    </div>
    </div>
  );
}
