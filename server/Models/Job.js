const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    batchEligible: [
        {
            type: String,
            required: true
        }
    ],
    jobDescription: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    applyLink: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now() + (1000 * 60 * 60 * 24 * 5) // for 5 days
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

// Create index for expireAt field
jobSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Job", jobSchema);
