// validation.ts
import { Metadata, SocialMedia } from '../_type/profile.types';

export interface ValidationErrors {
    [key: string]: string;
}

// URL validation
export const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Allow empty URLs
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Phone number validation
export const isValidPhone = (phone: string): boolean => {
    if (!phone) return true; // Allow empty phone numbers
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};

// Pincode validation
export const isValidPincode = (pincode: string): boolean => {
    if (!pincode) return true; // Allow empty pincodes
    const pincodeRegex = /^\d{5,6}$/;
    return pincodeRegex.test(pincode);
};

// Required field validation
export const isRequiredField = (value: string): boolean => {
    return value.trim().length > 0;
};

// Email validation
export const isValidEmail = (email: string): boolean => {
    if (!email) return true; // Allow empty email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate social media URLs
export const validateSocialMedia = (socialMedia: SocialMedia): ValidationErrors => {
    const errors: ValidationErrors = {};

    Object.entries(socialMedia).forEach(([key, value]) => {
        if (value && !isValidUrl(value)) {
            errors[`${key}Url`] = `Please enter a valid ${key} URL`;
        }
    });

    return errors;
};

// Validate metadata
export const validateMetadata = (metadata: Metadata): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Phone validation
    if (metadata.phone && !isValidPhone(metadata.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    // Pincode validation
    if (metadata.address.pincode && !isValidPincode(metadata.address.pincode)) {
        errors.pincode = 'Please enter a valid pincode';
    }

    // Required fields validation
    if (!metadata.bio || !isRequiredField(metadata.bio)) {
        errors.bio = 'Bio is required';
    }

    // Add any other metadata validations as needed

    return errors;
};

// Main validation function
export const validateProfileForm = (metadata: Metadata, socialMedia: SocialMedia): ValidationErrors => {
    return {
        ...validateMetadata(metadata),
        ...validateSocialMedia(socialMedia)
    };
};