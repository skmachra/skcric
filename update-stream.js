const fs = require("fs");

const FILE = "Kayo.html";

const streamUrl = process.env.STREAM_URL;
const clearkey = process.env.CLEARKEY;

const [kid, key] = clearkey.split(":");

let html = fs.readFileSync(FILE, "utf8");

html = html.replace(
    /const streamUrl = ".*?";/,
    `const streamUrl = "${streamUrl}";`
);

html = html.replace(
    /"([a-f0-9]{32})"\s*:\s*"([a-f0-9]{32})"/,
    `"${kid}" : "${key}"`
);

fs.writeFileSync(FILE, html);

console.log("Updated Kayo.html");