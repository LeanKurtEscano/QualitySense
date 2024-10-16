import React from 'react';

const TermsAndConditions:React.FC = () => {
    return (
        <section className="w-full min-h-screen bg-darkbg text-darktext2 px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:max-w-3xl  mx-auto space-y-8">

                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl text-white font-bold">Terms and Conditions</h1>
                    <p className="text-sm text-gray-400 mt-2">Last updated: October 16, 2024</p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">1. Acceptance of Terms</h2>
                    <p className="mt-4 text-justify">
                        By using Quality Sense ("we," "our," or "us"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you may not use the platform.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">2. Use of the Platform</h2>
                    <p className="mt-4 text-justify">
                        You agree to use Quality Sense only for lawful purposes. You are prohibited from violating or attempting to violate the security of the platform, including but not limited to, accessing data not intended for you or logging into an account you are not authorized to access.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">3. Intellectual Property</h2>
                    <p className="mt-4 text-justify">
                        The content available on the QualitySense platform, including all information, software, technology, data, and any other copyrightable or proprietary materials, is collectively referred to as "QualitySense Content." This content is the exclusive property of QualitySense and is protected by applicable intellectual property laws. You may not modify, reproduce, distribute, or create derivative works from any QualitySense Content, including our trademarks, without obtaining explicit written permission from us.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">4. User Content</h2>
                    <p className="mt-4 text-justify">
                        By uploading datasets or other content to Quality Sense, you retain ownership of your data. However, you grant us a license to use the data for the purposes of providing our service to you, including AI-driven analysis and reports.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">5. Limitation of Liability</h2>
                    <p className="mt-4 text-justify">
                        <p className="mt-4 text-justify">
                            Quality Sense does not guarantee that unexpected errors won't occur or that the platform will be accessible 100% of the time, although we put maximum effort into preventing such issues. We continually enhance the platform and strive to implement changes without interrupting user experience, but occasional downtime may still happen.
                        </p>

                    </p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">6. Termination</h2>
                    <p className="mt-4 text-justify">
                        We reserve the right to terminate or suspend your access to the platform at any time, without notice, for any violation of these Terms and Conditions or for any other reason. You also have the right to delete your account at any time through your account settings, which will result in the removal of your access to the platform.
                    </p>

                </div>

            

                <div>
                    <h2 className="text-xl text-white font-semibold">7. Changes to the Terms</h2>
                    <p className="mt-4 text-justify">
                        We may update these Terms and Conditions from time to time. Any changes will be posted on this page with the updated date. By continuing to use the platform after changes are posted, you agree to the revised terms.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl text-white font-semibold">8. Contact Us</h2>
                    <p className="mt-4 text-justify">
                        If you have any questions about these Terms and Conditions, please contact us at:
                    </p>
                    <p className="mt-2"><strong>Email:</strong> leankurtescano@gmail.com</p>
                    <p><strong>Address:</strong> thequalitysense@gmail.com</p>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;
