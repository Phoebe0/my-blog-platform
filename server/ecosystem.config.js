module.exports = {
    apps: [{
        name: "my-blog-platform",
        script: "dist/index.js",  // 指向编译后的文件
        watch: true,
        env: {
            NODE_ENV: "production"
        }
    }]
}
