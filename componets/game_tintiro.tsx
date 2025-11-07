"use client";
import { useState,useRef, SetStateAction } from "react";
import Image from 'next/image';
import dice_0 from "../public/diceimage/dice-0.svg"
import dice_1 from "../public/diceimage/dice-1.svg"
import dice_2 from "../public/diceimage/dice-2.svg"
import dice_3 from "../public/diceimage/dice-3.svg"
import dice_4 from "../public/diceimage/dice-4.svg"
import dice_5 from "../public/diceimage/dice-5.svg"
import dice_6 from "../public/diceimage/dice-6.svg"

export default function GameTintiro({gamestartbool,member_num}:{gamestartbool:boolean,member_num:number}){
  //今ターンが回ってきているプレイヤーの番号↓
  const [nowplayer,setnowplayer] = useState(1);
  //今出たダイスの出目
  const [nowdice,setnowdice] = useState<Array<number>>(Array(3).fill(0));
  //プレイヤーごとの出目↓
  const [playerdice,setplayerdice] = useState<Array<Array<number>>>(Array(10).fill(null).map(() => Array(3).fill(0)));
  //今出たダイスのレベル↓
  const [nowdicelevel,setnowdicelevel] = useState(0);
  //プレイヤーごとのダイスのレベル↓
  const [playerdicelevel,setplayerdicelevel]=useState<Array<number>>(Array(10).fill(0));
  //プレイヤーごとののこりHP↓
  const [playerhp,setplayerhp] = useState<Array<number>>(Array(10).fill(6000));
  //今ターンが回ってきているプレイヤーがダイスを投げた回数↓
  const [throwcount,setthrowcount]=useState(0);
  
  function nextPlayer(){
    setthrowcount(0);
    const nextdice=nowdice.slice().fill(0);
    setnowdice(nextdice);
    const nowdicearray=playerdice.slice();
    nowdicearray[nowplayer]=nowdice;
    setplayerdice(nowdicearray);
    const nowdicelevelarray=playerdicelevel.slice();
    nowdicelevelarray[nowplayer]=nowdicelevel;
    setplayerdicelevel(nowdicelevelarray);
    setnowplayer(()=>{
      if(nowplayer<member_num){
        return nowplayer+1;
      }
      else{
        return 1;
      }
    })
  };

  function throwDice(){
    if(throwcount<3){
      const nextdice=nowdice.slice();
      nextdice[0]=(Math.floor(Math.random() * 6)+1);
      nextdice[1]=(Math.floor(Math.random() * 6)+1);
      nextdice[2]=(Math.floor(Math.random() * 6)+1);
      setnowdice(nextdice);
      setthrowcount(throwcount+1);
    }
  };

  const rollJudgement=():string=>{
    if(nowdice[0]===nowdice[1]&&nowdice[1]===nowdice[2]){
      if(nowdice[0]===1&&nowdice[1]===1&&nowdice[2]===1){
        setnowdicelevel(6);
        return "ピンゾロ";
      }
      if(nowdice[0]===0&&nowdice[1]===0&&nowdice[2]===0){
        return "ジャッジメントダイス！";
      }
      else{
        setnowdicelevel(5);
        return "ゾロ目";
      }
    }
    else if(nowdice[0]===nowdice[1]||nowdice[1]===nowdice[2]||nowdice[0]===nowdice[2]){
      setnowdicelevel(3);
      return `役あり`;
    }
    else if(nowdice.includes(1)&&nowdice.includes(2)&&nowdice.includes(3)){
      setnowdicelevel(1);
      return "ヒフミ";
    }
    else if(nowdice.includes(4)&&nowdice.includes(5)&&nowdice.includes(6)){
      setnowdicelevel(4);
      return "シゴロ";
    }
    else{
      setnowdicelevel(2);
      return "役なし";
    }
  };
  
  if(gamestartbool){
    return(
      <div>
        <Playernum playernownum={nowplayer} throwcount={throwcount}/>
        <Dicedisplay nowdice={nowdice}/>
        <div className="ml-7 text-black text-center text-[1rem] bg-white w-[73vw] sm:w-[45vw] rounded-[1vw] my-[1vh]">{rollJudgement()}</div>
        <div className="flex flex-row ml-6">
          <ThrowBtn throwcount={throwcount} throwDice={throwDice}/>
          <TurnEndBtn throwcount={throwcount} nextplayer={nextPlayer}/>
        </div>
      </div>
    );
  }
}
function Playernum({playernownum,throwcount}:{playernownum:number,throwcount:number}){
    return(
      <div className="flex flex-row">
        <p className="ml-7 text-black text-center text-[1rem] bg-white w-[35vw] sm:w-[20vw] rounded-[1vw] my-[1vh]">player{throwcount}</p>
        <p className="ml-7 text-black text-center text-[1rem] bg-white w-[35vw] sm:w-[20vw] rounded-[1vw] my-[1vh]">今振った回数{playernownum}</p>
      </div>
    );
}
function Dicedisplay({nowdice}:{nowdice:Array<number>}){
  const dice=[dice_0,dice_1,dice_2,dice_3,dice_4,dice_5,dice_6];
  return(
    <>
      <div className="flex flex-row ml-5">
        <Image src={dice[nowdice[0]]} alt={`${nowdice[0]}`} className="sm:w-[15vw] w-[25vw]"/>
        <Image src={dice[nowdice[1]]} alt={`${nowdice[1]}`} className="sm:w-[15vw] w-[25vw]"/>
        <Image src={dice[nowdice[2]]} alt={`${nowdice[2]}`} className="sm:w-[15vw] w-[25vw]"/>
      </div>
    </>
  );
}
function ThrowBtn({throwcount,throwDice}:{throwcount:number,throwDice:React.MouseEventHandler<HTMLButtonElement>}){
  if(throwcount<=2){
    return(
      <button onClick={throwDice} className="w-6 overflow-hidden m-[1vw] min-w-20 aspect-square bg-white rounded-2xl text-red-600 text-2">ドロー</button>
    );
  }
  else{
    return(
    <button className="w-6 overflow-hidden m-[1vw] min-w-20 aspect-square bg-gray-500 rounded-2xl text-gray-300 text-2">ドロー</button>
    );
  }
}
function TurnEndBtn({throwcount,nextplayer}:{throwcount:number,nextplayer:React.MouseEventHandler<HTMLButtonElement>}){
  if(throwcount>0){
    return(
      <button onClick={nextplayer} className="w-6 overflow-hidden m-[1vw] min-w-20 aspect-square bg-white rounded-2xl text-red-600 text-2">ターン<br/>エンド</button>
    );
  }
  else{
    return(
    <button className="w-6 overflow-hidden m-[1vw] min-w-20 aspect-square bg-gray-500 rounded-2xl text-gray-300 text-2">ターン<br/>エンド</button>
    );
  }
}

/*
1.プレイヤー1と表示//
2.サイコロを表示
3.振るボタンを表示
4.振るとサイコロが降られ、2秒後に静止、値が決定、振り直しbuttonとターンエンドボタンが表示される
5.全員が降りおわると、勝者が敗者にダメージを与える。勝者が一人になるまで継続。
6.勝者が一人になると終了。
*/