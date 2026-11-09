
document.addEventListener("DOMContentLoaded", () => {

    // ANIMATION SYSTEM
    console.log("MyShowcase animation system started!");

    const revealElements = document.querySelectorAll(
        ".reveal, .skill-card"
    );

    console.log("Animation elements found:", revealElements.length);

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    } else {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }


    // WEB3FORMS CONTACT FORM
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const message = document.getElementById("contact-message").value.trim();

            if (!name || !email || !message) {
                formStatus.textContent = "Please fill in all fields.";
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            formStatus.textContent = "";

            const formData = {
                access_key: "4046a647-2712-41be-94ef-bda9c54031aa",
                name: name,
                email: email,
                subject: `New Portfolio Message from ${name}`,
                message: message
            };

            try {
                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );

                const result = await response.json();

                if (result.success) {
                    formStatus.textContent =
                        "Thank you! Your message has been sent successfully.";

                    contactForm.reset();
                } else {
                    formStatus.textContent =
                        "Message could not be sent. Please try again.";
                    console.error("Web3Forms error:", result);
                }

            } catch (error) {
                formStatus.textContent =
                    "Network error. Please check your internet and try again.";

                console.error("Contact form error:", error);

            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        });
    }

});
