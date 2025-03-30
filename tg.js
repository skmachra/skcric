// player.js - Combines ccapi.js (video configurations) and tg.js (JWPlayer setup)

// Domain Lock (restrict to specific domains)
const allowedDomains = [
  'https://criccoder264.pages.dev/test',
  'https://criccoder264.pages.dev'
];

// Get the current URL
const currentUrl = window.location.href;

// Check if the current URL starts with any allowed domains
if (!allowedDomains.some(url => currentUrl.startsWith(url))) {
  alert('This content is not available on your domain.');
  window.location.href = "https://telegram.me/criccoder"; // Redirect to Telegram or show a message
  throw new Error("Domain lock triggered.");
}

// Video configurations for different IDs
const videoConfigs = {
  "1": { "url": "https://vkvsd55.okcdn.ru/cmaf/7443308808935/sig/esxrZxGt2cE/srcIp/3.110.165.205/urls/45.136.22.88/expires/1734569291503/clientType/13/srcAg/CHROME/fromCache/1/mid/9109154376679/id/7443308808935/get/dash_9109154376679.FR5QsSfmxmU.mpd" },
  "2": { "url": "https://vkvsd14.okcdn.ru/cmaf/7465941011175/sig/D1esK-EFWhc/srcIp/13.202.136.237/urls/185.226.53.94/expires/1734812039320/clientType/13/srcAg/CHROME/fromCache/1/mid/9161388141543/id/7465941011175/get/dash_9161388141543.yi5Gc1pbmz0.mpd" },
  "3": { "url": "https://vkvsd14.okcdn.ru/cmaf/7333724293676/sig/Q4AWMsBSn5Y/expires/1734491746908/srcIp/172.69.95.124/urls/45.136.20.36/clientType/13/srcAg/CHROME/mid/7917468068652/get/hls_7917468068652.J40GMVFt0Z4.m3u8" },
  "4": { "url": "https://jiotvbpklive.cdn.jio.com/bpk-tv/IDCDemo_IPL23_Sports18_MOB/Fallback/IDCDemo_IPL23_Sports18.m3u8" },
  "5": { "url": "https://prod-sports-eng-cf.jiocinema.com/hls/live/2100307/hd_akamai_merged_avc_eng_cricket_m9_171224/master.m3u8" },
  "6": { "url": "https://prod-sports-eng-cf.jiocinema.com/hls/live/2100307/hd_akamai_merged_avc_eng_cricket_m9_171224/master.m3u8" }
};

// Function to get the video configuration for a given 'id'
function getVideoConfig(id) {
  return videoConfigs[id] || videoConfigs['1'];  // Default to '1' if 'id' is not found
}

// Get the 'id' parameter from the URL (default to '1' if not found)
const urlParams = new URLSearchParams(window.location.search);
const streamId = urlParams.get('id') || '1';  // Default to '1' if 'id' is not found in URL

// Load video config from the combined video configuration
const videoConfig = getVideoConfig(streamId);

// Initialize JW Player with the selected stream URL if a valid config is found
if (videoConfig && videoConfig.url) {
  const playerInstance = jwplayer("player").setup({
    file: videoConfig.url,  // Use the video URL from the configuration
    controls: true,
    displaytitle: true,
    autoplay: true,
    displaydescription: true,
    abouttext: "",
    aboutlink: "https://telegram.me/Criccoder",  // Updated Telegram channel link
    skin: {
      name: "netflix"
    },
    logo: {
      file: "",
      link: "https://telegram.me/Criccoder"  // Updated Telegram channel link
    },
    captions: {
      color: "#FFF",
      fontSize: 14,
      backgroundOpacity: 0,
      edgeStyle: "raised"
    },
    playlist: [
      {
        image: "",
        sources: [
          {
            file: videoConfig.url,  // Use the video URL from the configuration
            label: "1080p",
            default: true
          }
        ],
      }
    ],
    advertising: {
      client: "vast",
      schedule: [
        {
          offset: "pre",
          tag: ""
        }
      ]
    }
  });

  // Additional functionality for the player
  playerInstance.on("ready", function () {
    const playerContainer = playerInstance.getContainer();
    const buttonContainer = playerContainer.querySelector(".jw-button-container");

    // Rewind button functionality
    const rewindContainer = playerContainer.querySelector(".jw-display-icon-rewind");
    const rewindButton = rewindContainer.cloneNode(true);
    const rewindIcon = rewindButton.querySelector(".jw-icon-rewind");
    rewindIcon.style.transform = "scaleX(1)";
    rewindIcon.ariaLabel = "Rewind 5 Seconds";

    const nextContainer = playerContainer.querySelector(".jw-display-icon-next");
    nextContainer.parentNode.insertBefore(rewindButton, nextContainer);

    // Rewind functionality for the control bar
    const rewindControlBarButton = buttonContainer.querySelector(".jw-icon-rewind");
    const rewindControlBarClone = rewindControlBarButton.cloneNode(true);
    rewindControlBarClone.style.transform = "scaleX(1)";
    rewindControlBarClone.ariaLabel = "Rewind 5 Seconds";
    buttonContainer.insertBefore(rewindControlBarClone, buttonContainer.firstChild);

    // On click of rewind button, seek backward by 5 seconds
    [rewindButton, rewindControlBarClone].forEach((button) => {
      button.onclick = () => {
        const currentPosition = playerInstance.getPosition();
        const newPosition = Math.max(currentPosition - 5, 0); // Prevent going below 0
        playerInstance.seek(newPosition);
      };
    });

    // Detect adblock
    playerInstance.on("adBlock", () => {
      const modal = document.querySelector("div.modal");
      modal.style.display = "flex";
      document
        .getElementById("close")
        .addEventListener("click", () => location.reload());
    });
  });
} else {
  console.error("Video configuration not found or invalid.");
}
