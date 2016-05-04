var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);        // 设置服务端口
app.set('views', path.join(__dirname, 'views'));  // 页面文件夹路径
console.log("__dirname = " + __dirname);          // __dirname:文件所在目录的完整绝对路径 /Users/Brave/Desktop/Node/practicalnode/ch3/blog-express
app.set('view engine', 'jade');                   // 设置模板类型

// 设置页面路由(此处是全局的)
app.all('*', function(req, res) {
  // 返回 index.jade模板并赋值渲染成HTML
  res.render('index', {msg: 'Welcome to the Practical Node.js!'})
})

// http.createServer(app).listen(app.get('port'), function(){
  // console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);

// 启动服务
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
}

// 停止服务
var shutdown = function() {
  server.close();
}

// 判断进入条件 require.main变量 : 可以用来检测一个模块是否为应用程序的主模块
if (require.main === module) {
  console.info('require.main === module')
  boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}