import { memo, useCallback, useMemo } from "react";
import { Collapse } from "antd";

import { SHAPE_LIST } from "@/assets/js/shape";
import events from "@/bus";
import SplitLine from "@/components/splitLine";
import { ShapeItem } from "@/types/shape";

import { MenuItem } from "./type";

import style from "./index.module.less";

function Menu() {
  const menus = useMemo(
    () => [
      {
        type: "Text",
        icon: "i_text",
        title: "文本",
      },
      {
        type: "Rect",
        icon: "i_rect",
        title: "矩形",
      },
      {
        type: "Circle",
        icon: "i_circle",
        title: "圆形",
      },
      {
        type: "Triangle",
        icon: "i_triangle",
        title: "三角形",
      },
    ],
    []
  );

  const clickHandle = useCallback((type: string) => {
    events.emit("createElement", type);
  }, []);

  const shapeClickEvent = useCallback(
    (shape: {
      path: string;
      viewBox: [number, number];
      outlined?: boolean;
    }) => {
      events.emit("createElement", "svg", {
        svg: `<svg 
         xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          width="18"
          height="18">
          <g transform="scale(${18 / shape.viewBox[0]}, ${
          18 / shape.viewBox[1]
        }) translate(0,0) matrix(1,0,0,1,0,0)">
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="butt"
              strokeMiterlimit="8"
              fill="${shape.outlined ? "#999" : "transparent"}"
              stroke="${shape.outlined ? "transparent" : "#999"}"
              strokeWidth="2"
              d="${shape.path}"
            ></path>
          </g>              
        </svg>`,
        shape,
      });
    },
    []
  );

  return (
    <div className={style["menu-component"]}>
      <SplitLine
        style={{
          marginTop: "10px",
        }}
        title="基础元素"
      />
      <div className={style["menu-container"]}>
        {menus.map((item: MenuItem) => (
          <div
            onClick={() => clickHandle(item.type)}
            key={item.icon}
            className={style["menu-item"]}
          >
            <i className={`iconfont ${item.icon} ${style.icon}`}></i>
            <span
              style={{
                fontSize: "13px",
              }}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
      <SplitLine
        style={{
          marginTop: "10px",
        }}
        title="更多图形"
      />
      <div className={style["menu-shape-container"]}>
        <Collapse
          ghost
          items={SHAPE_LIST.map((item: ShapeItem) => ({
            key: item.type,
            label: item.type,
            children: (
              <div className={style["menu-shape-list"]}>
                {item.children.map(
                  (shape: {
                    path: string;
                    viewBox: [number, number];
                    outlined?: boolean;
                  }) => (
                    <div
                      onClick={() => shapeClickEvent(shape)}
                      className={style["shape-item"]}
                      key={shape.path}
                    >
                      <svg
                        className={style["shape-svg"]}
                        overflow="visible"
                        width="18"
                        height="18"
                      >
                        <g
                          transform={`scale(${18 / shape.viewBox[0]}, ${
                            18 / shape.viewBox[1]
                          }) translate(0,0) matrix(1,0,0,1,0,0)`}
                        >
                          <path
                            className={style["shape-path"]}
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="butt"
                            strokeMiterlimit="8"
                            fill={`${shape.outlined ? "#999" : "transparent"}`}
                            stroke={`${
                              shape.outlined ? "transparent" : "#999"
                            }`}
                            strokeWidth="2"
                            d={shape.path}
                          ></path>
                        </g>
                      </svg>
                    </div>
                  )
                )}
              </div>
            ),
          }))}
        />
      </div>

      {/* <div className={style["menu-shape-container"]}>
        {SHAPE_LIST.map((item: ShapeItem) => (
          <div key={item.type} className={style["menu-shape-group"]}>
            <div className={style["menu-shape-title"]}>{item.type}</div>
            <div className={style["menu-shape-list"]}>
              {item.children.map(
                (shape: {
                  path: string;
                  viewBox: [number, number];
                  outlined?: boolean;
                }) => (
                  <div
                    onClick={() => shapeClickEvent(shape)}
                    className={style["shape-item"]}
                    key={shape.path}
                  >
                    <svg
                      className={style["shape-svg"]}
                      overflow="visible"
                      width="18"
                      height="18"
                    >
                      <g
                        transform={`scale(${18 / shape.viewBox[0]}, ${
                          18 / shape.viewBox[1]
                        }) translate(0,0) matrix(1,0,0,1,0,0)`}
                      >
                        <path
                          className={style["shape-path"]}
                          vectorEffect="non-scaling-stroke"
                          strokeLinecap="butt"
                          strokeMiterlimit="8"
                          fill={`${shape.outlined ? "#999" : "transparent"}`}
                          stroke={`${shape.outlined ? "transparent" : "#999"}`}
                          strokeWidth="2"
                          d={shape.path}
                        ></path>
                      </g>
                    </svg>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default memo(Menu);
