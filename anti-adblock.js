(function () {
    if (window.__ADB_LOADED__) return;
    window.__ADB_LOADED__ = true;

    // ---------- Inject CSS ----------
    const style = document.createElement("style");
    style.innerHTML = `
    .adb-overlay {
        position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    z-index: 999999;
    display: none;
    align-items: center;
    justify-content: center;
    }
    .adb-box {
        background: #fff;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    }
    body.adb-lock {overflow: hidden !important; }
    `;
    document.head.appendChild(style);

    // ---------- Inject HTML ----------
    const overlay = document.createElement("div");
    overlay.className = "adb-overlay";
    overlay.innerHTML = `
    <div class="adb-box">
        <h3>Adblock Detected</h3>
        <p>Please disable adblocker and refresh the page.</p>
    </div>
    `;
    document.body.appendChild(overlay);

    function showPopup(reason) {
        overlay.style.display = "flex";
        document.body.classList.add("adb-lock");
        console.warn("ADB:", reason);
    }

    // ---------- Detection ----------
    function createBait() {
        const bait = document.createElement("div");
        bait.className = `
    ad ads adsbox doubleclick ad-placement
    ad-placeholder ad-banner pub_300x250
    text-ad sponsored ad-wrapper
    `;
        bait.style.cssText = "width:1px;height:1px;position:absolute;left:-9999px;";
        document.body.appendChild(bait);
        return bait;
    }

    function detectByBait(bait) {
        const style = window.getComputedStyle(bait);

        if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            bait.offsetHeight === 0 ||
            bait.offsetWidth === 0 ||
            bait.clientHeight === 0
        ) {
            return true;
        }

        return false;
    }

    function detectAdsbygoogle() {
        return (typeof window.adsbygoogle === "undefined");
    }

    // ---------- Main ----------
    window.addEventListener("load", () => {
        const bait = createBait();

        setTimeout(() => {
            let detected = false;

            // Layer 1: bait
            if (detectByBait(bait)) {
                detected = true;
            }

            // Layer 2: adsbygoogle missing
            if (detectAdsbygoogle()) {
                detected = true;
            }

            // Layer 3: aggressive re-check
            setTimeout(() => {
                if (detectByBait(bait)) detected = true;

                if (detected) {
                    showPopup("Adblock detected");
                }

                bait.remove();
            }, 1000);

        }, 1000);
    });

})();