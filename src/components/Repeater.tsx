"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Counter from "./Counter";
import Setup from "./Setup";
import {Toggle} from "@/components/ui/toggle";
import {Volume2, VolumeX} from "lucide-react";

export const TimerContext = createContext({
    round: 0,
    exercise: 0,
    pause: 0,
    currentRound: 0,
    currentTime: 0,
    currentStep: "Exercise",
    status: "pause",
    startTimer: () => {},
    stopTimer: () => {},
    resetTimer: () => {},
    updateTimer: (data: any) => {}
});

const Repeater = () => {
    const [audio, setAudio] = useState<any>(null);

    const [context, setContext] = useState({
        round: 4,
        currentRound: 1,
        currentTime: 25,
        currentStep: "Exercise",
        exercise: 25,
        pause: 15,
        status: "pause",
    });

    useEffect(() => {
        if (context.status === "play") {
            if(context.currentStep === "Exercise" && context.currentTime < 0) {
                setContext(() => {
                    if(audio) {
                        audio.play();
                    }
                    return {
                        ...context,
                        currentStep: "Pause",
                        currentTime: context.pause
                    };
                })
            }
            if(context.currentStep === "Pause" && context.currentTime < 0) {
                setContext(() => {
                    if(audio) {
                        audio.play();
                    }
                    return {
                        ...context,
                        currentStep: "Exercise",
                        currentTime: context.exercise,
                        currentRound: context.currentRound + 1
                    }
                })
            }
            if(context.currentRound > context.round) {
                if(audio) {
                    audio.play();
                }
                setContext(() => {
                    return {
                        ...context,
                        status: "reset"
                    }
                })
            }
            const timer = setInterval(() => {
                setContext(() => {
                    return {
                        ...context,
                        currentTime: context.currentTime - 1
                    };
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [context]);


    const handleChangeAudio = () => {
        if(audio) {
            setAudio(null);
        } else {
            const audio = new Audio("sound.mp3");
            setAudio(audio);
        }
    }



    const startTimer = () => setContext({ ...context, status: "play" });
    const stopTimer = () => setContext({ ...context, status: "pause" });
    const resetTimer = () => setContext({ 
        ...context, 
        status: "pause",
        currentStep: "Exercise",
        currentRound: 1, // Nombre de rounds
        currentTime: context.exercise
    });

    const updateTimer = (data: any) => setContext({ ...context, ...data });

    return (
        <TimerContext.Provider value={{ ...context, startTimer, stopTimer, resetTimer, updateTimer }}>
            <div className="flex flex-col items-center justify-center h-screen">
                <Counter/>
                <Setup/>
                <Toggle pressed={!!audio} onClick={handleChangeAudio} className={"mt-3"}>
                    {!!audio ? <Volume2/> : <VolumeX/>}
                </Toggle>
            </div>
        </TimerContext.Provider>
    );
}

export default Repeater;