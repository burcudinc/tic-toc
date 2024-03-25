export default function GameOver({winner , onReStart}){
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            <p>
                {winner && <p>{winner}, won! </p> } 
                { !winner && <p> It is a draw!</p> } 
            </p>
               
            <p>
            <button onClick={onReStart}>Rematch!</button>
            </p>
        </div>
    )
}