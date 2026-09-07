const Terms = () => {
  return (
    <div className="min-h-screen bg-dark text-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 font-serif text-white">Terms of Service</h1>
        <p className="text-luxury-silver mb-8">Last updated: June 18, 2026</p>

        <div className="space-y-8 text-luxury-silver">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using AI Dynamic Pro services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Services Description</h2>
            <p>
              AI Dynamic Pro provides AI automation consulting, workflow automation development, 
              chatbot development, analytics dashboard creation, and related services. All services 
              are tailored to client specifications and delivered according to agreed project scopes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment is due according to the schedule outlined in your project agreement</li>
              <li>Strategy and Audit services require payment before delivery</li>
              <li>Single workflow projects: 50% upfront, 50% on completion</li>
              <li>Full AI Transformation: Monthly billing per agreement</li>
              <li>All fees are non-refundable unless otherwise stated</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              Upon full payment, clients receive a perpetual license to use the automation systems 
              and tools built for their business. AI Dynamic Pro retains ownership of underlying 
              frameworks, methodologies, and reusable components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Confidentiality</h2>
            <p>
              Both parties agree to maintain confidentiality of proprietary information shared 
              during the engagement. We are happy to sign NDAs upon request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              AI Dynamic Pro's liability is limited to the amount paid for the specific service 
              giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Termination</h2>
            <p>
              Either party may terminate the engagement with 30 days written notice. 
              Clients remain responsible for payment for work completed through the termination date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Florida, USA. 
              Any disputes will be resolved in Miami-Dade County courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:jasmelacosta@gmail.com" className="text-luxury-gold hover:underline">
                jasmelacosta@gmail.com
              </a>{' '}
              or call +1 (786) 643-2099.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms
