const multer = require("multer");

// Lazy-load Octokit so we can use it in CommonJS
let Octokit;
async function getOctokit() {
    if (!Octokit) {
        const module = await import("@octokit/rest");
        Octokit = module.Octokit;
    }
    return Octokit;
}

// Store file in memory instead of disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Middleware to upload directly to GitHub
const saveFileToGitHub = async (req, res, next) => {
    if (!req.file) return next();

    const OctokitClass = await getOctokit();
    const octokit = new OctokitClass({
        auth: process.env.GITHUB_TOKEN,
    });

    const [owner, repo] = process.env.GITHUB_REPO.split("/");
    const branch = process.env.GITHUB_BRANCH || "main";

    const filePath = `uploads/${Date.now()}-${req.file.originalname}`;
    const content = req.file.buffer.toString("base64");

    try {
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: `Upload ${req.file.originalname}`,
            content,
            branch,
        });

        req.fileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { upload, saveFileToGitHub };
