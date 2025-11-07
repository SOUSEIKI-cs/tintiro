"use client";
import { useState,useRef, SetStateAction } from "react";

export default function GameMemberSetting({gamestartbool,setgamestartbool,member_num,setmember}:{gamestartbool:boolean,setgamestartbool:React.Dispatch<SetStateAction<boolean>>,member_num:number,setmember:React.Dispatch<SetStateAction<number>>}){
  function clamp(menberNum: number): number {
    // 0より小さいなら0に変換し、255より大きいなら255に変換する
    return Math.max(1, Math.min(10, menberNum));
  }
  function pluspeople() {
    setmember(clamp(member_num + 1));
  }
  function minspeople() {
    setmember(clamp(member_num - 1));
  }
  function GoButton(){
    setgamestartbool(true);
  }
  if(!gamestartbool){
  return(
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <p className="text-white text-[clamp(20px,1rem,200px)] m-0">こんにちは。<br />TINTIRORINへようこそ。<br />何名様ですか？(上限は10名です)</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="overflow-hidden m-[1vw] w-[8vw] min-w-20 aspect-square bg-white rounded-[2vw] flex flex-col items-center justify-center">
            <p className="text-black text-center text-[clamp(20px,3rem,200px)]">{member_num}</p>
          </div>
          <div className="overflow-hidden m-[1vw] w-[8vw] min-w-20 aspect-square bg-white rounded-[2vw] flex flex-col items-center justify-center">
            <button className="text-black w-full h-[50%] text-[clamp(10px,2rem,200px)] border-none hover:bg-[rgb(200,200,200)]" onClick={pluspeople}>
              +
            </button>
            <button className="text-black w-full h-[50%] text-[clamp(10px,2rem,200px)] border-none hover:bg-[rgb(200,200,200)]" onClick={minspeople}>
              -
            </button>
          </div>
          <button className="overflow-hidden m-[1vw] w-[8vw] min-w-20 aspect-square bg-white rounded-[2vw] flex flex-col items-center justify-center hover:bg-[rgb(200,200,200)]" onClick={GoButton}>
              <p className="text-black text-center border-none text-[clamp(10px,2rem,200px)]">GO</p>
          </button>
        </div>
      </div>
    </>
  )
}
}
