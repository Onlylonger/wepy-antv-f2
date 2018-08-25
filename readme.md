# antv/f2 wepy

> antv/f2 小程序 wepy 组件版本

## 使用

> template

```html
<F2Canvas :opts="opts" canvasId="circle" width="750" height="400"></F2Canvas>
```

> script

```js
import F2Canvas from 'wepy-antv-f2/F2Canvas';
import F2 from 'mini-program-utils/dist/f2/adapterF2';

const now = Date.now();
const unit = 1000 * 60 * 60 * 24;

const initChart = (canvas, width, height) => {
  // mock 数据
  var data = [
    {
      score: 0
    },
    {
      score: 30
    },
    {
      score: 60
    },
    {
      score: 50
    },
    {
      score: 45
    },
    {
      score: 66
    },
    {
      score: 88
    },
    {
      score: 90
    },
    {
      score: 92
    }
  ];
  const len = data.length;
  // 增加近期时间
  data.forEach((v, i) => {
    v.time = now - (len - i - 1) * unit;
  });
  // 实例话chart表格
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    pixelRatio: sysInfo.pixelRatio
  });
  // 关闭tooltip
  chart.tooltip(false);
  // 创建渐变
  const grd = canvas.ctx.createLinearGradient(0, 0, 0, height);
  grd.addColorStop(0, '#FB3F7C');
  grd.addColorStop(1, 'white');
  // 载入数据
  chart.source(data, {
    time: {
      type: 'timeCat',
      formatter(value, index) {
        const date = new Date(value);
        const nowDate = new Date();
        if (date.getDate() === nowDate.getDate()) return '今天';
        else return date.getDate();
      },
      tickCount: data.length
    },
    score: {
      tickInterval: 20,
      max: 100,
      nice: false,
      min: 0
    }
  });
  // 坐标轴 文本字体
  chart.axis('time', {
    label: (text, index, total) => {
      const cfg = {
        textAlign: 'center',
        fill: '#3A3A3A',
        textBaseline: 'top'
      };
      if (index > 0 && index === total - 1) {
        cfg.fontSize = 13;
      }
      return cfg;
    }
  });
  // 坐标轴 虚线
  chart.axis('score', {
    label: (text, index, total) => {
      return {
        fill: '#3A3A3A'
      };
    },
    grid: (text, index, total) => {
      if (text === 0) {
        return {
          lineDash: [2, 0]
        };
      }
      return {
        lineDash: [2, 2]
      };
    }
  });
  // 面积渐变
  chart
    .area()
    .position('time*score')
    .color(grd);
  // 折线
  chart
    .line()
    .shape('dash')
    .size(1)
    .color('#FB3F7C')
    .position('time*score');
  // 遍历画标签
  data.forEach((v, i) => {
    chart.guide().tag({
      position: [i, v.score],
      content: `${v.score}分`,
      offsetY: -15,
      direct: 'tc',
      background: {
        radius: 10,
        fill: '#FB3F7C'
      },
      withPoint: true,
      pointStyle: {
        fill: '#FB3F7C', // 填充颜色
        r: 8, // 半径
        lineWidth: 4, // 线的边框
        stroke: '#FFDFE9' // 线的描边
      } // 点的样式
    });
  });
  // 渲染
  chart.render();
  return chart;
};

export default class Index extends wepy.page {
  components = {
    F2Canvas
  };
  data = {
    opts: {
      onInit: initChart
    }
  };
}
```

> 参考官方小程序移植版 wx-f2

- @antv/f2@3.1.21

![效果图](./docs/mini-program-utils.gif)
