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
	//for문
	// for (let i = 0; i <= 8; i++) {
	// 	if (scrollTop >= $(".content__item").eq(i).offset().top) {
	// 		$("#parallax__dot ul li").eq(i).addClass("active").siblings().removeClass("active");
	// 	}
	// }

	//each()
	$(".content__item").each(function (index, ele) {
		if (scrollTop >= $(".content__item").eq(index).offset().top - 2) {
			$("#parallax__nav ul li").eq(index).addClass("active").siblings().removeClass("active");
			$("#parallax__dot ul li").eq(index).addClass("active").siblings().removeClass("active");
		}
	});

	//메뉴 사라짐 효과(pc)
	// if (scrollTop > 0) $("#parallax__nav").addClass("show");
	// else $("#parallax__nav").removeClass("show");

	//메뉴 사라짐 효과(mobile)
	nowScrollTop = true;

	setTimeout(function () {
		if (nowScrollTop) {
			nowScrollTop = false;
			hasScroll();
		}
	}, 1000);

	//이질감 효과
	// let offset1 = scrollTop - $("#section1").offset().top;
	// let offset2 = scrollTop - $("#section2").offset().top;
	// let offset3 = scrollTop - $("#section3").offset().top;
	// let offset4 = scrollTop - $("#section4").offset().top;
	// let offset5 = scrollTop - $("#section5").offset().top;
	// let offset6 = scrollTop - $("#section6").offset().top;
	// let offset7 = scrollTop - $("#section7").offset().top;
	// let offset8 = scrollTop - $("#section8").offset().top;
	// let offset9 = scrollTop - $("#section9").offset().top;
	// $("#section1").css({ transform: `translateX(${offset1}px)` });
	// $("#section2").css({ transform: `translateX(${offset2}px)` });
	// $("#section3").css({ transform: `translateX(${offset3}px)` });
	// $("#section4").css({ transform: `translateX(${offset4}px)` });
	// $("#section5").css({ transform: `translateX(${offset5}px)` });
	// $("#section6").css({ transform: `translateX(${offset6}px)` });
	// $("#section7").css({ transform: `translateX(${offset7}px)` });
	// $("#section8").css({ transform: `translateX(${offset8}px)` });
	// $("#section9").css({ transform: `translateX(${offset9}px)` });

	//for문
	// for (let i = 1; i <= 9; i++) {
	// 	let offset = scrollTop - $(`#section${i}`).offset().top;
	// 	$(`#section${i}`).css({ transform: `translateX(${offset}px)` });
	// 	console.log(offset);
	// }

	//each()
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
