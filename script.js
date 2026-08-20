// ── Keep Render backend alive (prevents 50s+ cold-start delay) ──
(function keepBackendAlive() {
    const BACKEND_URL = "https://website-backend-wk8l.onrender.com";

    function ping() {
        fetch(BACKEND_URL + "/health", { method: "GET" })
            .catch(() => {}); // silently ignore any errors
    }

    ping(); // ping immediately on page load
    setInterval(ping, 10 * 60 * 1000); // ping every 10 minutes
})();
// ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const images = document.querySelectorAll('.imgtt .imgt');
    const largeImage = document.querySelector('.large-img img');
    const testimonials = [
        {
            name: "Supriya Sharma",
            title: "Startup Founder ",
            text: "Great work!!! The team was solid, efficient and knowledgeable. They did an amazing job on my very challenging app. I will be using them again. Thank you for doing such a great job!"
        },
        {
            name: "neha shukla",
            title: "Entrepreneur",
            text: "Fantastic service! The team provided excellent support and delivered a top-notch product. I highly recommend them."
        },
        {
            name: "Michael Johnson",
            title: "Startup Founder",
            text: "A pleasure to work with! Their expertise and professionalism exceeded my expectations. I'm very happy with the results."
        },
        {
            name: " Jane Smith",
            title: "Tech Enthusiast",
            text: "The team was great at understanding my needs and delivering a solution that worked perfectly. Excellent job!"
        }
    ];

    function updateImages() {
        // Update the large image
        largeImage.src = images[currentIndex].src;

        // Update the testimonials text
        const testimonial = testimonials[currentIndex];
        document.querySelector('.name').textContent = testimonial.name;
        document.querySelector('.name1').textContent = testimonial.title;
        document.querySelector('.name2').textContent = testimonial.text;

        // Update the smaller images visibility
        images.forEach((img, index) => {
            img.style.display = (index === currentIndex) ? 'none' : 'inline-block';
        });
    }

    function slideRight() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImages();
    }

    function slideLeft() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImages();
    }

    const btn1 = document.querySelector('.btnn1');
    const btn2 = document.querySelector('.btnn2');
    if (btn1) btn1.addEventListener('click', slideRight);
    if (btn2) btn2.addEventListener('click', slideLeft);

    if (images.length > 0 && largeImage) {
        updateImages(); // Initialize the first set of images and text
    }
});
