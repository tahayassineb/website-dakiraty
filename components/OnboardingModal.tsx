import React, { useState } from 'react';
import { X, ArrowRight, Check, Phone, MessageCircle } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    parentName: '',
    whatsapp: '',
    childName: '',
    childAge: '',
    problem: '',
    contactMethod: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (contactMethod: string) => {
    const finalData = { ...formData, contactMethod };
    setFormData(finalData);
    setIsSubmitting(true);

    // Extract Meta Cookies for CAPI
    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return '';
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
      return '';
    };

    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const intakeUrl = import.meta.env.VITE_LEAD_INTAKE_URL?.trim() || 'https://useful-hound-287.eu-west-1.convex.site/intake/website';

    try {
      await fetch(intakeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Map to standard fields while keeping specific ones
          name: finalData.parentName,
          phone: finalData.whatsapp,
          parentName: finalData.parentName,
          whatsapp: finalData.whatsapp,
          childName: finalData.childName,
          childAge: finalData.childAge,
          problem: finalData.problem,
          contactMethod: finalData.contactMethod,
          
          // Meta CAPI Fields
          program: "kids_memory",
          form: "kids_memory_landing",
          event_name: "Lead",
          event_id: eventId,
          event_source_url: window.location.href,
          user_agent: navigator.userAgent,
          event_time: Math.floor(Date.now() / 1000),
          fbp,
          fbc
        }),
      });
      
      // Track Lead event with Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', { eventID: eventId });
      }
      
      setStep(6);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('وقع شي مشكل، عاود حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setFormData({
        parentName: '',
        whatsapp: '',
        childName: '',
        childAge: '',
        problem: '',
        contactMethod: ''
      });
    }, 300);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center">أهلا بك! شنو الاسم الكريم ديالك؟</h3>
            <input
              type="text"
              autoFocus
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="الاسم الكامل ديالك"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center"
              onKeyDown={(e) => e.key === 'Enter' && formData.parentName && handleNext()}
            />
            <button
              onClick={handleNext}
              disabled={!formData.parentName}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              التالي <ArrowRight size={20} className="rotate-180" />
            </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center">متشرفين سي/للا {formData.parentName}! شنو رقم الواتساب ديالك باش نتواصلو معاك؟</h3>
            <input
              type="tel"
              autoFocus
              dir="ltr"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="06XXXXXXXX"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center"
              onKeyDown={(e) => e.key === 'Enter' && formData.whatsapp && handleNext()}
            />
            <button
              onClick={handleNext}
              disabled={!formData.whatsapp}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              التالي <ArrowRight size={20} className="rotate-180" />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center">شنو اسم ولدك ولا بنتك؟</h3>
            <input
              type="text"
              autoFocus
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              placeholder="اسم الطفل"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center"
              onKeyDown={(e) => e.key === 'Enter' && formData.childName && handleNext()}
            />
            <button
              onClick={handleNext}
              disabled={!formData.childName}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              التالي <ArrowRight size={20} className="rotate-180" />
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center">شحال فعمرو(ها)؟</h3>
            <input
              type="text"
              autoFocus
              value={formData.childAge}
              onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
              placeholder="مثال: 10 سنين"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all text-center"
              onKeyDown={(e) => e.key === 'Enter' && formData.childAge && handleNext()}
            />
            <button
              onClick={handleNext}
              disabled={!formData.childAge}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              التالي <ArrowRight size={20} className="rotate-180" />
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center">شنو هو أكبر مشكل كيعاني منو {formData.childName} فالدراسة؟</h3>
            <textarea
              autoFocus
              rows={4}
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="مثال: كينسى دغيا، ماكيركزش..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-xl text-gray-800 focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-100 transition-all resize-none text-right"
            />
            <button
              onClick={handleNext}
              disabled={!formData.problem}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              التالي <ArrowRight size={20} className="rotate-180" />
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center">كيفاش تفضل نتواصلو معاك؟</h3>
            
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-center space-y-3">
              <p className="text-gray-800 font-medium leading-relaxed">
                هاد الاستشارة <span className="font-bold text-[#3B82F6]">مجانية 100% وما غتخلص والو</span>.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                الفريق ديالنا غادي يتواصل معاك باش نفهمو المشكل ديال {formData.childName} مزيان، وإلى بانت لينا الحالة ديالو مناسبة للبرنامج ديالنا، ديك الساعة نقدرو نخدمو مجموعين.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => handleSubmit('whatsapp')}
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-green-600 disabled:opacity-70 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? 'جاري الإرسال...' : (
                  <>
                    <MessageCircle size={24} />
                    واتساب
                  </>
                )}
              </button>
              <button
                onClick={() => handleSubmit('call')}
                disabled={isSubmitting}
                className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-70 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? 'جاري الإرسال...' : (
                  <>
                    <Phone size={24} />
                    اتصال هاتفي
                  </>
                )}
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-dark-blue">تم التسجيل بنجاح! 🎉</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              شكراً سي/للا {formData.parentName}.<br/>
              الفريق ديالنا غادي يتواصل معاك فأقرب وقت باش نحددو موعد الاستشارة.
            </p>
            <button
              onClick={handleCloseAndReset}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all mt-8"
            >
              إغلاق
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative">
        {/* Progress Bar */}
        <div className="h-2 w-full bg-gray-100">
          <div 
            className="h-full bg-[#3B82F6] transition-all duration-500 ease-out"
            style={{ width: `${step === 6 ? 100 : ((step + 1) / 6) * 100}%` }}
          />
        </div>

        {/* Close Button */}
        <button 
          onClick={step === 6 ? handleCloseAndReset : onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Back Button */}
        {step > 0 && step < 6 && (
          <button 
            onClick={handleBack}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 font-medium transition-colors z-10 flex items-center gap-1"
          >
            <ArrowRight size={18} /> رجوع
          </button>
        )}

        <div className="p-8 md:p-10 pt-16">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
