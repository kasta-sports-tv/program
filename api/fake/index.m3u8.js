export default function handler(req, res) {

  const segments = [
    "https://kasta-sports-tv.github.io/program/index0.ts",
    "https://kasta-sports-tv.github.io/program/index1.ts",
    "https://kasta-sports-tv.github.io/program/index2.ts"
  ];

  // 🔥 беремо “живий” seed з часу, але не напряму для сегментів
  const now = Math.floor(Date.now() / 1000);

  // 🔥 стабільний, але змінний sequence
  const baseSeq = (now % 10000);

  let playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${baseSeq}
`;

  // 🔥 live-like window (важливо: більше ніж сегментів)
  const windowSize = 6;

  for (let i = 0; i < windowSize; i++) {
    const seg = segments[(baseSeq + i) % segments.length];

    // 🔥 anti-cache trick для проксі/плеєра
    const cacheBust = `?cb=${baseSeq + i}`;

    playlist += `#EXTINF:10.0,\n${seg}${cacheBust}\n`;
  }

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

  // 🔥 жорстке вимкнення кешу
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  res.status(200).send(playlist);
}
