# react-flow-demo-app

基于 `react-flow-renderer` 构建流程图，可拖拽添加节点。

文章地址：[https://blog.csdn.net/m0_73117087/article/details/133357124](https://blog.csdn.net/m0_73117087/article/details/133357124)

参考文章地址：[https://www.cnblogs.com/wisewrong/p/15638354.html](https://www.cnblogs.com/wisewrong/p/15638354.html)

<br />

### 启动项目

```
yarn & yarn start
```

### 项目改动
在作者的基础上进行了一些定制化改动，若有侵权，请及时联系

- 1. 升级react-flow-renderer到最新版本，使用库中最新的api。
- 2. 更新edge中间的连线，使其能够弹窗修改label。
- 3. 自定义每个节点的名字。
- 4. 增加节点类型树结构。
- 5. 因为项目内使用的是redux，将`useContext` 改成使用``reudx`（不知是更好的决定还是反向操作）。