import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggle_pomodoro,
  reset_pomodoro,
  count_pomodoro,
  finish_pomodoro,
  break_pomodoro,
  work_pomadoro,
  change_time,
} from "../../store/actions";
import { useEffect } from "react";
import {
  SettingOutlined,
  SettingFilled,
  CustomerServiceOutlined,
  CustomerServiceFilled,
  ThunderboltTwoTone,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Button, Menu, Input } from "antd";
import { CircularProgressbar } from "react-circular-progressbar";
import music1 from "../../audio/Sound_06321.mp3";
import music2 from "../../audio/Sound_19349.mp3";

export const Pomodoro1 = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const timerSecond = state.alltime;
  const [is_pause, setPause] = useState(state.is_pause);
  const is_switch = state.is_switch;
  const [workTime, setWorkTime] = useState(state.minut);
  const [shortBreak, setShortBreak] = useState(state.shortBreak);
  const [longBreak, setLongBreak] = useState(state.longBreak);
  const [mus1] = useState(new Audio(music1));
  const [mus2] = useState(new Audio(music2));
  useEffect(() => {
    let interval = setInterval(() => {
      if (!is_pause) {
        timerSecond > 0
          ? dispatch(count_pomodoro())
          : dispatch(finish_pomodoro());
      } else {
        clearInterval(interval);
        mus2.play();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  is_switch == false && timerSecond === 0 && dispatch(break_pomodoro());
  is_switch == true && timerSecond === 0 && dispatch(work_pomadoro());

  // menu
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if (collapsed) {
      document.querySelector("body").style.backgroundColor = "#001529";
    } else {
      document.querySelector("body").style.backgroundColor = "#f5f5dc";
    }
  };

  return (
    <div>
      <h1 style={collapsed ? { color: "black" } : { color: "#f5f5dc" }}>
        Pomodoro
      </h1>

      <CircularProgressbar
        value={state.alltime}
        //! error
        maxValue={
          state.is_switch == false
            ? state.repeat % 3 == 0
              ? state.shortBreakForCircle
              : state.longBreakForCircle
            : state.minForCircle
        }
        text={`${Math.floor(timerSecond / 60)
          .toString()
          .padStart(2, "0")}:${`${timerSecond % 60}`
          .toString()
          .padStart(2, "0")}`}
      />

      <Button
        style={{ marginTop: 10 }}
        danger={is_pause ? false : true}
        onClick={() => {
          dispatch(toggle_pomodoro());
          mus1.play();
          setPause(!is_pause);
        }}
      >
        {timerSecond > 0 ? (is_pause ? "start" : "pause") : "break"}
      </Button>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <SettingOutlined /> : <SettingFilled />}
      </Button>
      <Button
        type="primary"
        danger
        onClick={() => {
          {
            dispatch(reset_pomodoro()) && mus2.play();
          }
        }}
      >
        reset
      </Button>
      <div style={{ width: 256, marginTop: "30px" }}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme={collapsed ? "dark" : "light"}
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<ThunderboltTwoTone />}>
            <Input
              value={workTime}
              onChange={(e) => setWorkTime(e.target.value)}
            />
          </Menu.Item>
          <Menu.Item key="2" icon={<CustomerServiceFilled />}>
            <Input
              value={shortBreak}
              onChange={(e) => setShortBreak(e.target.value)}
            />
          </Menu.Item>
          <Menu.Item key="3" icon={<CustomerServiceOutlined />}>
            <Input
              value={longBreak}
              onChange={(e) => setLongBreak(e.target.value)}
            />
          </Menu.Item>
          <Menu.Item key="4" icon={<CheckCircleOutlined />}>
            <Button
              onClick={() => {
                dispatch(
                  change_time({
                    workTime: Number(workTime),
                    shortBreak: Number(shortBreak),
                    longBreak: Number(longBreak),
                  })
                ) && dispatch(reset_pomodoro());
                setCollapsed(true);
              }}
            >
              Save
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};
