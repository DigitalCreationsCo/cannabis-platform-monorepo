export type ImagePaths = Record<string, string>

export type ImageFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export type OcrJsonPayload = {
    "secret_key": string,
    "image_url"?: string,
    "image_data"?: string,
}