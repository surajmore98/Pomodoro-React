import {useReducer} from 'react';

export function useTaskReducer() {
    const initialCountDown = {
        minutes: 0,
        seconds: 0,
        status: "",
        counter: 0
    }
    return useReducer(function redduceFunction(countDown, action){
        switch (action.type) {
            case "Set Initial Duration":
                return {...countDown, minutes: action.payload};
            case "Decrement Minute":
                return {...countDown, minutes: countDown.minutes - 1, seconds: 59, counter: countDown.counter + 1};
            case "Decrement Second":
                return {...countDown, seconds: countDown.seconds - 1, counter: countDown.counter + 1};
            case "Reset Countdown":
                return { ...countDown, minutes: action.payload, seconds: 0};
            case "Status Change":
                return { ...countDown, status: action.payload};
            default:
                break;
        }
    }, initialCountDown);
    
}
