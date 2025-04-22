
import * as React from "react";
import { Mail, Phone } from "lucide-react";

const Contact = () => (
  <div className="px-6 py-8 max-w-xl mx-auto bg-white rounded-lg shadow border flex flex-col gap-6">
    <div>
      <h1 className="text-3xl font-bold text-primary mb-3">Contact Us</h1>
      <p className="text-gray-600 mb-3">Questions or feedback? We'd love to hear from you:</p>
      <div className="flex items-center gap-2 mb-2">
        <Mail size={18} className="text-primary" />
        <span className="text-sm text-gray-700">contact@wanderlusthotel.com</span>
      </div>
      <div className="flex items-center gap-2">
        <Phone size={18} className="text-primary" />
        <span className="text-sm text-gray-700">+1 (555) 123-4567</span>
      </div>
    </div>
  </div>
);

export default Contact;
