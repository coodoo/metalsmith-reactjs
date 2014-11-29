var debug = require('debug')('metalsmith-reactjs');
var each = require('async').each;
var extend = require('extend');
var React = require('react');
require('node-jsx').install();

module.exports = plugin;

// 我寫的 jsx template 功能
// 取代了原本 metalsmith-templates 的指令
function plugin( opts ){

    // 這是 plugin 接口，接收外界傳入的多個參數
    opts = opts || {};
    
    // 預設為 static，也就是不生成 data-react-id 資料
    // 但如果想操作 react component 的話，就要設為 false
    var staticPage = opts.staticPage;

    if( staticPage==undefined ) staticPage = true;
    
    // 用 metalsmith.path() 才能保持正確的 working directory，不然會鎖在 module 工作目錄下
    var templateDir = opts.templateDir || metalsmith.path('./templates/');

    // 內部一律返還一個 function 供外界操作
    return function template( files, metalsmith, done ){
        
        var metadata = metalsmith.metadata();

        // 檢查每份 md 是否有指定 template 名稱
        function check(file){
          var data = files[file];
          var tmpl = data.template;
          if(!tmpl) return false;
          return true;
        }

        var arr = Object.keys(files);
        
        // 處理 file.contents 
        arr.forEach(function(file){
          if (!check(file)) return;
          debug('stringifying file: %s', file);
          var data = files[file];
          data.contents = data.contents.toString();
        });

        //
        each( arr, convert, done);

        // 真正將資料灌入模版以生成頁面的地方
        function convert(file, done){
          
          //
          if (!check(file)) return done();
          
          debug('converting file: %s', file);
          
          var data = files[file];
          var dataPack = extend({}, metadata, data);

          // 取得要用的模版名稱
          var templateName = data.template;

          // 操作早先自定義好的 render() function
          render( templateDir, templateName, dataPack, staticPage, function(err, str){
            
            if (err) return done(err);

            // 將套好模版後的字串塞回 data.contents 屬性裏，type 為 Buffer
            // 注意下面的 str 是上面 callback 裏第二個參數，也就是轉換後的結果字串
            data.contents = new Buffer(str);
            
            debug('\n\nconverted file: %s', file);
            
            done();
          });
        }
    }

}

// 真正操作 jsx 元件並餵入資料的地方
function render( templateDir, templateName, dataPack, isStatic, cb ){


    console.log('\nrender: ', templateName/*, '\n>DataPack: ', dataPack*/ );

    // 取得指定的模板(jsx檔案)
    var TempComp = React.createFactory( require( templateDir + templateName ) );

    // 餵資料到元件模板內讓它繪出
    var temp = new TempComp( dataPack );

    var str;

    // 將 react 元件轉成 str
    if( isStatic ){
        str = React.renderToStaticMarkup( temp );
    }else{
        str = React.renderToString( temp );
    }

    cb( null, str );
}
