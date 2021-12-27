
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

interface ShapeConfig extends NodeConfig {
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

export interface Node {
    type: 'text' | 'image' | 'rect'
    config: TextConfig | ImageConfig
}

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
