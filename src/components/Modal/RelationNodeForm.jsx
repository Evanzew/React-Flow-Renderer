import React, { useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { FormContainer, TextFieldElement, TextareaAutosizeElement } from "react-hook-form-mui";
import { CLOSE_RULE_CHAIN_MODAL } from '../../store/constant';
import { useNodes, useReactFlow } from 'react-flow-renderer';
import { connect, useDispatch } from 'react-redux';

function RelationNodeForm(props) {
  const { modalConfig, events } = props

  const { setNodes } = useReactFlow(); // 使用useReactFlow钩子获取setNodes函数
  const flowNodes = useNodes(); // 使用useNodes钩子获取当前节点列表
  const dispatch = useDispatch(); // 获取dispatch函数

  const initialValues = flowNodes.find(
    (node) => node.id === modalConfig.node?.id
  ); // 根据modalConfig中的node.id查找对应的初始值

  const formContext = useForm({
    defaultValues: {
      name: '',
      remark: '',
    }
  })

  async function submit() {
    const isValid = await formContext.trigger();

    if (!isValid) {
      return;
    }

    // 获取表单数据
    const data = formContext.watch();
    const { name, remark } = data

    // 更新节点数组
    setNodes(
      flowNodes.map((node) =>
        node.id === modalConfig.node.id ? { ...node, data: { ...node.data, name, remark } } : node
      )
    );
    dispatch({ type: CLOSE_RULE_CHAIN_MODAL });
  }

  useImperativeHandle(events, () => ({
    submit
  }));

  useEffect(() => {
    formContext.reset({
      name: initialValues?.data.name || "",
      remark: initialValues?.data.remark || ""
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalConfig.node]);

  return (
    <FormContainer formContext={formContext}>
      {/* 节点名称 */}
      <TextFieldElement
        required
        margin="normal"
        fullWidth
        label={'Name'}
        name="name"
        size="small"
        variant="outlined"
      />
      {/* 节点描述 */}
      <TextareaAutosizeElement
        rows={2}
        margin="normal"
        fullWidth
        label={'Remark'}
        name="remark"
        size="small"
        variant="outlined"
      />
    </FormContainer>
  );
}

// redux获取当前flow的数据
const mapStateToProps = (state) => {
  const { modalConfig } = state.ruleChainReducer;

  return {
    modalConfig
  };
};

export default connect(mapStateToProps)(RelationNodeForm);

