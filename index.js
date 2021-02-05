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

// result: 存放查找结果的数组
// nodes: 要遍历的节点数组
// tag: 要查找的指定的tag
function getNode(result, nodes, tag) {
  if (!result || !nodes || !tag) {
    return;
  }

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].tags && nodes[i].tags.length) {
      if (nodes[i].tags.indexOf(tag) === 0) {
        result.push(nodes[i]);
      }
    }

    getNode(result, nodes[i].children, tag);
  }
}

var canvas = new Le5leTopology.Topology('topo-canvas', {
  on: function (event, data) {
    console.log(event, data);
  },
});

// 等待js加载
setTimeout(() => {
  window.registerTools();
  window.registerIot({ key: '', value: '' });
}, 1000);

fetch('/data.json', function (text) {
  var data = JSON.parse(text);
  // 锁定画布，禁止编辑
  data.locked = 1;
  console.log(data);
  canvas.open(data);

  // 动画演示示例
  var cnt = 0;
  var colors = ['red', 'blue', 'yellow'];
  setInterval(() => {
    ++cnt;
    var nodes = [];
    getNode(nodes, canvas.data.nodes, 'testImage');
    for (var i = 0; i < nodes.length; i++) {
      if (cnt % 2) {
        nodes[i].image = '/image/s01g_374d46e9c71c823a.png';
      } else {
        nodes[i].image = '/image/g02__bdfcbc32cfc689bc.png';
      }
    }

    nodes = [];
    getNode(nodes, canvas.data.nodes, 'testNum');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].text = +nodes[i].text + 1 + '';
      nodes[i].font.color = colors[cnt % 3];
    }
    canvas.render();
  }, 2000);
  // end.
});
