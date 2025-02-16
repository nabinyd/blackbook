'use client';
import Loading from "@/app/Loading";
import { fetchTestimonial } from "@/lib/features/testimonial";
import { AppDispatch, RootState } from "@/lib/store";
import Image from "next/image";
import  {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Testimonials() {
    const dispatch = useDispatch<AppDispatch>();

    const { testimonials, loading } = useSelector((state: RootState) => state.testimonialReducer);

    useEffect(() => {
        dispatch(fetchTestimonial());
    }, [dispatch]);


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-12">
                    What Our Users Are Saying
                </h2>

                {/* Testimonial Carousel */}
                <div className=" flex gap-6 overflow-x-auto scrollbar-hide">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-400"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <Image
                                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-600"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={64}
                                    height={64}
                                />
                                <div className="ml-4">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-600">{testimonial.designation}</p>
                                </div>
                            </div>
                            <p className="text-lg text-gray-700 italic">&quot {testimonial.message} &quot</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
