import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — NutriLoop Africa',
  description: 'NutriLoop Africa privacy policy — how we collect, use, and protect your data under the Kenya Data Protection Act 2019.',
}

const LAST_UPDATED = '15 May 2024'

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-brand-dark pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40 block mb-3">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/40 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <section className="py-14 bg-[#F5F7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 prose prose-sm max-w-none text-gray-600">
            
            <div className="not-prose mb-8 p-5 bg-brand-green-50 border border-brand-green-200 rounded-xl">
              <p className="text-sm text-brand-green-800 font-medium">
                NutriLoop Africa Ltd operates this website at nutriloopAfrica.com. This policy explains what data we collect, how we use it, and your rights under the Kenya Data Protection Act 2019 and applicable international standards.
              </p>
            </div>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">1. Who we are</h2>
            <p>NutriLoop Africa Ltd is a company registered in Kenya. Our registered address is Nairobi, Kenya. We are the data controller for personal information collected through this website. Contact us at <a href="mailto:hello@nutriloopAfrica.com" className="text-brand-green-700 hover:underline">hello@nutriloopAfrica.com</a> for any privacy-related matters.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">2. Data we collect</h2>
            <p><strong>Form submissions.</strong> When you submit a partner application (/apply), contact form (/contact), or newsletter subscription, we collect the information you provide: name, email address, organisation name, phone number (optional), and the details specific to your enquiry type (waste volumes, product interest, investment range, etc.).</p>
            <p><strong>Technical data.</strong> We log your IP address and browser user-agent with each form submission for security and abuse-prevention purposes. This data is not used for tracking.</p>
            <p><strong>Analytics.</strong> We use Google Analytics 4 and Microsoft Clarity to understand how visitors use this site. These tools collect anonymised usage data including pages visited, session duration, and device type. IP addresses are anonymised before storage.</p>
            <p><strong>Cookies.</strong> We use functional cookies for site operation and analytics cookies (with your consent). We do not use advertising or tracking cookies.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">3. How we use your data</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>To respond to your application, enquiry, or message within 48 hours</li>
              <li>To send you a confirmation email when you submit a form</li>
              <li>To send newsletters to subscribers who opted in (unsubscribe any time)</li>
              <li>To prevent abuse of our forms and API routes</li>
              <li>To understand how visitors use our site and improve it</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with third parties for their marketing purposes.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">4. Legal basis for processing</h2>
            <p>Under the Kenya Data Protection Act 2019 and GDPR (where applicable), we process your data on the following bases:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Contractual necessity</strong> — to respond to your application or enquiry</li>
              <li><strong>Legitimate interests</strong> — to secure our platform and improve our service</li>
              <li><strong>Consent</strong> — for newsletters (you opted in; you can opt out at any time)</li>
            </ul>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">5. Data storage and security</h2>
            <p>Form submissions are stored in Supabase (PostgreSQL), hosted on AWS infrastructure with servers in the EU. Supabase is SOC 2 Type 2 certified. Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is restricted to NutriLoop Africa founders and protected by Row Level Security policies.</p>
            <p>We retain form submission data for 3 years, after which it is permanently deleted. Newsletter subscriber records are retained until you unsubscribe, then deleted within 30 days.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">6. Third-party services</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Supabase</strong> — database (AWS, EU region, SOC 2 certified)</li>
              <li><strong>Resend</strong> — email delivery (SOC 2 Type 2 certified)</li>
              <li><strong>Sanity.io</strong> — content management (GDPR compliant)</li>
              <li><strong>Vercel</strong> — website hosting (SOC 2 certified, Edge Network)</li>
              <li><strong>Google Analytics 4</strong> — anonymised usage analytics</li>
              <li><strong>Microsoft Clarity</strong> — heatmaps and session recording (anonymised)</li>
            </ul>
            <p>Each service operates under its own privacy policy. We have data processing agreements in place with each processor.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">7. Your rights</h2>
            <p>Under the Kenya Data Protection Act 2019, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent (for newsletters) at any time</li>
              <li>Object to processing based on legitimate interests</li>
              <li>Data portability (receive your data in a machine-readable format)</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:hello@nutriloopAfrica.com" className="text-brand-green-700 hover:underline">hello@nutriloopAfrica.com</a>. We will respond within 30 days.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">8. Children's data</h2>
            <p>This website is not directed at individuals under the age of 18. We do not knowingly collect data from minors. If you believe we have inadvertently collected data from a minor, contact us immediately.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">9. Changes to this policy</h2>
            <p>We may update this policy from time to time. Material changes will be announced via email to newsletter subscribers. The "Last updated" date at the top of this page reflects the current version.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">10. Contact</h2>
            <p>Privacy enquiries: <a href="mailto:hello@nutriloopAfrica.com" className="text-brand-green-700 hover:underline">hello@nutriloopAfrica.com</a><br />
            NutriLoop Africa Ltd, Nairobi, Kenya</p>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-brand-green-700 transition-colors">Terms of Use →</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-brand-green-700 transition-colors">Contact us →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
