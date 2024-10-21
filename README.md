# fish-tools README

# 启动

## 1

npm i

"watch": "npm-run-all -p watch:\*",
"watch:extension": "tsc -watch -p ./",
"watch:views": "webpack --watch --mode development",

## 2

vscode -> 运行 -> 启动调试 -> 插件开发

# 打包

# 作用

该插件可以用于查看微博热搜前 20

# 描述

使用前，请登录 pc 微博，复制 cookie 到设置中

在活动栏中，点击 fish weibo 可以查看，点击热搜，打开热搜详情。
默认 30 分钟刷新一次
可自行在设置中配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/d811df3173f84d00a6c533b25b72b6b2.png)
