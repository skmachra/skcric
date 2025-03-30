<?php
// Define video configurations
$videoConfigs = [
    "1" => "https://criccoder264.pages.dev/ssh.m3u8",
    "2" => "https://shwe7ank-7.github.io/L/p?url=https://vkvsd228.okcdn.ru/hls/7704468851244.m3u8",
    "3" => "https://prod-ent-live-gm.jiocinema.com/bpk-tv/JV_SportsHD15_DIG_MOB/Fallback/index.m3u8",
    "4" => "https://jiotvbpklive.cdn.jio.com/bpk-tv/IDCDemo_IPL23_Sports18_MOB/Fallback/IDCDemo_IPL23_Sports18.m3u8",
    "5" => "https://prod-sports-eng-cf.jiocinema.com/hls/live/2100307/hd_akamai_merged_avc_eng_cricket_m9_030125/master.m3u8"
];

// Get the 'id' parameter from the URL
$id = $_GET['id'] ?? "1"; // Default to "1" if no 'id' is provided

// Check if the requested ID exists in the configuration
if (array_key_exists($id, $videoConfigs)) {
    // Return the configuration as JSON
    echo json_encode([
        "success" => true,
        "url" => $videoConfigs[$id]
    ]);
} else {
    // Return an error response if the ID is invalid
    echo json_encode([
        "success" => false,
        "message" => "Invalid stream ID"
    ]);
}
?>
