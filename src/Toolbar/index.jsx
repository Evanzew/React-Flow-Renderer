import React from "react";
import classnames from "classnames";
import { useEdges, useNodes, useStore } from "react-flow-renderer";

export default function Toolbar() {
  const store = useStore((store) => store);
  const nodes = useNodes();
  const edges = useEdges();

  // 保存
  const handleSave = () => {
    console.log('flowData', store);
    console.log('nodes', nodes);
    console.log('edges', edges);
  };

  return (
    <div className="toolbar">
      <button className={classnames(["button", "primary-btn"])} onClick={handleSave}>
        保存
      </button>
    </div>
  );
}
