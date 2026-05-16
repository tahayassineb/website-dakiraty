import React, { useState, useEffect } from 'react';
import { 
  Check, X, ChevronDown, ChevronUp, Clock, Video, Book, Award, ShieldCheck, 
  Brain, AlertOctagon, XCircle, CheckCircle, CloudFog, Sun, Smartphone, Users, ArrowLeft, MessageCircle, Heart, Star, Globe
} from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { ProgramData } from '../types';
import LiteYouTubeEmbed from '../components/LiteYouTubeEmbed';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

const DAKIRATY_PIXEL_ID = '1971224763824220';
const QURAN_PIXEL_ID = '1435549911489261';

interface ProgramDetailsProps {
  type: 'dakiraty' | 'quran';
}

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-white transition-colors text-right"
            >
                <span className="font-bold text-lg text-primary-blue">{question}</span>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </button>
            {isOpen && (
                <div className="p-5 bg-white text-gray-600 border-t border-gray-100 leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    )
}

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ type }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Determine the correct Pixel ID based on the program type
  const currentPixelId = type === 'quran' ? QURAN_PIXEL_ID : DAKIRATY_PIXEL_ID;

  useEffect(() => {
    // Inject Meta Pixel
    if (typeof window !== 'undefined') {
      const w = window as any;
      if (!w.fbq) {
        let n: any;
        n = w.fbq = function() {
            // eslint-disable-next-line prefer-rest-params
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!w._fbq) w._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        const t = document.createElement('script');
        t.async = true;
        t.src = 'https://connect.facebook.net/en_US/fbevents.js';
        const s = document.getElementsByTagName('script')[0];
        if (s && s.parentNode) {
            s.parentNode.insertBefore(t, s);
        }
      }
      
      window.fbq('init', currentPixelId);
      window.fbq('track', 'PageView');
    }
  }, [currentPixelId]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setValidationError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    const cleanPhone = phone.replace(/\D/g, ''); 
    if (cleanPhone.length > 10) {
        setValidationError("لقد أدخلت أرقاماً زائدة، يجب أن يكون الرقم 10 أرقام");
        return;
    }
    if (cleanPhone.length < 10) {
        setValidationError("رقم الهاتف غير مكتمل");
        return;
    }
    
    setStatus('submitting');

    const intakeOverride = import.meta.env.VITE_LEAD_INTAKE_URL?.trim();
    const webhookUrl = type === 'quran' 
        ? intakeOverride || 'https://useful-hound-287.eu-west-1.convex.site/intake/website' 
        : ''; // Fallback if needed for other types

    if (!webhookUrl) {
         // If no webhook is configured for this type, just mock success
         setTimeout(() => setStatus('success'), 1000);
         return;
    }

    // Generate Event ID for deduplication
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

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

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Form Data
                name: formData.name,
                email: formData.email,
                phone: phone,
                program: type,
                form: type === 'quran' ? 'quran_landing' : 'program_details',
                
                // CAPI Payload
                event_name: 'Lead', // Changed to Lead
                event_id: eventId,
                event_source_url: window.location.href,
                fbp: fbp,
                fbc: fbc,
                user_agent: navigator.userAgent,
                event_time: Math.floor(Date.now() / 1000)
            }),
        });

        if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '' });
            setPhone('');

            if (window.fbq) {
                window.fbq('track', 'Lead', { // Changed to Lead
                    content_name: type === 'quran' ? 'Quran Program' : 'Program',
                    value: type === 'quran' ? 200 : 0,
                    currency: 'MAD'
                }, { eventID: eventId });
            }
        } else {
            setStatus('error');
        }
    } catch (error) {
        console.error('Submission error:', error);
        setStatus('error');
    }
  };

  // Data Logic based on prop
  const data: ProgramData = type === 'dakiraty' 
    ? {
        id: 'dakiraty',
        title: 'برنامج ذاكرتي الحديدية',
        subtitle: 'البرنامج الأول على الصعيد العربي الذي يجمع بين علم الأعصاب وتقنيات أبطال الذاكرة.', 
        description: 'برنامج تدريبي مكثف يعتمد على أحدث نظريات عمل الدماغ وتقنيات الذاكرة العالمية.',
        price: '600 DH',
        originalPrice: '1200 DH',
        features: ['7 لقاءات مباشرة وتفاعلية', 'دخول مدى الحياة لمحتوى الدورة', 'متابعة فردية مع المدرب', 'شهادة إتمام معتمدة', 'ضمان استرداد الأموال'],
        painPoints: [], 
        curriculum: [
            { title: 'الأسبوع الأول: الأساسيات', desc: 'فهم آلية عمل الذاكرة وكيفية تجهيز العقل للحفظ.', icon: '🧠' },
            { title: 'الأسبوع الثاني: التقنيات', desc: 'تعلم استراتيجيات الربط والقصة والخرائط الذهنية.', icon: '🔗' },
            { title: 'الأسبوع الثالث: التطبيق', desc: 'تطبيقات عملية على حفظ الأسماء، الأرقام، والكتب.', icon: '📚' },
            { title: 'الأسبوع الرابع: الاحتراف', desc: 'الوصول لمرحلة الحفظ المتقن والسريع ومراجعة المكتسبات.', icon: '🏆' }
        ],
        faqs: [
            { question: 'هل البرنامج مناسب للموظفين المشغولين؟', answer: 'نعم، تم تصميم البرنامج ليناسب جدول الموظفين وأصحاب الأعمال، حيث يحتاج فقط 15-20 دقيقة يومياً.' },
            { question: 'كيف تتم متابعة المتدربين؟', answer: 'تتم المتابعة عبر مجموعة واتساب خاصة وجلسات زووم أسبوعية.' },
            { question: 'ماذا لو لم أستفد من الدورة؟', answer: 'نقدم ضمان استرداد كامل المبلغ خلال أول 7 أيام إذا لم تكن راضياً.' }
        ],
        heroImage: 'https://picsum.photos/id/1073/600/400',
        isAvailable: true
      }
    : {
        id: 'quran',
        title: 'اكتشف أسرار الحفظ باستخدام تقنيات أبطال العالم للذاكرة',
        subtitle: 'بـ 200 درهم فقط وخلال 3 أيام.. تعلّم كيف تحفظ القرآن الكريم بسهولة وثبات.',
        description: 'دورة مكثفة مع المدرب أحمد.',
        price: '200 DH',
        originalPrice: '', // No strike-through needed for new copy
        features: ['فهم الذاكرة وكسر الحواجز', 'تطبيق تقنيات أبطال العالم (M5)', 'طرق تثبيت المحفوظ القديم', 'شهادة إلكترونية معتمدة'],
        painPoints: [], // Replaced by Testimonials for Quran
        curriculum: [
            { title: 'اليوم الأول', desc: 'كسر الحواجز أمام الحفظ الفعال: فهم الذاكرة، تدريب العقل، وورشة تطبيقية لتقنيات أبطال الذاكرة.', icon: '01' },
            { title: 'اليوم الثاني', desc: 'ورشة تطبيقية جماعية (تقنيات M5): تطبيق عملي على آيات القرآن وتفاعل جماعي.', icon: '02' },
            { title: 'اليوم الثالث', desc: 'طرق تثبيت المحفوظ القديم: كيفية التخزين في الذاكرة طويلة الأمد وجلسة مناقشة.', icon: '03' }
        ],
        faqs: [
            { question: 'تكلفة البرنامج غالية (200 درهم)؟', answer: 'أقدر وجهة نظرك، لكن فكر في هذا كاستثمار في نفسك. خلال 3 أيام ستكتسب مهارات تغير حياتك. النتائج تفوق التكلفة بكثير، وهو ما أكده خريجونا السابقون.' },
            { question: 'هل التداريب اليومية مباشرة ولها وقت محدد؟', answer: 'التداريب اليومية فردية وليست محددة بوقت معين، مما يمنحك مرونة كاملة.' },
            { question: 'هل يناسب البرنامج كبار السن؟', answer: 'نعم! الذاكرة لا عمر لها. تحتاج فقط لتعلم "لغة الذاكرة" والتدريب، والبرنامج مصمم للجميع.' },
            { question: 'هل يحصل المتدرب على شهادة؟', answer: 'نعم، يتوصل المشارك بشهادة إلكترونية مسلمة من البطولة الوطنية للذاكرة.' }
        ],
        heroImage: 'https://picsum.photos/id/1073/600/400', // UPDATED to match Dakiraty
        isAvailable: true
    };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      
      {/* 0. Charity Alert (Quran Only) */}
      {type === 'quran' && (
        <div className="bg-red-50 text-red-800 px-4 py-3 text-center border-b border-red-100 sticky top-20 z-40">
            <div className="flex items-center justify-center gap-2 font-bold text-sm md:text-base animate-pulse">
                <Heart className="fill-red-500 text-red-500" size={20} />
                <span>تنبيه: مداخيل الدورة موجهة كلها لدعم أيتام جمعية ابتسم</span>
            </div>
        </div>
      )}

      {/* 1. Hero Section (Shared) */}
      <section className="bg-primary-blue text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col ${type === 'quran' ? 'justify-center' : 'md:flex-row'} items-center gap-12`}>
            
            {/* 3D Visual - Left (RTL) - ONLY FOR DAKIRATY */}
            {type !== 'quran' && (
                <div className="md:w-1/2 flex justify-center order-2 md:order-2">
                    <div className="relative group perspective-1000 w-full max-w-md">
                        <img 
                            src={data.heroImage} 
                            alt={data.title} 
                            className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-y-12 transition-transform duration-500 group-hover:rotate-y-0 w-full border-4 border-white/20"
                            width="600"
                            height="400"
                            loading="eager"
                        />
                        
                        <div className="absolute -top-4 -right-4 bg-accent-yellow text-dark-blue font-bold px-6 py-2 rounded-full shadow-lg animate-bounce z-20">
                            الدفعة القادمة قريباً
                        </div>
                    </div>
                </div>
            )}

            {/* Content - Right */}
            <div className={`${type === 'quran' ? 'w-full text-center max-w-4xl mx-auto' : 'md:w-1/2 text-right'} order-1 md:order-1 space-y-6`}>
                <span className="inline-block bg-blue-800 text-blue-200 px-4 py-1 rounded-full text-sm font-semibold">
                    {type === 'quran' ? 'دورة الذاكرة والقرآن الكريم' : 'برنامج تدريبي متكامل'}
                </span>
                
                {type === 'dakiraty' ? (
                   <>
                       <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            {data.title}
                       </h1>
                       <p className="text-xl text-blue-100 font-light leading-relaxed">
                           البرنامج الأول على الصعيد العربي الذي يجمع بين <span className="text-accent-yellow font-bold border-b-2 border-accent-yellow/50">علم الأعصاب</span> وتقنيات <span className="text-accent-yellow font-bold border-b-2 border-accent-yellow/50">أبطال الذاكرة</span>، مع مدرب البطولة الوطنية للذاكرة.
                       </p>
                   </>
                ) : (
                    <>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl text-blue-100 font-light">
                            {data.subtitle}
                        </p>
                    </>
                )}

                <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${type === 'quran' ? 'justify-center' : ''}`}>
                     <ScrollLink 
                        to="registration-form" 
                        smooth={true} 
                        duration={800}
                        offset={-100}
                        className="cursor-pointer bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
                     >
                        <span>{type === 'quran' ? 'أريد الإنضمام لدورة الذاكرة والقرآن' : 'احجز مقعدك الآن'}</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-sm">{data.price}</span>
                     </ScrollLink>
                </div>

                {type === 'dakiraty' ? (
                   <div className="flex items-center gap-4 text-sm text-blue-200 pt-2">
                        <div className="flex items-center gap-1 font-bold text-accent-yellow"><Users size={16} /> +3000 متدرب</div>
                        <div className="flex items-center gap-1"><Award size={16} /> شهادة معتمدة</div>
                   </div>
                ) : (
                    <div className={`flex items-center gap-4 text-sm text-blue-200 pt-2 ${type === 'quran' ? 'justify-center' : ''}`}>
                        <div className="flex items-center gap-1"><ShieldCheck size={16} /> ضمان استرداد الأموال</div>
                        <div className="flex items-center gap-1"><Award size={16} /> شهادة معتمدة</div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* DAKIRATY SPECIFIC SECTIONS */}
      {type === 'dakiraty' && (
        <>
            {/* 1.5 NEW: YouTube Video Section */}
            <section className="bg-primary-blue pb-20 -mt-1 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-dark-blue p-2 rounded-3xl shadow-2xl">
                        <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <LiteYouTubeEmbed videoId="dQw4w9WgXcQ" title="Course Introduction" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Nightmare / Agitation Section */}
            <section className="py-16 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-primary-blue"></div>
                         <div className="w-20 h-20 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mx-auto mb-6">
                             <Brain size={40} />
                         </div>
                         
                         <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-4">
                            كابوس <span className="text-red-500">مشاكل الذاكرة</span> وتراجع الأداء
                         </h2>
                         
                         <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            هل تشعر <span className="font-bold text-dark-blue">بضباب ذهني دائم</span>؟ الخوف من تراجع القدرات العقلية وفقدان السيطرة على المعلومات هو <span className="font-bold text-dark-blue">كابوس صامت</span> يهدد مستقبلك المهني.
                         </p>
                    </div>
                </div>
            </section>

            {/* 3. Filters / Qualification Section */}
            <section className="py-16 bg-light-gray">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    
                    {/* Who this is NOT for */}
                    <div className="bg-white rounded-3xl shadow-lg border-2 border-primary-blue p-8 md:p-10">
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <XCircle className="text-red-500 w-10 h-10" />
                            <h3 className="text-2xl font-bold text-dark-blue">من فضلك.. أغلق هذه الصفحة فوراً إذا:</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                'كنت تبحث عن "عصا سحرية" ولا تريد تخصيص 15 دقيقة يومياً للتدريب.',
                                'كنت تعتقد أن الاستثمار في صحة عقلك "مصاريف زائدة".',
                                'كنت تقبل بضياع فرصك المهنية بسبب النسيان.'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <X className="text-red-500 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-700 text-lg font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Who this IS for */}
                    <div className="bg-white rounded-3xl shadow-lg border-2 border-accent-yellow p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-bl-full -mr-12 -mt-12 z-0"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                                <CheckCircle className="text-green-500 w-10 h-10" />
                                <h3 className="text-2xl font-bold text-dark-blue">ولكن.. أهلاً بك في النخبة إذا:</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Check className="text-green-600" size={16} />
                                    </div>
                                    <span className="text-gray-700 text-lg font-medium">كنت من يريد بناء <span className="font-bold text-primary-blue">قدرات غير محدودة</span> من قوة التذكر لاستخدامها في عملك وحياتك.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Check className="text-green-600" size={16} />
                                    </div>
                                    <span className="text-gray-700 text-lg font-medium">كنت ممن يطمح <span className="font-bold text-primary-blue">للتميز المهني</span> وليس مجرد النجاح العادي.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Check className="text-green-600" size={16} />
                                    </div>
                                    <span className="text-gray-700 text-lg font-medium">كنت تريد امتلاك <span className="font-bold text-primary-blue">ذاكرة حديدية</span> تخدمك مدى الحياة.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Before & After Transformation */}
            <section className="grid grid-cols-1 md:grid-cols-2">
                {/* Before */}
                <div className="bg-blue-50/50 p-12 md:p-20 text-center flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-gray-200">
                    <CloudFog size={64} className="text-gray-400 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-500 mb-4">الآن: ضباب، فوضى، وإحراج</h3>
                    <p className="text-gray-600 text-lg max-w-sm">
                        تشتت دائم، إحراج اجتماعي بسبب <span className="font-bold text-gray-700">نسيان الأسماء والمعلومات المهمة</span>، قلق وفوضى عارمة مع كثرة المعلومات المتدفقة يومياً.
                    </p>
                </div>
                {/* After */}
                <div className="bg-primary-blue p-12 md:p-20 text-center flex flex-col items-center justify-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Sun size={64} className="text-accent-yellow mb-6 animate-pulse" />
                        <h3 className="text-2xl font-bold text-white mb-4">بعد البرنامج: صفاء، ثقة، وإنجاز</h3>
                        <p className="text-blue-100 text-lg max-w-sm">
                            <span className="text-accent-yellow font-bold">ذاكرة حادة كالموس</span>، ثقة عالية بالنفس في الاجتماعات والمواقف الاجتماعية، وإمكانية إنجاز مهام الحفظ والمراجعة في <span className="text-accent-yellow font-bold">20 دقيقة فقط</span> بدلاً من ساعات.
                        </p>
                    </div>
                </div>
            </section>
        </>
      )}

      {/* QURAN SPECIFIC SECTIONS */}
      {type === 'quran' && (
        <>
            {/* NEW: Quran Video Section */}
            <section className="bg-primary-blue pb-20 -mt-1 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">شاهد الفيديو واكتشف تقنيات أبطال العالم</h2>
                    </div>
                    <div className="bg-dark-blue p-2 rounded-3xl shadow-2xl">
                        <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <LiteYouTubeEmbed videoId="I3jYprUogGI" title="Quran Program Video" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="text-accent-yellow mb-6 flex justify-center gap-1">
                        {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={24} />)}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-dark-blue mb-8">
                        "كنت أظن أنني لا أستطيع حفظ القرآن..."
                    </h3>
                    <div className="bg-blue-50/50 p-8 md:p-12 rounded-[2rem] relative border border-blue-100">
                        <div className="text-6xl text-primary-blue absolute -top-8 right-8 opacity-10 font-serif">"</div>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8 font-light">
                        "كنتُ أحلم بحفظ القرآن الكريم منذ سنوات، لكنني كنت أواجه صعوبة في التركيز والتذكر... ظننت أن المشكلة فيّ.
                        <br /><br />
                        ثم اكتشفت دورة <span className="font-bold text-primary-blue not-italic">'الذاكرة والقرآن الكريم'</span> مع المدرب أحمد. خلال 3 أيام فقط، تغيرت نظرتي تماماً. تعلمت كيف أعيد ضبط بوصلة ذهني... وأدركت أن الحفظ ليس مجرد تكرار بل هو منهجية."
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                <img src="https://picsum.photos/id/447/100/100" alt="Student" loading="lazy" width="48" height="48" />
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-dark-blue">أحد خريجي الدورة</div>
                                <div className="text-sm text-gray-500">الدفعة 15</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
      )}

      {/* 5. Timeline Section (Shared) */}
      <section className="py-20 bg-light-gray relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-dark-blue">
                    {type === 'quran' ? 'ما الذي ستحصل عليه خلال 3 أيام؟' : 'رحلة التعلم'}
                </h2>
                <p className="text-gray-600 mt-2">خطة عملية مدروسة خطوة بخطوة</p>
            </div>
            
            <div className="relative">
                {/* Central Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-blue via-accent-yellow to-primary-blue rounded-full"></div>
                
                <div className="space-y-12">
                    {data.curriculum.map((item, idx) => (
                        <div key={idx} className={`flex items-center justify-between w-full ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            <div className="w-5/12"></div>
                            <div className="z-10 bg-white border-4 border-accent-yellow rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold shadow-lg text-primary-blue">
                                {item.icon}
                            </div>
                            <div className="w-5/12 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary-blue">
                                <h3 className="text-lg font-bold text-dark-blue mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Instructor Section for Quran */}
      {type === 'quran' && (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image */}
                    <div className="md:w-1/3 relative">
                        <div className="absolute inset-0 bg-accent-yellow rounded-3xl transform rotate-6 opacity-20"></div>
                        <img 
                            src="https://drive.google.com/thumbnail?id=1G9GlcTc1-8tEuxDeDIgftISbVivRwUaD&sz=w1000" 
                            className="rounded-3xl shadow-2xl w-full object-cover relative z-10" 
                            alt="Coach Ahmed" 
                            width="400"
                            height="500"
                            loading="lazy"
                        />
                    </div>
                    {/* Content */}
                    <div className="md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-6">من هو مقدم الدورة؟</h2>
                        <p className="text-xl text-primary-blue font-medium mb-8">
                            المدرب أحمد: شغوف بمرافقة الآخرين في رحلة التميز.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                'انطلق في التدريب الجاد منذ 2003.',
                                'مشاركة مشرفة مع المنتخب المغربي للذاكرة 2015.',
                                'صاحب رقم قياسي في بطولة إفريقيا للذاكرة 2020.',
                                'درب أكثر من 3000 متدرب في الذاكرة والقرآن.'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* 6. Pricing & Value Stack Split */}
      <section className="py-20 bg-dark-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Value Stack (Features) */}
                <div>
                    <h2 className="text-3xl font-bold mb-8">ماذا ستحصل عند الاشتراك؟</h2>
                    
                    {type === 'dakiraty' ? (
                        <div className="space-y-6">
                            {/* Card 1 */}
                            <div className="bg-white text-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg">
                                <div className="bg-blue-100 p-4 rounded-xl text-primary-blue">
                                    <Video size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1 text-primary-blue">7 لقاءات مباشرة</h3>
                                    <p className="text-gray-600">(Live Coaching) مرتين أسبوعياً مع المدرب.</p>
                                </div>
                            </div>
                             {/* Card 2 */}
                             <div className="bg-white text-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg relative border-2 border-accent-yellow">
                                <div className="absolute top-0 left-6 bg-accent-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded-b-lg">
                                    حصري
                                </div>
                                <div className="bg-blue-100 p-4 rounded-xl text-primary-blue">
                                    <Smartphone size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1 text-primary-blue">التطبيق الذكي (هدية)</h3>
                                    <p className="text-gray-600">أول تطبيق في الوطن العربي لتدريب الذاكرة.</p>
                                </div>
                            </div>
                             {/* Card 3 */}
                             <div className="bg-white text-gray-800 p-6 rounded-2xl flex items-center gap-6 shadow-lg">
                                <div className="bg-blue-100 p-4 rounded-xl text-primary-blue">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1 text-primary-blue">مجتمع النخبة</h3>
                                    <p className="text-gray-600">بيئة محفزة للنمو تستمر معك حتى بعد نهاية الـ 28 يوماً.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Original Simple List for Quran */
                        <div className="space-y-6">
                            {data.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <div className="bg-accent-yellow text-dark-blue p-1 rounded-full">
                                        <Check size={20} />
                                    </div>
                                    <span className="text-lg">{feature}</span>
                                </div>
                            ))}
                            {/* Special Quran Alert */}
                            <div className="bg-red-500/20 border border-red-500/30 p-4 rounded-xl flex items-center gap-3">
                                <Heart className="text-red-400 fill-red-400" />
                                <span>مداخيل الدورة كاملة لدعم أيتام جمعية ابتسم</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 7. Sticky Pricing Card (Registration Form) */}
                <div className="lg:sticky lg:top-24">
                    <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-2xl border-4 border-accent-yellow transform lg:-rotate-1 hover:rotate-0 transition-transform duration-300">
                        <div className="text-center mb-8">
                            {type === 'dakiraty' && <p className="text-gray-500 font-semibold mb-2">استثمارك في نفسك</p>}
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-5xl font-extrabold text-primary-blue">{data.price}</span>
                                {data.originalPrice && (
                                    <span className="text-xl text-gray-400 line-through decoration-red-500 decoration-2">{data.originalPrice}</span>
                                )}
                            </div>
                        </div>
                        
                        <div id="registration-form" className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                            <h3 className="text-center font-bold text-dark-blue mb-4">
                                {type === 'dakiraty' ? 'جاهز لمضاعفة قدراتك العقلية؟' : 'أنت على بعد خطوة واحدة...'}
                                <br/><span className="text-primary-blue">{type === 'quran' ? 'سجل الآن وابدأ رحلتك' : 'احجز مقعدك الآن'}</span>
                            </h3>

                            {status === 'success' ? (
                                <div className="text-center py-6">
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                                        <CheckCircle className="text-green-600" size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-dark-blue mb-2">تم استلام طلبك!</h4>
                                    <p className="text-sm text-gray-600">شكراً لك، سيتواصل معك فريقنا قريباً لإتمام التسجيل.</p>
                                    <button onClick={() => setStatus('idle')} className="mt-4 text-primary-blue underline text-sm">تسجيل شخص آخر</button>
                                </div>
                            ) : (
                                <form className="space-y-3" onSubmit={handleFormSubmit}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الاسم الكامل *</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-black focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow outline-none text-right placeholder-gray-500" 
                                            placeholder="أدخل اسمك هنا" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">رقم الهاتف (واتساب) *</label>
                                        <input 
                                            type="tel" 
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            required
                                            className={`w-full p-3 rounded-lg border bg-gray-100 text-black ${validationError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow outline-none text-right placeholder-gray-500`}
                                            placeholder="0632730020" 
                                            dir="ltr" 
                                        />
                                        {validationError && (
                                            <p className="text-red-500 text-xs mt-1 text-right font-bold">{validationError}</p>
                                        )}
                                    </div>
                                    {type === 'quran' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">البريد الإلكتروني *</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-black focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow outline-none text-right placeholder-gray-500" 
                                                placeholder="email@example.com" 
                                                dir="ltr" 
                                            />
                                        </div>
                                    )}
                                    
                                    {status === 'error' && (
                                        <div className="bg-red-50 text-red-600 text-xs p-2 rounded text-center">
                                            عذراً، حدث خطأ. حاول مرة أخرى.
                                        </div>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={status === 'submitting'}
                                        className="w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-4 rounded-xl text-lg shadow-lg mt-2 transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'جاري الإرسال...' : (type === 'quran' ? `تأكيد الحجز (${data.price})` : 'إرسال الطلب وحجز المقعد')}
                                    </button>
                                </form>
                            )}
                        </div>
                        
                        <div className="text-center">
                            {type === 'dakiraty' ? (
                                <>
                                    <p className="text-sm text-gray-500 mb-2">عرض لفترة محدودة</p>
                                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                                        <ShieldCheck size={14} /> 7 أيام ضمان استرداد الأموال
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                    <ShieldCheck size={14} />
                                    بياناتك آمنة 100% ولن يتم مشاركتها
                                </p>
                            )}
                        </div>
                        
                         <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                            <a href="#" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                                <MessageCircle size={18} />
                                <span>للاستفسار قبل التسجيل: تواصل معنا عبر الواتساب</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </section>

      {/* 8. FAQ Section (Shared) */}
      <section className="py-20 bg-white mb-20 md:mb-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-dark-blue mb-12">الأسئلة الشائعة</h2>
            <div className="space-y-4">
                {data.faqs.map((faq, idx) => (
                    <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
      </section>

      {/* 9. Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50 border-t border-gray-100">
        <ScrollLink 
            to="registration-form"
            smooth={true}
            duration={800}
            offset={-100}
            className="cursor-pointer w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 animate-pulse"
        >
            <ArrowLeft size={20} />
            <span>{type === 'quran' ? 'احجز الآن بـ 200 درهم' : 'اضغط هنا لحجز مقعدك الآن'}</span>
        </ScrollLink>
      </div>

    </div>
  );
};

export default ProgramDetails;
