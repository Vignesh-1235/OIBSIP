gsap.registerPlugin(ScrollTrigger);
gsap.to(".title", {
    y: -300,
    scrollTrigger: {
        trigger: ".sec-1",
        start: "top top",
        end: "+=100",
        scrub: true,
        pin: true,
    }
});

const model = document.querySelector("model-viewer");
gsap.to(model, {
    scrollTrigger: {
        trigger: ".sec-1",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    },
    onUpdate: function () {
        const progress = this.progress();
        model.cameraOrbit = `${progress * 360}deg 75deg 100%`;
    }
});
gsap.from(".img1", {
    scrollTrigger: {
        trigger: "#concert",
        start: "top 40%",
        end: "top 100%",
        toggleActions: "play reverse play reverse",
        scrub: 1,
    },
    x: -900,
    ease: "power3.in",
    duration: 5,
    opacity: 0,
});
gsap.from(".img2", {
    scrollTrigger: {
        trigger: "#lunarimg",
        start: "top 40%",
        end: "top 100%",
        toggleActions: "play reverse play reverse",
        scrub: 1,
    },
    x: 900,
    ease: "power3.in",
    duration: 5,
    opacity: 0,
});
gsap.from(".head-2", {
    y: 100,
    ease: "power1.in",
    duration: 4,
    opacity: 0,
});
const item = document.querySelectorAll(".item");
const features = document.querySelector(".features");
features.innerHTML += features.innerHTML;
gsap.to(".item", {
    x: "-=50%",
    duration: 4,
    ease: "none",
    repeat: -1,
    yoyo: true,
});
const video = document.getElementById("vid");
video.pause();
gsap.to(video, {
    scrollTrigger: {
        trigger: ".video",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play pause play pause",
        onEnter: () => video.play(),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
    }
});
gsap.from("#vid", {
    scrollTrigger: {
        trigger: ".video",
        start: "top 40%",
        end: "top bottom",
        scrub: 1,
    },
    scale: 0.3,
    rotationY: 180,
    transformOrigin: "50% 50% -500px",
    opacity: 0,
    duration: 10,
    ease: "power4.out"
});
gsap.from(".img-models", {
    scrollTrigger: {
        trigger: ".img-container",
        start: "bottom top",
        end: "top bottom",
        scrub: 1,
    },
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
});
const images = gsap.utils.toArray(".img-container img");
const angleIncrement = (Math.PI * 2) / images.length;
const radius = 100;
images.forEach((img, index) => {
    const angle = angleIncrement * index;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    gsap.set(img, {
        x: x,
        y: y,
        opacity: 1
    });
    gsap.to(img, {
        scrollTrigger: {
            trigger: ".img-container",
            start: "bottom bottom",
            end: "top center",
            toggleActions: "play reverse play reverse",
            scrub: 1,
        },
        x: x * 5,
        y: y * 3,
        opacity: 1,
        ease: "power3.out",
        duration: 2,
        yoyo: true,
    });
});

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".wall",
        start: "top 60%",
        end: "bottom 10%",
        scrub: 1,
        toggleActions: "play reverse play reverse"
    }
});

tl.from(".center", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.inOut"
})
    .from(".feature", {
        y: 50,
        opacity: 0,
        stagger: 0.5,
        ease: "power2.out"
    }, "+=0.2");
