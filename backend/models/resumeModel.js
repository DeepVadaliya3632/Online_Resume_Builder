import mongoose from 'mongoose';
// import { use } from 'react';

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    template: {
        theme: String,
        colorPalette: [String]
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        desgnation: String,
        summary: String
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String
    },
    // work experience
    workExperience: [{
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String
    }],
    education: [{
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
    }],
    skills: [{
        name: String,
        progress: Number
    }],
    projects: [{
        title: String,
        description: String,
        github: String,
        liveDemo: String
    }],
    certifications: [{
        title: String,
        issuer: String,
        year: String
    }],
    languges: [{
        name: String,
        progress: Number
    }],
    interests: [String],
    
},

{
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt' },
}
);

export default mongoose.model("Resume", resumeSchema);