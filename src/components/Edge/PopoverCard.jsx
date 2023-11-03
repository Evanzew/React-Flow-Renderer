import React from "react";
import { useStore } from 'react-flow-renderer';

export default function PopoverCard({ edge, source, target }) {
  const nodeData = useStore(store => store.nodeInternals);

  const sourceNode = nodeData.get(source);
  const targetNode = nodeData.get(target);

  return (
    <div className="linkedge-card">
      <div className="linkedge-card-item">
        <div className="linkedge-card-item__title">{sourceNode?.data.label}</div>
        <div className="linkedge-card-item__tips">{sourceNode?.data.remark}</div>
      </div>
      <div className="linkedge-card-item__icon">-&gt;</div>
      <div className="linkedge-card-item">
        <div className="linkedge-card-item__title">{targetNode?.data.label}</div>
        <div className="linkedge-card-item__tips">{targetNode?.data.remark}</div>
      </div>
    </div>
  );
}
