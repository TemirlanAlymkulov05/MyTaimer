export const RESET = "RESET";
export const TOGGLE = "TOGGLE";
export const FINISH = "TOGGLE";
export const COUNTDOWN = "COUNTDOWN";
export const BREAK = "BREAK";
export const WORK = "WORK";
export const CHANGE = "CHANGE";

export const toggle_pomodoro = () => {
  return {
    type: TOGGLE,
  };
};
export const reset_pomodoro = () => ({
  type: RESET,
});

export const finish_pomodoro = () => {
  return {
    type: FINISH,
  };
};

export const count_pomodoro = () => {
  return {
    type: COUNTDOWN,
  };
};

export const break_pomodoro = () => {
  return {
    type: BREAK,
  };
};
export const work_pomadoro = () => {
  return {
    type: WORK,
  };
};
export const change_time = (settings) => {
  return {
    type: CHANGE,
    settings,
  };
};
