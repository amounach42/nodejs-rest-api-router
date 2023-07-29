const parseEndpoint = (url) => url.split("/")
	.filter(segment => segment.length > 0)
	.map(segment => (segment[0] == ':')
		? { type: "wildcard" }
		: { type: "word", word: segment }
	);

function match(url, patterns) {
	const segments = url.split("/").filter(segment => segment.length > 0);

	if (patterns.length != segments.length) {
		return false;
	}
	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i];
		const pattern = patterns[i];
		if (pattern.type == "word" && pattern.word != segment) {
			return false;
		}
	}
	return true;
}

module.exports = {
	match,
	parseEndpoint
}
