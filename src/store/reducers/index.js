import {
  TOGGLE,
  RESET,
  FINISH,
  COUNTDOWN,
  BREAK,
  WORK,
  CHANGE,
} from "../actions";

const initialState = {
  minut: 25,
  minForCircle: 25,
  shortBreak: 5 * 60,
  shortBreakForCircle: 5 * 60,
  longBreak: 10 * 60,
  longBreakForCircle: 10 * 60,
  second: 1,
  is_pause: true,
  is_reset: false,
  is_finish: false,
  alltime: 60 * 25,
  is_switch: true,
  repeat: 3,
};
export const rootReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        is_pause: state.alltime > 0 && state.is_pause ? false : true,
      };
    case RESET:
      return {
        ...state,
        is_pause: true,
        alltime: 60 * state.minut,
        repeat: 3,
      };

    case FINISH:
      return {
        ...state,
        is_pause: true,
      };

    case COUNTDOWN:
      console.log(state);
      if (state.repeat >= 0) {
        return {
          ...state,
          alltime: state.alltime - 1,
          is_switch: state.alltime == 1 ? !state.is_switch : state.is_switch,
        };
      } else {
        return {
          ...state,
          alltime: state.alltime,
          is_switch: state.alltime == 1 ? !state.is_switch : state.is_switch,
        };
      }

    case BREAK:
      if (state.repeat > 1 && state.repeat % 3 == 0) {
        return {
          ...state,
          alltime: 60 * state.longBreak,
        };
      } else {
        return {
          ...state,
          alltime: 60 * state.shortBreak,
        };
      }
    case WORK:
      if (state.repeat >= 1) {
        state.alltime = 60;
      } else {
        return state;
      }
      return {
        ...state,
        alltime: state.alltime * state.minut,
        repeat: state.alltime == 0 ? state.repeat : state.repeat - 1,
      };
    case CHANGE:
      console.log(action);
      return {
        ...state,
        minut: action.settings.workTime,
        minForCircle: 60 * action.settings.workTime,
        shortBreak: action.settings.shortBreak,
        shortBreakForCircle: 60 * action.settings.shortBreak,
        longBreak: action.settings.longBreak,
        longBreakForCircle: 60 * action.settings.longBreak,
      };
    default:
      return state;
  }
};
