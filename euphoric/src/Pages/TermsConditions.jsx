export default function TermsConditions() {
    const sections = [
        {
            num: '1.', title: 'Applicability of This Agreement',
            content: [
                'This agreement governs the use of all services offered by Euphoric Tours & Travels to any individual or entity ("User") who browses, enquires, or purchases any product or service through our website, offices, sales representatives, call centers, or any other communication channel.',
                'For the purpose of this agreement, Euphoric Tours & Travels and the User are individually referred to as a "Party" and collectively as the "Parties."',
            ]
        },
        {
            num: '2.', title: 'User Acknowledgement & Acceptance',
            content: [
                'By accessing or using our services, you confirm that you have read, understood, and agreed to be bound by these terms. This agreement is legally binding and applies to all transactions and services provided by Euphoric Tours & Travels.',
                'We reserve the right to suspend or terminate access to our platforms at any time, without prior notice, for maintenance or any other reason we deem necessary.',
                'Certain services — such as flights, hotel bookings, or holiday packages — may carry additional service-specific terms. These form part of this agreement. In case of any conflict, this agreement shall take precedence. Users must review and accept any applicable service-specific terms before completing a booking.',
                'Third-party service providers such as airlines and hotels operate under their own policies. Users are responsible for complying with those conditions.',
            ]
        },
        {
            num: '3.', title: 'Service Usage Conditions',
            content: [
                'By using Euphoric Tours & Travels services, you authorize us and our representatives to access third-party platforms — such as banks or payment gateways — solely for the purpose of processing your transactions.',
                'Users are responsible for maintaining the confidentiality of their account login credentials. Any activity carried out through your account will be considered your responsibility.',
                'Please notify us immediately in the event of any unauthorized access to your account. Euphoric Tours & Travels will not be held liable for losses arising from misuse of your credentials.',
            ]
        },
        {
            num: '4.', title: 'Confidentiality',
            content: [
                'Any information designated as confidential by Euphoric Tours & Travels must be treated accordingly by the User. Disclosure is only permitted if required by law or necessary to fulfill obligations under this agreement.',
            ]
        },
        {
            num: '5.', title: 'Website & Platform Usage',
            content: [
                "All content and services accessed through our website or mobile platforms are used at the User's own risk. It is your responsibility to ensure our services meet your requirements before proceeding with a booking.",
                'Users are strictly prohibited from copying, modifying, distributing, or commercially exploiting any content from our platform without prior written authorization. Euphoric Tours & Travels reserves the right to modify or remove any content at any time without notice.',
            ]
        },
        {
            num: '6.', title: 'User Responsibilities',
            content: [
                'Euphoric Tours & Travels facilitates travel bookings but does not independently verify the legality of every transaction. Users must ensure the accuracy of all booking details provided and comply with all applicable laws and regulations.',
                'By using our services, you agree to follow all guidelines and procedures communicated by our team.',
            ]
        },
        {
            num: '7.', title: 'Travel Insurance',
            content: [
                'Unless explicitly stated as part of a package, travel insurance is not included in our services and remains the sole responsibility of the traveler.',
                "Where insurance is arranged through us, it will be governed entirely by the insurer's own terms and conditions. All claims must be handled directly with the insurance provider. Euphoric Tours & Travels does not guarantee the approval of any insurance claim.",
            ]
        },
        {
            num: '8.', title: 'Force Majeure',
            content: [
                'Certain events beyond our control — including but not limited to weather disruptions, government actions, strikes, airline operational issues, or technical failures — may impact your booking. In such cases, Euphoric Tours & Travels will make every reasonable effort to offer alternatives or applicable refunds, subject to the policies of the relevant service providers.',
                'Euphoric Tours & Travels acts as an intermediary and cannot be held responsible for disruptions caused by such circumstances. Our maximum liability in any such situation is limited to the refund of the amount received, after applicable deductions.',
            ]
        },
        {
            num: '9.', title: 'Limitation of Liability',
            content: [
                'Euphoric Tours & Travels and its partners shall not be liable for any direct or indirect loss — including loss of data, profits, or service interruptions — arising from the use of our services.',
                'We do not guarantee the accuracy of any third-party content or external links accessible through our platform.',
            ]
        },
        {
            num: '10.', title: 'Data Security',
            content: [
                "Any material downloaded from our platforms is done at the User's own risk. While we take reasonable precautions to maintain a safe and secure platform, Euphoric Tours & Travels does not warrant that all content is free from viruses or malicious software.",
            ]
        },
        {
            num: '11.', title: 'Marketing Communications',
            content: [
                'By registering or making a booking, you may receive marketing communications from us. You may opt out at any time by contacting us or using the unsubscribe option in any communication.',
            ]
        },
        {
            num: '12.', title: 'Governing Law',
            content: [
                'This agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising under this agreement shall be subject to the exclusive jurisdiction of the courts located in Salem, Tamil Nadu.',
            ]
        },
    ]

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <style>{`
        .tnc-pad { padding: 64px 5vw 80px; }
        @media (max-width: 768px) { .tnc-pad { padding: 40px 16px 60px; } }
      `}</style>

            {/* HERO */}
            <section style={{ background: '#f9fafb', padding: '56px 5vw 44px', textAlign: 'center' }}>
                <div style={{
                    background: '#f59e0b', color: 'white',
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    padding: '6px 18px', borderRadius: 24,
                    display: 'inline-block', marginBottom: 22
                }}>OUR POLICIES · CLEAR & TRANSPARENT</div>
                <h1 style={{
                    fontSize: 'clamp(20px, 3.5vw, 46px)',
                    fontWeight: 800, color: '#111',
                    lineHeight: 1.2, margin: 0
                }}>
                    We believe in honest travel, honest terms.
                </h1>
            </section>

            {/* CONTENT */}
            <section className="tnc-pad">
                <div style={{ maxWidth: 820, margin: '0 auto' }}>

                    {/* Title */}
                    <h2 style={{
                        fontSize: 26, fontWeight: 800, color: '#22c55e',
                        marginBottom: 40, paddingBottom: 16,
                        borderBottom: '2px solid #f3f4f6'
                    }}>
                        Terms & Conditions
                    </h2>

                    {sections.map((s, i) => (
                        <div key={i} style={{ marginBottom: 36 }}>
                            <h3 style={{
                                fontSize: 17, fontWeight: 700, color: '#111',
                                marginBottom: 14, lineHeight: 1.4
                            }}>
                                {s.num} {s.title}
                            </h3>
                            {s.content.map((p, j) => (
                                <p key={j} style={{
                                    color: '#6b7280', fontSize: 14,
                                    lineHeight: 1.9, marginBottom: 12
                                }}>{p}</p>
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
                            By using our services, you acknowledge that you have read and understood these Terms & Conditions and agree to be bound by them. For any questions, contact us at{' '}
                            <span style={{ color: '#22c55e', fontWeight: 600 }}>euphorictourstravels@gmail.com</span>
                        </p>
                    </div>

                </div>
            </section>
        </div>
    )
}