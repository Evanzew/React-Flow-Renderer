import React, { useState } from "react";
import {
  getSmoothStepPath,
  getEdgeCenter,
  getMarkerEnd,
  useStore,
  useReactFlow,
  MarkerType,
} from "react-flow-renderer";
import PopoverCard from "./PopoverCard";
import EdgeButton from "./EdgeButton";
import { TextField } from "@mui/material";
import { EnhancedDialog } from "../EnhanceDialog/EnhancedDialog";

const foreignObjectSize = 50;
const foreignObjectwidth = 200;

// 查找连线关联的节点
function getRelationNodeByEdge(id, edges) {
  if (!Array.isArray(edges)) {
    return null;
  }

  for (let i = 0; i < edges.length; i++) {
    const item = edges[i];
    if (item.id === id) {
      return {
        edge: id,
        source: item.source,
        target: item.target,
        label: item.label,
      };
    }
  }
}

export default function LinkEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {
    markerEnd: { type: 'arrow', color: '#f00' }
  },
  target
}) {
  // 传入 PopoverCard 的参数，包含 source、target
  const edges = useStore((store) => store.edges); 
  const currentEdge = edges.find((edge) => edge.id === id);
  const [model, setModel] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edgeLinkLabel, setEdgeLinkLabel] = React.useState(currentEdge?.label);
  const { setEdges } = useReactFlow(); // 使用useReactFlow钩子获取setEdges函数

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setModel(getRelationNodeByEdge(id, edges));
  };

  const handleClose = () => {
    setModel(getRelationNodeByEdge({}));
    setAnchorEl(null);
  };

  
  /**
   * 点击确定按钮时触发的处理函数
   */
  const handleOkClick = () => {
    setEdges(
      edges.map((edge) => {
        if (edge.id === currentEdge?.id) {
          edge.label = edgeLinkLabel;
        }

        return edge;
      })
    );

    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const markerEnd = getMarkerEnd(MarkerType.Arrow, target);
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectwidth}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
      >
        <EdgeButton
          size="small"
          label={currentEdge?.label}
          onClick={handleClick}
        />
        <EnhancedDialog
          title="编辑链接"
          visible={open}
          onOk={handleOkClick}
          onCancel={handleClose}
          maxWidth="xs"
        >
          <PopoverCard {...model} />
          <TextField
            value={edgeLinkLabel}
            onChange={(e) => {
              setEdgeLinkLabel(e.target.value);
            }}
            fullWidth
            size="small"
            variant="outlined"
            name="edgeLinkLabel"
            sx={{ mt: 2 }}
          />
        </EnhancedDialog>
      </foreignObject>
    </>
  );
}
