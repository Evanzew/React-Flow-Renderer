// flow.jsx

import React from 'react';
import Sider from './Sider';
import Graph from './Graph';
import Modal from './components/Modal';
// 引入 Provider

import './flow.css';
import { Provider } from 'react-redux';
import store from './store';
import { ReactFlowProvider } from 'react-flow-renderer';
import Toolbar from './Toolbar';

export default function FlowPage() {
  return (
    <div className="container">
      <Provider store={store}>
        <ReactFlowProvider>
          {/* 顶部工具栏 */}
          <Toolbar />
          <div className="main">
            {/* 侧边栏，展示可拖拽的节点 */}
            <Sider />
            {/* 画布，处理核心逻辑 */}
            <Graph />
          </div>
          {/* 弹窗，配置节点数据 */}
          <Modal />
        </ReactFlowProvider>
      </Provider>
    </div>
  );
}
