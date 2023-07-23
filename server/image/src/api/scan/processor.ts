import sharp from "sharp";
import { USState } from "./cardReader";

export default class ImageProcessor {
    static async getMetaData(input: Input) {
        try {
            const
                metadata = await sharp(input).metadata();
            console.info(' image metadata: ', metadata);
        }
        catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    /**
     * apply base resize and image processing to enhance the image for first read
     * @param input
     * @param stateOfIssue 
     * @returns 
     */
    static async baseEnhance(input: Input) {
        try {
            return await sharp(input)
                .threshold(100)
                .resize({ height: 2000 })
                .toFormat('jpeg')
                .toBuffer();
        }
        catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    /**
     * apply context-sensitive image processing to enhance the image for better results
     * @param input
     * @param stateOfIssue 
     * @returns 
     */
    static async enhance(input: Input, stateOfIssue: USState) {
        try {
            switch (stateOfIssue) {
                case 'MARYLAND':
                    return await sharp(input)
                        .ensureAlpha()
                        .resize({ width: 1400, height: 900, fit: 'inside' })
                        // .toColourspace('cmyk')
                        // .extract({ width: 1400, height: 900, left: 100, top: 100 })
                        .threshold(100)
                        .toFormat('jpeg')
                        .toBuffer();
                default:
                    return await sharp(input)
                        .toFormat('jpeg')
                        .toBuffer();
            }
        }
        catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

export type Input =
    | Buffer
    | ArrayBuffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string;