// Modal/index.jsx

import React, { useRef } from "react";
import RelationNodeForm from "./RelationNodeForm";
import { EnhancedDialog } from "../EnhanceDialog/EnhancedDialog";
import { connect, useDispatch } from "react-redux";
import { CLOSE_RULE_CHAIN_MODAL } from "../../store/constant";

export  function FlowModal(props) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const { modalConfig } = props;

  const handleOk = () => {
    // 组件内部需要暴露一个 submit 方法
    formRef.current.submit().then(() => {
    });
  };
  const handleCancel = () => dispatch({ type: CLOSE_RULE_CHAIN_MODAL });

  const Component = RelationNodeForm;

  return (
    <EnhancedDialog
      title="编辑节点"
      visible={modalConfig.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maxWidth="xs"
    >
      {Component && <Component events={formRef} />}
    </EnhancedDialog>
  );
}


// redux获取当前flow的数据
const mapStateToProps = (state) => {
  const { modalConfig } = state.ruleChainReducer;

  return {
    modalConfig
  };
};

export default connect(mapStateToProps)(FlowModal);
