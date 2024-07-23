import { Button } from "./ui/button";
import { useContext } from "react";
import { TimerContext } from "./Repeater";

const Player = () => {
    const { startTimer, stopTimer, status, resetTimer } = useContext(TimerContext);
    return (
        <div className="flex gap-4 items-center mt-6 justify-center">
            { status === "reset" ? 
                <Button onClick={resetTimer}>Reset</Button>
            :
            <>
                <Button variant="success" onClick={startTimer}>Start</Button>
                <Button variant="danger" onClick={stopTimer}>Stop</Button>
                <Button onClick={resetTimer}>Reset</Button>
            </>
            }
        </div>
    );
}

export default Player;