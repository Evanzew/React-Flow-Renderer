import * as Actions from '../constant';

// 打开模态框的动作
export const openModal = (data) => ({
  type: Actions.OPEN_RULE_CHAIN_MODAL,
  data
});

// 关闭模态框的动作
export const closeModal = (data) => ({
  type: Actions.CLOSE_RULE_CHAIN_MODAL,
  data
});

// 设置规则链节点的动作
export const setRuleChainNode = (data) => ({
  type: Actions.SET_RULE_CHAIN_NODE,
  data
});

