import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use — NutriLoop Africa',
  description: 'Terms of use for the NutriLoop Africa website — acceptable use, intellectual property, disclaimers, and governing law.',
}

const LAST_UPDATED = '15 May 2024'

export default function TermsPage() {
  return (
    <>
      <div className="bg-brand-dark pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40 block mb-3">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Terms of Use</h1>
          <p className="text-white/40 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <section className="py-14 bg-[#F5F7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 prose prose-sm max-w-none text-gray-600">

            <div className="not-prose mb-8 p-5 bg-brand-green-50 border border-brand-green-200 rounded-xl">
              <p className="text-sm text-brand-green-800 font-medium">
                By accessing or using nutriloopAfrica.com, you agree to these Terms of Use. If you do not agree, please do not use this site. These terms govern your use of the website and do not constitute a commercial agreement for NutriLoop Africa's products or services.
              </p>
            </div>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">1. Who operates this site</h2>
            <p>This website is operated by NutriLoop Africa Ltd, a company registered in Kenya with its principal place of business in Nairobi, Kenya. References to "NutriLoop Africa," "we," "our," or "us" in these terms refer to NutriLoop Africa Ltd.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">2. Use of this website</h2>
            <p>You may use this website for lawful purposes only. You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Submit false, misleading, or fraudulent information through any form</li>
              <li>Attempt to gain unauthorised access to any part of the site or its backend systems</li>
              <li>Use automated tools to scrape, crawl, or copy content in bulk without permission</li>
              <li>Use this site in any way that violates applicable Kenyan or international law</li>
              <li>Transmit any harmful, offensive, or malicious code or content</li>
            </ul>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">3. Intellectual property</h2>
            <p>All content on this website — including text, graphics, the NutriLoop Africa logo, photography, data, and software — is the property of NutriLoop Africa Ltd or its licensors and is protected by Kenyan and international intellectual property law.</p>
            <p>You may share links to individual pages, quote brief excerpts with attribution, and reference our publicly available impact data for non-commercial purposes. You may not reproduce, republish, or redistribute substantial portions of our content without prior written permission.</p>
            <p>The NutriLoop Africa name and logo are trademarks of NutriLoop Africa Ltd. You may not use them without express written consent.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">4. Form submissions and communications</h2>
            <p>When you submit a form on this site (partner application, contact form, newsletter subscription), you represent that the information you provide is accurate and that you have authority to submit it on behalf of any organisation named. Submitting a form does not create a binding commercial contract between you and NutriLoop Africa. Commercial agreements are formalised separately in writing.</p>
            <p>NutriLoop Africa will respond to form submissions within 48 hours during business days. We reserve the right to decline any application or enquiry without obligation to provide a reason.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">5. Accuracy of information</h2>
            <p>NutriLoop Africa makes reasonable efforts to ensure the accuracy of information on this website, including impact projections, product specifications, and regulatory status. However, information on this site is provided for general informational purposes only and may change without notice.</p>
            <p>Impact projections (waste diverted, CO₂-equivalent avoided, gross margin) are Year 1 projections based on CGIAR-validated BSF economics, NEMA waste data, and Kenya feed market analysis. They are not guarantees of future performance.</p>
            <p>Nothing on this website constitutes financial, investment, legal, or regulatory advice.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">6. Third-party links</h2>
            <p>This site may link to external websites including ICIPE, CGIAR, NEMA, Verra, and partner organisations. These links are provided for convenience. NutriLoop Africa does not control external sites and is not responsible for their content, accuracy, or privacy practices.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">7. Disclaimer of warranties</h2>
            <p>This website is provided "as is" without warranties of any kind, express or implied. NutriLoop Africa does not warrant that the site will be uninterrupted, error-free, or free from harmful components. To the maximum extent permitted by Kenyan law, we disclaim all warranties including implied warranties of merchantability and fitness for a particular purpose.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">8. Limitation of liability</h2>
            <p>To the fullest extent permitted by law, NutriLoop Africa Ltd shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of this website or reliance on its content. Our total liability to you for any claim arising from use of this site shall not exceed KES 10,000.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">9. Privacy</h2>
            <p>Your use of this site is also governed by our <Link href="/privacy" className="text-brand-green-700 hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">10. Governing law</h2>
            <p>These Terms of Use are governed by the laws of Kenya. Any dispute arising from your use of this website shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">11. Changes to these terms</h2>
            <p>We may update these Terms at any time. The "Last updated" date reflects the current version. Continued use of the site after any change constitutes acceptance of the updated Terms.</p>

            <h2 className="text-lg font-bold text-brand-dark mt-8 mb-3">12. Contact</h2>
            <p>Legal enquiries: <a href="mailto:hello@nutriloopAfrica.com" className="text-brand-green-700 hover:underline">hello@nutriloopAfrica.com</a><br />
            NutriLoop Africa Ltd, Nairobi, Kenya</p>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-brand-green-700 transition-colors">Privacy Policy →</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-brand-green-700 transition-colors">Contact us →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
