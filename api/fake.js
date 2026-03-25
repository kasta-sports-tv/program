export default function handler(req, res) {

  const segments = [
    "https://kasta-sports-tv.github.io/program/index0.ts",
    "https://kasta-sports-tv.github.io/program/index1.ts",
    "https://kasta-sports-tv.github.io/program/index2.ts"
  ];

  const now = Math.floor(Date.now() / 1000);
  const seq = now;

  let playlist = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:${seq}
`;

  for (let i = 0; i < 3; i++) {
    const seg = segments[(now + i) % segments.length];
    playlist += `#EXTINF:10.0,\n${seg}\n`;
  }

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.setHeader("Cache-Control", "no-store");

  res.status(200).send(playlist);
}
