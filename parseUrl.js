
const parseEndpoint = (url) => url.split("/")
	.filter(segment => segment.length > 0)
	.map(segment => (segment[0] == ':')
		? { type: "wildcard" }
		: { type: "word", word: segment }
	);

const zipForEach = (arr1, arr2, callback) => {
	for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
		callback(arr1[i], arr2[i])
	}
}

function match(url, patterns) {

	const segments = url.split("/").filter(segment => segment.length > 0);

	if (patterns.length != segments.length) {
		return false;
	}
	zipForEach(segments, patterns, (segment, pattern) => {
		if (pattern.type == "word" && pattern.word != segment) {
			return false;
		}
	});

	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i];
		const pattern = patterns[i];
		if (pattern.type == "word" && pattern.word != segment) {
			return false;
		}
	}

	return true;
}

function main() {
	const urlExample = "/api/users/:userId/posts/:postId";
	const patterns = parseEndpoint(urlExample);

	const urlSample = "/api/users/5086/posts/7854/egdv";
	console.log(match(urlSample, patterns));
}

main();
