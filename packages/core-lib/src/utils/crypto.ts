import cryptoJs from 'crypto-js';

class Crypto {

    secret:string;
    // private secret:string;
    constructor(secret: string) {

        if (!secret)
        throw new Error('Crypto secret key is required.');
        
        this.secret = secret;
    }

    encrypt(data: string | object): string {
        let 
        cipherText; 
        
        if (typeof data === 'object')
        cipherText = cryptoJs.AES.encrypt(JSON.stringify(data), this.secret).toString();
        
        else
        cipherText = cryptoJs.AES.encrypt(data, this.secret).toString();

        return cipherText;
    }

    decrypt(data: string): string {
        const 
        bytes = cryptoJs.AES.decrypt(data, this.secret);
        
        const 
        plainText = bytes.toString(cryptoJs.enc.Utf8);

        return plainText;
    }
}

const crypto = new Crypto(process.env.NEXT_PUBLIC_CRYPTO_SK as string)

export { crypto };
