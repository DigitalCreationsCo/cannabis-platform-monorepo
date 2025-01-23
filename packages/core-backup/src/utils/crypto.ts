import cryptoJs from 'crypto-js';

class Crypto {
	private secret: string;
	constructor(secret: string) {
		if (!secret) throw new Error('Crypto secret key is required.');

		this.secret = secret;
	}

	encrypt(data: string | object): string {
		let cipherText;

		if (typeof data === 'object')
			cipherText = cryptoJs.AES.encrypt(
				JSON.stringify(data),
				this.secret
			).toString();
		else cipherText = cryptoJs.AES.encrypt(data, this.secret).toString();

		return cipherText;
	}

	decrypt(data: string): string {
		const bytes = cryptoJs.AES.decrypt(data, this.secret);
		return bytes.toString(cryptoJs.enc.Utf8);
	}

	//  debugging for some other thing, I forget

	// encrypt(data: string | object): string {
	// 	console.info('secret ', this.secret);
	// 	console.info('encrypt data ', data);

	// 	return cryptoJs.AES.encrypt(JSON.stringify(data), this.secret).toString();
	// }

	// decrypt(data: string): string {
	// 	console.info('secret ', this.secret);
	// 	console.info('decrypt data ', data);

	// 	const bytes = cryptoJs.AES.decrypt(JSON.stringify(data), this.secret);
	// 	const decryptedData = bytes.toString(cryptoJs.enc.Utf8);
	// 	console.info('decrypted ', decryptedData);

	// 	return decryptedData;
	// }

	// decrypt2(data: any): string {
	// 	console.info('secret ', this.secret);
	// 	console.info('decrypt data ', data);

	// 	const utf8 = cryptoJs.enc.Base64url.parse(data);
	// 	console.info('utf8 ', utf8);

	// 	const bytes = cryptoJs.AES.decrypt(utf8.toString(), this.secret);
	// 	console.info('bytes ', bytes);

	// 	return bytes.toString(cryptoJs.enc.Utf8);
	// }

	createMD5Hash(data: string): string {
		return cryptoJs.MD5(data).toString(cryptoJs.enc.Hex);
	}
}

const crypto = new Crypto(process.env.NEXT_PUBLIC_CRYPTO_SK!);

export { crypto };
