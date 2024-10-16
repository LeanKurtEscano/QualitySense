import React from 'react'

const PrivacyPolicy = () => {
    return (
      <section className="w-full min-h-screen bg-darkbg text-darktext2 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl text-white font-bold">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mt-2">Last updated: October 16, 2024</p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">1. Introduction</h2>
            <p className="mt-4 text-justify">
              Your privacy is important to us. This Privacy Policy explains how Quality Sense ("we," "our," or "us") collects, uses, and protects your personal data when you use our platform. By using Quality Sense, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">2. Information We Collect</h2>
            <p className="mt-4 text-justify">
              We may collect the following types of personal information:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Personal Information:</strong> When you register an account, we collect your name, email address, and other contact details.</li>
                <li><strong>Uploaded Data:</strong> When you use QualitySense to upload datasets for analysis, you agree to input the data for processing purposes. We assure you that we do not store the data from your dataset for your privacy; it is only used temporarily to generate the report for your analysis.</li>
              </ul>
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">3. How We Use Your Information</h2>
            <p className="mt-4 text-justify">
              We use the collected data for the following purposes:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>To Provide and Improve Our Service:</strong> The data we collect helps us deliver, maintain, and improve the Quality Sense platform's performance.</li>
                <li><strong>Data Analysis:</strong> We analyze uploaded datasets to provide AI-driven data cleaning suggestions and reports.</li>
                <li><strong>Communication:</strong> We may use your contact information to send important updates or respond to support requests.</li>
              </ul>
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">4. Data Sharing and Disclosure</h2>
            <p className="mt-4 text-justify">
              We will not share your personal information with third parties, except in the following cases:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Service Providers:</strong> We may share data with third-party services to operate and improve our service.</li>
                <li><strong>Legal Compliance:</strong> We may disclose your information if required by law, to enforce our policies, or to protect the rights, property, or safety of others.</li>
              </ul>
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">5. Data Security</h2>
            <p className="mt-4 text-justify">
              We are dedicated to safeguarding your data and employ robust technical and organizational measures to ensure the security and confidentiality of your personal information. While we strive to protect your data, no system can be entirely foolproof, and we cannot guarantee complete security.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">6. Data Retention</h2>
            <p className="mt-4 text-justify">
              We will retain your personal information and uploaded data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">7. User Rights</h2>
            <p className="mt-4 text-justify">
              You have the right to:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li><strong>Access:</strong> Request access to the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of any inaccuracies in your personal data.</li>
                <li><strong>Deletion:</strong> Request the deletion of your personal data in certain circumstances.</li>
              </ul>
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">8. Changes to this Privacy Policy</h2>
            <p className="mt-4 text-justify">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl text-white font-semibold">9. Contact Us</h2>
            <p className="mt-4 text-justify">
              If you have any questions or concerns regarding this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2"><strong>Email:</strong> leankurtescano@gmail.com</p>
            <p><strong>Address:</strong> thequalitysense@gmail.com</p>
          </div>
        </div>
      </section>
    );
  };

export default PrivacyPolicy;
