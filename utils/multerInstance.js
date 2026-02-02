import multer from "multer";
import path from "path";


// ====================== upload for branding images ======================
const storageBranding = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/branding");
	},
	filename: function (req, file, cb) {
		cb(null, "brand-logo-" + Date.now() + path.extname(file.originalname));
	},
});

// ====================== upload for branding images ======================
const fileFilterBranding = (req, file, cb) => {
	if (
		file.mimetype == "image/jpeg" ||
		file.mimetype == "image/jpg" ||
		file.mimetype == "image/png" ||
		file.mimetype === "image/svg+xml" ||
		file.mimetype == "image/webp"
	) {
		cb(null, true);
	} else {
		cb(
			new Error(
				"Invalid file type. Only JPEG, JPG, PNG, SVG, and WebP images are allowed!",
			),
			false,
		);
	}
};

// ====================== upload for branding images ======================
const uploadBranding = multer({
	storage: storageBranding,
	fileFilter: fileFilterBranding,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ====================== upload for event cover images ======================
const storageEventCover = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/event");
	},
	filename: function (req, file, cb) {
		cb(null, "event-logo-" + Date.now() + path.extname(file.originalname));
	},
});
// ====================== upload for event cover images ======================
const fileFilterEventCover = (req, file, cb) => {
	if (
		file.mimetype == "image/jpeg" ||
		file.mimetype == "image/jpg" ||
		file.mimetype == "image/png" ||
		file.mimetype === "image/svg+xml" ||
		file.mimetype == "image/webp"
	) {
		cb(null, true);
	} else {
		cb(
			new Error(
				"Invalid file type. Only JPEG, JPG, PNG, SVG, and WebP images are allowed!",
			),
			false,
		);
	}
};
// ====================== upload for event cover images ======================
const uploadEventCover = multer({
	storage: storageEventCover,
	fileFilter: fileFilterEventCover,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export { uploadBranding, uploadEventCover };
