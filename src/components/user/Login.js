import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../main/Header";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const apiUrl = 'http://localhost:8080/user/login';

      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
      });


      if (response.data.token) {
        localStorage.setItem("ACCESS_TOKEN", response.data.token)
        localStorage.setItem("MEMBER_ID", response.data.id)

        navigate('/');
      } else {
        setLoginError(true);
        console.log('Login failed:', response.data.message);
      }

    } catch (error) {
      setLoginError(true);
      console.log(error.response.status);
      if (error.response.status === 403) {
        window.location.href = "/#/login";
      }
    }
  };

  return (
    <div>
      <Header />
      <section className="mt-24 bg-white flex w-full flex-col items-center px-5 py-12 max-md:max-w-full font-['NEXON'] ">
        <article className="border shadow-2xl bg-white flex w-[670px] max-w-full flex-col items-center mb-5 px-20 py-12 rounded-3xl border-solid border-blue-300 max-md:px-5 ">
          <h1 className="text-blue-600 text-4xl font-medium leading-8 w-[466px] max-w-full mt-9">
            로그인
          </h1>
          <form onSubmit={handleSubmit}
            className="flex flex-col  w-full max-w-[670px]   "
          >
            <label
              htmlFor="email"
              className="text-neutral-500 text-lg leading-4 mr-auto mt-32 max-md:max-w-full max-md:mt-10"
            >
              * 이메일
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력해주세요."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className="text-neutral-500 text-lg leading-4 mr-auto mt-12 max-md:max-w-full max-md:mt-10"
            >
              * 비밀번호
            </label>
            <input
              type="password" // Use type="password" for password fields
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            {loginError && (
              <p className="text-red-500 text-lg mt-3">
                로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
              </p>
            )}

            <div className="bg-neutral-200 flex w-[474px] shrink-0 h-px flex-col mt-28 max-md:max-w-full max-md:mt-10" />
            <button
              className="text-blue-600 text-center text-2xl leading-5 border bg-white w-[474px] max-w-full items-center mt-7 pt-7 pb-7 px-5 rounded-xl border-solid border-blue-600"
              type="submit"
            >
              로그인
            </button>

            <Link
            to="/signup"
            className="text-blue-600 text-center text-2xl   leading-5 whitespace-nowrap border bg-white w-[474px] max-w-full items-center mt-9 mb-20  pt-7 pb-7 px-5 rounded-xl border-solid border-blue-600 max-md:mb-10"
          >
            회원가입
          </Link>
          </form>
          
        </article>
      </section>
    </div>
  );
}
