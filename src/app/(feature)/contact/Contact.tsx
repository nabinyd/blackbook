import { Button } from "@/components/ui/button";

export default function Contact() {
    return (
        <section className="min-h-screen bg-gray-900 text-gray-300 p-6 sm:p-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-semibold text-blue-600 text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-center text-gray-400 mb-8">
                    We&aposd love to hear from you! Whether you have a question about our platform, need assistance, or want to give feedback, feel free to reach out to us.
                </p>

                <div className="w-2/4 mx-auto space-y-8">
                    {/* Contact Form */}
                    <div className="bg-gray-800 p-6 rounded-md shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-500">Get in Touch</h3>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Your Message"
                                    rows={5}
                                    className="w-full px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 rounded-md"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
