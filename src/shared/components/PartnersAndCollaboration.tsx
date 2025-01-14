import Image from "next/image";

export default function PartnersAndCollaboration() {
    return (
        <div className="bg-gray-100 py-36">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    Our Trusted Partners & Collaborators
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                    We are proud to work with industry-leading partners who help us deliver
                    exceptional projects. Together, we are building the future.
                </p>

                {/* Partners Logos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
                        <Image src="/images/react.png" alt="Partner 1" width={100} height={100} />
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
                        <Image src="/images/react.png" alt="Partner 1" width={100} height={100} />
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
                        <Image src="/images/react.png" alt="Partner 1" width={100} height={100} />
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg flex justify-center items-center">
                        <Image src="/images/react.png" alt="Partner 1" width={100} height={100} />
                    </div>
                </div>

                {/* Call to Action */}
                {/* <div className="mt-16">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                        Interested in Collaborating with Us?
                    </h3>
                    <p className="text-lg text-gray-600 mb-8">
                        Join us in creating innovative projects and solutions that will make an
                        impact. Whether you're a company or an individual, we welcome all forms
                        of collaboration.
                    </p>
                    <a
                        href="#contact-us"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300"
                    >
                        Get in Touch
                    </a>
                </div> */}
            </div>
        </div>
    );
}
