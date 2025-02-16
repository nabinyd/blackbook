import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { updateProfile } from '@/lib/features/auth.slice';
import { Metadata, SocialMedia } from '../_type/profile.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import {
    Github,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Globe,
    User,
    AtSign
} from 'lucide-react';
import { Routes } from '@/config/Routes';
import { useToast } from '@/hooks/use-toast';

const UpdateProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { toast } = useToast();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const initialMetadata: Metadata = {
        bio: user?.metadata?.bio || '',
        address: {
            city: user?.metadata?.address?.city || '',
            state: user?.metadata?.address?.state || '',
            country: user?.metadata?.address?.country || '',
            pincode: user?.metadata?.address?.pincode || '',
        },
        college: user?.metadata?.college || '',
        degree: user?.metadata?.degree || '',
        followers: user?.metadata?.followers || [],
        gender: user?.metadata?.gender || '',
        phone: user?.metadata?.phone || '',
        stream: user?.metadata?.stream || '',
    };

    const initialSocialMedia: SocialMedia = {
        twitter: user?.socialMedia?.twitter || '',
        behance: user?.socialMedia?.behance || '',
        facebook: user?.socialMedia?.facebook || '',
        github: user?.socialMedia?.github || '',
        instagram: user?.socialMedia?.instagram || '',
        linkedIn: user?.socialMedia?.linkedIn || '',
        medium: user?.socialMedia?.medium || '',
        website: user?.socialMedia?.website || '',
    };

    useEffect(() => {
        if (!user) {
            router.push(Routes.PROJECT);
        }
    }, [user, router]);

    const [metadata, setMetadata] = useState<Metadata>(initialMetadata);
    const [socialMedia, setSocialMedia] = useState<SocialMedia>(initialSocialMedia);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!user) return;
        console.log(user.id.toString());

        try {
            await dispatch(updateProfile({ userId: user.id.toString(), metadata, socialMedia })).unwrap();
            toast({
                title: 'Profile updated successfully',
                description: 'Your profile has been updated successfully',
                type: 'foreground',
            });

            setMetadata(initialMetadata);
            setSocialMedia(initialSocialMedia);


        } catch (err) {
            console.error('Failed to update profile:', err);
            toast({
                title: 'Failed to update profile',
                description: 'An error occurred while updating your profile',
                type: 'foreground',
            });
        }
    };

    const socialIcons = {
        github: <Github className="h-4 w-4" />,
        twitter: <Twitter className="h-4 w-4" />,
        facebook: <Facebook className="h-4 w-4" />,
        instagram: <Instagram className="h-4 w-4" />,
        linkedIn: <Linkedin className="h-4 w-4" />,
        website: <Globe className="h-4 w-4" />,
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Profile Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="personal">Personal Info</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                            <TabsTrigger value="social">Social Media</TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal" className="space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <Label>Bio</Label>
                                    <Input
                                        value={metadata.bio}
                                        onChange={(e) => setMetadata({ ...metadata, bio: e.target.value })}
                                        placeholder="Tell us about yourself"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Phone</Label>
                                        <Input
                                            type="tel"
                                            value={metadata.phone}
                                            onChange={(e) => setMetadata({ ...metadata, phone: e.target.value })}
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                    <div>
                                        <Label>Gender</Label>
                                        <Input
                                            value={metadata.gender}
                                            onChange={(e) => setMetadata({ ...metadata, gender: e.target.value })}
                                            placeholder="Your gender"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>College</Label>
                                        <Input
                                            value={metadata.college}
                                            onChange={(e) => setMetadata({ ...metadata, college: e.target.value })}
                                            placeholder="Your college name"
                                        />
                                    </div>
                                    <div>
                                        <Label>Degree</Label>
                                        <Input
                                            value={metadata.degree}
                                            onChange={(e) => setMetadata({ ...metadata, degree: e.target.value })}
                                            placeholder="Your degree"
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="address" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>City</Label>
                                    <Input
                                        value={metadata.address.city}
                                        onChange={(e) =>
                                            setMetadata({
                                                ...metadata,
                                                address: { ...metadata.address, city: e.target.value },
                                            })
                                        }
                                        placeholder="Your city"
                                    />
                                </div>
                                <div>
                                    <Label>State</Label>
                                    <Input
                                        value={metadata.address.state}
                                        onChange={(e) =>
                                            setMetadata({
                                                ...metadata,
                                                address: { ...metadata.address, state: e.target.value },
                                            })
                                        }
                                        placeholder="Your state"
                                    />
                                </div>
                                <div>
                                    <Label>Country</Label>
                                    <Input
                                        value={metadata.address.country}
                                        onChange={(e) =>
                                            setMetadata({
                                                ...metadata,
                                                address: { ...metadata.address, country: e.target.value },
                                            })
                                        }
                                        placeholder="Your country"
                                    />
                                </div>
                                <div>
                                    <Label>Pincode</Label>
                                    <Input
                                        value={metadata.address.pincode}
                                        onChange={(e) =>
                                            setMetadata({
                                                ...metadata,
                                                address: { ...metadata.address, pincode: e.target.value },
                                            })
                                        }
                                        placeholder="Your pincode"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="social" className="space-y-4">
                            {Object.entries(socialMedia).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <div className="w-8 flex justify-center">
                                        {socialIcons[key as keyof typeof socialIcons] || <AtSign className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <Label className="capitalize">{key}</Label>
                                        <Input
                                            value={value}
                                            onChange={(e) => setSocialMedia({ ...socialMedia, [key]: e.target.value })}
                                            placeholder={`Your ${key} profile URL`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateProfile;