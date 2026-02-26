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

    try {
      await fetch('https://n8n.srv1041616.hstgr.cloud/webhook/244d7d28-4e87-48a0-abd1-67ff9491d7f9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });
      
      // Track Lead event with Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }
      
      alert('شكراً على التسجيل! 🎉\nغادي نتواصل معاك فأقرب وقت.');
      onClose();
      // Reset form
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
      }, 500);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('وقع شي مشكل، عاود حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
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
            style={{ width: `${((step + 1) / 6) * 100}%` }}
          />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Back Button */}
        {step > 0 && (
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
