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
                        .resize({ width: 1600 })
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