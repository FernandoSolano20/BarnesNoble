let currentStars = 0;
let stars = document.getElementsByClassName("otr");

for (let i = 0; i < stars.length; ++i) {
	stars[i].indexParam = i;
	stars[i].addEventListener("mouseover", function (evt) {
		let index = evt.target.indexParam;
		let j;
		for (j = currentStars; j <= index; ++j) {
			stars[j].style.opacity = "1";
		}
	});
	stars[i].addEventListener("mouseout", function(evt) {
		let index = evt.target.indexParam;
		let j;
		for (j = currentStars; j <= index; ++j) {
			stars[j].style.opacity = "0";
		}
	});
	stars[i].addEventListener("click", function (evt) {
		let index = evt.target.indexParam;
		currentStars = index + 1;
		let j;
		for (j = 0; j <= index; ++j) {
			stars[j].style.opacity = "1";
		}
		for (j = index + 1; j < stars.length; ++j) {
			stars[j].style.opacity = "0";
		}
	});
}