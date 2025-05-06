import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Form field interface
interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  error: string | null;
}

const Contact = () => {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  
  // Form state
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
      value: '',
      error: null
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      value: '',
      error: null
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      required: false,
      value: '',
      error: null
    },
    {
      id: 'service',
      label: 'Service Interested In',
      type: 'select',
      placeholder: 'Select a service',
      required: true,
      value: '',
      error: null
    },
    {
      id: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Tell us about your project...',
      required: true,
      value: '',
      error: null
    }
  ]);
  
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input change
  const handleInputChange = (id: string, value: string) => {
    setFormFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, value, error: null } : field
      )
    );
    
    // Clear submit status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };
  
  // Form validation
  const validateForm = (): boolean => {
    let isValid = true;
    const updatedFields = formFields.map(field => {
      let error = null;
      
      if (field.required && !field.value.trim()) {
        error = `${field.label} is required`;
        isValid = false;
      }
      
      if (field.id === 'email' && field.value && !/^\S+@\S+\.\S+$/.test(field.value)) {
        error = 'Please enter a valid email address';
        isValid = false;
      }
      
      return { ...field, error };
    });
    
    setFormFields(updatedFields);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus({
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.',
        isError: false
      });
      
      // Reset form
      setFormFields(prev => 
        prev.map(field => ({ ...field, value: '', error: null }))
      );
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Have a project in mind? Let's discuss how we can bring your ideas to life!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className={`lg:col-span-2 transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8 text-indigo-100">
                Fill out the form or reach out to us directly using the information below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-indigo-100">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-indigo-100">info@printmaster.example</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-lg mr-4">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-indigo-100">
                      123 Print Avenue, Suite 101<br />
                      Design District, CA 90210
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus.isError 
                    ? 'bg-red-50 text-red-800' 
                    : 'bg-green-50 text-green-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {formFields[0].label} {formFields[0].required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={formFields[0].type}
                      id={formFields[0].id}
                      placeholder={formFields[0].placeholder}
                      value={formFields[0].value}
                      onChange={(e) => handleInputChange(formFields[0].id, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        formFields[0].error ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formFields[0].error && (
                      <p className="mt-1 text-sm text-red-600">{formFields[0].error}</p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {formFields[1].label} {formFields[1].required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={formFields[1].type}
                      id={formFields[1].id}
                      placeholder={formFields[1].placeholder}
                      value={formFields[1].value}
                      onChange={(e) => handleInputChange(formFields[1].id, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        formFields[1].error ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formFields[1].error && (
                      <p className="mt-1 text-sm text-red-600">{formFields[1].error}</p>
                    )}
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {formFields[2].label} {formFields[2].required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={formFields[2].type}
                      id={formFields[2].id}
                      placeholder={formFields[2].placeholder}
                      value={formFields[2].value}
                      onChange={(e) => handleInputChange(formFields[2].id, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  
                  {/* Service Field */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      {formFields[3].label} {formFields[3].required && <span className="text-red-500">*</span>}
                    </label>
                    <select
                      id={formFields[3].id}
                      value={formFields[3].value}
                      onChange={(e) => handleInputChange(formFields[3].id, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        formFields[3].error ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="clothing">Custom Clothing Printing</option>
                      <option value="branding">Logo Design & Branding</option>
                      <option value="advertising">Visual Advertising</option>
                      <option value="other">Other</option>
                    </select>
                    {formFields[3].error && (
                      <p className="mt-1 text-sm text-red-600">{formFields[3].error}</p>
                    )}
                  </div>
                </div>
                
                {/* Message Field */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {formFields[4].label} {formFields[4].required && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    id={formFields[4].id}
                    placeholder={formFields[4].placeholder}
                    value={formFields[4].value}
                    onChange={(e) => handleInputChange(formFields[4].id, e.target.value)}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      formFields[4].error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {formFields[4].error && (
                    <p className="mt-1 text-sm text-red-600">{formFields[4].error}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;