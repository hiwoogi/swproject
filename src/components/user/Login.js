import React from 'react'
import { Link } from 'react-router-dom';

export default function Login(props) {
  return (
    <section className="bg-white flex w-full flex-col items-center px-5 py-12 max-md:max-w-full">
      <article className="border shadow-2xl bg-white flex w-[670px] max-w-full flex-col items-center mb-5 px-20 py-12 rounded-3xl border-solid border-blue-300 max-md:px-5">
        <h1 className="text-blue-600 text-3xl font-medium leading-8 w-[466px] max-w-full mt-9">
          로그인
        </h1>
        <label
          htmlFor="email"
          className="text-neutral-500 text-base leading-4 mr-auto mt-32 max-md:max-w-full max-md:mt-10"
        >
          * 이메일
        </label>
        <input
          type="text"
          className="aspect-[470] object-contain object-center w-[470px] stroke-[1px] stroke-blue-600  mt-7 max-md:mt-10
          border border-solid border-gray-300 "
        />
        <label
          htmlFor="password"
          className="text-neutral-500 text-base leading-4 mr-auto mt-12 max-md:max-w-full max-md:mt-10"
        >
          * 비밀번호
        </label>
        <input
          type="text"
          className="aspect-[470] object-contain object-center w-[470px] stroke-[1px] stroke-blue-600  mt-7 max-md:mt-10
          border border-solid border-gray-300 "
        />
        <div className="bg-neutral-200 flex w-[474px] shrink-0 h-px flex-col mt-28 max-md:max-w-full max-md:mt-10" />
        <button className="text-blue-600 text-center text-lg leading-5 border bg-white w-[474px] max-w-full items-center mt-7 pt-6 pb-9 px-5 rounded-xl border-solid border-blue-600">
          로그인
        </button>
        <Link to="/signup"
          className="text-blue-600 text-center text-lg leading-5 whitespace-nowrap border bg-white w-[474px] max-w-full items-center mt-9 mb-20 pt-6 pb-9 px-5 rounded-xl border-solid border-blue-600 max-md:mb-10"
        >
          회원가입
        </Link>
      </article>
    </section>
  );
}