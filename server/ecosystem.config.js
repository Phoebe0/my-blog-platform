module.exports = {
    apps: [{
        name: "my-blog-platform",
        script: "src/index.ts",  // 改回TS源文件
        interpreter: "node",     // 新增解释器指定
        interpreter_args: "-r ts-node/register", // 新增TS加载参数
        watch: true,
        ignore_watch: ["node_modules", "client"], // 新增忽略监控目录
        env: {
            NODE_ENV: "production"
        }
    }]
}
