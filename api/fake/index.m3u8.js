export default function handler(req, res) {

  const segments = [
    "https://kasta-sports-tv.github.io/program/index0.ts",
    "https://kasta-sports-tv.github.io/program/index1.ts",
    "https://kasta-sports-tv.github.io/program/index2.ts"
  ];

  // 🔥 стабільний sequence (НЕ Date.now)
  const now = Math.floor(Date.now() / 10000);
  const seq = now % 1000;

  let playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${seq}
`;

  // 🔥 стабільний loop (без now у виборі сегментів)
  for (let i = 0; i < 6; i++) {
    const seg = segments[i % segments.length];
    playlist += `#EXTINF:10.0,\n${seg}\n`;
  }

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  res.status(200).send(playlist);
}
