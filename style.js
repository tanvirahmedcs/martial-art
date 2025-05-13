document.addEventListener('DOMContentLoaded', function () {
    // Initialize WOW.js
    if (typeof WOW === 'function') {
        new WOW().init();
    }

    // Background images array
    const backgrounds = [
        "url('image/background.jpg')",
        "url('image/background 2.jpg')"
    ];

    let currentIndex = 0;
    const heroSection = document.getElementById('hero');

    // Function to switch background image
    function switchBackground() {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        heroSection.style.backgroundImage = backgrounds[currentIndex];
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }

    // Set initial background
    heroSection.style.backgroundImage = backgrounds[0];
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';

    // Switch background every 2 seconds (2000 milliseconds)
    setInterval(switchBackground, 2000);

    // Order modal handling
    const orderModal = document.getElementById('orderModal');
    const orderForm = document.getElementById('orderForm');
    const courseNameInput = document.getElementById('courseName');
    const coursePriceInput = document.getElementById('coursePrice');
    const orderModalLabel = document.getElementById('orderModalLabel');

    // Attach event listeners to Buy buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const course = button.getAttribute('data-course');
            const price = button.getAttribute('data-price');
            courseNameInput.value = course;
            coursePriceInput.value = price;
            orderModalLabel.textContent = `Order: ${course} - $${price}`;
        });
    });

    // Bootstrap form validation and confirmation popup for order form
    orderForm.addEventListener('submit', function (event) {
        if (!orderForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            alert('Your order has confirmed, and thanks for being with us.');
            orderForm.submit();
        }
        orderForm.classList.add('was-validated');
    }, false);

    // Contact form handling with confirmation popup
    const contactForm = document.querySelector('form.needs-validation');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('Your message has been sent, and thanks for being with us.');
                contactForm.submit();
            }
            contactForm.classList.add('was-validated');
        }, false);
    }

    // Scroll to Top Button functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when the button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

const ghostCursor = document.getElementById('ghostCursor');

window.addEventListener('mousemove', (e) => {
    ghostCursor.style.top = e.clientY + 'px';
    ghostCursor.style.left = e.clientX + 'px';
});
