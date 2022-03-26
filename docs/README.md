## lib-poster-build

使用海报编辑器生成图片

> 注：这是内部项目，且使用服务端渲染，不排除后续不对外提供服务。

### 安装

```bash
yarn add @yzfe/lib-poster-build
```

### 使用

```ts
import buildBase64, {
    Poster,
    Node,
    measureText,
    getTextHeight,
    setLinearGradientWWithAngle
} from '@yzfe/lib-poster-build'

// 计算文本信息，自定义字体要确保先加载
const textInfo = measureText('文本', 24, `"PingFang SC"`)
console.log(textInfo.width)

// 计算自动换行的文本高度，需要设置最大宽度, 自定义字体要确保先加载
const height = getTextHeight({
    text: '超长文本',
    maxWidth: 200,
    fontSize: 24,
    lineHeight: 1.5,
    fontName: 'SourceHanSerifCNBold'
})
console.log(height)

// 设置线性渐变，不需要设置 startPoint, endPoint, 自动根据 angle 计算
const node: Node = {
    type: 'text',
    config: {
        text: '文本'
        width: 100,
        height: 100
    }
}
setLinearGradientWWithAngle(node, {
    angle: 180,
    fillPriority: 'linear-gradient',
    fillLinearGradientColorStops: [0, '#ff8700', 1, '#ff3a6f']
})

const json = {
    "width": 750,
    "height": 1334,
    "uuid": "kovanEditor-0",
    "nodes": [
        {
            "type": "rect",
            "config": {
                "shadowBlur": 20,
                "shadowColor": "#c4c4c4",
                "isBackground": true,
                "fill": "#ffffff",
                "width": 750,
                "height": 1334
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "SourceHanSerifCNBold",
                "fill": "#6A3815",
                "fontSize": 36,
                "ellipsis": true,
                "text": "这是商品名称这是商品名称这是商品",
                "x": 79.66709212776482,
                "y": 577.8783783783784,
                "height": 43
            }
        },
        {
            "type": "image",
            "config": {
                "x": 78.47790293857588,
                "y": 243.87837837837844,
                "imageClip": "left-top",
                "image": "https://lite-static.meimeifa.com/FqF--BfRKTtEtsd98uGBb5Lg-Mrs"
            }
        },
    ]
} as Poster

buildBase64(json).then(url => console.log(url))
```
