gsap.registerPlugin(ScrollTrigger);

/*gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(".about span",{y:100,opacity:0},{y:0,opacity:1,duration:0.6, stagger:0.5},4.1)
    .fromTo("#but1,#but2",{y:100,opacity:0},{y:0,opacity:1,duration:0.6,stagger:0.5})
    .fromTo(".icon",{y:100,opacity:0},{y:0,opacity:1,duration:0.6,stagger:0.5},7)
    .fromTo("#picture",{opacity:0,scale:0.2,rotationY:-180,transformOrigin:"50% 50% -500px"},{opacity:1,scale:1,rotationY:0,duration:0.4,ease:"power4.out"},11.5)
    .fromTo(beforeRule,{cssRule:{x:-2000,y:400}},{cssRule:{opacity:1,x:-320,y:-209,duration:0.5}},13)
    .fromTo(afterRule,  { cssRule: { x: 2000,y:-400 } },  { cssRule: { opacity:1,x: -320,y:-209, duration: 0.5 } },13.5);


let t1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#row2",
        start: "top 0%",
        end:"top 70%",
        scrub:true,
        toggleActions: "play reverse play reverse",
    },
});
*/
const blocks = document.querySelectorAll(".block");
const blocksPerRow = 20;   
const TRAIL_LENGTH = 5;  
const TRAIL_ROWS = 1;     

let activeTrail = [];

function resetBlocks() {
  blocks.forEach(b => (b.style.borderColor = "rgba(255, 255, 255, 0.025)"));
}

function highlightTrail(index) {
  activeTrail.unshift(index);
  if (activeTrail.length > TRAIL_LENGTH) {
    activeTrail.pop();
  }

  resetBlocks();
  activeTrail.forEach((i, step) => {
    const opacity = 1 - step / TRAIL_LENGTH; 
    const col = i % blocksPerRow;
    const row = Math.floor(i / blocksPerRow);
    for (let r = 0; r < TRAIL_ROWS; r++) {
      const idx = (row + r) * blocksPerRow + col;
      if (idx < blocks.length) {
        blocks[idx].style.borderColor = `rgb(0, 171, 240, ${opacity})`;
      }
    }
  });
}
blocks.forEach(block => {
  block.addEventListener("mouseenter", () => {
    const index = parseInt(block.dataset.index, 10);
    highlightTrail(index);
  });
});

document.querySelector(".blocks").addEventListener("mouseleave", () => {
  activeTrail = [];
  resetBlocks();
});
const images = gsap.utils.toArray(".skills img");
const angleIncrement = (Math.PI * 2) / images.length;
const radius = 30;
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
            trigger: ".skills",
            start: "top 60%",
            end: "top bottom",
            toggleActions: "play reverse play reverse",
            scrub: 1,
        },
        x: x * 5,
        y: y * 5,
        opacity: 1,
        ease: "power3.out",
        duration: 2,
        yoyo: true,
    });
});