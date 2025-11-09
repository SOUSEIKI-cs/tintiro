"use client";
import { useState } from "react";
import GameMemberSetting from "./game_setting";
import GameTintiro from "./game_tintiro"
import GameClearDisplay from "./game_clear";
export default function Tintiro(){
  const [gamestart,setgamestart] = useState(false);
  const [membernum, setmember] = useState(5);
  const [gameend,setgameend]=useState(false);
  const [winner,setwinner]=useState(0);
  //プレイヤーごとののこりHP↓
  const [playerhp,setplayerhp] = useState<Array<number>>(Array(10).fill(0));
  return(
    <div className="flex flex-col items-center justify-center">
      <GameMemberSetting gamestartbool={gamestart} setgamestartbool={setgamestart} membernum={membernum} setmember={setmember} setplayerhp={setplayerhp} playerhp={playerhp}/>
      <GameTintiro gamestartbool={gamestart} membernum={membernum} setgameend={setgameend} gameend={gameend} setwinner={setwinner} playerhp={playerhp} setplayerhp={setplayerhp}/>
      <GameClearDisplay gameend={gameend} winner={winner}/>
    </div>
  );
}