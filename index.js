// 封装类似的axiso的get请求。真实场景请酌情处理，比如用axiso等http库代替
function fetch(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      cb && cb(xhr.responseText);
    }
  };
}

var canvas = new Le5leTopology.Topology('topo-canvas', {
  on: function (event, data) {
    console.log(event, data);
  },
});

// 等待js加载
setTimeout(() => {
  // 注册普通的企业图形库
  window.registerTools();
  // 注册物联网的企业图形库，参数为授权的license。
  window.registerIot({ key: '', value: '' });
}, 1000);

// 模拟的接口请求
fetch('/data.json', function (text) {
  var data = JSON.parse(text);
  // 锁定画布，禁止编辑
  data.locked = 1;
  canvas.open(data);
});
