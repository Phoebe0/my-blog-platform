module.exports = {
    apps: [{
        name: "my-blog-platform",
        script: "src/index.ts",
        interpreter: "node",
        interpreter_args: "--loader=ts-node/esm --no-warnings --experimental-specifier-resolution=node",
        cwd: "/Users/mac/Desktop/Project/my-blog-platform/server", // 添加绝对路径
        watch: true,
        ignore_watch: ["node_modules", "client"],
        env: {
            NODE_ENV: "production",
            TS_NODE_SKIP_PROJECT: "1",
            TS_NODE_FILES: "true" // 新增文件解析参数
        }
    }]
}
