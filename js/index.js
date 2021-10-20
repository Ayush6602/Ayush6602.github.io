let imageHolder = document.querySelector("#imageHolder");
let queryInput = document.querySelector("#queryInput");
let addBtn = document.querySelector("#addBtn");
let rmvBtn = document.querySelector("#rmvBtn");
let height = 500;
let width = 500;
let bool = true;

function getImgUrl() {
	let query = queryInput.value;
	if (query == "") query = "nature";
	bool ? ++height : ++width;
	bool ^= true;
	return `https://source.unsplash.com/${width}x${height}/?${query}`;
}

addBtn.addEventListener("click", () => {
	let newImg = document.createElement("img");
	newImg.alt = "random image";
	newImg.src = getImgUrl();
	imageHolder.append(newImg);
	if (rmvBtn.disabled) rmvBtn.disabled = false;
});

rmvBtn.addEventListener("click", () => {
	imageHolder.firstChild.remove();
	if (imageHolder.childNodes.length == 0) rmvBtn.disabled = true;
});
