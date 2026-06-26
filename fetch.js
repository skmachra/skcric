const fs = require("fs");

const URL = "https://jtvv.pages.dev/channels.json";
const FILE = "hdnea.json";

const mapping = {
  sidhu: "star1",
  EN: "star1eng",
  sidhu2: "star2",
  EN2: "star2eng",
  s1: "s1",
  s2: "s2",
  s3: "s3",
  s4: "s4",
  s5: "s5",
};

function extractHdnea(url) {
  if (!url) return null;

  const match = url.match(/__hdnea__=[^&]+/);

  return match ? match[0] : null;
}

async function run() {

  try {

    const res = await fetch(URL);

    const data = await res.json();

    const local = JSON.parse(
      fs.readFileSync(FILE, "utf8")
    );

    let changed = false;

    for (const src in mapping) {

      const target = mapping[src];

      if (!data[src]) continue;

      const hdnea = extractHdnea(
        data[src].streamUrl
      );

      if (hdnea && local[target] !== hdnea) {

        local[target] = hdnea;

        changed = true;

        console.log(`Updated ${target}`);
      }
    }

    if (!changed) {
      console.log("No changes");
      return;
    }

    fs.writeFileSync(
      FILE,
      JSON.stringify(local, null, 2)
    );

    console.log("Updated successfully");

  } catch (e) {

    console.log("Error:", e.message);

  }
}

run();