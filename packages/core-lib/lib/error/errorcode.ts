type ErrorObject = {
    code: number,
    message: string
}

type ErrorName = "INVALID_UPLOAD_IMAGE"

export const ErrorCodes: Record<ErrorName, ErrorObject> = Object.freeze({
    "INVALID_UPLOAD_IMAGE": { code: 1000, message: "Sorry, we could not verify the image. Please upload a different image." },
})