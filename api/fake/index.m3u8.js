export default function handler(req, res) {

  const segments = [
    "https://kasta-sports-tv.github.io/program/index0.ts",
    "https://kasta-sports-tv.github.io/program/index1.ts",
    "https://kasta-sports-tv.github.io/program/index2.ts"
  ];

  // 🔥 Для VOD використовуємо фіксований sequence
  const seq = 0;

  let playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${seq}
`;

  // 🔥 Робимо нормальний VOD loop (без "live-поведінки")
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    playlist += `#EXTINF:10.0,\n${seg}\n`;
  }

  // 🔥 КЛЮЧОВЕ — явно кажемо що це VOD
  playlist += `#EXT-X-ENDLIST\n`;

  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

  // 🔥 жорстко вимикаємо кеш
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  res.status(200).send(playlist);
}
