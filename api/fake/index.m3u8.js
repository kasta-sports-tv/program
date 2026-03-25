export default function handler(req, res) {
  const segments = [
    "https://kasta-sports-tv.github.io/program/index0.ts",
    "https://kasta-sports-tv.github.io/program/index1.ts",
    "https://kasta-sports-tv.github.io/program/index2.ts"
  ];

  // стабільний live sequence
  const base = Math.floor(Date.now() / 30000);
  const mediaSequence = base % 10000;

  let playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${mediaSequence}
`;

  const count = 6;

  for (let i = 0; i < count; i++) {
    const seg = segments[(base + i) % segments.length];
    playlist += `#EXTINF:10.0,\n${seg}\n`;
  }

  // 📌 ВАЖЛИВО: це m3u8 → без кешу
  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.status(200).send(playlist);
}
