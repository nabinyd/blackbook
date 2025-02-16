// types/profile.ts

export interface SocialMedia {
    linkedIn?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    website?: string;
    medium?: string;
    behance?: string;
}

export interface Address {
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
}

export interface Metadata {
    bio?: string;
    gender?: string;
    phone?: string;
    college?: string;
    degree?: string;
    stream?: string;
    address: Address;
    followers: string[];
}

export interface ProfileFormData {
    socialMedia: SocialMedia;
    metadata: Metadata;
}
