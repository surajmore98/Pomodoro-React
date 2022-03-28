// constant
export const DATE_FORMAT = 'en-in';
export const START_STATUS = "Start";
export const RESTART_STATUS = "Restart";
export const PAUSE_STATUS = "Pause";
export const DOCUMENT_TITLE = "Pomodoro";


// utility
export const currentDate = new Date().toLocaleDateString(DATE_FORMAT);
export const defaultTaskValue = { id: "", title: "", description: "", duration: "", createdDate: "", isCompleted : false}

//
export default function isTaskCompleted(duration, counter) {
    return counter === duration * 60;
}