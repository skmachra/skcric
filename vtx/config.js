// URL of the PHP endpoint
const phpEndpoint = "https://criccoder264.pages.dev/vtx/videoConfigs.php";

// Get the 'id' parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const streamId = urlParams.get("id") || "1"; // Default to "1" if no id is provided

// Fetch the video configuration from the PHP endpoint
fetch(`${phpEndpoint}?id=${streamId}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      // Initialize the player with the received URL
      initializePlayer(data.url);
    } else {
      console.error(data.message);
    }
  })
  .catch((error) => {
    console.error("Error fetching video configuration:", error);
  });

// Function to initialize the JW Player
function initializePlayer(videoUrl) {
  jwplayer("player").setup({
    file: videoUrl,
    controls: true,
    displaytitle: true,
    autoplay: true,
    skin: { name: "netflix" },
    logo: { file: "", link: "https://telegram.me/Criccoder" }
  });
}
