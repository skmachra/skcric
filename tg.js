fetch("https://artl.yowaimo.in/sflex/stream.php?id=Unite8-Sports1-Hindi-HD&ts=1781524499&token=2fbbde18a8152281ce07cc3eb921c406629c27c6421dbb2f252033bd6656973a&exp=1784548499&Powered-by-StreamFlex=363ee5f18d5a2e999d4cdc1159cda91c2f99623a15b41357d593596e17bd2af0")
  .then(r => {
    console.log("status:", r.status);
    console.log("type:", r.type);
    return r.text();
  })
  .then(console.log)
  .catch(console.error);