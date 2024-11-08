const net = require("net");

const sampleRate = 32 * 1000;

const bufferSize = sampleRate / 200;

const freq = 100;

const connection = net.createConnection(2000, "127.0.0.1", () => {
	const buffer = Buffer.alloc(bufferSize);

	const step = freq / sampleRate;

	const vect = [1, 0];

	const direction = [1, 1];

	let offset = 0;

	while(true) {
		if(offset === bufferSize / 4 / 2 - 2) {
			connection.write(buffer);

			offset = 0;
		}

		vect[0] += direction[0] * step;
		vect[1] += direction[1] * step;

		if(vect[0] < -1 || vect[0] > 1) {
			direction[0] *= -1;

			if(vect[0] < -1) {
				vect[0] = -1;
			}

			if(vect[0] > 1) {
				vect[0] = 1;
			}
		}

		if(vect[1] < -1 || vect[1] > 1) {
			direction[1] *= -1;

			if(vect[1] < -1) {
				vect[1] = -1;
			}

			if(vect[1] > 1) {
				vect[1] = 1;
			}
		}

		buffer.writeFloatLE(vect[0], offset * 4 * 2);
		buffer.writeFloatLE(vect[1], offset * 4 * 2 + 8);

		console.log(offset, bufferSize / 4 / 2);

		offset++;
	}
});
