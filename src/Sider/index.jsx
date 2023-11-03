// Sider/index.jsx

import React from "react";
import classnames from "classnames";
// import { useStoreState } from "react-flow-renderer";
import { CustomAccordion } from "../components/CustomAccordion/CustomAccordion";

// 可用节点
const allowedNodes = [
  {
    label: "Input Node",
    name: "Input Node",
    className: "input-node",
    type: "input",
    remark: "",
  },
  {
    label: "log",
    name: "log",
    className: "relation-node",
    type: "action", // 这是自定义节点类型
    remark: "",
  },
  {
    label: "save attributes",
    name: "save attributes",
    className: "relation-node",
    type: "action", // 这是自定义节点类型
    remark: "",
  },
  {
    label: "rpc call request",
    name: "rpc call request",
    className: "relation-node",
    type: "action", // 这是自定义节点类型
    remark: "",
  },
  {
    label: "save timeseries",
    name: "save timeseries",
    className: "relation-node",
    type: "action", // 这是自定义节点类型
    remark: "",
  },
  {
    label: "message type switch",
    name: "message type switch",
    className: "filter-node",
    type: "filter", // 这是自定义节点类型
    remark: "",
  },
  {
    label: "Output Node",
    name: "Output Node",
    className: "output-node",
    type: "output",
    remark: "",
  },
];

const allowType = ["input", "action", "filter", "output"];

export default function FlowSider() {
  // 获取画布上的节点
  // const nodes = useStoreState((store) => store.nodes);
  const onDragStart = (evt, node) => {
    console.log(node)
    // 记录被拖拽的节点类型
    evt.dataTransfer.setData("application/reactflow", node.type + "," + node.name);
    evt.dataTransfer.setData('application/reactflownode', JSON.stringify(node));
    evt.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sider">
      {allowType.map((type) => (
        <CustomAccordion title={type} key={type}>
          <div className="nodes">
            {allowedNodes.filter(node => node.type === type).map((x, i) => (
              <div
                key={`${x.type}-${i}`}
                className={classnames(["sider-node", x.className])}
                onDragStart={(e) => onDragStart(e, x)}
                draggable
              >
                {x.label}
              </div>
            ))}
          </div>
        </CustomAccordion>
      ))}
    </div>
  );
}
