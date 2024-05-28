import React, { useState, useEffect } from "react";
import fetchBriefData from "../../services/fetchMovieBriefData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import heartLogo from '../../assets/heart.png';
import subtitleLogo from '../../assets/subtitle.png'
import microphoneLogo from '../../assets/microphone.png'

export default function Card({ id, src, movieName, type, url }) {
  const persianType = type === "Series" ? "سریال" : "فیلم";
  const [briefData, setBriefData] = useState({});

  const fetchData = async () => {
    const movieData = await fetchBriefData(id);
    setBriefData(movieData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const cardHandler = () => {
    window.open(url, "_blank");
  };
  return (
    <div className=" p-2 box-border rounded-2xl mt-10 cursor-pointer " onClick={cardHandler}>
      <div className="relative overflow-hidden rounded-2xl group hover:opacity-100 hover:translate-y-0">
        <a href="#" target="_blank">
        
          <div className="bg-gray-800 w-80  rounded-2xl">
             <LazyLoadImage src={src}
               width={600} height={450}
               alt={movieName}
             />
          </div>
        
          <div className="absolute overflow-hidden opacity-0 top-0 right-0 w-full h-full p-2 text-white text-right font-bold rtl:mr-3 bg-black/60 translate-y-full transition-all rounded-2xl group-hover:opacity-100 group-hover:translate-y-0">
            <div className="absolute flex flex-col top-[50%] right-[10%]">
              <span>
                <span>{persianType}</span>- <span>{briefData.year}</span>
              </span>
              <span className="flex items-center">
                <span className="w-6 h-6">
                  <img src={heartLogo} className="w-full h-full"/>
                </span>
                {briefData.hit}%{" "}
              </span>
              {briefData.imdb && (
                <span>
                  {briefData.imdb}
                  <span className="ml-1 font-bold">IMDb</span>
                </span>
              )}
              {briefData.hasPersianSubtitle ? (
                <span className="flex items-center">
                  <span className="w-6 h-6">
                    <img src={subtitleLogo} />
                  </span>
                  زیرنویس
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="w-6 h-6">
                    <img src={microphoneLogo} />
                  </span>
                  دوبله نماوا
                </span>
              )}
            </div>
          </div>
        </a>
      </div>
      <div className="relative text-white overflow-hidden mb-5">{movieName}</div>
    </div>
  );
}
