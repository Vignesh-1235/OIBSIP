document.addEventListener("DOMContentLoaded", () => {
    const tempInput = document.getElementById("tempInput");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    const convertBtn = document.getElementById("convertBtn");
    const resultText = document.getElementById("resultText");
    const converterCard = document.querySelector(".converter");
    const converterContent = document.querySelector(".converter-content");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(converterCard, 
        { opacity: 0, rotationX: -90, y: -100 }, 
        { duration: 1, opacity: 1, rotationX: 0, y: 0 }
    );

    tl.fromTo(converterContent.children,
        { opacity: 0, y: 30 },
        { 
            duration: 0.6, 
            opacity: 1, 
            y: 0, 
            stagger: 0.15
        },
        "-=0.5"
    );

    converterCard.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = converterCard.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / -20;

        gsap.to(converterCard, {
            rotationY: x,
            rotationX: y,
            transformPerspective: 1500,
            ease: "power2.out"
        });
    });

    converterCard.addEventListener('mouseleave', () => {
        gsap.to(converterCard, {
            duration: 1,
            rotationY: 0,
            rotationX: 0,
            ease: "elastic.out(1, 0.3)"
        });
    });


    convertBtn.addEventListener("click", () => {
        const tempValue = parseFloat(tempInput.value);

        if (isNaN(tempValue)) {
            resultText.textContent = "Error!";
            gsap.fromTo(resultText, 
                { color: "#ff4d4d", scale: 1.2 }, 
                { color: "white", scale: 1, duration: 1.5, ease: "bounce.out" }
            );
            return;
        }

        const from = fromUnit.value;
        const to = toUnit.value;
        let result;

        if (from === to) {
            result = tempValue;
        } else if (from === "Celsius") {
            result = (to === "Fahrenheit") ? (tempValue * 9 / 5) + 32 : tempValue + 273.15;
        } else if (from === "Fahrenheit") {
            result = (to === "Celsius") ? (tempValue - 32) * 5 / 9 : (tempValue - 32) * 5 / 9 + 273.15;
        } else if (from === "Kelvin") {
            result = (to === "Celsius") ? tempValue - 273.15 : (tempValue - 273.15) * 9 / 5 + 32;
        }

        const unitSymbols = { Celsius: "°C", Fahrenheit: "°F", Kelvin: "K" };

        resultText.textContent = `${result.toFixed(2)} ${unitSymbols[to]}`;
        
        gsap.from(resultText, {
            duration: 0.8,
            opacity: 0,
            y: -30,
            scale: 0.5,
            ease: "back.out(1.7)"
        });
    });
});