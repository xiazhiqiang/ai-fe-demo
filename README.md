# ai-fe-demo

纯前端浏览器运行 ai 模型

## 本地下载模型

- 环境准备

```sh
conda create -n transformerjs python=3.8
conda activate transformerjs
```

- 安装 hugging face cli

```sh
pip install huggingface_hub
```

- 在~/.zshrc 或~/.bashrc 中增加镜像地址：`export HF_ENDPOINT=https://hf-mirror.com`
- 项目根目录执行：

```sh
huggingface-cli download --resume-download [huggingface 的模型 id] --local-dir ./models/[huggingface 的模型 id]
```

## 本地 Demo

```
npx http-server ./ -c-1 --cors='*'
```

[object-detect](http://127.0.0.1:8080/index.html)
[fill-mask](http://127.0.0.1:8080/index2.html)
