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

    // 마우스 이벤트 및 배경 위치 설정
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
        slidesPerView: 4,  // 한 번에 4개의 슬라이드 표시
        spaceBetween: 20,  // 슬라이드 간 간격
        slidesPerGroup: 1,  // 한 번에 한 그룹씩 이동
        navigation: {
            nextEl: "#design .swiper-button-next",  // 다음 버튼
            prevEl: "#design .swiper-button-prev",  // 이전 버튼
        },
        nested: true,  // 중첩 슬라이드
    });

    // 공통 Swiper 옵션
    const swiperCommonOptions = {
        direction: "vertical", // 수직 방향
        slidesPerView: "auto", // 자동 크기 계산 (이 부분은 필요에 따라 변경 가능)
        freeMode: true, // 자유 모드
        mousewheel: true, // 마우스 휠 기능
    };

    // Swiper 초기화 함수
    function initializeSwiper(selector, scrollbarSelector) {
        return new Swiper(selector, {
            ...swiperCommonOptions,
            scrollbar: {
                el: scrollbarSelector,
                draggable: true,
                hide: true,
            },
        });
    }

    // 각 Swiper 인스턴스 초기화
    initializeSwiper(".product_detail_swiper_01", ".product_detail_swiper_01 .swiper-scrollbar");
    initializeSwiper(".product_detail_swiper_02", ".product_detail_swiper_02 .swiper-scrollbar");
    initializeSwiper(".product_detail_swiper_03", ".product_detail_swiper_03 .swiper-scrollbar");
    initializeSwiper(".product_detail_swiper_04", ".product_detail_swiper_04 .swiper-scrollbar");
    initializeSwiper(".product_detail_swiper_05", ".product_detail_swiper_05 .swiper-scrollbar");

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
    
    // Swiper 영역을 기준으로 설정
    var swiperArea = $('.sec6 .swiper');  
    
    // Swiper 영역에 마우스가 들어오거나 터치가 시작되면 fullPage 비활성화
    swiperArea.on('mouseenter touchstart', function() {
        isInsideSwiper = true;
        if (!isDragging) {
            disableFullPageScrolling();
        }
    });
    
    // Swiper 영역을 벗어나거나 터치가 끝나면 fullPage 활성화
    swiperArea.on('mouseleave touchend', function() {
        isInsideSwiper = false;
        if (!isDragging) {
            enableFullPageScrolling();
        }
    });
    
    // Swiper 영역에서 드래그 시작
    swiperArea.on('mousedown touchstart', function() {
        isDragging = true;
        disableFullPageScrolling();
    });
    
    // Swiper 영역에서 드래그 끝
    $(document).on('mouseup touchend', function(event) {
        isDragging = false;
    
        // Swiper 영역 외부에서 드래그가 끝난 경우
        if (!isInsideSwiper) {
            enableFullPageScrolling();
        }
    });

    // 휠 이벤트: Swiper 영역 내에서만 Swiper 스크롤, 외부에서는 fullPage 스크롤
    $(document).on("wheel", function(event) {
        let insideSwiper = $(event.target).closest(".sec6 .swiper").length > 0;

        if (insideSwiper) {
            disableFullPageScrolling();  // Swiper 영역에서만 fullPage 비활성화
        } else {
            enableFullPageScrolling();  // 그 외에는 fullPage 활성화
        }
    });
});

Kakao.init('40e7f9acecd585c7514703a52c49f034'); // 사용할 앱의 JavaScript키를 입력해 주세요.
function kakaoChatStart() {
    Kakao.Channel.chat({
        channelPublicId: '_uqbbn' // 카카오톡 채널 홈 URL에 명시된 ID를 입력합니다.(1단계에서 복사한 값)
    });
}