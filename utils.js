import fs from 'fs';

export function writeDataToFile(fileName, content) {
  fs.writeFileSync(fileName, 'export const books = ' + JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

export function getBodyData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      })

	  req.on('end', () => {
		resolve(body);
	  })

    } catch (error) {
		reject(error);
	}
  });
}
