// 모든 .badge_box 요소 찾기
const containers = document.querySelectorAll(".badge_box");

containers.forEach(container => {
    // 배지를 담을 변수
    let badges = "";

    // 'sold_out' 클래스가 있을 경우
    if (container.classList.contains("sold_out")) {
        badges += "<div class='badge sold_out_badge'>SOLD OUT</div>";
    }

    // 'new' 클래스가 있을 경우
    if (container.classList.contains("new")) {
        badges += "<div class='badge new_badge'>NEW</div>";
    }

    // 'sale' 클래스가 있을 경우
    if (container.classList.contains("sale")) {
        badges += "<div class='badge sale_badge'>SALE</div>";
    }

    // 'pick' 클래스가 있을 경우
    if (container.classList.contains("pick")) {
        badges += "<div class='badge pick_badge'>PICK</div>";
    }
    
    // 배지가 하나라도 있으면 해당 콘텐츠 추가, 없으면 display: none 처리
    if (badges) {
        container.innerHTML = badges;
    } else {
        container.style.display = "none";
    }
});

document.querySelectorAll('.swiper-slide.item').forEach(function(item) {
    if (item.querySelector('.badge_box.sold_out')) {
        item.querySelector('.sold_out_item').classList.add('on');
    }
});

document.querySelectorAll(".menu_depth01 li").forEach((menuItem, index) => {
    menuItem.addEventListener("mouseenter", () => {
        // 모든 menu_depth02 li에서 on 클래스 제거
        document.querySelectorAll(".menu_depth02 > li").forEach(subItem => {
            subItem.classList.remove("on");
        });

        // 현재 인덱스에 맞는 menu_depth02의 li 찾기
        let correspondingDepth2 = document.querySelectorAll(".menu_depth02 > li")[index];
        if (correspondingDepth2) {
            correspondingDepth2.classList.add("on");
        }
    });
});

document.querySelector("nav").addEventListener("mouseleave", () => {
    document.querySelectorAll(".menu_depth02 > li").forEach(subItem => {
        subItem.classList.remove("on");
    });
});

var mainBannerSwiper = new Swiper(".main_banner_swiper", {
    spaceBetween : 0,
    effect:'fade',
    speed:800,
    loop: true,
    autoplay: {
        delay: 3200,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".main_banner_swiper .swiper-pagination",
    },
    navigation: {
        nextEl: ".main_banner_swiper .swiper-button-next",
        prevEl: ".main_banner_swiper .swiper-button-prev",
    },
});

const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach(button => {
    button.addEventListener("click", function() {
        // 모든 버튼에서 active 제거
        buttons.forEach(btn => btn.classList.remove("active"));
        // 모든 콘텐츠 숨기기
        contents.forEach(content => content.classList.remove("active"));

        // 클릭된 버튼에 active 추가
        this.classList.add("active");
        // 해당하는 콘텐츠 보이기
        document.getElementById(this.dataset.target).classList.add("active");
    });
});

let swiperInstances = {}; // 생성된 Swiper 인스턴스를 저장할 객체

document.querySelectorAll(".tab-btn").forEach((btn, index) => {
    btn.addEventListener("click", function() {
        let targetTab = this.dataset.target; // 클릭한 탭의 대상 ID
        let swiperContainer = document.querySelector(`#${targetTab} .best_swiper`);

        if (swiperContainer && !swiperInstances[targetTab]) { 
            // Swiper가 아직 생성되지 않았다면 실행
            swiperInstances[targetTab] = new Swiper(`#${targetTab} .best_swiper`, {
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                speed: 800,
                autoplay: {
                    delay: 3200,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: `#${targetTab} .swiper-pagination`,
                },
                navigation: {
                    nextEl: `#${targetTab} .swiper-button-next`,
                    prevEl: `#${targetTab} .swiper-button-prev`,
                },
            });
        }
    });
});

// 로딩 후 첫 번째 탭 활성화
let firstTab = document.querySelector(".tab-btn");
if (firstTab) {
    firstTab.click(); // 첫 번째 탭 클릭하여 초기화
}

var newSwiper = new Swiper(".new_swiper", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3200,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".new_swiper .swiper-pagination",
    },
    navigation: {
        nextEl: ".new_swiper .swiper-button-next",
        prevEl: ".new_swiper .swiper-button-prev",
    },
});

document.querySelectorAll('.item').forEach(item => {
    let info = item.querySelector('.item_info');

    item.addEventListener('mouseenter', () => {
        let height = info.scrollHeight + 24;
        info.style.height = height + 'px';
        info.style.padding = '12px 20px';
        info.style.transition = 'height 0.4s ease-in-out, padding 0.4s ease-in-out, opacity 0.4s ease-in-out';
    });

    item.addEventListener('mouseleave', () => {
        info.style.height = '0';
        info.style.padding = '0 20px';
    });
});

const listItems = document.querySelectorAll(".camp_story li");

function setActiveItem(target) {
    // 모든 li의 active 클래스 제거
    listItems.forEach((item) => item.classList.remove("active"));
    // 호버한 요소에만 active 추가
    target.classList.add("active");
}

listItems.forEach((item) => {
    // 마우스 호버 시 active 변경
    item.addEventListener("mouseenter", function () {
        setActiveItem(this);
    });
});

var youtubeFakeSwiper = new Swiper(".youtube_fake_swiper", {
    direction: "vertical",
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    mousewheel: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    watchSlidesProgress: true,
});
var youtubeSwiper = new Swiper(".youtube_swiper", {
    spaceBetween: 10,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    thumbs: {
        swiper: youtubeFakeSwiper,
    },
});