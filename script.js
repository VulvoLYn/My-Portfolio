const pages = document.querySelectorAll(".page");
let isAnimating = false; // Prevents click spamming

pages.forEach((page, index) => {
    let flipped = false;

    // Set initial layout stacking
    page.style.zIndex = pages.length - index;

    /* CLICK FUNCTION */
    page.addEventListener("click", (e) => {
        // Stop click tracking if a page is currently moving
        if (e.target.closest(".btn")) return;
        if (isAnimating) return;
        isAnimating = true;

        /* FLIP FORWARD (Left to Right) */
        if (!flipped) {
            page.style.transform = "rotateY(-180deg)";
            flipped = true;

            // Wait until the flip finishes to lower the z-index
            const resetForwardZ = () => {
                page.style.zIndex = index;
                isAnimating = false;
                page.removeEventListener("transitionend", resetForwardZ);
            };
            page.addEventListener("transitionend", resetForwardZ);
        }
        /* FLIP BACKWARD (Right to Left) */
        else {
            page.style.transform = "rotateY(0deg)";
            flipped = false;

            // Give it a temporary mid-layer z-index so it doesn't instantly 
            // overpower or reveal elements behind it incorrectly mid-flight
            page.style.zIndex = pages.length + index;

            // Once it finishes flattening back to the right, reset to original stack
            const resetBackwardZ = () => {
                page.style.zIndex = pages.length - index;
                isAnimating = false;
                page.removeEventListener("transitionend", resetBackwardZ);
            };
            page.addEventListener("transitionend", resetBackwardZ);
        }
    });
});

const modal = document.getElementById("contactModal");

const open = document.getElementById("openModal");

const close = document.querySelector(".close");

open.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("active");
});

close.onclick = () => {
    modal.classList.remove("active");
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
};