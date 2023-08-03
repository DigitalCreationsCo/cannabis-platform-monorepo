export type ImagePaths = Record<string, string>;

export type ImageFile = {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
};

type VerifyIdentificationResponse =
	| {
			success: true;
			result: {
				isLegalAge: boolean;
				idVerified: boolean;
				scannedDOB: Date;
			};
			images: {
				idFrontImage: string;
				idBackImage: string;
			};
			isUploaded: boolean;
	  }
	| {
			success: false;
			error: string;
	  };
