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

export default function GameTintiro({gamestartbool,membernum}:{gamestartbool:boolean,membernum:number}){
  //今ターンが回ってきているプレイヤーがダイスを投げた回数↓
  const [throwcount,setthrowcount]=useState(0);
  //今ターンが回ってきているプレイヤーの番号↓
  const [nowplayer,setnowplayer] = useState(0);
  //今出たダイスの出目
  const [nowdice,setnowdice] = useState<Array<number>>(Array(3).fill(0));
  //プレイヤーごとの出目↓
  const [playerdice,setplayerdice] = useState<Array<Array<number>>>(Array(10).fill(null).map(() => Array(3).fill(0)));
  //プレイヤーごとのダイスのレベル↓
  const [playerdicelevel,setplayerdicelevel]=useState<Array<number>>(Array(10).fill(0));
  //プレイヤーごとののこりHP↓
  const [playerhp,setplayerhp] = useState<Array<number>>(Array(10).fill(6000));
  //ダイレクトアタックが終了したかのbool↓
  const [endattack,setendattack]=useState(true);
  
  function nextPlayer(){
    setthrowcount(0);
    const nextdice=nowdice.slice().fill(0);
    setnowdice(nextdice);
    const nowdicearray=playerdice.slice();
    nowdicearray[nowplayer]=nowdice;
    setplayerdice(nowdicearray);
    const nowdicelevelarray=playerdicelevel.slice();
    nowdicelevelarray[nowplayer]=level;
    setplayerdicelevel(nowdicelevelarray);
    setnowplayer(()=>{
      if(nowplayer<membernum-1){
        return nowplayer+1;
      }
      else{
        setendattack(false);
        return 0;
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
  function directattack(){
    const playerhpbuffer = playerhp.slice();
    const maxlevel = Math.max(...playerdicelevel);
    playerdicelevel.forEach((element,i) => {
      playerhpbuffer[i]-=((maxlevel-element)*500);
    });
    setplayerhp(playerhpbuffer);
    setendattack(true);
  };
  let level:number=0;//レベルのbuffer
  const rollJudgement=():string=>{
    if(nowdice[0]===nowdice[1]&&nowdice[1]===nowdice[2]){
      if(nowdice[0]===1&&nowdice[1]===1&&nowdice[2]===1){
        level=6;
        return "ピンゾロ";
      }
      else if(nowdice[0]===0&&nowdice[1]===0&&nowdice[2]===0&&endattack){
        level=0;
        return "運命のダイスロール！";
      }
      else if(nowdice[0]===0&&nowdice[1]===0&&nowdice[2]===0&&!endattack){
        return "ダイレクトアタック！";
      }
      else{
        level=5;
        return "ゾロ目";
      }
    }
    else if(nowdice[0]===nowdice[1]||nowdice[1]===nowdice[2]||nowdice[0]===nowdice[2]){
      level=3;
      return `役あり`;
    }
    else if(nowdice.includes(4)&&nowdice.includes(5)&&nowdice.includes(6)){
      level=4
      return "シゴロ";
    }
    else if(nowdice.includes(1)&&nowdice.includes(2)&&nowdice.includes(3)){
      level=1
      return "ヒフミ";
    }
    else{
      level=2
      return "役なし";
    }
  };
  
  if(gamestartbool){
    return(
      <div className="flex flex-row gap-1 flex-wrap items-center justify-center">
        <div>
          <Playernum playernownum={nowplayer} throwcount={throwcount}/>
          <Dicedisplay nowdice={nowdice}/>
          <div className="text-black text-center text-1 sm:text-2 bg-white w-[75vw] sm:w-[45vw] rounded-[1vw] my-[1vh]">{rollJudgement()}</div>
          <div className="flex flex-row">
            <ThrowBtn throwcount={throwcount} throwDice={throwDice} endattack={endattack}/>
            <TurnEndBtn throwcount={throwcount} nextplayer={nextPlayer} endattack={endattack}/>
            <DirectAttackBtn nowplayer={nowplayer} membernum={membernum} directattack={directattack} endattack={endattack}/>
          </div>
        </div>
        <div className="flex flex-row gap-1 flex-wrap w-[75vw] sm:w-[37vw]">
          <PlayerHpGauge membernum={membernum} playerhp={playerhp} playerdice={playerdice} playerdicelevel={playerdicelevel}/>
        </div>
      </div>
    );
  }
}
function Playernum({playernownum,throwcount}:{playernownum:number,throwcount:number}){
    return(
      <div className="flex flex-row items-center">
        <p className="text-black text-center text-[1rem] sm:text-[2rem] bg-white w-[35vw] sm:w-[20vw] rounded-[1vw] my-[1vh] mx-auto">player{playernownum+1}</p>
        <p className="text-black text-center text-[1rem] sm:text-[2rem] bg-white w-[35vw] sm:w-[20vw] rounded-[1vw] my-[1vh] mx-auto">残り:{3-throwcount}</p>
      </div>
    );
}
function Dicedisplay({nowdice}:{nowdice:Array<number>}){
  const dice=[dice_0,dice_1,dice_2,dice_3,dice_4,dice_5,dice_6];
  return(
    <>
      <div className="flex flex-row">
        <Image src={dice[nowdice[0]]} alt={`${nowdice[0]}`} className="sm:w-[15vw] w-[25vw]"/>
        <Image src={dice[nowdice[1]]} alt={`${nowdice[1]}`} className="sm:w-[15vw] w-[25vw]"/>
        <Image src={dice[nowdice[2]]} alt={`${nowdice[2]}`} className="sm:w-[15vw] w-[25vw]"/>
      </div>
    </>
  );
}
function ThrowBtn({throwcount,throwDice,endattack}:{throwcount:number,throwDice:React.MouseEventHandler<HTMLButtonElement>,endattack:boolean}){
  if(throwcount<=2&&endattack){
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
function TurnEndBtn({throwcount,nextplayer,endattack}:{throwcount:number,nextplayer:React.MouseEventHandler<HTMLButtonElement>,endattack:boolean}){
  if(throwcount>0&&endattack){
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
function DirectAttackBtn({nowplayer,membernum,directattack,endattack}:{nowplayer:number,membernum:number,directattack:React.MouseEventHandler<HTMLButtonElement>,endattack:boolean}){
  if(nowplayer+1===1&&!endattack){
    return(
      <button onClick={directattack} className="w-6 overflow-hidden m-[1vw] min-w-20 aspect-square bg-red-600 rounded-2xl text-white text-2">執行</button>
    );
  }
  else{
    return(
    <button className="w-6 overflow-hidden m-[1vw] min-w-20 aspect-square bg-gray-500 rounded-2xl text-gray-300 text-2">執行</button>
    );
  }
}
function PlayerHpGauge({membernum,playerhp,playerdice,playerdicelevel}:{membernum:number,playerhp:Array<number>,playerdice:Array<Array<number>>,playerdicelevel:Array<number>}){
  const dice=[dice_0,dice_1,dice_2,dice_3,dice_4,dice_5,dice_6];
  let hpanddice=[]; 
  for(let playernumber:number=0;playernumber<membernum;playernumber++){
    if(playerhp[playernumber]>0){
      let hpgauge=
      <div className="flex flex-row gap-0.5 mx-[1vw]">
        <div className="flex flex-col justify-center">
          <pre className="text-5 sm:text-3">{(playernumber+1)===10?`${playernumber+1}`:` ${playernumber+1}`}:</pre>
        </div>
        <Image src={dice[playerdice[playernumber][0]]} alt={`${playerdice[playernumber][0]}`} className="sm:w-[2vw] w-[3vw]"/>
        <Image src={dice[playerdice[playernumber][1]]} alt={`${playerdice[playernumber][1]}`} className="sm:w-[2vw] w-[3vw]"/>
        <Image src={dice[playerdice[playernumber][2]]} alt={`${playerdice[playernumber][2]}`} className="sm:w-[2vw] w-[3vw]"/>
        <div className="w-[20vw] sm:w-[17vw] flex flex-col justify-center">
          <pre className="text-5 sm:text-3">level:{playerdicelevel[playernumber]} {playerhp[playernumber]}</pre>
        </div>
      </div>;
      hpanddice.push(hpgauge);
    }
  }
    return(
      hpanddice
    );
}

/*
1.プレイヤー1と表示//
2.サイコロを表示
3.振るボタンを表示
4.振るとサイコロが降られ、2秒後に静止、値が決定、振り直しbuttonとターンエンドボタンが表示される
5.全員が降りおわると、勝者が敗者にダメージを与える。勝者が一人になるまで継続。
6.勝者が一人になると終了。
*/