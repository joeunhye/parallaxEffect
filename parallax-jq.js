$("#parallax__nav ul li").click(function (e) {
	e.preventDefault();
	let target = $(this); //사용자가 클릭한 버튼의 타겟이 저장
	let index = target.index(); //인덱스를 부여하여 저장
	let section = $(".content__item").eq(index);
	let offset = section.offset().top; // offset() : 요소의 위치(문서 기준)
	$("html, body").animate({ scrollTop: offset }, 600);
});

let nowScrollTop;
let lastScrollTop = 0;
$(window).scroll(function () {
	let scrollTop = $(window).scrollTop();

	// 메뉴 활성화 효과
	$(".content__item").each(function (index, ele) {
		if (scrollTop >= $(".content__item").eq(index).offset().top - 2) {
			$("#parallax__nav ul li").eq(index).addClass("active").siblings().removeClass("active");
			$("#parallax__dot ul li").eq(index).addClass("active").siblings().removeClass("active");
		}
	});

	//메뉴 사라짐 효과 1
	// if (scrollTop > 0) $("#parallax__nav").addClass("show");
	// else $("#parallax__nav").removeClass("show");

	//메뉴 사라짐 효과 2
	nowScrollTop = true;

	setTimeout(function () {
		if (nowScrollTop) {
			nowScrollTop = false;
			hasScroll();
		}
	}, 1000);

	//이질감 효과
	$(".content__item").each(function (i) {
		let offset1 = (scrollTop - $(this).offset().top) * 0.2;
		let offset2 = (scrollTop - $(this).offset().top) * 0.1;
		$(this)
			.find(".content__item__img")
			.css({ transform: `translateY(${offset1}px)` });
		$(this)
			.find(".content__item__desc")
			.css({ transform: `translateY(${offset2}px)` });
		$(this)
			.find(".content__item__num")
			.css({ transform: `translateY(${-offset2}px)` });
	});

	//글씨 나타나기
	$(".content__item").each(function (i) {
		if (scrollTop >= $(this).offset().top) {
			$(this)
				.find(".content__item__desc span")
				.each(function (j) {
					$(this)
						.addClass("show")
						.css("transition-delay", `${0.05 * j}s`);
				});
		}
	});

	//리빌 효과
	// $(".reveal").each(function () {
	// 	if (scrollTop >= $(this).offset().top - $(window).height() / 2) {
	// 		$(this).addClass("show");
	// 	}
	// });
});

function hasScroll() {
	let scrollTop = $(window).scrollTop();
	if (scrollTop > lastScrollTop) {
		$("#parallax__nav").addClass("hide");
	} else {
		$("#parallax__nav").removeClass("hide");
	}
	lastScrollTop = scrollTop;
}

//글씨 쪼개기
$(".content__item__desc").each(function () {
	let text = $(this).text();
	let split = text.split("").join("</span><span aria-hidden='true'>"); //접근성 고려하여 'aria-hidden' 속성 추가
	split = "<span aria-hidden='true'>" + split + "</span>";
	$(this).html(split).attr("aria-label", text);
});
