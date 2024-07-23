import { useContext, useEffect, useState } from "react";
import { TimerContext } from "./Repeater";
import { Button } from "./ui/button";
import Player from "./Player";

const Counter = () => {
    const { round, exercise, pause, startTimer, stopTimer, currentTime, currentRound, status, resetTimer, currentStep } = useContext(TimerContext);

    return (
        <>
            <div>
                <div className="flex flex-col items-center">
                    <p className={"mb-6 text-6xl"}>{currentStep}</p>
                    <p className="text-[15rem] leading-none">{currentTime}</p>
                    <p className={"text-6xl"}>sec</p>
                    <p>Current round : {currentRound} / {round}</p>
                    <div className="flex gap-4 items-center mt-6">
                        Round: {round} | Exercise: {exercise} sec | Pause: {pause} sec
                    </div>
                </div>
                <Player/>
            </div>
        </>
    );
}

export default Counter;