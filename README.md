# Jedi
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

#### 背景

今天是2020年8月4日。其实和袁狗两个人很早就想着一起开发一个个人网站，前后端分离：他负责前端，我负责后端。一方面借助这样一个项目提升自己的工程开发和团队协作经验，另外就是有个个人网站作为CMS（Content Management System，内容管理系统），不仅倒逼自己及时总结，无论是技术还是人生经验（学习阮一峰老师），另外也可作为个人过往经历的背书。

以前开发过一个个人网站，[https://plantree.me](https://plantree.me)，但那还是本科期间的事情。当时什么都不懂，一头扎进Web的海洋里，从域名的申请，到DNS解析，云服务器的管理，前后端代码的编写，Git的版本管理控制，对于我这样一个非计算机科班出身的人而言，并不是一件很简单的事情。多数时候遇到问题身边也没有合适的人来问，基本都是依赖搜索引擎解决。

当然，回过头看，当初的网站无比稚嫩，而第一版已不再运行。因为研究生期间重构了第二版，前端代码依旧简洁，甚至还在后端用Python实现了一个小型的搜索引擎和简单推荐系统。界面如下：

![image-20200804204010579](https://img.plantree.me/image-20200804204010579.png)

秋招的时候还把它作为一个小的项目，在面试官面前侃侃而谈。虽然朴素，但是所有的代码和功能都是自己一点点琢磨出来，洞悉每一处细节，故此谈论的时候非常自信。

但是伴随自己走上工作岗位，更多地了解到工业级产品的开发流程后，觉得当初的自己，开发规范还是颇为欠缺，也遗留下很多问题。这也是这次重新进行迭代的初衷！

最大的一个问题是，文章发布十分繁琐，而且部署困难。这导致导致后期文章更新很慢，完全背离了“简单”的初衷。

关于现有公开的博客工具，也做过一些简单的调研。其中，WordPress有点厚重，虽然定制化能力强，但还是有些复杂。试了下Hexo，基于Markdown，配置化的能力很强。但是很多服务，像是阅读量、评论等依赖第三方服务，难以保证可靠性。

综合以上考虑，目标就非常清晰了。

#### 目标

开发一个轻量级、部署简易、仅保留必要配置项、且文章发布/修改简单的个人博客管理系统。

#### 开发过程

- [x] 2020.07.31-2020.08.16 个人网站功能调研
- [x] 2020.08.16-2020.10.10 功能明确+技术栈
- [x] 2020.10.10-2020.10.20 接口初步设计
- [ ] 

#### 工具链

##### 协同

- Github/Git
- Swagger
- Travis CI
- WeChat

##### 前端

- Vue3

##### 后端

- Node.js+Koa2
- MongoDB
- Docker

#### 总结

