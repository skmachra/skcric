const fs = require("fs");

const file = process.env.FILE_NAME;

const streamUrl = process.env.STREAM_URL;

const clearkey = process.env.CLEARKEY;

const [kid, key] = clearkey.split(":");

if (!fs.existsSync(file)) {
    console.log("File not found");
    process.exit(1);
}

let html = fs.readFileSync(file, "utf8");

/* update stream url */
html = html.replace(
    /file:\s*"https?:\/\/.*?"/,
    `file: "${streamUrl}"`
);

/* update shaka style stream url */
html = html.replace(
    /const streamUrl = ".*?";/,
    `const streamUrl = "${streamUrl}";`
);

/* update keyId */
html = html.replace(
    /keyId:\s*"[a-f0-9]{32}"/,
    `keyId: "${kid}"`
);

/* update key */
html = html.replace(
    /key:\s*"[a-f0-9]{32}"/,
    `key: "${key}"`
);

/* update shaka clearkeys */
html = html.replace(
    /"([a-f0-9]{32})"\s*:\s*"([a-f0-9]{32})"/,
    `"${kid}" : "${key}"`
);

fs.writeFileSync(file, html);

console.log(`Updated ${file}`);