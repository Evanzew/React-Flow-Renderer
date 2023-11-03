import { CLOSE_RULE_CHAIN_MODAL, OPEN_RULE_CHAIN_MODAL, SET_RULE_CHAIN_NODE } from '../constant';

const initState = {
  nodes: [],
  // 弹窗信息
  modalConfig: {
    visible: false,
    node: null
  }
};

export default function ruleChainReducer(
  state = {
    ...initState
  },
  action
) {
  // 从action对象中获取：type,data
  const { type, data } = action;

  // 根据type决定加工数据
  switch (type) {
  case OPEN_RULE_CHAIN_MODAL:
    return {
      ...state,
      modalConfig: {
        visible: true,
        node: data
      }
    };
  case CLOSE_RULE_CHAIN_MODAL:
    return {
      ...state,
      modalConfig: {
        visible: false,
        node: null
      }
    };
  case SET_RULE_CHAIN_NODE:
    return {
      ...state,
      nodes: data
    };
  default:
    return state;
  }
}
