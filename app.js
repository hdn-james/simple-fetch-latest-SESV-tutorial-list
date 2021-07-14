const fetchBtn = document.getElementById("fetchList");

const url = "https://www.sesvtutorial.com/tutorials";
const proxyUrl = "https://api.allorigins.win/raw?url=";

// to add css
const processStyle = (htmlStr) => {
	let sty = "";
	while (htmlStr.indexOf("<style") !== -1) {
		let start = htmlStr.indexOf("<style");
		let end = htmlStr.indexOf("</style>");
		sty += htmlStr.substring(start, end + 8);
		htmlStr = htmlStr.slice(0, start) + htmlStr.slice(end + 8);
	}
	sty += "<style>.posts{padding:20%;padding-top:5%}</style>";
	return sty;
};

// to add html
const processHTMLString = (html) => {
	let start = html.search('<section class="posts ">');
	let end = html.search("</section>");
	return html.slice(start, end + 10);
};

// to get the latest list
const getSESV = async () => {
	if (!confirm("I'll get the latest SESV Tutorial list!")) {
		return;
	}
	try {
		const response = await fetch(proxyUrl + url);
		let html = await response.text();
		// init style
		const style = processStyle(html);
		// init html
		html = processHTMLString(html);
		// add style
		html += style;
		document.getElementById("content").innerHTML = html;
	} catch (err) {
		console.log(err);
	}
};

fetchBtn.addEventListener("click", getSESV);
