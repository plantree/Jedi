## Step2 技术栈

Jedi的开发目标，是一个**面向内容的**、**轻量级**、**易部署和管理**的个人网站框架。第一个初始版本仅提供核心的功能，后面会根据实际使用的需要来增加新的特性，尽量保持整个框架的简单、易用，并提供一定程度的可配置能力（不作为核心特征）。

整个网站是由[袁航](https://github.com/santana2000)和[王鹏远](https://github.com/plantree)两个人协同开发，一个负责前端，一个负责后端；一个在西安，一个在上海，都是通过一系列工具和原则完成整个的开发工作。

协同的工具主要有：

- Git/Github
- WeChat
- Swagger
- Travis CI

开发原则：

- 前后端功能解耦，仅依赖一套定义良好的接口
- 测试驱动开发（TDD）
- 持续集成（Continuous Integration, CI）
- 文档完整

#### 前端

##### 整体
• 框架：Vue3（页面路由）
• 组件：Element-UI （或考虑自己实现）
• 接口请求：Axios
• 数据模拟：Mock
• 跨域：Nginx代理
• 布局：上下两栏 + Flex
• css预编译：Less
• Web容器：
• 语法尽量使用ES6
##### 细节
• 首页：markdown格式文章的读取显示 （需学习）
• 分类：box显示分类（可考虑词云式tag）
• 归档：echart、antv等可视化表达
• 关于：
##### UI设计
• 色调：浅色 （冷色？暖色？）
• 风格：

#### 后端

##### 后端服务

- Nodejs
- Koa2
- MongoDB

##### 部署

- Docker
- CentOS

