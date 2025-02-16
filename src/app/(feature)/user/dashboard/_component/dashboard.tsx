'use client'
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Routes } from "@/config/Routes";
import Image from "next/image";
import Loading from "@/app/Loading";
import ProjectCard from "@/app/(feature)/project/_component/ProjectCard";
import { fetchUserFavoriteProjects, fetchUserProjects } from "@/lib/features/project.slice";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { userProjects, userProjectsLoading, userFavoriteProjects, userFavoriteProjectsLoading } = useSelector((state: RootState) => state.project);
    useEffect(() => {
        if (!isAuthenticated) {
            router.push(Routes.LOGIN);
        }
    }, [user, isAuthenticated, router]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserProjects(user?.id as unknown as string));
            dispatch(fetchUserFavoriteProjects(user?.id as unknown as string));
        }
    }, [isAuthenticated, user, dispatch]);

    const handleDeleteProfile = () => {
        if (confirm("Are you sure you want to delete your profile?")) {

            // TODO: Implement delete profile logic here
        }
    };

    if (userProjectsLoading || userFavoriteProjectsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6">
            <div className="w-full mx-auto shadow-md rounded-lg overflow-hidden">
                {/* Profile Header */}
                <div className="flex items-center p-6 border-b border-gray-200">
                    <div className="relative w-16 h-16">
                        <Image
                            src={user?.metadata.profilePicUrl ?? "/images/11539820.png"}
                            alt="Profile Picture"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </div>
                    <div className="ml-6">
                        <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
                        <p className="text-gray-600">@{user?.username}</p>
                        <p className="text-sm text-gray-500">Role: {user?.role}</p>
                    </div>
                </div>

                {/* Edit & Delete Profile Buttons */}
                <div className="flex justify-between p-6 border-b border-gray-200">
                    <Link href={Routes.UPDATE_PROFILE}>
                       
                        Edit Profile
                    </Link>
                    <button
                        onClick={handleDeleteProfile}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Delete Profile
                    </button>
                </div>

                {/* User Information Section */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Name</p>
                            <p className="text-sm text-gray-800">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Email</p>
                            <p className="text-sm text-gray-800">{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Created At</p>
                            <p className="text-sm text-gray-800">{new Date(user?.createdAt ?? "").toDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Updated At</p>
                            <p className="text-sm text-gray-800">{user ? new Date(user.updatedAt).toDateString() : "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Address Section */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600">City</p>
                            <p className="text-sm text-gray-800">{user?.metadata.address?.city || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">State</p>
                            <p className="text-sm text-gray-800">{user?.metadata.address?.state || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Country</p>
                            <p className="text-sm text-gray-800">{user?.metadata.address?.country || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pincode</p>
                            <p className="text-sm text-gray-800">{user?.metadata.address?.pincode || "N/A"}</p>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(user?.socialMedia ?? {}).map(([platform, link]) => (
                            <div key={platform}>
                                <p className="text-sm font-medium text-gray-600 capitalize">{platform}</p>
                                <p className="text-sm text-gray-800">
                                    {link ? (
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                            {link}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Favourite Projects Section */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Favorite Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userFavoriteProjects && userFavoriteProjects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </div>
                </div>

                {/* User Projects Section */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userProjects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </div>
                </div>

                {/* User Favorite Projects Section */}

            </div>
        </div>
    );
}
