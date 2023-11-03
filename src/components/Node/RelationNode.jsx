import React, { useState } from "react";
import { Handle, useNodes, useReactFlow } from "react-flow-renderer";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { OPEN_RULE_CHAIN_MODAL, SET_RULE_CHAIN_NODE } from "../../store/constant";
import { NodeType } from "../../NodeTypes";
import { useDispatch } from "react-redux";

// 编辑菜单
const EditMenu = (props) => {
  const { anchorEl, open, handleClose, ...node } = props;
  const { setNodes } = useReactFlow();
  const dispatch = useDispatch();
  const nodes = useNodes();
  const edit = () => {
    dispatch({
      type: OPEN_RULE_CHAIN_MODAL,
      data: node
    });
    handleClose();
  };
  const remove = () => {
    setNodes(nodes.filter((item) => item.id !== node.id));
    // 更新节点对象并分发action
    dispatch({
      type: SET_RULE_CHAIN_NODE,
      data: nodes.filter((item) => item.id !== node.id)
    });
  };
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem key="1" onClick={edit}>
        编辑
      </MenuItem>
      <MenuItem key="2" onClick={remove}>
        删除
      </MenuItem>
    </Menu>
  );
};



const RelationNode = (props) => {
  const { ...currentNode } = props;

  // Menu用的方法
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classMap = new Map([
    ["action", "relation-node"],
    ["input", "relation-node input-node"],
    ["filter", "relation-node filter-node"],
  ]);

  return (
    <div className={classMap.get(currentNode.type)}>
      <div className="relation-node-title">
        {currentNode.type !== NodeType.input && currentNode.data.label}
        {currentNode.type !== NodeType.input && <br />}
        {currentNode.data.name}
      </div>
      <div className="relation-node-action">
        {currentNode.type !== NodeType.input && (
          <IconButton size="small" onClick={handleClick}>
            <MoreVertIcon fontSize="inherit" />
          </IconButton>
        )}
        <EditMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          {...props}
        />
      </div>
      {/* 提供一个入口和一个出口 */}
      {currentNode.type !== NodeType.input && (
        <Handle type="target" position="left" isConnectable={currentNode.isConnectable} />
      )}
      <Handle type="source" position="right" isConnectable={currentNode.isConnectable} />
    </div>
  );
};

export default React.memo(RelationNode);
