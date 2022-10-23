//메뉴, 닷
const parallaxItem = document.querySelectorAll(".content__item");
const parallaxNavEl = document.querySelector("#parallax__nav");
const parallaxNav = document.querySelectorAll("#parallax__nav ul li");
const parallaxDot = document.querySelectorAll("#parallax__dot ul li");

let nowScrollTop;
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
	let scrollTop = window.pageYOffset;
	// let scrollTop = document.documentElement.scrollTop;
	// let scrollTop = window.scrollY;
	document.querySelector(".parallax__scrollTop").innerText = scrollTop;

	// 메뉴 활성화 효과
	parallaxItem.forEach((item, idx) => {
		if (scrollTop >= item.offsetTop - 2) {
			parallaxNav.forEach(li => li.classList.remove("active"));
			parallaxNav[idx].classList.add("active");
			parallaxDot.forEach(li => li.classList.remove("active"));
			// parallaxDot[idx].classList.add("active");
			document.querySelector(`#parallax__dot ul li:nth-child(${idx + 1})`).classList.add("active");
		}
	});

	//메뉴 사라짐 효과(pc)
	scrollTop > 0 ? parallaxNavEl.classList.add("show") : parallaxNavEl.classList.remove("show");

	//메뉴 사라짐 효과(mobile)
	nowScrollTop = true;
	setTimeout(() => {
		if (nowScrollTop) {
			nowScrollTop = false;
			hasScroll();
		}
	}, 1000);

	//이질감 효과
	document.querySelectorAll(".content__item").forEach(item => {
		let offset1 = (scrollTop - item.offsetTop) * 0.2;
		let offset2 = (scrollTop - item.offsetTop) * 0.1;
		item.querySelector(".content__item__img").style.transform = `translateY(${offset1}px)`;
		item.querySelector(".content__item__desc").style.transform = `translateX(${offset2}px)`;
		item.querySelector(".content__item__num").style.transform = `rotate(${-offset2}deg)`;
	});

	//글씨 나타나기
	// document.querySelectorAll(".content__item").forEach(item => {
	// 	if (scrollTop > item.offsetTop) {
	// 		item.querySelectorAll(".content__item__desc span").forEach((span, index) => {
	// 			span.classList.add("show");
	// 			// .css("transition-delay", `${0.05 * j}s`);
	// 			span.style.transitionDelay = `${0.05 * index}s`;
	// 		});
	// 	}
	// });

	//GSAP
	document.querySelectorAll(".content__item").forEach((item, index) => {
		if (scrollTop >= item.offsetTop) {
			gsap.to(item.querySelectorAll(".split span"), {
				duration: 0.5,
				opacity: 1,
				y: 0,
				stagger: 0.05,
				ease: "power4.out",
			});
		}
	});

	//리빌 효과
	// const reveal = document.querySelectorAll(".reveal");

	// reveal.forEach(el => {
	// 	const revealDelay = el.dataset.delay;
	// 	if (scrollTop >= el.parentElement.offsetTop) {
	// 		if (revealDelay == undefined) {
	// 			el.classList.add("show");
	// 		} else {
	// 			setTimeout(() => {
	// 				el.classList.add("show");
	// 			}, revealDelay);
	// 		}
	// 	}
	// });
});

function hasScroll() {
	let scrollTop = window.pageYOffset;
	if (scrollTop > lastScrollTop) {
		parallaxNavEl.classList.add("hide");
	} else {
		parallaxNavEl.classList.remove("hide");
	}
	lastScrollTop = scrollTop;
}

document.querySelectorAll("#parallax__nav ul li a").forEach(el => {
	el.addEventListener("click", e => {
		e.preventDefault();
		document.querySelector(el.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});
document.querySelectorAll("#parallax__dot ul li a").forEach(el => {
	el.addEventListener("click", e => {
		e.preventDefault();
		document.querySelector(el.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});

//글씨 쪼개기
// let text = document.querySelector("#section1 .content__item__desc").innerText;
// let split = text.split("").join("</span><span aria-hidden='true'>");
// split = "<span aria-hidden='true'>" + split + "</span>";
// document.querySelector("#section1 .content__item__desc").innerHTML = split;

//다중 글씨 쪼개기
document.querySelectorAll(".split").forEach(el => {
	let text = el.innerText;
	let split = text.split("").join("</span><span aria-hidden='true'>");
	split = "<span aria-hidden='true'>" + split + "</span>";
	el.innerHTML = split;
	el.setAttribute("aria-label", text);
});
