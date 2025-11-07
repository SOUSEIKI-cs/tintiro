"use client";
import { useState } from "react";
import GameTitle from "./game_title";
import GameMemberSetting from "./game_setting";
import GameTintiro from "./game_tintiro"
export default function Tintiro(){
  const [gamestart,setgamestart] = useState(false);
  const [member_num, setmember] = useState(5);
  return(
    <div className="flex flex-col items-center justify-center">
      <GameMemberSetting gamestartbool={gamestart} setgamestartbool={setgamestart} member_num={member_num} setmember={setmember}/>
      <GameTintiro gamestartbool={gamestart} member_num={member_num}/>
    </div>
  );
}