"use client"

export default function GameClearDisplay({gameend,winner}:{gameend:boolean,winner:number}){
  if(gameend){
    return(
      <h1 className="py-auto bg-clip-text text-transparent text-[clamp(50px,6vw,150px)] bg-linear-45 from-[rgb(120,120,256)] to-[rgb(256,120,120)] text-center stickey">WINNER IS PLAYER-{winner}</h1>
    )
  };
}