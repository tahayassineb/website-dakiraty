import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, XCircle, ChevronDown, ChevronUp, 
  MapPin, Phone, Mail, GraduationCap, ArrowLeft,
  Brain, BookOpen, Play, Users, MessageCircle, ShieldCheck, Sparkles,
  Check, X
} from 'lucide-react';
import OnboardingModal from '../components/OnboardingModal';

const KidsMemoryLanding: React.FC = () => {
  const [parentType, setParentType] = useState<'father' | 'mother' | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedType = localStorage.getItem('kidsMemoryParentType');
    if (savedType === 'father' || savedType === 'mother') {
      setParentType(savedType);
      setShowSplash(false);
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);

      if (window.scrollY > 500) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('kidsMemoryExitPopupShown')) {
        setShowExitPopup(true);
        localStorage.setItem('kidsMemoryExitPopupShown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSelectParent = (type: 'father' | 'mother') => {
    setParentType(type);
    localStorage.setItem('kidsMemoryParentType', type);
    setShowSplash(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setShowExitPopup(false);
  };

  const faqs = [
    {
      question: "ولدي عمرو صغير، واش غادي يفهم؟",
      answer: "الدورة مناسبة للأطفال من 7 سنين فما فوق. التقنيات مبسّطة ومشروحة بطريقة يفهمها أي طفل. وأنا كنتأكد أن كل واحد فاهم قبل ما نزيد."
    },
    {
      question: "ولدي ما كيركّزش، كيملّ بسرعة.",
      answer: "هادي مشكلة الطريقة القديمة، ماشي مشكلة ولدك. التقنيات اللي كنعلّم مبنية على اللعب والخيال. الأطفال كيستمتعو وكيتفاعلو."
    },
    {
      question: "الحصص أونلاين، واش غادي تنفع؟",
      answer: "الحصص مباشرة لايڤ — ماشي فيديوهات مسجلة. كنشوف ولدك، كيسولني، كنجاوبو فالحين. بحال إلى جا عندي للدار. وتقدر تحضر معاه وتراقب بنفسك."
    },
    {
      question: "شحال من مرة فالأسبوع؟",
      answer: "حصة وحدة فالأسبوع. المدة: ساعة إلى ساعة ونصف. يعني فشهر واحد، ولدك غادي يكون تعلّم كولشي."
    },
    {
      question: "إلى ما عجبناش الدورة؟",
      answer: "إلى حضر ولدك الحصة الأولى وما عجبتوش، رد ليك فلوسك كاملين. بلا أي سؤال."
    },
    {
      question: "أنا كوالد نقدر نحضر؟",
      answer: "أكيد! بل كنشجّع على هادشي. تشوف كيفاش ولدك كيتعلم، وتستافد حتى نتا من التقنيات."
    },
    {
      question: "كيفاش ندفع؟",
      answer: "بعد ما تسجّل، غادي نتواصل معاك على واتساب ونشرح ليك طرق الدفع المتاحة."
    }
  ];

  return (
    <div className="font-sans bg-[#F9FAFB] text-[#1A1A1A] relative min-h-screen" dir="rtl">
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#22C55E] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-opacity duration-500">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100">
            <h2 className="text-3xl font-bold mb-2">أهلاً بيك 👋</h2>
            <p className="text-xl text-gray-600 mb-8 font-medium">شكون نتا/نتي؟</p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleSelectParent('father')}
                className="w-full py-4 px-6 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-3"
              >
                <span>أنا الأب</span>
                <span className="text-2xl">👨</span>
              </button>
              
              <button 
                onClick={() => handleSelectParent('mother')}
                className="w-full py-4 px-6 bg-[#F97316] hover:bg-orange-600 text-white rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-3"
              >
                <span>أنا الأم</span>
                <span className="text-2xl">👩</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-6">باش نعطيوك تجربة مناسبة ليك</p>
          </div>
        </div>
      )}

      {/* Sticky CTA Mobile */}
      {showStickyCTA && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 animate-fade-in-up">
          <button 
            onClick={openModal}
            className="w-full bg-[#22C55E] text-white font-bold py-4 rounded-xl text-lg shadow-lg"
          >
            سجّل دابا — 400 درهم
          </button>
        </div>
      )}

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up">
            <button 
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-dark-blue">مستني شي حاجة؟</h3>
              <p className="text-gray-600 mb-8 text-lg">
                إلى عندك أي سؤال أو استفسار على الدورة، راسلنا على واتساب وغادي نجاوبوك فالحين.
              </p>
              
              <a 
                href="https://wa.me/212633698758" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-green-600 text-white text-xl font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                تواصل معنا على واتساب
              </a>
              
              <button 
                onClick={() => setShowExitPopup(false)}
                className="mt-4 text-gray-500 hover:text-gray-700 underline text-sm"
              >
                لا شكراً، بغيت نرجع للصفحة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 px-4 min-h-[85vh] flex items-center bg-gradient-to-b from-blue-50 to-[#F9FAFB]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-dark-blue">
            ولدك ما عندوش مشكل فالذاكرة.<br/>
            <span className="text-[#F97316]">عندو مشكل فالطريقة.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-medium">
            فـ 4 حصص غير، غادي يتعلم كيفاش يحفظ بحال أبطال الذاكرة — 
            جدول الضرب، القرآن، الاجتماعيات... بلا "عاود عاود عاود"
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={openModal}
              className="bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-green-500/40 transition-all transform hover:-translate-y-1 w-full md:w-auto"
            >
              سجّل ولدك دابا — 400 درهم غير
            </button>
            <div className="flex items-center gap-6 text-gray-500 font-medium text-sm md:text-base">
              <span className="flex items-center gap-1"><ShieldCheck size={18} className="text-[#22C55E]"/> ضمان استرجاع الفلوس</span>
              <span className="flex items-center gap-1"><Users size={18} className="text-[#3B82F6]"/> +3000 متدرب</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-dark-blue">واش هادي حياتك كل يوم؟ 😫</h2>
          
          <div className="space-y-6 text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
            <p>كتوصل من الخدمة عيان/عيانة...</p>
            <p>وبدل ما ترتاح، كتجلس مع ولدك تعاود معاه الدروس.</p>
            <p className="text-[#F97316] font-bold">"قرا معايا... ركّز... علاش كتنسى؟!"</p>
            <p>كتعاود معاه مرة. مرتين. عشر مرات.</p>
            <p>كيحفظ الليلة... وغدا؟ كينسى كولشي.</p>
            <p>وفالامتحان؟ كأنو عمرو ما قرا.</p>
            <p>كتحس بالإحباط.</p>
            <p>كتسائل راسك: "واش ولدي عندو مشكل؟"</p>
            <p>وساعات كتحس بالذنب: "واش أنا السبب؟"</p>
          </div>
        </div>
      </section>

      {/* 3. Empathy Section */}
      <section className="py-20 px-4 bg-blue-50/50 border-y border-blue-100">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border-r-8 border-[#3B82F6]">
            {parentType === 'father' ? (
              <>
                <h2 className="text-3xl font-bold mb-6 text-[#3B82F6]">خويا الأب...</h2>
                <div className="space-y-4 text-xl text-gray-700 leading-relaxed">
                  <p>عارف أنك كتخدم بزاف باش توفّر لعائلتك حياة كريمة.</p>
                  <p>وفاش كترجع للدار، كتلقى ولدك غارق فالدروس.</p>
                  <p>وكتحس أنك خاصك تساعدو، ولكن ما عارف كيفاش. ولا عندك الوقت تجلس معاه ساعات.</p>
                  <p className="font-bold text-dark-blue mt-6">والحقيقة؟ ماشي نتا المشكل.</p>
                  <p>المشكل أن حتى واحد ما علّم ولدك كيفاش يحفظ صحيح.</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6 text-[#F97316]">أختي الأم...</h2>
                <div className="space-y-4 text-xl text-gray-700 leading-relaxed">
                  <p>عارفة أنك كتبذلي كولشي من أجل ولدك.</p>
                  <p>كتضحّي براحتك. كتسهري معاه. كتحاولي بكل الطرق.</p>
                  <p>ومع ذلك، كل ما تشوفي نتائجو كتحسّي بالخيبة. وساعات كتلومي راسك.</p>
                  <p className="font-bold text-dark-blue mt-6">گوليا: واش هادشي عدل؟</p>
                  <p>نتي اللي خاصك تحسّي بالذنب؟ ولا المدرسة اللي ما علّماتوش الطريقة الصحيحة؟</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. Reframe Section */}
      <section className="py-20 px-4 bg-[#E0F2FE]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md">
            <Sparkles className="text-[#3B82F6]" size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark-blue">الحقيقة اللي ما كيقولوهاش ليك:</h2>
          
          <div className="space-y-4 text-2xl text-gray-800 font-medium mb-10">
            <p>ولدك ما عندوش أي مشكل فالذاكرة.</p>
            <p className="text-[#22C55E] font-bold">ولدك ذكي.</p>
            <p className="text-[#22C55E] font-bold">ولدك قادر.</p>
          </div>
          
          <div className="bg-white/60 p-8 rounded-2xl text-xl text-gray-700 leading-relaxed">
            <p className="mb-4">المشكل؟</p>
            <p className="mb-4">فالمدرسة كيقولو ليه "احفظ!" ولكن حتى واحد ما كيشرح ليه كيفاش.</p>
            <p className="mb-4">فكيعاود وكيعاود وكيعاود... وهاد الطريقة أصلاً ما كتنفعش.</p>
            <p className="font-bold text-dark-blue text-2xl mt-6">الذاكرة عندها قواعد. عندها أسرار.</p>
            <p className="font-bold text-[#F97316] text-2xl">وإلى تعلّمها ولدك — كولشي كيتبدل.</p>
          </div>
        </div>
      </section>

      {/* 5. Solution Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark-blue">الحل: دورة الذاكرة للأطفال</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">فـ 4 حصص غير، ولدك غادي يتعلم نفس التقنيات اللي كيستعملوها أبطال العالم:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">🏰</div>
              <h3 className="text-2xl font-bold mb-4 text-dark-blue">القصر الذهني</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                ولدك غادي يبني قصر فراسو، ويخزّن فيه أي معلومة. جدول الضرب؟ يدّيه لغرفة الضيوف. الاجتماعيات؟ يدّيها للمطبخ. ما غادي ينسى والو.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">🗺️</div>
              <h3 className="text-2xl font-bold mb-4 text-dark-blue">الخرائط الذهنية</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                أي درس معقد، ولدك غادي يحوّلو لرسم بسيط. الدماغ كيحب الصور — وهكذا كيتفكّر بسرعة.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">🔁</div>
              <h3 className="text-2xl font-bold mb-4 text-dark-blue">التكرار الذكي</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                بدل ما يعاود 100 مرة وينسى... غادي يتعلم كيفاش يعاود مرات قليلة ويحفظ للأبد.
              </p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-[#F9FAFB] p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-6">📖</div>
              <h3 className="text-2xl font-bold mb-4 text-dark-blue">تقنيات حفظ القرآن</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                نفس الطريقة اللي كيستعملوها حفّاظ القرآن. ولدك غادي يحفظ الآيات ويثبّتها فذاكرتو.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comparison Section */}
      <section className="py-20 px-4 bg-[#F3F4F6]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue">شنو الفرق بين الدورة ديالنا والطرق التقليدية؟</h2>
          
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-6 font-bold text-xl text-gray-700 border-b border-gray-200 w-1/3">الميزة</th>
                    <th className="p-6 font-bold text-xl text-gray-500 border-b border-gray-200 w-1/3 text-center bg-red-50/30">الطرق التقليدية</th>
                    <th className="p-6 font-bold text-xl text-green-700 border-b border-gray-200 w-1/3 text-center bg-green-50">دورة الذاكرة للأطفال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 text-lg font-medium text-gray-800">طريقة التعلم</td>
                    <td className="p-6 text-center bg-red-50/30">
                      <div className="flex flex-col items-center gap-2">
                        <X className="text-red-500" size={28} />
                        <span className="text-gray-600">حفظ عن ظهر قلب (تكرار ممل)</span>
                      </div>
                    </td>
                    <td className="p-6 text-center bg-green-50">
                      <div className="flex flex-col items-center gap-2">
                        <Check className="text-green-600" size={28} />
                        <span className="text-green-800 font-bold">التعلم باللعب والخيال</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 text-lg font-medium text-gray-800">نوع الحصص</td>
                    <td className="p-6 text-center bg-red-50/30">
                      <div className="flex flex-col items-center gap-2">
                        <X className="text-red-500" size={28} />
                        <span className="text-gray-600">فيديوهات مسجلة سلبية</span>
                      </div>
                    </td>
                    <td className="p-6 text-center bg-green-50">
                      <div className="flex flex-col items-center gap-2">
                        <Check className="text-green-600" size={28} />
                        <span className="text-green-800 font-bold">حصص مباشرة تفاعلية (لايڤ)</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 text-lg font-medium text-gray-800">التطبيق</td>
                    <td className="p-6 text-center bg-red-50/30">
                      <div className="flex flex-col items-center gap-2">
                        <X className="text-red-500" size={28} />
                        <span className="text-gray-600">معلومات نظرية فقط</span>
                      </div>
                    </td>
                    <td className="p-6 text-center bg-green-50">
                      <div className="flex flex-col items-center gap-2">
                        <Check className="text-green-600" size={28} />
                        <span className="text-green-800 font-bold">تطبيق عملي على الدروس</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 text-lg font-medium text-gray-800">الاستمرارية</td>
                    <td className="p-6 text-center bg-red-50/30">
                      <div className="flex flex-col items-center gap-2">
                        <X className="text-red-500" size={28} />
                        <span className="text-gray-600">دورة وتمشي (غياب الدعم)</span>
                      </div>
                    </td>
                    <td className="p-6 text-center bg-green-50">
                      <div className="flex flex-col items-center gap-2">
                        <Check className="text-green-600" size={28} />
                        <span className="text-green-800 font-bold">تسجيلات مدى الحياة ومتابعة</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards (hidden on desktop) */}
          <div className="md:hidden space-y-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-4 border-b border-gray-100 text-center">
                <h3 className="font-bold text-xl text-gray-800">طريقة التعلم</h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-100">
                <div className="p-4 text-center bg-red-50/30">
                  <div className="text-sm text-gray-500 mb-2">الطرق التقليدية</div>
                  <X className="text-red-500 mx-auto mb-2" size={24} />
                  <span className="text-gray-600 text-sm">حفظ عن ظهر قلب (تكرار ممل)</span>
                </div>
                <div className="p-4 text-center bg-green-50">
                  <div className="text-sm text-green-700 mb-2 font-bold">دورة الذاكرة</div>
                  <Check className="text-green-600 mx-auto mb-2" size={24} />
                  <span className="text-green-800 font-bold text-sm">التعلم باللعب والخيال</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-4 border-b border-gray-100 text-center">
                <h3 className="font-bold text-xl text-gray-800">نوع الحصص</h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-100">
                <div className="p-4 text-center bg-red-50/30">
                  <div className="text-sm text-gray-500 mb-2">الطرق التقليدية</div>
                  <X className="text-red-500 mx-auto mb-2" size={24} />
                  <span className="text-gray-600 text-sm">فيديوهات مسجلة سلبية</span>
                </div>
                <div className="p-4 text-center bg-green-50">
                  <div className="text-sm text-green-700 mb-2 font-bold">دورة الذاكرة</div>
                  <Check className="text-green-600 mx-auto mb-2" size={24} />
                  <span className="text-green-800 font-bold text-sm">حصص مباشرة تفاعلية (لايڤ)</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-4 border-b border-gray-100 text-center">
                <h3 className="font-bold text-xl text-gray-800">التطبيق</h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-100">
                <div className="p-4 text-center bg-red-50/30">
                  <div className="text-sm text-gray-500 mb-2">الطرق التقليدية</div>
                  <X className="text-red-500 mx-auto mb-2" size={24} />
                  <span className="text-gray-600 text-sm">معلومات نظرية فقط</span>
                </div>
                <div className="p-4 text-center bg-green-50">
                  <div className="text-sm text-green-700 mb-2 font-bold">دورة الذاكرة</div>
                  <Check className="text-green-600 mx-auto mb-2" size={24} />
                  <span className="text-green-800 font-bold text-sm">تطبيق عملي على الدروس</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-4 border-b border-gray-100 text-center">
                <h3 className="font-bold text-xl text-gray-800">الاستمرارية</h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-gray-100">
                <div className="p-4 text-center bg-red-50/30">
                  <div className="text-sm text-gray-500 mb-2">الطرق التقليدية</div>
                  <X className="text-red-500 mx-auto mb-2" size={24} />
                  <span className="text-gray-600 text-sm">دورة وتمشي (غياب الدعم)</span>
                </div>
                <div className="p-4 text-center bg-green-50">
                  <div className="text-sm text-green-700 mb-2 font-bold">دورة الذاكرة</div>
                  <Check className="text-green-600 mx-auto mb-2" size={24} />
                  <span className="text-green-800 font-bold text-sm">تسجيلات مدى الحياة ومتابعة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Coach Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark-blue">مع المدرب أحمد</h2>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-xl font-medium text-gray-700">
                  <span className="text-2xl">🏆</span> شاركت فالبطولة العربية للذاكرة
                </li>
                <li className="flex items-center gap-3 text-xl font-medium text-gray-700">
                  <span className="text-2xl">🏆</span> شاركت فالبطولة الأفريقية للذاكرة
                </li>
                <li className="flex items-center gap-3 text-xl font-medium text-gray-700">
                  <span className="text-2xl">🏆</span> مسؤول عن البطولة الوطنية المغربية للذاكرة
                </li>
              </ul>
              
              <div className="bg-blue-50 p-6 rounded-2xl border-r-4 border-[#3B82F6]">
                <p className="text-xl text-gray-800 leading-relaxed font-medium mb-4">
                  "درّبت أكثر من 3000 شخص — أصغرهم 7 سنين وأكبرهم 73 سنة.
                </p>
                <p className="text-xl text-gray-800 leading-relaxed font-bold">
                  التقنيات اللي استعملت فالبطولات العالمية؟ دابا كنعلّمها لولدك."
                </p>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <img 
                src="https://i.ibb.co/HfQqvX2Q/Generated-Image-February-25-2026-4-08-PM-jpg.jpg" 
                alt="المدرب أحمد" 
                className="w-full aspect-square object-cover rounded-[2rem] shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Offer Stack */}
      <section className="py-20 px-4 bg-[#DCFCE7]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-dark-blue">شنو غادي تاخد مقابل 400 درهم؟</h2>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#22C55E] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">4 حصص مباشرة لايڤ</h4>
                  <p className="text-gray-600">حصص تفاعلية، ماشي فيديوهات مملة</p>
                  <span className="text-sm text-gray-400 line-through">(قيمتها 600 درهم)</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#22C55E] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">تسجيلات الحصص — مدى الحياة</h4>
                  <p className="text-gray-600">ولدك يراجع أي وقت يبغي</p>
                  <span className="text-sm text-gray-400 line-through">(قيمتها 200 درهم)</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#22C55E] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">تطبيق "ذاكرتي" — مجاناً</h4>
                  <p className="text-gray-600">يتدرب عليه كل يوم ويقوّي ذاكرتو</p>
                  <span className="text-sm text-gray-400 line-through">(قيمتو 150 درهم)</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#22C55E] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">مجموعة واتساب للدعم — 30 يوم</h4>
                  <p className="text-gray-600">أي سؤال عندك، أنا موجود</p>
                  <span className="text-sm text-gray-400 line-through">(قيمتها 100 درهم)</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="text-[#22C55E] flex-shrink-0 mt-1" size={28} />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">نتا كوالد تقدر تحضر مع ولدك</h4>
                  <p className="text-gray-600">تشوف كيفاش كيتعلم، وتستافد حتى نتا</p>
                  <span className="text-sm text-[#22C55E] font-bold">(بلا أي زيادة)</span>
                </div>
              </li>
            </ul>
            
            <div className="border-t-2 border-dashed border-gray-200 pt-8 pb-6 text-center">
              <p className="text-xl text-gray-500 mb-2">المجموع الحقيقي: <span className="line-through">1050 درهم</span></p>
              <p className="text-3xl md:text-4xl font-black text-dark-blue">نتا غادي تخلص: <span className="text-[#22C55E]">400 درهم فقط</span></p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 text-center mb-8">
              <p className="text-gray-600 font-medium">
                400 ÷ 4 حصص = <span className="font-bold text-dark-blue">100 درهم للحصة</span> — أقل من ثمن وجبة فماكدونالدز!
              </p>
            </div>
            
            <button 
              onClick={openModal}
              className="w-full bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 rounded-2xl shadow-xl hover:shadow-green-500/40 transition-all transform hover:-translate-y-1"
            >
              سجّل ولدك دابا
            </button>
          </div>
        </div>
      </section>

      {/* 9. Results Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue">بعد الدورة، ولدك غادي:</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4">
              <div className="text-3xl">📈</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">يحفظ أسرع بكثير</h4>
                <p className="text-gray-600">بدل ساعات، دقائق</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">يركّز وقت أطول</h4>
                <p className="text-gray-600">بلا تشتت وبلا ملل</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4">
              <div className="text-3xl">😊</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">يحب وقت الدراسة</h4>
                <p className="text-gray-600">بدل الصراخ والبكا والتوتر</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4">
              <div className="text-3xl">💪</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">يثق فراسو</h4>
                <p className="text-gray-600">لأنو غادي يشوف النتائج بعينيه</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl flex items-start gap-4 sm:col-span-2 sm:max-w-md sm:mx-auto w-full">
              <div className="text-3xl">🤝</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">علاقتكم غادي تتحسن</h4>
                <p className="text-gray-600">لأن وقت الدروس ما غاديش يبقى حرب</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials (WhatsApp Style) */}
      <section className="py-20 px-4 bg-[#E5DDD5] overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue">شنو كيقولو الآباء؟</h2>
          
          <div className="relative h-[600px] overflow-hidden mask-image-linear-gradient">
            <motion.div
              animate={{
                translateY: "-50%",
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-col gap-8 pb-8"
            >
              {[...new Array(2).fill(0).map((_, index) => (
                <React.Fragment key={index}>
                  {/* Testimonial 1 */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-md mx-auto w-full">
                    <div className="bg-[#075E54] text-white p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative">
                        <img src="https://picsum.photos/id/1011/100/100" alt="Avatar" className="w-full h-full object-cover blur-[2px]" loading="lazy" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">أم ف... <span className="font-normal text-xs opacity-80 ml-2">الرباط</span></p>
                        <p className="text-xs opacity-80">متصل الآن</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
                      <div className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none inline-block max-w-[90%] shadow-sm relative">
                        <p className="text-gray-800 text-[15px] leading-relaxed mb-4">
                          ولدي كان كينسى جدول الضرب كل يوم. كنعاود معاه ساعات وما كيوصلش. بعد الدورة مع الأستاذ أحمد، دابا كيفاجئني بالأجوبة قبل ما نكمّل السؤال! 🤩
                        </p>
                        <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                          <span>10:42</span>
                          <span className="text-[#34B7F1]">✓✓</span>
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-3 bg-white/80 inline-block px-2 py-1 rounded-full mx-auto block w-max">(ولدها 9 سنين)</p>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-md mx-auto w-full">
                    <div className="bg-[#075E54] text-white p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative">
                        <img src="https://picsum.photos/id/1005/100/100" alt="Avatar" className="w-full h-full object-cover blur-[2px]" loading="lazy" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">أب م... <span className="font-normal text-xs opacity-80 ml-2">الدار البيضاء</span></p>
                        <p className="text-xs opacity-80">متصل الآن</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
                      <div className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none inline-block max-w-[90%] shadow-sm relative">
                        <p className="text-gray-800 text-[15px] leading-relaxed mb-4">
                          كنت خايف على مستقبل بنتي. كل ما نشوفها كتعاني مع الدروس، قلبي كيتقطّع. الأستاذ أحمد علّمها تقنيات بسيطة ودابا كتقرا بروحها بلا ما نصيّح عليها 💪
                        </p>
                        <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                          <span>14:15</span>
                          <span className="text-[#34B7F1]">✓✓</span>
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-3 bg-white/80 inline-block px-2 py-1 rounded-full mx-auto block w-max">(بنتو 11 سنة)</p>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-md mx-auto w-full">
                    <div className="bg-[#075E54] text-white p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden relative">
                        <img src="https://picsum.photos/id/1027/100/100" alt="Avatar" className="w-full h-full object-cover blur-[2px]" loading="lazy" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">أم س... <span className="font-normal text-xs opacity-80 ml-2">مراكش</span></p>
                        <p className="text-xs opacity-80">متصل الآن</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]">
                      <div className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none inline-block max-w-[90%] shadow-sm relative">
                        <p className="text-gray-800 text-[15px] leading-relaxed mb-4">
                          أحسن استثمار درتو فحياتي. 400 درهم مقابل راحة البال؟ يستاهلو! 👍
                        </p>
                        <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                          <span>18:30</span>
                          <span className="text-[#34B7F1]">✓✓</span>
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-3 bg-white/80 inline-block px-2 py-1 rounded-full mx-auto block w-max">(ولدها 8 سنين)</p>
                    </div>
                  </div>
                </React.Fragment>
              ))]}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 12. Urgency Section */}
      <section className="py-24 px-4 bg-[#0F2D54] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-10 text-white">سؤال أخير...</h2>
          
          <div className="space-y-6 text-xl md:text-2xl text-gray-300 font-medium mb-12">
            <p>كل يوم كيفوت، ولدك كيتأخر أكثر.</p>
            <p>كل امتحان كيفشل فيه، ثقتو فراسو كتنقص.</p>
            <p>كل ليلة ديال الصراخ والتوتر، علاقتكم كتتضرر.</p>
            
            <p className="text-white font-bold mt-10">السؤال ماشي "واش الدورة غادي تنفع؟"</p>
            <p className="text-[#F97316] font-bold text-3xl mt-4">السؤال هو: "شحال غادي تسنّى؟"</p>
            
            <p className="text-lg mt-8 leading-relaxed max-w-2xl mx-auto">
              التقنيات هادي ما غاديش تنفع ولدك غير دابا. غادي تنفعو طول حياتو — فالإعدادي، فالثانوي، فالجامعة، وحتى فالخدمة.
            </p>
          </div>
          
          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 mb-10">
            <p className="text-3xl md:text-4xl font-black text-white">
              400 درهم دابا = <span className="text-[#22C55E]">مستقبل مختلف لولدك.</span>
            </p>
          </div>
          
          <button 
            onClick={openModal}
            className="w-full md:w-auto bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 px-12 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1"
          >
            سجّل ولدك دابا
          </button>
        </div>
      </section>

      {/* 13. Registration CTA */}
      <section className="py-20 px-4 bg-[#F9FAFB]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark-blue">مستعد تبدل حياة ولدك الدراسية؟</h2>
          <p className="text-xl text-gray-600 mb-10">
            اضغط على الزر لتحت باش تبدا عملية التسجيل. الأماكن محدودة!
          </p>
          <button 
            onClick={openModal}
            className="w-full md:w-auto bg-[#22C55E] hover:bg-green-600 text-white text-2xl font-bold py-5 px-12 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all transform hover:-translate-y-1"
          >
            سجّل ولدك دابا
          </button>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="py-20 px-4 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue">أسئلة كيطرحوها الآباء:</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right focus:outline-none"
                >
                  <span className="text-lg font-bold text-gray-900 flex items-center gap-3">
                    <span className="text-[#3B82F6]">❓</span> {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="bg-[#1A1A1A] text-gray-400 py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-white">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <span className="font-bold text-xl">أحمد</span>
          </div>
          
          <p className="mb-2">دورة الذاكرة للأطفال — المدرب أحمد</p>
          <p className="mb-8">+3000 متدرب | بطولات عربية وأفريقية</p>
          
          <a href="#" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors mb-12">
            <MessageCircle size={20} />
            تواصل معنا
          </a>
          
          <div className="border-t border-gray-800 pt-8 text-sm">
            <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>

      <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default KidsMemoryLanding;
