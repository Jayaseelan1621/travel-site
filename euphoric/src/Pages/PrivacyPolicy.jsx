export default function PrivacyPolicy() {
    const sections = [
        {
            num: '1.', title: 'Browsing Our Website',
            content: [
                'You are welcome to explore our website without sharing any personal details. Information is only collected when you choose to make a booking, register an account, or use a specific service.',
            ]
        },
        {
            num: '2.', title: 'Booking & Purchases',
            content: [
                'When you make a booking with Euphoric Tours & Travels, we collect the necessary details to process your reservation, including:',
            ],
            bullets: [
                'Full name and contact information',
                'Payment details (card number, expiry date, billing address)',
                'Email address and phone number',
                'Traveler details, if you are booking on behalf of others',
            ],
            after: [
                'This information is used solely to confirm bookings, process payments, and keep you informed about your trip. If you are booking on behalf of other travelers, you confirm that you have obtained their consent to share their personal information with us.',
            ]
        },
        {
            num: '3.', title: 'Account Registration',
            content: [
                'To create an account with us, you will be asked to provide:',
            ],
            bullets: [
                'Name and contact details',
                'Email address',
                'Login credentials (username and password)',
            ],
            after: [
                'This information helps us to verify your identity, manage your bookings, offer customer support, personalize your experience, and continuously improve our services.',
                'We also use your registered email address to send booking confirmations and important account-related updates.',
            ]
        },
        {
            num: '4.', title: 'Mobile App Permissions',
            content: [
                'Our mobile app is designed with your privacy in mind. We do not publicly share sensitive personal, financial, or identity information through the app.',
                'Certain permissions may be requested to enable app functionality:',
            ],
            bullets: [
                'Camera & Microphone (iOS only): To capture and share images or videos with our support team when needed',
                'Location (Android & iOS): To suggest nearby travel options and improve personalized recommendations',
            ]
        },
        {
            num: '5.', title: 'Travel Preferences & Member Details',
            content: [
                'You may optionally provide additional information such as travel preferences, frequent flyer numbers, or saved billing details. This helps us speed up future bookings and deliver a more personalized experience every time you travel with us.',
            ]
        },
        {
            num: '6.', title: 'Surveys & Feedback',
            content: [
                'We occasionally conduct surveys to understand your experience and improve our services. Participation is entirely voluntary, and responses are typically collected anonymously unless specified otherwise.',
            ]
        },
        {
            num: '7.', title: 'Promotions & Campaigns',
            content: [
                'Euphoric Tours & Travels may run promotional campaigns or special offers from time to time. Information collected during such activities is used only to notify winners or participants and to improve the quality of our offers.',
            ]
        },
        {
            num: '8.', title: 'Automatic Data Collection',
            content: [
                'When you visit our website, we may automatically collect limited technical information, including:',
            ],
            bullets: [
                'IP address',
                'Browser type and version',
                'Operating system',
                'Pages visited and time spent on each page',
            ],
            after: [
                'This data is used for analytics, improving website performance, and enhancing your browsing experience. It does not directly identify you as an individual.',
            ]
        },
        {
            num: '9.', title: 'Cookies',
            content: [
                'Cookies are small data files stored on your device that help improve the functionality and personalization of our website.',
                'We use cookies to:',
            ],
            bullets: [
                'Remember your login details for convenience',
                'Customize your browsing experience',
                'Analyze website traffic and usage patterns',
                'Display relevant offers and content',
            ],
            after: [
                'Cookies do not store personally identifiable information. You can control or disable cookies through your browser settings — however, please note that doing so may affect certain features of our website.',
            ]
        },
        {
            num: '10.', title: 'Sharing of Information',
            content: [
                'We share personal information only with trusted third-party partners strictly necessary to fulfill your booking — such as airlines, hotels, transport providers, and visa agencies.',
                'We do not sell or rent your personal data under any circumstances.',
                'We may share aggregated, non-identifiable data with partners for analytics and service improvement purposes. Any third-party vendors assisting us with surveys or promotions operate under strict confidentiality agreements.',
            ]
        },
        {
            num: '11.', title: 'Opting Out of Communications',
            content: [
                'You may receive promotional emails, SMS messages, or updates about travel offers and new packages from us. If you prefer not to receive such communications, you can:',
            ],
            bullets: [
                'Click the "Unsubscribe" link in any promotional email',
                'Update your communication preferences in your account settings',
                'Write to us directly at euphorictourstravels@gmail.com',
            ]
        },
        {
            num: '12.', title: 'Data Security',
            content: [
                'All transactions on our platform are protected using SSL (Secure Socket Layer) encryption, ensuring that your sensitive information — including payment details — is transmitted safely and securely.',
                'We take reasonable technical and organizational measures to protect your data from unauthorized access, loss, or misuse.',
            ]
        },
        {
            num: '13.', title: 'External Links',
            content: [
                'Our website may contain links to third-party websites for your convenience. Once you leave our platform, Euphoric Tours & Travels is not responsible for the privacy practices of those external sites. We encourage you to review their privacy policies independently.',
            ]
        },
        {
            num: '14.', title: 'User Responsibility',
            content: [
                'To keep your account and personal information secure, you are responsible for:',
            ],
            bullets: [
                'Keeping your login credentials confidential',
                'Not sharing your account access with others',
                'Using our platform securely and responsibly',
            ],
            after: [
                'Please notify us immediately if you suspect any unauthorized access to your account.',
            ]
        },
        {
            num: '15.', title: 'Legal Disclosure',
            content: [
                'In certain circumstances, Euphoric Tours & Travels may be required to disclose personal information if mandated by law, legal proceedings, or government authorities, or when necessary to protect the rights, safety, or property of our users or our company.',
                'In the event of a merger, acquisition, or business restructuring, user data may be transferred as part of the business assets — always in accordance with applicable privacy laws.',
            ]
        },
        {
            num: '16.', title: 'Policy Updates',
            content: [
                'This Privacy Policy is effective from 2025 and may be updated periodically to reflect changes in our practices or applicable regulations. Any significant updates will be clearly reflected on this page.',
                'For any questions, concerns, or requests related to your personal data, please reach out to us at euphorictourstravels@gmail.com. We aim to respond to all enquiries within 5 working days.',
            ]
        },
        {
            num: '17.', title: 'Use of Customer Travel Content',
            content: [
                'By submitting travel-related content — including photos, videos, reviews, or testimonials — to Euphoric Tours & Travels, you grant us a worldwide, royalty-free, perpetual license to use such content for marketing, promotional, and storytelling purposes.',
                'By submitting content, you confirm that:',
            ],
            bullets: [
                'You are the rightful owner of the content',
                'The content is authentic and accurate',
                'You permit reasonable editing for clarity or formatting',
            ],
            after: [
                'Euphoric Tours & Travels is under no obligation to publish or use submitted content, and we will never use it in a manner that is inappropriate or misrepresentative.',
                'You agree to hold Euphoric Tours & Travels harmless from any third-party claims arising from the use of your submitted content.',
                'To withdraw or request removal of any content you have submitted, please contact us at euphorictourstravels@gmail.com.',
            ]
        },
    ]

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <style>{`
        .pp-pad { padding: 64px 5vw 80px; }
        @media (max-width: 768px) { .pp-pad { padding: 40px 16px 60px; } }
      `}</style>

            {/* HERO — white */}
            <section style={{ background: '#f9fafb', padding: '56px 5vw 44px', textAlign: 'center' }}>
                <div style={{
                    background: '#f59e0b', color: 'white',
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    padding: '6px 18px', borderRadius: 24,
                    display: 'inline-block', marginBottom: 22
                }}>YOUR PRIVACY · OUR PRIORITY</div>
                <h1 style={{
                    fontSize: 'clamp(20px, 3.5vw, 46px)',
                    fontWeight: 800, color: '#111',
                    lineHeight: 1.2, margin: 0
                }}>
                    We protect your data the way we protect your trip.
                </h1>
            </section>

            {/* CONTENT */}
            <section className="pp-pad">
                <div style={{ maxWidth: 820, margin: '0 auto' }}>

                    <h2 style={{
                        fontSize: 26, fontWeight: 800, color: '#22c55e',
                        marginBottom: 40, paddingBottom: 16,
                        borderBottom: '2px solid #f3f4f6'
                    }}>Privacy Policy</h2>

                    {sections.map((s, i) => (
                        <div key={i} style={{ marginBottom: 36 }}>
                            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 14 }}>
                                {s.num} {s.title}
                            </h3>

                            {/* Intro paragraphs */}
                            {s.content.map((p, j) => (
                                <p key={j} style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.9, marginBottom: 10 }}>{p}</p>
                            ))}

                            {/* Bullet points */}
                            {s.bullets && (
                                <ul style={{ margin: '8px 0 12px 0', paddingLeft: 20 }}>
                                    {s.bullets.map((b, k) => (
                                        <li key={k} style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.9, marginBottom: 6 }}>{b}</li>
                                    ))}
                                </ul>
                            )}

                            {/* After bullets paragraphs */}
                            {s.after && s.after.map((p, j) => (
                                <p key={j} style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.9, marginBottom: 10 }}>{p}</p>
                            ))}
                        </div>
                    ))}

                    {/* Footer note */}
                    <div style={{
                        marginTop: 48, padding: '24px 28px',
                        background: '#f9fafb', borderRadius: 16,
                        borderLeft: '4px solid #22c55e'
                    }}>
                        <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                            Last updated: May 2025. For privacy-related queries, contact us at{' '}
                            <span style={{ color: '#22c55e', fontWeight: 600 }}>euphorictourstravels@gmail.com</span>
                        </p>
                    </div>

                </div>
            </section>
        </div>
    )
}