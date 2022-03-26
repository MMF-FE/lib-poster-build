
interface Vector2d {
    x: number
    y: number
}

interface IRect {
    x: number
    y: number
    width: number
    height: number
}

type LineJoin = 'round' | 'bevel' | 'miter'
type LineCap = 'butt' | 'round' | 'square'

interface NodeConfig {
    [index: string]: any
    x?: number
    y?: number
    width?: number
    height?: number
    visible?: boolean
    listening?: boolean
    id?: string
    name?: string
    opacity?: Number
    scale?: Vector2d
    scaleX?: number
    scaleY?: number
    rotation?: number
    rotationDeg?: number
    offset?: Vector2d
    offsetX?: number
    offsetY?: number
    draggable?: boolean
    dragDistance?: number
    preventDefault?: boolean
}

export interface ShapeConfig extends NodeConfig {
    fill?: string
    fillPatternX?: number
    fillPatternY?: number
    fillPatternOffset?: Vector2d
    fillPatternOffsetX?: number
    fillPatternOffsetY?: number
    fillPatternScale?: Vector2d
    fillPatternScaleX?: number
    fillPatternScaleY?: number
    fillPatternRotation?: number
    fillPatternRepeat?: string
    fillLinearGradientStartPoint?: Vector2d
    fillLinearGradientStartPointX?: number
    fillLinearGradientStartPointY?: number
    fillLinearGradientEndPoint?: Vector2d
    fillLinearGradientEndPointX?: number
    fillLinearGradientEndPointY?: number
    fillLinearGradientColorStops?: Array<number | string>
    fillRadialGradientStartPoint?: Vector2d
    fillRadialGradientStartPointX?: number
    fillRadialGradientStartPointY?: number
    fillRadialGradientEndPoint?: Vector2d
    fillRadialGradientEndPointX?: number
    fillRadialGradientEndPointY?: number
    fillRadialGradientStartRadius?: number
    fillRadialGradientEndRadius?: number
    fillRadialGradientColorStops?: Array<number | string>
    fillEnabled?: boolean
    fillPriority?: string
    stroke?: string | CanvasGradient
    strokeWidth?: number
    fillAfterStrokeEnabled?: boolean
    hitStrokeWidth?: number | string
    strokeScaleEnabled?: boolean
    strokeHitEnabled?: boolean
    strokeEnabled?: boolean
    lineJoin?: LineJoin
    lineCap?: LineCap
    shadowColor?: string
    shadowBlur?: number
    shadowOffset?: Vector2d
    shadowOffsetX?: number
    shadowOffsetY?: number
    shadowOpacity?: number
    shadowEnabled?: boolean
    shadowForStrokeEnabled?: boolean
    dash?: number[]
    dashOffset?: number
    dashEnabled?: boolean
    perfectDrawEnabled?: boolean
}

export interface TextConfig extends ShapeConfig {
    text?: string
    fontFamily?: string
    fontSize?: number
    fontStyle?: string
    fontVariant?: string
    textDecoration?: string
    align?: string
    verticalAlign?: string
    padding?: number
    lineHeight?: number
    letterSpacing?: number
    wrap?: string
    ellipsis?: boolean
}

export interface ImageConfig extends ShapeConfig {
    image: string
    crop?: IRect
}

export type Node = { type: 'text', config: TextConfig } | {type: 'image', config: ImageConfig} | { type: 'rect', config: ShapeConfig }

export interface Poster {
    width: number
    height: number
    uuid?: string
    nodes: Array<Node>
}

export function blobToBase64(blob: Blob) {
    return new Promise<string>((resolve) => {
        if (typeof FileReader !== 'undefined') {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.readAsDataURL(blob)
        } else if (Buffer) {
            blob.arrayBuffer().then((buffer) => {
                resolve(Buffer.from(buffer).toString('base64'))
            })
        }
    })
}


export default async function buildBase64(poster: Poster, fcHost = 'https://yz-fc.meimeifa.com') {
    const res = await fetch(`${fcHost}/poster/build`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(poster),
    }).then((res) => res.blob())

    return blobToBase64(res)
}

/** 设置线性渐变，不需要设置 startPoint, endPoint, 自动根据 angle 计算 */
export function setLinearGradientWWithAngle(node: Node, gradient: ShapeConfig & { angle?: number }) {
    const width = node.config.width || 0
    const height = node.config.height || 0

    const angle =
        ((180 - (node.config.angle || gradient.angle || 90)) / 180) * Math.PI
    const length =
        Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle))

    const halfx = (Math.sin(angle) * length) / 2
    const halfy = (Math.cos(angle) * length) / 2
    const cx = width / 2.0
    const cy = height / 2.0
    const x1 = cx - halfx
    const y1 = cy - halfy
    const x2 = cx + halfx
    const y2 = cy + halfy

    node.config = {
        ...node.config,
        ...gradient,
        fillLinearGradientStartPoint: {
            x: x1,
            y: y1
        },
        fillLinearGradientEndPoint: {
            x: x2,
            y: y2
        }
    }
}

let _measureTextCanvas: HTMLCanvasElement | null = null
/** 计算文本信息 */
export function measureText(
    text: string,
    fontSize = 14,
    fontFamily = `"Helvetica Neue", Helvetica, "PingFang SC", Arial, sans-serif`
) {
    if (!_measureTextCanvas) {
        _measureTextCanvas = document.createElement('canvas')
    }

    const ctx = _measureTextCanvas.getContext('2d')

    if (ctx) {
        ctx.save()
        ctx.font = `${fontSize}px ${fontFamily}`
        const result = ctx.measureText(text)
        ctx.restore()
        return result
    }
}

/** 获取文本高度 */
export function getTextHeight(options: {
    text: string
    maxWidth: number
    fontSize: number
    lineHeight: number
    fontName: string
}) {
    try {
        const { text, fontSize, maxWidth, lineHeight } = options
        const textWidth =
            measureText(text, fontSize, options.fontName)?.width || 0
        const lineCount = Math.ceil(textWidth / maxWidth)
        const heightPX = ~~(fontSize * lineHeight)

        return lineCount * heightPX
    } catch (err) {
        console.log(err)
        return 0
    }
}
