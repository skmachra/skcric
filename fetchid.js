const fs = require("fs");

async function main() {
  const id = process.env.STREAM_ID;

  const res = await fetch(
    `https://newwwwapiiiiii.vercel.app/main?id=${id}`,
    {
      headers: {
        Referer: "https://cricboost.pages.dev/",
        Origin: "https://cricboost.pages.dev/",
        "User-Agent": "Mozilla/5.0"
      }
    }
  );

  const data = await res.json();

  console.log(data);

  if (!data.url || !data.k1 || !data.k2) {
    throw new Error("Invalid API response");
  }

  fs.appendFileSync(
    process.env.GITHUB_ENV,
    `STREAM_URL=${data.url}\nCLEARKEY=${data.k1}:${data.k2}\n`
  );
}

main();
