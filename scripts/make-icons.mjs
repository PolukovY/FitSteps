import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'

// Minimal PNG writer: the app ships a stepped-chevron mark and nothing else,
// so a hand-rolled encoder beats adding an image toolchain dependency.
function png(size, draw) {
  const bpp = 4
  const raw = Buffer.alloc((size * bpp + 1) * size)
  for (let y = 0; y < size; y += 1) {
    raw[y * (size * bpp + 1)] = 0
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = draw(x, y)
      const o = y * (size * bpp + 1) + 1 + x * bpp
      raw[o] = r; raw[o + 1] = g; raw[o + 2] = b; raw[o + 3] = a
    }
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4)
    len.writeUInt32BE(data.length)
    const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
    const crcTable = png.crcTable ??= Array.from({ length: 256 }, (_, n) => {
      let c = n
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      return c >>> 0
    })
    let crc = 0xffffffff
    for (const byte of body) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
    const crcBuf = Buffer.alloc(4)
    crcBuf.writeUInt32BE((crc ^ 0xffffffff) >>> 0)
    return Buffer.concat([len, body, crcBuf])
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const BG = [11, 12, 15, 255]
const FG = [215, 242, 90, 255]

// The mark: a staircase of three risers, matching the favicon.
const segments = [
  [14, 41, 24, 47], [21, 34, 27, 47],
  [21, 34, 34, 40], [31, 27, 37, 41],
  [31, 27, 44, 33], [41, 20, 47, 34],
  [41, 14, 50, 21],
]

function draw(size) {
  const s = size / 64
  return (x, y) => {
    const u = x / s
    const v = y / s
    const r = 14
    // Rounded-square mask.
    const cx = Math.min(Math.max(u, r), 64 - r)
    const cy = Math.min(Math.max(v, r), 64 - r)
    if ((u - cx) ** 2 + (v - cy) ** 2 > r * r) return [0, 0, 0, 0]
    for (const [x0, y0, x1, y1] of segments) {
      if (u >= x0 && u <= x1 && v >= y0 && v <= y1) return FG
    }
    return BG
  }
}

for (const size of [192, 512]) {
  writeFileSync(new URL(`../public/icon-${size}.png`, import.meta.url), png(size, draw(size)))
}
console.log('icons written')
