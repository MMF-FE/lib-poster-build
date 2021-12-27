## lib-poster-build

使用海报编辑器生成图片

> 注：这是内部项目，且使用服务端渲染，不排除后续不对外提供服务。

### 安装

```bash
yarn add @yzfe/lib-poster-build
```

### 使用

```ts
import buildBase64, { Poster } from '@yzfe/lib-poster-build'

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
            "type": "image",
            "config": {
                "x": 5.684341886080802e-14,
                "y": -0.3076923076922924,
                "imageClip": "left-top",
                "image": "https://lite-static.meimeifa.com/FteMetszxqMKdxvMsFhGH2mZzGy-"
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "AlibabaPuHuiTiBold",
                "fill": "#6A3815",
                "fontSize": 64,
                "ellipsis": true,
                "text": "2389",
                "x": 303.88695146759665,
                "y": 928.214327230456,
                "width": 384,
                "height": 76
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "AlibabaPuHuiTiBold",
                "fill": "#6A3815",
                "fontSize": 26,
                "ellipsis": true,
                "text": "￥",
                "x": 273.2432432432431,
                "y": 960.0945945945947,
                "width": 288,
                "height": 30
            }
        },
        {
            "type": "image",
            "config": {
                "x": 469.18918918919354,
                "y": 1069.8058808452104,
                "width": 180.74817320884185,
                "height": 180.74817320884176,
                "cropWidth": 328,
                "cropHeight": 327.99999999999983,
                "imageClip": "left-top",
                "image": "https://lite-static.meimeifa.com/Fua19Tn9Ye1uybhDV1UttciDJlYS"
            }
        },
        {
            "type": "image",
            "config": {
                "x": 96.21621621621625,
                "y": 1111.3378378378382,
                "imageClip": "left-top",
                "image": "https://lite-static.meimeifa.com/Fr7uLgoRZvFT0595bEM9aYPf8M-w"
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "SourceHanSerifCNBold",
                "fill": "#6A3815",
                "fontSize": 32,
                "ellipsis": true,
                "text": "推广员昵称",
                "x": 215.78378378378375,
                "y": 1122.2567567567573,
                "width": 288,
                "height": 48
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "SourceHanSerifCNBold",
                "fill": "#6A3815",
                "fontSize": 24,
                "ellipsis": true,
                "text": "为你推荐",
                "x": 217.83783783783747,
                "y": 1166.797297297297,
                "width": 288,
                "height": 48
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
        {
            "type": "image",
            "config": {
                "x": 385.40540540540565,
                "y": 242.52702702702686,
                "imageClip": "left-top",
                "image": "https://lite-static.meimeifa.com/FhN4m5owHzPvzvSdNQwp6MGdw5z6"
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "SourceHanSansCNBold",
                "fill": "#6A3815",
                "fontSize": 24,
                "ellipsis": true,
                "text": "￥3689",
                "x": 146.9849451920968,
                "y": 783.2887323943663,
                "width": 216,
                "height": 36
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "SourceHanSansCNBold",
                "fill": "#6A3815",
                "fontSize": 44,
                "ellipsis": true,
                "text": "1300",
                "x": 320.8450704225352,
                "y": 746.4859154929576,
                "width": 288,
                "height": 48
            }
        },
        {
            "type": "text",
            "config": {
                "fontFamily": "SourceHanSansCNBold",
                "fill": "#6A3815",
                "fontSize": 28,
                "ellipsis": true,
                "text": "￥",
                "x": 295.4929577464791,
                "y": 760.6830985915492,
                "width": 288,
                "height": 48
            }
        }
    ]
} as Poster

buildBase64(json).then(url => console.log(url))
```
