
document.addEventListener("DOMContentLoaded", () => {

    console.log("MyShowcase animation system started!");

    const revealElements = document.querySelectorAll(
        ".reveal, .skill-card"
    );

    console.log(
        "Animation elements found:",
        revealElements.length
    );

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });

});



// CONTACT FORM - OPEN GMAIL DIRECTLY
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const subject = `Portfolio Contact Message from ${name}`;

        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`;

        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=loomlogic01@gmail.com" +
            "&su=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        window.open(gmailURL, "_blank");
    });
}
