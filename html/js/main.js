$(document).ready(function() {
    const $title = $("#loading_page .title");
    const listHTML = $title.html();
    const listItems = listHTML.split("<br>");
    $title.empty();

    listItems.forEach(item => {
        const newItem = `
            <div class="title_mask">
                <span class="title_line">${item}</span>
            </div>`;
        $title.append(newItem);
    });

    var chars = $(".emphasis").text().split('').map(char => {
        return `<span class="emphasis-char">${char}</span>`;
    }).join('');
    $(".emphasis").html(chars);

    gsap.from(".emphasis-char", {
        y: -100,
        opacity: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1
    });

    gsap.from(".title_mask:not(:first-child)", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 2.8,
        ease: "power2.out"
    });

    setTimeout(() => {
        gsap.to("#loading_page", {
            opacity: 0,
            duration: 1,
            delay: 1.5,
            onComplete: () => $("#loading_page").remove()
        });
    }, 3000);

    // 메인페이지
    var mouseX, mouseY;
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    var traX, traY;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        traX = ((4 * mouseX) / 350) + 10;
        traY = ((4 * mouseY) / 350) + 20;
    
        var elements = document.querySelectorAll('.title, .title.lg, .line');
        elements.forEach(function(element) {
            if (element.classList.contains('line')) {
                element.style.backgroundPosition = `center, ${traX}% ${traY}%`;
            } else {
                element.style.backgroundPosition = traX + "% " + traY + "%";
            }
        });
    
        var titleSpans = document.querySelectorAll('.title span, .title.lg span');
        titleSpans.forEach(function(span) {
            span.style.backgroundPosition = traY + "% " + traX + "%";
        });
    });

    // fullPage 설정
    const progressBar = document.querySelector('.progress-bar-one');

    if (progressBar) {
        let currentProgress = 0;

        $('#fullpage').fullpage({
            anchors: ['sec1', 'sec2', 'sec3', 'sec4', 'sec5', 'sec6', 'sec7'],
            menu: '#nav',
            scrollingSpeed: 1000,
            afterLoad: function(anchorLink, index) {
                currentProgress = ((index - 1) / 6) * 100;
                gsap.to(progressBar, {
                    duration: 1,
                    width: currentProgress + "%",
                    ease: "power2.out"
                });
            },
            onLeave: function(index, nextIndex, direction) {
                let progress = ((nextIndex - 1) / 6) * 100;

                gsap.to(progressBar, {
                    duration: 1,
                    width: progress + "%",
                    ease: "power2.out"
                });
            }
        });
    } else {
        console.error('Progress bar element not found!');
    }

    // Swiper 초기화
    var swiper = new Swiper(".product_detail_swiper_box", {
        slidesPerView : "auto",
        spaceBetween : 20,
        slidesPerGroup : 1,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        nested: true
    });

    // 공통 Swiper 옵션
    const swiperCommonOptions = {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: true,
    };

    // Swiper 초기화 함수
    function initializeSwiper(selector, scrollbarSelector) {
        return new Swiper(selector, {
            ...swiperCommonOptions,
            scrollbar: {
                el: scrollbarSelector,
                draggable: true,
            },
        });
    }

    // 각 Swiper 인스턴스 초기화
    initializeSwiper(".product_detail_swiper_01", ".swiper-scrollbar-01");
    initializeSwiper(".product_detail_swiper_02", ".swiper-scrollbar-02");
    initializeSwiper(".product_detail_swiper_03", ".swiper-scrollbar-03");
    initializeSwiper(".product_detail_swiper_04", ".swiper-scrollbar-04");
    initializeSwiper(".product_detail_swiper_05", ".swiper-scrollbar-05");

    // fullPage.js 스크롤 제어 함수
    function disableFullPageScrolling() {
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
    }

    function enableFullPageScrolling() {
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
    }

    let isDragging = false;
    let isInsideSwiper = false;

    // Swiper에 들어가면 fullPage.js 차단
    $(".swiper-wrapper").on("mouseenter touchstart", function() {
        isInsideSwiper = true;
        disableFullPageScrolling();
    });

    // Swiper에서 나가면 fullPage.js 활성화
    $(".swiper-wrapper").on("mouseleave touchend", function() {
        if (!isDragging) {
            isInsideSwiper = false;
            enableFullPageScrolling();
        }
    });

    // Swiper에서 드래그 시작 감지
    $(".swiper-wrapper").on("mousedown touchstart", function() {
        isDragging = true;
    });

    // Swiper에서 드래그 끝 감지
    $(document).on("mouseup touchend", function() {
        isDragging = false;
        if (!isInsideSwiper) {
            enableFullPageScrolling();
        }
    });

    // 마우스 휠 이벤트 감지 (Swiper와 fullPage.js 자동 전환)
    $(document).on("wheel", function(event) {
        let insideSwiper = $(event.target).closest(".swiper-wrapper").length > 0;

        if (insideSwiper) {
            disableFullPageScrolling();
        } else {
            enableFullPageScrolling();
        }
    });
});

// // 사용할 앱의 JavaScript 키를 설정해 주세요.
// Kakao.init('40e7f9acecd585c7514703a52c49f034');
// // 채널 1:1 채팅 버튼을 생성합니다.
// Kakao.Channel.createChatButton({
// container: '#kakao-talk-channel-chat-button',
// channelPublicId: '_uqbbn',
// title: 'consult',
// size: 'large',
// color: 'yellow',
// shape: 'mobile',
// supportMultipleDensities: true,
// });