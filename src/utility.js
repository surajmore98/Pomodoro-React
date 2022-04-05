// constant
export const DATE_FORMAT = 'en-in';
export const START_STATUS = "Start";
export const RESTART_STATUS = "Restart";
export const PAUSE_STATUS = "Pause";
export const DOCUMENT_TITLE = "Pomodoro";

export const CURRENT_MONTH_FILTER = "Current Month"; 
export const CURRENT_WEEK_FILTER = "Current Week";
export const TODAY_FILTER = "Today"; 
export const PENDING_TASK_FILTER = "Pending Task";
export const COMPLETED_TASK_FILTER = "Completed Task"; 

//
export const defaultTaskValue = { id: "", title: "", description: "", duration: "", createdDate: "", isCompleted : false}

// utility
export function formatDateToString(date) {
    return new Date(date).toLocaleDateString(DATE_FORMAT);
}

export function isTaskCompleted(duration, counter) {
    return counter === duration * 60;
}

export function getFilterTasks(tasks, filter) {
    const currentDate = new Date();
    if(tasks.length  && filter) {
        switch(filter) {
            case TODAY_FILTER:
                return tasks.filter(t => t.createdDate === formatDateToString(currentDate));
            case CURRENT_WEEK_FILTER:
                return tasks.filter(t => t.createdDate <= formatDateToString(currentDate) || t.createdDate >= formatDateToString(currentDate.getDate() - 7));
            case CURRENT_MONTH_FILTER:
                return tasks.filter(t => t.createdDate <= formatDateToString(currentDate) || t.createdDate >= formatDateToString(currentDate.setMonth(currentDate.getMonth() - 1)));
            case PENDING_TASK_FILTER:
                return tasks.filter(t => !t.isCompleted);
            case COMPLETED_TASK_FILTER:
                return tasks.filter(t => t.isCompleted);
            default:
                return tasks;
        }
    }
    return tasks;
}