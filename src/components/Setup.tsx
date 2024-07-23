import {useContext, useState} from 'react';
import {TimerContext} from './Repeater';
import {Input} from './ui/input';
import {Button} from './ui/button';
import {Drawer, DrawerTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerClose} from './ui/drawer';


import {ChartContainer, type ChartConfig} from "@/components/ui/chart"
import {Bar, BarChart} from 'recharts';
import {Slider} from "@/components/ui/slider";
import {Description} from "@radix-ui/react-dialog";

const chartConfig = {
    pause: {
        label: "Pause",
        color: "#2563eb",
    },
    exercise: {
        label: "Exercise",
        color: "#60a5fa",
    },
} satisfies ChartConfig


const Setup = () => {
    const {resetTimer, updateTimer, exercise, round, pause, stopTimer} = useContext(TimerContext);
    const [navigation, setNavigation] = useState(0);
    const maxPage = 2;
    const handlePagination = (direction: string) => {
        if (direction === "next") {
            setNavigation(navigation + 1);
        } else {
            setNavigation(navigation - 1);
        }
    };

    const rounds = Array.from({length: round}, (_, i) => {
        return {
            key: i + 1,
            exercise: exercise,
            pause: pause
        }

    });

    return (<>
        <Drawer onOpenChange={resetTimer}>
            <Button onClick={stopTimer} asChild className={"fixed bottom-10"} size="xl">
                <DrawerTrigger>
                    Settings
                </DrawerTrigger>
            </Button>
            <DrawerContent>
                <Description></Description>
                <DrawerHeader>
                    <div className="max-w-md w-full mx-auto space-y-4">
                        <DrawerTitle>Settings</DrawerTitle>
                        <SetupPanel style={navigation === 0 ? "block" : "hidden"} value={round}
                                    onChange={updateTimer} id="round" label="Round" maxRange={10}/>
                        <SetupPanel style={navigation === 1 ? "block" : "hidden"} value={exercise}
                                    onChange={updateTimer} id="exercise" label="Exercise"/>
                        <SetupPanel style={navigation === 2 ? "block" : "hidden"} value={pause}
                                    onChange={updateTimer} id="pause" label="Pause"/>
                        <SetupPagination onChange={handlePagination} maxPage={maxPage} currentPage={navigation}/>
                        <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
                            <BarChart data={rounds}>
                                <Bar dataKey="exercise" fill="hsl(var(--primary))" radius={4}/>
                                <Bar dataKey="pause" fill="hsl(var(--secondary))" radius={4}/>
                            </BarChart>
                        </ChartContainer>
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <Button className='w-full max-w-md mx-auto' asChild={true}>
                        <DrawerClose onClick={resetTimer}>
                            Submit
                        </DrawerClose>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    </>)
}

const SetupPanel = ({value, onChange, label, style, id, maxRange = 50}: any) => {
    return (
        <div className={style}>
            <p>{label}</p>
            <p className={"text-center mb-6 text-6xl font-medium"}>{value}</p>
            <Slider className={"my-12"} max={maxRange} defaultValue={[value]} onValueChange={(e) => onChange({[id]: e[0]})}/>
        </div>
    )
}

const SetupPagination = ({onChange, maxPage, currentPage}: any) => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            <Button disabled={currentPage <= 0} onClick={() => onChange("previous")}>Previous</Button>
            <Button disabled={maxPage === currentPage} onClick={() => onChange("next")}>Next</Button>
        </div>
    )
}

export default Setup;