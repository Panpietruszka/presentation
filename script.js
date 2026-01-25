gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const lastScrollY = sessionStorage.getItem('lastScrollPos') || 0;
    const video = document.getElementById('scroll-video');
    const videoContainer = document.getElementById('video-container');
    const zoomSection = document.getElementById('zoom-section');
    const videoCheckbox = document.getElementById('video-checkbox');
    const body = document.body;
    const wrapper = document.querySelector('#animation-wrapper');
    let hasBeenPlayed = localStorage.getItem('videoWatched') === 'true';
    let videoStarted = false;

    if (videoCheckbox) {
        videoCheckbox.addEventListener('change', () => {
            if (videoCheckbox.checked) {
                if (video) video.pause();
                body.classList.remove('lock-scroll');
            } else {
                if (video) {
                    video.play().catch(() => { });
                    if (!hasBeenPlayed) body.classList.add('lock-scroll');
                }
            }
        });
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    const sekcja = document.querySelector('#compare-models');
    sekcja.scrollIntoView({
        behavior: 'smooth'
    });

    window.addEventListener('load', () => {
        initGalleries();

        if (document.getElementById('animation-trigger')) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#animation-trigger",
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            })
                .to("#text-bundle", { y: "0", opacity: 1, duration: 2 })
                .to("#text-bundle", { y: "-100vh", opacity: 0, duration: 2 })
                .to("#main-img", { scale: 0.85, borderRadius: "40px", duration: 1.5 });
        }

        ScrollTrigger.refresh();
        if (lastScrollY > 0) window.scrollTo(0, lastScrollY);

        body.classList.add('loaded');


        if (zoomSection) {
            const rect = zoomSection.getBoundingClientRect();
            if (rect.bottom <= 0 || hasBeenPlayed) {
                hasBeenPlayed = true;
                videoStarted = true;
                body.classList.remove('lock-scroll');
                if (video) {
                    video.muted = true;
                    video.loop = true;
                    video.play().catch(() => { });
                }
            }
        }
    });

    window.addEventListener('scroll', () => {
        sessionStorage.setItem('lastScrollPos', window.scrollY);

        if (zoomSection) {
            const rect = zoomSection.getBoundingClientRect();
            const windowH = window.innerHeight;

            if (rect.top < windowH && rect.bottom > 0) {
                let progress = Math.min(Math.max((windowH - rect.top) / windowH, 0), 1);

                if (videoContainer) {
                    videoContainer.style.width = `${60 + (40 * progress)}%`;
                    videoContainer.style.height = `${60 + (40 * progress)}vh`;
                    videoContainer.style.borderRadius = `${60 * (1 - progress)}px`;
                }


                if (progress >= 1 && !videoStarted && !hasBeenPlayed) {
                    videoStarted = true;
                    body.classList.add('lock-scroll');

                    if (videoCheckbox) videoCheckbox.checked = false;

                    if (video) {
                        video.muted = false;
                        video.onended = () => {
                            hasBeenPlayed = true;
                            localStorage.setItem('videoWatched', 'true');
                            body.classList.remove('lock-scroll');
                            if (videoCheckbox) videoCheckbox.checked = true;
                            window.scrollBy({ top: 150, behavior: 'smooth' });
                        };
                        video.play().catch(() => { });
                    }
                }
            }
        }
    });

    function initGalleries() {
        document.querySelectorAll('.gallery-container').forEach(gallery => {
            const wrapper = gallery.querySelector('.imageWrapper');
            const prevBtn = gallery.querySelector('.prevBtn');
            const nextBtn = gallery.querySelector('.nextBtn');

            if (!wrapper || !prevBtn || !nextBtn) return;

            const updateButtons = () => {
                const scrollLeft = Math.ceil(wrapper.scrollLeft);
                const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

                if (scrollLeft > 5) {
                    prevBtn.style.opacity = "1";
                    prevBtn.style.pointerEvents = "auto";
                    prevBtn.style.cursor = "pointer";
                } else {
                    prevBtn.style.opacity = "0.3";


                    prevBtn.style.pointerEvents = "auto";
                    prevBtn.style.cursor = "not-allowed";
                }

                if (scrollLeft >= maxScroll - 5) {
                    nextBtn.style.opacity = "0.3";
                    nextBtn.style.pointerEvents = "auto";
                    nextBtn.style.cursor = "not-allowed";
                } else {
                    nextBtn.style.opacity = "1";
                    nextBtn.style.pointerEvents = "auto";
                    nextBtn.style.cursor = "pointer";
                }
            };

            nextBtn.onclick = () => {

                if (nextBtn.style.cursor === "not-allowed") return;

                wrapper.scrollBy({
                    left: 600,
                    behavior: 'smooth'
                });
                setTimeout(updateButtons, 500);
            };

            prevBtn.onclick = () => {
                if (prevBtn.style.cursor === "not-allowed") return;

                wrapper.scrollBy({
                    left: -600,
                    behavior: 'smooth'
                });
                setTimeout(updateButtons, 500);
            };

            wrapper.addEventListener('scroll', updateButtons);
            updateButtons();
        });
    }

    const revealItems = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                if (entry.target.classList.contains('gallery-container')) {
                    const innerReveals = entry.target.querySelectorAll('.reveal');
                    innerReveals.forEach(item => item.classList.add('active'));
                    revealObs.unobserve(entry.target);
                } else {

                    entry.target.classList.add('active');
                    revealObs.unobserve(entry.target);
                }
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });

    revealItems.forEach(item => {

        const parentGallery = item.closest('.gallery-container');

        if (parentGallery) {

            revealObs.observe(parentGallery);
        } else {

            if (item.getBoundingClientRect().top < window.innerHeight * 0.1) {
                item.classList.add('active');
            } else {
                revealObs.observe(item);
            }
        }
    });

    if (wrapper) {
        const wrapObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wrapper.classList.add('is-visible');
                } else if (entry.boundingClientRect.top > 0 || entry.boundingClientRect.bottom < 0) {
                    wrapper.classList.remove('is-visible');
                }
            });
        }, { rootMargin: "0px 0px -40% 0px" });
        wrapObs.observe(wrapper);
    }

    const samsungSec = document.getElementById('samsung-reveal-section');
    if (samsungSec) {
        new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
        }, { threshold: 0.5 }).observe(samsungSec);
    }

    const container = document.getElementById('magic-container');
    const icon = document.getElementById('status-icon');
    const content = document.getElementById('expanded-ui-content');
    const zone = document.getElementById('trigger-zone');

    const CONFIG = {
        margin: 175,
        targetBottom: 140,
        fullWidth: 340,
        bubbleSize: 56
    };

    const STATE = {
        hasTriggered: false,
        isLatched: false,
        introTimeline: null,
        isFullyHidden: true
    };

    function getSafeClampedBottom(requestedBottom) {
        const zoneRect = zone.getBoundingClientRect();
        const winH = window.innerHeight;
        const conH = container.offsetHeight;
        const bottomLimit = winH - zoneRect.bottom + CONFIG.margin;
        const topLimit = winH - zoneRect.top - conH - CONFIG.margin;
        return Math.min(Math.max(requestedBottom, bottomLimit), topLimit);
    }

    function handlePositionRefresh() {
        if (STATE.hasTriggered && !STATE.isLatched) return;

        const safeBottom = getSafeClampedBottom(CONFIG.targetBottom);
        gsap.set(container, { bottom: safeBottom });

        const zoneRect = zone.getBoundingClientRect();
        if (zoneRect.bottom < 0 || zoneRect.top > window.innerHeight) {
            if (!STATE.isFullyHidden) {
                gsap.to(container, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.inOut" });
                STATE.isFullyHidden = true;
            }
        } else {
            if (STATE.isFullyHidden && STATE.isLatched) {
                gsap.to(container, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
                STATE.isFullyHidden = false;
            }
        }
    }

    function initiateSacredSequence() {
        if (STATE.hasTriggered) return;
        STATE.hasTriggered = true;
        STATE.isFullyHidden = false;

        gsap.killTweensOf([container, icon, content]);

        gsap.set(container, {
            opacity: 0,
            bottom: -100,
            width: CONFIG.bubbleSize,
            scaleX: 0.5,
            scaleY: 1.5,
            filter: "blur(10px)"
        });

        STATE.introTimeline = gsap.timeline({
            onComplete: () => {
                STATE.isLatched = true;
                handlePositionRefresh();
            },
            onReverseComplete: () => {
                STATE.hasTriggered = false;
                STATE.isLatched = false;
                STATE.isFullyHidden = true;
                gsap.set(container, { opacity: 0 });
            }
        });

        STATE.introTimeline

            .to(container, {
                opacity: 1,
                bottom: 200,
                scaleX: 1.1,
                scaleY: 0.9,
                filter: "blur(0px)",
                duration: 0.7,
                ease: "expo.out"
            })

            .to(container, {
                width: CONFIG.fullWidth,
                bottom: CONFIG.targetBottom,
                scaleX: 1,
                scaleY: 1,
                duration: 1.4,
                ease: "elastic.out(1, 0.6)"
            }, 0.4)

            .to(icon, {
                left: "calc(100% - 32px)",
                scale: 0.8,
                duration: 1.2,
                ease: "elastic.out(1, 0.7)"
            }, 0.5)

            .to(content, {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                duration: 0.8,
                ease: "power2.out"
            }, 0.7)

            .to("#magic-container", {
                onStart: () => {
                    gsap.fromTo("#magic-container",
                        { "--shine-pos": "-150%" },
                        { keyframes: [{ "--shine-pos": "150%" }], duration: 1 }
                    );
                }
            }, 0.6);

        STATE.introTimeline.add(() => {
            if (!STATE.introTimeline.reversed()) {
                const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
                idleTl.to(container, {
                    y: -8,
                    duration: 2.5,
                    ease: "sine.inOut"
                });
                idleTl.to(container, {
                    boxShadow: "0 40px 70px -15px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.6)",
                    duration: 2.5,
                    ease: "sine.inOut"
                }, 0);
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!STATE.hasTriggered) initiateSacredSequence();
                else if (STATE.introTimeline?.reversed()) STATE.introTimeline.play();
            } else {
                if (STATE.hasTriggered && !STATE.isLatched) STATE.introTimeline.reverse();
            }
        });
    }, { threshold: 0.001 });

    observer.observe(zone);
    window.addEventListener('scroll', handlePositionRefresh, { passive: true });
    window.addEventListener('resize', handlePositionRefresh);

    document.addEventListener('DOMContentLoaded', () => {
        const initialRect = zone.getBoundingClientRect();
        if (initialRect.top < window.innerHeight && initialRect.bottom > 0) {
            initiateSacredSequence();
        }
    });
});
