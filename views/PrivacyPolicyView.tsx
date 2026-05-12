import { Shield, FileText, Lock, Users, Mail } from "lucide-react";

export function PrivacyPolicyView() {
  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             Public Notice Document
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             Temple Privacy Policy
           </h1>
        </div>
        <div className="text-right">
           <div className="inline-flex items-center px-3 py-1 bg-bento-gold text-white rounded-full text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#2D2D2D]">
             Version 2026.1
           </div>
           <p className="text-xs mt-2 font-mono opacity-80">Effective Date: May 11, 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        <div className="col-span-1 border-2 border-bento-dark p-6 bg-bento-card-green shadow-[4px_4px_0px_0px_#2D2D2D] sticky top-28 h-fit">
          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 border-b-2 border-bento-dark/20 pb-2">Contents</h3>
          <ul className="space-y-4 font-bold text-sm">
            <li className="flex items-center gap-2 text-bento-green"><Shield size={16}/> Data Collection</li>
            <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"><FileText size={16}/> Purpose of Processing</li>
            <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"><Users size={16}/> User Rights (GDPR)</li>
            <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"><Lock size={16}/> Security Measures</li>
            <li className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"><Mail size={16}/> Contact Information</li>
          </ul>

          <div className="mt-12 p-4 border-2 border-bento-dark bg-white">
            <p className="text-xs font-serif italic mb-2">Need a printable format?</p>
            <button onClick={() => window.print()} className="w-full py-2 bg-bento-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors">
              Download PDF
            </button>
          </div>
        </div>

        <div className="col-span-2 border-2 border-bento-dark p-10 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] prose max-w-none">
          <h2 className="text-2xl font-serif italic border-b-2 border-bento-dark pb-2 mb-6 text-bento-dark">1. Data Collection Practices</h2>
          <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
             Temple Neurotechnology ("Temple") collects specific personal information to facilitate hardware personalization, cognitive tracking, and subscription services. The data we collect includes:
          </p>
          <ul className="list-disc pl-5 text-sm font-medium opacity-80 mb-8 space-y-2">
            <li><strong>Identity Data:</strong> Full name, date of birth, and account identifiers.</li>
            <li><strong>Contact Data:</strong> Email address, physical mailing address, and phone number.</li>
            <li><strong>Biometric Data (<a href="https://gdpr-info.eu/art-9-gdpr/" target="_blank" rel="noreferrer" className="underline hover:text-bento-green text-bento-gold">Special Category Data Processing - Art. 9</a>):</strong> When explicitly provided, raw EEG, heart rate, acceleration, and derived cognitive states (stress, focus, fatigue).</li>
            <li><strong>Financial Data:</strong> Hardware purchasing records, subscription histories, and secure payment tokens (raw financial data is strictly processed via certified third-party gateways).</li>
          </ul>

          <h2 className="text-2xl font-serif italic border-b-2 border-bento-dark pb-2 mb-6 text-bento-dark mt-12">2. Purpose of Data Processing</h2>
          <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
             We process your personal data strictly in accordance with <a href="https://gdpr-info.eu/art-6-gdpr/" target="_blank" rel="noreferrer" className="underline hover:text-bento-green font-bold text-bento-dark">Article 6 (Lawfulness)</a> and <a href="https://gdpr-info.eu/art-9-gdpr/" target="_blank" rel="noreferrer" className="underline hover:text-bento-green font-bold text-bento-dark">Article 9 (Special Categories)</a> of the GDPR. Processing purposes include:
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
             <div className="p-4 border-2 border-bento-dark bg-bento-bg">
               <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-bento-gold">Biometric Processing</h4>
               <p className="text-[11px] opacity-80">To analyze neural patterns for insights into focus, fatigue, and stress, powering personalized app experiences.</p>
             </div>
             <div className="p-4 border-2 border-bento-dark bg-bento-bg">
               <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-bento-green">Compliance & Security</h4>
               <p className="text-[11px] opacity-80">To ensure the safety of biometric databases and maintain mandated audit logs for regulatory transparency.</p>
             </div>
          </div>

          <h2 className="text-2xl font-serif italic border-b-2 border-bento-dark pb-2 mb-6 text-bento-dark mt-12">3. User Rights under GDPR</h2>
          <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
             As a data subject within the European Economic Area, you possess comprehensive rights over your personal data:
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 border-b-2 border-bento-dark/10 pb-3">
              <span className="bg-bento-dark text-white px-2 py-1 text-[10px] font-bold">ART. 15</span>
              <div className="text-sm font-medium"><a href="https://gdpr-info.eu/art-15-gdpr/" target="_blank" rel="noreferrer" className="underline hover:text-bento-green text-bento-dark font-bold">Right to Access (Art. 15):</a> You may request a verified copy of all personal data held by Temple.</div>
            </li>
            <li className="flex items-start gap-3 border-b-2 border-bento-dark/10 pb-3">
              <span className="bg-bento-dark text-white px-2 py-1 text-[10px] font-bold">ART. 17</span>
              <div className="text-sm font-medium"><a href="https://gdpr-info.eu/art-17-gdpr/" target="_blank" rel="noreferrer" className="underline hover:text-bento-green text-bento-dark font-bold">Right to Erasure (Art. 17):</a> You may request the immediate deletion of your records ("Right to be Forgotten").</div>
            </li>
            <li className="flex items-start gap-3 border-b-2 border-bento-dark/10 pb-3">
              <span className="bg-bento-dark text-white px-2 py-1 text-[10px] font-bold">ART. 20</span>
              <div className="text-sm font-medium"><a href="https://gdpr-info.eu/art-20-gdpr/" target="_blank" rel="noreferrer" className="underline hover:text-bento-green text-bento-dark font-bold">Right to Portability (Art. 20):</a> You may request your data in a structured, machine-readable format.</div>
            </li>
          </ul>

          <h2 className="text-2xl font-serif italic border-b-2 border-bento-dark pb-2 mb-6 text-bento-dark mt-12">4. Data Security Measures</h2>
          <p className="text-sm font-medium leading-relaxed opacity-80 mb-4">
             Temple employs enterprise-grade cryptographic controls. All biometric streams and user telemetry data are secured with <strong>AES-256 encryption at rest</strong> and <strong>TLS 1.3 in transit</strong>. We restrict access strictly through automated, zero-trust architecture.
          </p>

          <h2 className="text-2xl font-serif italic border-b-2 border-bento-dark pb-2 mb-6 text-bento-dark mt-12">5. Contact Information</h2>
          <div className="p-6 border-2 border-bento-dark bg-bento-card-tan">
             <p className="text-sm font-medium mb-4">For any inquiries regarding your privacy, data subjects can contact our designated Data Protection Officer:</p>
             <p className="text-sm font-bold opacity-80">A. Mehta (Data Protection Officer)</p>
             <p className="text-sm font-mono opacity-80">Email: dpo@templeneurotech.com</p>
             <p className="text-sm font-mono opacity-80">Phone: +31 20 123 4567</p>
             <p className="text-sm font-medium mt-4">Temple Neurotech EU Headquarters<br/>Herengracht 456<br/>1017 CA Amsterdam, Netherlands</p>
          </div>

        </div>
      </div>
    </div>
  );
}
