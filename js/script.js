(function () {
    "use strict";

    function toggleMenu() {
        var navLinks = document.getElementById("navLinks");
        var hamburger = document.querySelector(".hamburger");
        if (!navLinks || !hamburger) return;
        var open = navLinks.classList.toggle("is-open");
        hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function initMenu() {
        var hamburger = document.querySelector(".hamburger");
        if (hamburger) {
            hamburger.addEventListener("click", toggleMenu);
        }
    }

    /** Påskägg 1: klick på liten punkt i sidfot byter bakgrund */
    function initBackgroundEasterEgg() {
        var triggers = document.querySelectorAll(".footer-easter");
        triggers.forEach(function (el) {
            el.addEventListener("click", function () {
                document.body.classList.toggle("easter-bg");
            });
        });
    }

    /** Påskägg 2: tangentkombination 1337 öppnar modal */
    var SECRET = "1337";
    var buffer = "";
    var maxLen = SECRET.length;

    function initLeetModal() {
        var modal = document.getElementById("leet-modal");
        if (!modal) return;

        var closeBtn = modal.querySelector(".leet-modal__close");

        function openModal() {
            modal.hidden = false;
            document.body.style.overflow = "hidden";
            if (closeBtn) closeBtn.focus();
        }

        function closeModal() {
            modal.hidden = true;
            document.body.style.overflow = "";
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", closeModal);
        }

        modal.addEventListener("click", function (e) {
            if (e.target === modal) closeModal();
        });

        document.addEventListener("keydown", function (e) {
            if (!modal.hidden && e.key === "Escape") {
                closeModal();
            }
        });

        document.addEventListener("keydown", function (e) {
            if (!modal.hidden) return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.key.length !== 1) return;

            buffer += e.key;
            if (buffer.length > maxLen) {
                buffer = buffer.slice(-maxLen);
            }
            if (buffer === SECRET) {
                buffer = "";
                openModal();
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initMenu();
        initBackgroundEasterEgg();
        initLeetModal();
    });
})();
