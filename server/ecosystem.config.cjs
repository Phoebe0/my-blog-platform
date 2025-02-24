// 修改文件后缀为 .cjs
module.exports = {
    apps: [{
        name: "my-blog-platform",
        script: "src/index.ts",
        interpreter: "node",
        // 更新为最新的加载器参数
        interpreter_args: "--loader=ts-node/esm --no-warnings",
        watch: true,
        ignore_watch: ["node_modules", "client"],
        env: {
            NODE_ENV: "production",
            TS_NODE_SKIP_PROJECT: "1" // 添加此参数避免 TS 配置冲突
        }
    }]
}
