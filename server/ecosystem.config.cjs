module.exports = {
    apps: [{
        name: "my-blog-platform",
        script: "./src/index.ts",
        interpreter: "node",
        cwd: __dirname,
        watch: true,
        ignore_watch: ["node_modules", "client"],
        interpreter_args: [
            "--loader=ts-node/esm",
            "--no-warnings",
            "--experimental-specifier-resolution=node"
        ].join(' '),
        env: {
            NODE_ENV: "production",
            TS_NODE_SKIP_PROJECT: "1",
            TS_NODE_FILES: "true" // 新增文件解析参数
        }
    }]
}
