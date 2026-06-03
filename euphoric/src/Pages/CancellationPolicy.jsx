export default function CancellationPolicy() {
    const sections = [
        {
            num: '1.', title: 'General Cancellation & Refund Policy',
            content: [
                'This cancellation policy applies to all holiday packages booked through Euphoric Tours & Travels from 2025 onwards.',
                'Customers eligible for refunds will receive the applicable amount within 90 working days from the date of cancellation, or once the respective service providers process the refund — whichever occurs later.',
                'For cancellations made during an ongoing trip, refunds will be processed within 90 working days from the traveler\'s return date, or once the supplier releases the refund — whichever is later.',
                'Since travel services involve multiple vendors and international partners, the final refund amount may vary based on:',
            ],
            bullets: [
                'Exchange rate fluctuations at the time of processing',
                'Refund approvals from individual service providers',
                'Payments already made on your behalf',
            ],
            after: [
                'Any changes to the refund value will be communicated to you promptly by our team. For assistance, please write to us at euphorictourstravels@gmail.com',
            ]
        },
        {
            num: '2.', title: 'Flight Cancellation Policy',
            content: [
                'Flights marked as "Non-Refundable" in your final travel documents are not eligible for any refund upon cancellation. For "Refundable" flights, refunds will be processed in accordance with the cancellation terms outlined in your booking confirmation and final itinerary. Refund amounts may vary due to currency exchange rate differences at the time of processing.',
                'Euphoric Tours & Travels is not responsible for flight delays, cancellations, or groundings caused by airlines. In such cases, travelers must coordinate directly with the respective airline, and refunds will be subject to that airline\'s own policies.',
                'Please ensure before travel:',
            ],
            bullets: [
                'Your passport has a minimum validity of 1 year from the date of travel',
                'Your passport is undamaged and in valid condition',
            ],
            after: [
                'No refund will be provided if boarding is denied due to passport-related issues.',
                'Travelers are advised to arrive at the airport at least 2 hours before departure. Missed flights due to late arrival — where airport transfers were not arranged by Euphoric Tours & Travels — are non-refundable.',
                'Baggage allowances (cabin and check-in) will be specified in your travel documents. Any additional baggage charges are to be paid directly by the traveler.',
                'Certain low-cost airlines require mandatory web check-in prior to departure. Failure to complete web check-in may result in additional charges at the airport, which are non-refundable.',
                'Meal preferences may be requested at the time of booking; however, availability and quality are managed solely by the airline and cannot be guaranteed.',
            ]
        },
        {
            num: '3.', title: 'Hotel Cancellation Policy',
            content: [
                'Hotels marked as "Non-Refundable" in your itinerary are not eligible for any refund upon cancellation.',
                'For "Refundable" hotel bookings, cancellation terms and applicable timelines will be as stated in your booking confirmation and itinerary. Refund amounts may vary due to currency exchange rate fluctuations.',
                'While Euphoric Tours & Travels partners with reputed and carefully selected properties, we are not responsible for:',
            ],
            bullets: [
                'Staff behaviour or hospitality standards',
                'Cleanliness or maintenance conditions',
                'Overall service quality at the property',
            ],
            after: [
                'Any additional expenses incurred during the stay — including room upgrades, extra amenities, or personal services — are to be borne entirely by the traveler.',
                'If a hotel booking is changed mid-trip (original booking cancelled and replaced with a new one), a 100% cancellation charge will apply to the original booking.',
                'Requests for early check-in or late check-out are subject to hotel availability and cannot be guaranteed. Cancellation requests based on the unavailability of these services will not be accommodated.',
            ]
        },
        {
            num: '4.', title: 'Activities Cancellation Policy',
            content: [
                'Activities and experiences marked as "Non-Refundable" are not eligible for any refund upon cancellation.',
                'For "Refundable" activities, the cancellation terms outlined in your itinerary and booking confirmation will apply. Refund amounts may vary depending on currency exchange rate changes at the time of processing.',
            ]
        },
        {
            num: '5.', title: 'Visa & Insurance Policy',
            content: [
                'Euphoric Tours & Travels provides guidance and assistance with visa documentation; however, the approval or rejection of any visa application is entirely at the discretion of the respective embassy or consulate.',
                'Visa fees are non-refundable — even in the event of a visa rejection. Euphoric Tours & Travels is not liable for any unexpected changes in visa rules or processing timelines that occur after submission.',
                'Travel insurance, once purchased, is completely non-refundable and subject to 100% cancellation charges. All insurance claims must be handled directly with the insurance provider.',
            ]
        },
        {
            num: '6.', title: 'Transfers Cancellation Policy',
            content: [
                'For airport and intercity transfers, refund eligibility and applicable timelines will be based on the cancellation terms stated in your confirmed itinerary and booking documents.',
                'Refund amounts may vary due to international exchange rate fluctuations at the time of processing.',
            ]
        },
    ]

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <style>{`
        .cp-pad { padding: 64px 5vw 80px; }
        @media (max-width: 768px) { .cp-pad { padding: 40px 16px 60px; } }
      `}</style>

            {/* HERO */}
            <section style={{ background: '#f9fafb', padding: '56px 5vw 44px', textAlign: 'center' }}>
                <div style={{
                    background: '#f59e0b', color: 'white',
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    padding: '6px 18px', borderRadius: 24,
                    display: 'inline-block', marginBottom: 22
                }}>CANCELLATION POLICY · HONEST & HASSLE-FREE</div>
                <h1 style={{
                    fontSize: 'clamp(20px, 3.5vw, 46px)',
                    fontWeight: 800, color: '#111',
                    lineHeight: 1.2, margin: 0
                }}>
                    Plans change. We make it simple.
                </h1>
            </section>

            {/* CONTENT */}
            <section className="cp-pad">
                <div style={{ maxWidth: 820, margin: '0 auto' }}>

                    <h2 style={{
                        fontSize: 26, fontWeight: 800, color: '#22c55e',
                        marginBottom: 40, paddingBottom: 16,
                        borderBottom: '2px solid #f3f4f6'
                    }}>Cancellation Policy</h2>

                    {sections.map((s, i) => (
                        <div key={i} style={{ marginBottom: 36 }}>
                            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 14 }}>
                                {s.num} {s.title}
                            </h3>
                            {s.content.map((p, j) => (
                                <p key={j} style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.9, marginBottom: 10 }}>{p}</p>
                            ))}
                            {s.bullets && (
                                <ul style={{ margin: '8px 0 12px 0', paddingLeft: 20 }}>
                                    {s.bullets.map((b, k) => (
                                        <li key={k} style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.9, marginBottom: 6 }}>{b}</li>
                                    ))}
                                </ul>
                            )}
                            {s.after && s.after.map((p, j) => (
                                <p key={j} style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.9, marginBottom: 10 }}>{p}</p>
                            ))}
                        </div>
                    ))}

                    <div style={{
                        marginTop: 48, padding: '24px 28px',
                        background: '#f9fafb', borderRadius: 16,
                        borderLeft: '4px solid #22c55e'
                    }}>
                        <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                            For cancellation requests or queries, contact us at{' '}
                            <span style={{ color: '#22c55e', fontWeight: 600 }}>euphorictourstravels@gmail.com</span>
                            {' '}or call{' '}
                            <span style={{ color: '#22c55e', fontWeight: 600 }}>+91 99949 20445</span>
                        </p>
                    </div>

                </div>
            </section>
        </div>
    )
}