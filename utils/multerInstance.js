import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/plan_icons');
	},
	filename: function (req, file, cb) {
		// debug(file);
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype == 'image/jpeg' ||
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/png' ||
		file.mimetype === 'image/svg+xml'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({ storage, fileFilter: fileFilter });


const storageTwo = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/plugins');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const fileFilterTwo = (req, file, cb) => {
	if (path.extname(file.originalname) === '.zip') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const uploadTwo = multer({ storage:storageTwo, fileFilter: fileFilterTwo });

const storageThree = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/media');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});
const fileFilterThree = (req, file, cb) => {
    // List of allowed MIME types
    const allowedTypes = [
        'image/jpeg', 
        'image/png', 
        'image/webp', 
        'application/pdf', 
        'text/csv', 
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Reject file with an error message
        cb(new Error('Invalid file type. Only Images, PDF, CSV, and Excel are allowed!'), false);
    }
};

const uploadThree = multer({ 
    storage: storageThree, // Ensure this matches your storage variable name
    fileFilter: fileFilterThree,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit as requested earlier
});


const storageFour = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/csv');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});
const fileFilterFour = (req, file, cb) => {
    // List of allowed MIME types
    const allowedTypes = [
        'text/csv', 
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Reject file with an error message
        cb(new Error('Invalid file type. Only CSV allowed!'), false);
    }
};

const uploadFour = multer({ 
    storage: storageFour, // Ensure this matches your storage variable name
    fileFilter: fileFilterFour,
});

export { upload, uploadTwo, uploadThree, uploadFour };
