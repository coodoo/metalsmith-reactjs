var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');
var coffee      = require('metalsmith-coffee');
var sass        = require('metalsmith-sass');
var debug       = require('debug')('jx-app');
var template    = require('metalsmith-reactjs');

// 重要：示範了如何自定義一個 plugin
// 這個 plugin 功能就是單純檢查每個 post md 內的 yaml 是否有標上 template: blog.hbt 字段
var findTemplate = function(config) {
    
    // 依 config 的內容建立 regex 條件
    var pattern = new RegExp(config.pattern);

    // 傳入
    // 一堆 files
    // metalsmith ref
    // done callback
    return function(files, metalsmith, done) {
        
        console.log( 'files', files );

        for (var file in files) {
            if (pattern.test(file)) {
                var _f = files[file];

                if (!_f.template) {
                    // 如果該篇 post.md 內的 yaml 沒標示 template，就加上去
                    _f.template = config.templateName;
                }
            }
        }
        done();
    };
};

// 主程式
Metalsmith(__dirname)
    
    // 內容分成兩類，pages 與 posts    
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    
    // .use(findTemplate({
    //     pattern: 'posts',   // 這是讀 collections 的內容
    //     templateName: 'post.hbt'  // 然後指定用 post.hbt 模板
    // }))

    // 內容轉 markdown
    .use(markdown())
    
    // 將 first-post.html 轉換成 first-post/index.html
    // 目地是在仿 REST end point 的命名方式，因此訪問時是寫
    // localhost/posts/first-post/ → 它就直接抓下面的 index.html 來顯示
    .use(permalinks({
        pattern: ':collection/:title'
    }))

    // 啟動 template engine
    // staticPage = true 的話，會用 renderToStaticMockup() 來生成，即不會帶 data-react-id
    .use( template({
        staticPage: true, 
        templateDir: __dirname + '/templates/' 
    }))

    // 處理 sass
    .use(sass({
        outputStyle: 'compressed'
    }))

    // 處理 coffee
    .use(coffee())

    // 指定輸出目錄
    .destination('./build')
    
    // 開始建每一頁
    // 並且加上 err callback
    .build(function(err, files) {
        if (err) { throw err; }
    });



