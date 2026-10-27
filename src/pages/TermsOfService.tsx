import { motion } from 'framer-motion'
import { ArrowLeft, FileText, ShieldAlert } from 'lucide-react'
import SEO from '../components/SEO'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <SEO
        title="Terms of Service & Legal Disclaimers | AI Dynamic Pro"
        description="Review the terms, AI liability disclaimers, indemnification, and conditions governing the use of AI Dynamic Pro consulting, custom software, and staff training."
        canonical="https://www.aidynamic.pro/terms"
      />
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-luxury-gold hover:text-luxury-champagne transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Home</span>
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-luxury-gold" />
            <h1 className="text-4xl font-bold font-serif">Terms of Service &amp; AI Protection Policy</h1>
          </div>
          <p className="text-luxury-silver">Last updated: October 26, 2026</p>
        </motion.div>

        <div className="space-y-10 text-luxury-silver leading-relaxed">
          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website <strong className="text-white">www.aidynamic.pro</strong>, interacting with our AI Executive Assistant (<strong className="text-white">JAss</strong>), or engaging <strong className="text-white">AI Dynamic Pro</strong> ("Company," "we," "us," or "our") for AI consulting, workflow audits, custom application development, or corporate staff training, you ("Client," "User," or "you") agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use our website or services.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">2. Scope of Services &amp; $99 Workflow Audit</h2>
            <p className="mb-3">
              AI Dynamic Pro provides B2B technology consulting, workflow feasibility auditing, custom software and AI automation development, and corporate staff training.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">$99 Workflow &amp; Feasibility Audit:</strong> Our introductory audit evaluates your current manual processes and provides an automation roadmap and estimated time-savings projection. Any "100% credit" applies strictly toward a subsequent custom build or corporate training engagement of $1,000 or more contracted within 30 days. Our "Zero-Risk / $0 Guarantee" means no audit fee is invoiced if our diagnostic review fails to identify at least 15 hours per month of automatable manual tasks in your operation.
              </li>
              <li>
                <strong className="text-white">No Guaranteed Financial Outcomes:</strong> Case studies, time-savings estimates, and ROI projections are illustrative examples based on prior deployments and do not constitute a guarantee of specific revenue or financial results.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl border border-luxury-gold/30 bg-luxury-gold/[0.03]">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-xl font-semibold text-white">3. Artificial Intelligence (AI) Disclaimer &amp; Hallucination Protection</h2>
            </div>
            <p className="mb-3">
              Our website and client solutions utilize large language models (LLMs), voice synthesis, and generative artificial intelligence (including technologies from xAI, OpenAI, Google, and other providers). By using our website or AI tools, you acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Automated AI Assistant ("JAss"):</strong> When interacting via text or voice with <strong>JAss</strong> on our website, you are communicating with an artificial intelligence system, not a human. AI outputs may occasionally contain inaccuracies, omissions, or "hallucinations." No statement made by the AI chatbot constitutes a binding legal contract, price lock, or warranty unless confirmed in a signed written Statement of Work (SOW).
              </li>
              <li>
                <strong className="text-white">No Medical, Legal, or Financial Advice:</strong> AI Dynamic Pro is an engineering and technology consulting firm. Nothing on this website, in our portfolio demonstrations (including clinical transcription, biomechanical, real estate, or legal intake demos), or in our consultations constitutes medical advice, legal counsel, or financial/CPA advice.
              </li>
              <li>
                <strong className="text-white">Human-in-the-Loop Responsibility:</strong> Client is solely responsible for maintaining human oversight and reviewing all AI-generated outputs, transcripts, schedules, codes, and communications before relying on them in production operations.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">4. Recording, Transcription &amp; Telecommunications Consent (TCPA &amp; Florida Law)</h2>
            <p className="mb-3">
              In compliance with the federal Telephone Consumer Protection Act (TCPA), the Florida Telemarketing Act (FTSA), and the Florida Security of Communications Act (<strong className="text-white">Fla. Stat. § 934.03 — All-Party Consent</strong>):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-white">Voice &amp; Chat Recording Consent:</strong> By initiating a live web voice call, microphone session, phone call, or text chat with AI Dynamic Pro or our AI assistant (<strong>JAss</strong>), you expressly consent to the real-time recording, transcription, storage, and AI processing of the communication for quality assurance, appointment scheduling, and customer follow-up.
              </li>
              <li>
                <strong className="text-white">Phone, SMS &amp; Email Consent:</strong> By submitting your phone number or email address on any form on our website, you provide express written consent to receive calls, text messages (SMS/WhatsApp), and emails from AI Dynamic Pro (including via automated dialing or AI voice technology) at the contact information provided. Consent is not a condition of purchase. You may opt out at any time by replying <code className="text-luxury-gold">STOP</code> to any text or clicking "Unsubscribe" in any email.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">5. Client Regulatory Compliance &amp; Indemnification</h2>
            <p>
              When AI Dynamic Pro develops or configures custom software, voice receptionists, CRM automations, or workflows for a Client, <strong className="text-white">the Client acts as the data controller and operator</strong> of that system. Client is solely responsible for ensuring its use of any deployed AI system complies with all industry-specific regulations applicable to Client's business (including but not limited to HIPAA, BAA execution with third-party cloud hosts, TCPA, GDPR, CCPA, and state bar or medical board rules). You agree to <strong className="text-white">defend, indemnify, and hold harmless AI Dynamic Pro</strong>, its founder, contractors, and affiliates from and against any and all third-party claims, regulatory fines, damages, liabilities, and legal fees arising out of your use or misuse of our software, your failure to obtain end-user consents, or your violation of applicable laws.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p>
              Upon full payment of all fees specified in an applicable Statement of Work, Client receives ownership or a perpetual license (as defined in the SOW) to the custom configurations built specifically for Client. AI Dynamic Pro retains all right, title, and interest in and to its pre-existing intellectual property, proprietary AI frameworks, prompt architectures, reusable code libraries, and the 22+ showcase platforms displayed on our website.
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimer of Warranties &amp; Strict Limitation of Liability</h2>
            <p className="mb-3">
              ALL WEBSITE CONTENT, AI ASSISTANTS, AND SERVICES ARE PROVIDED <strong className="text-white">"AS IS" AND "AS AVAILABLE"</strong> WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY FLORIDA AND FEDERAL LAW, IN NO EVENT SHALL AI DYNAMIC PRO OR ITS FOUNDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, LOST PROFITS, LOST LEADS, BUSINESS INTERRUPTION, OR LOSS OF DATA. <strong className="text-white">OUR TOTAL CUMULATIVE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO AI DYNAMIC PRO IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR (B) $100.00 USD.</strong>
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-xl font-semibold text-white mb-3">8. Governing Law, Venue &amp; Binding Arbitration</h2>
            <p>
              These Terms are governed by the laws of the <strong className="text-white">State of Florida, USA</strong>, without regard to conflict-of-law principles. Any dispute, claim, or controversy arising out of or relating to these Terms or our services that cannot be resolved informally within 30 days shall be resolved exclusively by <strong className="text-white">binding individual arbitration in Miami-Dade County, Florida</strong> under the rules of the American Arbitration Association (AAA). <strong className="text-white">You and AI Dynamic Pro expressly waive any right to a jury trial or to participate in a class action lawsuit.</strong>
            </p>
          </section>

          <section className="p-6 rounded-2xl border border-luxury-gold/20 bg-luxury-gold/5">
            <h2 className="text-xl font-semibold text-white mb-3">9. Legal &amp; Compliance Contact Information</h2>
            <p className="mb-3">
              For legal notices, compliance inquiries, or questions regarding these Terms, contact:
            </p>
            <div className="text-white space-y-1">
              <p className="font-bold">AI Dynamic Pro</p>
              <p>Attn: Jasmel Acosta, Founder</p>
              <p>Brickell Financial District, Miami, FL 33131</p>
              <p>Email: jasmelacosta@gmail.com</p>
              <p>Phone: +1 (786) 643-2099</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
