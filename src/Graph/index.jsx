// Graph/index.jsx

import React, { useEffect, useRef } from "react";
import ReactFlow, { Controls, Background, useStoreApi, useNodesState, useEdgesState, ConnectionMode, ConnectionLineType } from "react-flow-renderer";
import RelationNode from "../components/Node/RelationNode";
import LinkEdge from "../components/Edge/LinkEdge";
import { SET_RULE_CHAIN_NODE } from "../store/constant";
import { useDispatch } from "react-redux";
import store from '../store/index';

// 自定义节点
const nodeTypes = {
  action: RelationNode,
  input: RelationNode,
  filter: RelationNode
};

const initialNodes = [
  {
    "id": "rmGjd9wV",
    "position": {
      "x": 166,
      "y": 186.15625
    },
    "type": "action",
    "data": {
      "remark": "",
      "label": "log",
      "name": "Device Profile Node"
    }
  },
  {
    "id": "FkJ6fZXD",
    "position": {
      "x": 450.5871518688318,
      "y": 184.88856445984584
    },
    "type": "filter",
    "data": {
      "remark": "",
      "label": "message type switch",
      "name": "Message Type Switch"
    }
  },
  {
    "id": "dbcQnBFm",
    "type": "input",
    "position": {
      "x": 172,
      "y": 76.15624999999999
    },
    "data": {
      "remark": "",
      "label": "Input",
      "name": "Input"
    }
  },
  {
    "id": "nPShQS8w",
    "type": "action",
    "position": {
      "x": 296.9909878477973,
      "y": 382.0837369997447
    },
    "data": {
      "remark": "",
      "label": "save timeseries",
      "name": "Save Timeseries"
    }
  },
  {
    "id": "YzgZofhz",
    "type": "action",
    "position": {
      "x": 355.5475832080733,
      "y": 22.779512214715282
    },
    "data": {
      "remark": "",
      "label": "save attributes",
      "name": "Save Client Attributes"
    }
  },
  {
    "id": "fZLjKW7O",
    "type": "action",
    "position": {
      "x": 574.5119877144423,
      "y": -12.961588911877016
    },
    "data": {
      "remark": "",
      "label": "log",
      "name": "Log RPC from Device"
    }
  },
  {
    "id": "663Zl2wO",
    "type": "action",
    "position": {
      "x": 865.2110891077447,
      "y": -7.618566513387066
    },
    "data": {
      "remark": "",
      "label": "log",
      "name": "Log Other"
    }
  },
  {
    "id": "jd3YtwrR",
    "type": "action",
    "position": {
      "x": 1045.4829205189726,
      "y": 6.268242766061011
    },
    "data": {
      "remark": "",
      "label": "rpc call request",
      "name": "RPC Call Request"
    }
  }]
const initialEdges = [{
  "id": "reactflow__edge-rmGjd9wVnull-FkJ6fZXDnull",
  "source": "rmGjd9wV",
  "sourceHandle": null,
  "target": "FkJ6fZXD",
  "targetHandle": null,
  "type": "link",
  "label": "Success"
},
{
  "source": "dbcQnBFm",
  "sourceHandle": null,
  "target": "rmGjd9wV",
  "targetHandle": null,
  "type": "link",
  "label": "",
  "id": "reactflow__edge-dbcQnBFmnull-rmGjd9wVnull"
},
{
  "source": "FkJ6fZXD",
  "sourceHandle": null,
  "target": "nPShQS8w",
  "targetHandle": null,
  "type": "link",
  "label": "Post telemetry",
  "id": "reactflow__edge-FkJ6fZXDnull-nPShQS8wnull"
},
{
  "source": "FkJ6fZXD",
  "sourceHandle": null,
  "target": "YzgZofhz",
  "targetHandle": null,
  "type": "link",
  "label": "Post attributes",
  "id": "reactflow__edge-FkJ6fZXDnull-YzgZofhznull"
},
{
  "source": "FkJ6fZXD",
  "sourceHandle": null,
  "target": "fZLjKW7O",
  "targetHandle": null,
  "type": "link",
  "label": "RPC Request from Device",
  "id": "reactflow__edge-FkJ6fZXDnull-fZLjKW7Onull"
},
{
  "source": "FkJ6fZXD",
  "sourceHandle": null,
  "target": "663Zl2wO",
  "targetHandle": null,
  "type": "link",
  "label": "Other",
  "id": "reactflow__edge-FkJ6fZXDnull-663Zl2wOnull"
},
{
  "source": "FkJ6fZXD",
  "sourceHandle": null,
  "target": "jd3YtwrR",
  "targetHandle": null,
  "type": "link",
  "label": "RPC Request from Device",
  "id": "reactflow__edge-FkJ6fZXDnull-jd3YtwrRnull"
}
]

function getHash(len) {
  let length = Number(len) || 8;
  const arr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
  const al = arr.length;
  let chars = "";
  while (length--) {
    chars += arr[parseInt(Math.random() * al, 10)];
  }
  return chars;
}

export default function FlowGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = React.useState(null);
  const flowStore = useStoreApi();
  const dispatch = useDispatch();
  // 画布的 DOM 容器，用于计算节点坐标
  const graphWrapper = useRef(null);

  // 自定义连线
  const edgeTypes = {
    link: LinkEdge,
  };

  // 画布加载完毕，保存当前画布实例
  const onLoad = (instance) => setRfInstance(instance);
  // 连线
  const onConnect = (params) => {
    const id = `reactflow__edge-${params.source}}-${params.target}`;
    const currentNodes = flowStore.getState().nodeInternals;
    const isInput = currentNodes.get(params.source)?.type === 'input';

    setEdges((eds) =>
      (eds || []).concat({
        id,
        source: params.source,
        target: params.target,
        label: 'Edge Label',
        type: isInput ? 'input' : 'link',
        ...params
      })
    );
  }


  // 拖拽完成后放置节点
  const onDrop = (event) => {
    const current = graphWrapper.current;
    const reactFlowBounds = current?.getBoundingClientRect();

    const newNodeData = JSON.parse(
      event.dataTransfer.getData('application/reactflownode')
    );

    const { type, name, label, remark } = newNodeData;

    const position = rfInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });

    const newNode = {
      id: getHash(),
      type,
      position,
      data: { label, name, remark },
      name
    };

    // 获取更新前的节点数组
    let states = store.getState();
    const existingNodes = states.ruleChainReducer.nodes;
    const newNodes = [...existingNodes, newNode]; // 构建新的节点数组

    dispatch({ type: SET_RULE_CHAIN_NODE, data: newNodes }); // 分发action，更新节点数组
    setNodes(newNodes); // 更新React Flow中的节点数组
  };

  const onDragOver = (event) => {
    event.preventDefault(); // 不知道为啥这个一定需要，否则无法拖拽成功
    event.dataTransfer.dropEffect = 'move';
  };

  useEffect(() => {
    dispatch({ type: SET_RULE_CHAIN_NODE, data: initialNodes });
  }, [dispatch])
  return (
    <div className="graph" ref={graphWrapper}>
      <ReactFlow
        color="#000"
        defaultPosition={[-110, 176]}
        connectionMode={ConnectionMode.Loose}
        connectionLineType={ConnectionLineType.Bezier}
        defaultZoom={0.95}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onInit={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragCapture={onDragOver}
        fitView
      >
        <Controls />
        <Background variant="lines" color="#c0c0c0" />
      </ReactFlow>
    </div>
  );
}
