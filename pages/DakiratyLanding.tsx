import React, { useState, useEffect } from 'react';
import { 
  Check, X, Star, ChevronDown, ChevronUp, Users, Award, 
  ShieldCheck, Brain, Video, Smartphone, MessageCircle, ArrowLeft,
  Calendar, Clock, CheckCircle, XCircle, Sun, CloudFog,
  Zap, Lock, Gauge, Crown, UserCheck, BrainCircuit, TrendingUp
} from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import LiteYouTubeEmbed from '../components/LiteYouTubeEmbed';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// --- Data Configuration ---
const contentData = {
  heroVideoId: "DrcJ7yal7J4",
  heroCustomThumbnail: "https://szyuhfwlwmmjjtbupmxf.supabase.co/storage/v1/object/public/chat-media/212632730020@s.whatsapp.net_1768925248390.jpeg",
  // Optimized Authority Image (Reduced size w1000 -> w600)
  authorityImage: "https://drive.google.com/thumbnail?id=1G9GlcTc1-8tEuxDeDIgftISbVivRwUaD&sz=w600",
  proofVideoIds: [
    "0bbHdxHxotI",
    "9OTqcjbqFfk",
    "5S88yPxXcbg"
  ],
  // Optimized Proof Images (Reduced size w800 -> w400)
  proofImageUrls: [
    "https://drive.google.com/thumbnail?id=1160er0NXl8g7TDYfymIyysctN7h1a1UU&sz=w400",
    "https://drive.google.com/thumbnail?id=19NDughmyL23AOkOs06gcCuVfvSuqw7UD&sz=w400",
    "https://drive.google.com/thumbnail?id=1jYnXsZuwGkh4AbITE7FbWvQ5fEYEjKtd&sz=w400",
    "https://drive.google.com/thumbnail?id=1l_yY81OeyLas7EfSahSssl9PbyuRu33O&sz=w400",
    "https://drive.google.com/thumbnail?id=1b1TXDdOXqbUl3qATiyR10Y4nDZGZedzR&sz=w400"
  ]
};

const PIXEL_ID = '1971224763824220';

// --- Sub-Components ---

interface HeroProps {
  videoId: string;
}
const Hero: React.FC<HeroProps> = ({ videoId }) => {
  return (
    <section className="bg-primary-blue text-white py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-12">
                <span className="inline-block bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/50 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                    البرنامج التدريبي الأقوى للذاكرة عربياً
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                    اكتشف كيف تضاعف قدرتك على الحفظ وتتخلص من النسيان في <span className="text-accent-yellow underline decoration-wavy decoration-2 underline-offset-8">28 يوماً فقط</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                    منهجية علمية متكاملة تجمع بين أسرار أبطال الذاكرة وعلم الأعصاب الحديث لتعطيك ذاكرة حديدية لا تخذلك أبداً.
                </p>
            </div>

            {/* VSL Container */}
            <div className="max-w-4xl mx-auto bg-dark-blue p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10">
                <div className="relative pt-[56.25%] rounded-xl md:rounded-2xl overflow-hidden bg-black group">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <LiteYouTubeEmbed 
                            videoId={videoId} 
                            title="Dakiraty VSL" 
                            posterQuality="maxresdefault"
                            priority={true} // LCP Optimization: Eager load this image
                            customThumbnail={contentData.heroCustomThumbnail}
                        />
                    </div>
                </div>
            </div>
            
            <div className="mt-12 text-center">
                 <ScrollLink 
                    to="offer-section" 
                    smooth={true} 
                    duration={800}
                    className="inline-flex cursor-pointer bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold text-lg md:text-2xl py-4 px-10 rounded-xl shadow-lg shadow-yellow-500/20 transition-transform hover:scale-105"
                 >
                    نعم، أريد تقوية ذاكرتي الآن
                 </ScrollLink>
                 <p className="mt-4 text-sm text-blue-300 opacity-80 flex items-center justify-center gap-2">
                    <ShieldCheck size={16} /> ضمان استرداد الأموال لمدة 7 أيام
                 </p>
            </div>
        </div>
    </section>
  );
};

interface AuthorityProps {
  imageUrl: string;
}
const Authority: React.FC<AuthorityProps> = ({ imageUrl }) => {
  return (
    <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-accent-yellow/10 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                    <img 
                        src={imageUrl} 
                        alt="Coach Ahmed with Trophy" 
                        className="rounded-3xl shadow-xl w-full object-cover border-4 border-white"
                        width="600"
                        height="400"
                        loading="lazy"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-primary-blue">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 font-bold uppercase">المدرب</p>
                                <p className="text-lg font-bold text-dark-blue">كوتش أحمد</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 space-y-6 text-right">
                    <h2 className="text-3xl font-bold text-dark-blue">من هو كوتش أحمد؟</h2>
                    <div className="w-20 h-1.5 bg-accent-yellow rounded-full"></div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        مدرب معتمد في مهارات الذاكرة والتعلم السريع، وبطل وطني سابق في الذاكرة. قضى أكثر من 12 عاماً في دراسة وتطبيق تقنيات الحفظ التي يستخدمها أبطال العالم.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        هدفي ليس مجرد تعليمك "حيل" للحفظ، بل إعادة برمجة طريقة تفكيرك وعمل عقلك لتتمكن من استيعاب كميات ضخمة من المعلومات واسترجاعها بدقة متناهية.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="block text-3xl font-bold text-primary-blue mb-1">+5000</span>
                            <span className="text-sm text-gray-600">متدرب حول العالم</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="block text-3xl font-bold text-primary-blue mb-1">100%</span>
                            <span className="text-sm text-gray-600">تقييمات إيجابية</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

const FilterSection: React.FC = () => {
    return (
        <section className="py-16 bg-light-gray">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-dark-blue">هل هذا البرنامج لك؟</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* NOT FOR */}
                    <div className="bg-white rounded-3xl shadow-sm border-2 border-red-100 p-8">
                        <div className="flex items-center gap-3 mb-6 border-b border-red-50 pb-4">
                            <XCircle className="text-red-500 w-8 h-8" />
                            <h3 className="text-xl font-bold text-gray-800">هذا البرنامج ليس لك إذا:</h3>
                        </div>
                        <ul className="space-y-4">
                            {['تبحث عن حل سحري بدون بذل مجهود 15 دقيقة يومياً.', 'تعتقد أن الذاكرة موهبة فطرية لا يمكن تطويرها.', 'غير مستعد للاستثمار في تطوير ذاتك ومستقبلك.'].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                    <X className="text-red-400 mt-1 shrink-0" size={18} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* IS FOR */}
                    <div className="bg-white rounded-3xl shadow-lg border-2 border-primary-blue p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 border-b border-blue-50 pb-4">
                                <CheckCircle className="text-green-500 w-8 h-8" />
                                <h3 className="text-xl font-bold text-dark-blue">أهلاً بك في البرنامج إذا:</h3>
                            </div>
                            <ul className="space-y-4">
                                {['تريد حفظ المعلومات والأسماء والأرقام من أول مرة.', 'تطمح للتفوق في دراستك أو عملك وتوفير ساعات من الجهد.', 'ترغب في بناء ثقة بالنفس والتخلص من إحراج النسيان.'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-800 font-medium">
                                        <div className="bg-green-100 rounded-full p-0.5 mt-0.5">
                                            <Check className="text-green-600" size={14} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Transformation: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            <div className="bg-white p-12 md:p-20 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-l border-gray-100">
                <CloudFog size={64} className="text-gray-400 mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-4">قبل البرنامج</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm">
                    تشتت ذهني، قلق دائم من نسيان المعلومات المهمة، استغراق ساعات طويلة في المذاكرة دون جدوى، وشعور بالإحباط من تراجع الأداء.
                </p>
            </div>
            <div className="bg-primary-blue p-12 md:p-20 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <Sun size={64} className="text-accent-yellow mb-6 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white mb-4">بعد البرنامج</h3>
                    <p className="text-blue-100 leading-relaxed max-w-sm">
                        ذاكرة حديدية، سرعة في الحفظ والاسترجاع، ثقة عالية بالنفس، وقدرة على إنجاز المهام الدراسية والمهنية في وقت قياسي.
                    </p>
                </div>
            </div>
        </section>
    )
}

const TransformationRoadmap: React.FC = () => {
    const steps = [
        { 
            week: 'الأسبوع 1', 
            title: 'الحضور المهني الفوري', 
            icon: UserCheck, 
            before: "القلق الجسدي قبل أي اجتماع مهم: 'هل سأنسى اسم العميل الرئيسي أو ذلك الرقم الحاسم؟' شعور داخلي بأنك تفقد حدتك المهنية.",
            after: "ستشعر بانتصاب قامتك وثقة تسري في جسدك عند دخول الاجتماعات. القدرة على استدعاء الأسماء والأرقام فوراً تمنحك حضوراً قيادياً يفرض الاحترام."
        },
        { 
            week: 'الأسبوع 2', 
            title: 'الهيكلة الذهنية واستعادة الوقت', 
            icon: BrainCircuit, 
            before: "الشعور بثقل في الرأس وغرق مستمر تحت طوفان المعلومات والتقارير. إرهاق يلاحقك حتى في وقت راحتك لأن عقلك لا يتوقف عن الدوران.",
            after: "ستشعر بهدوء داخلي عميق وصفاء ذهني. عقلك يصبح كأرشيف منظم، تصنف فيه أعقد الملفات المهنية وتغلقها، لتستعيد وقتك الخاص وطاقتك لعائلتك."
        },
        { 
            week: 'الأسبوع 3', 
            title: 'السرعة الإدراكية والطاقة الشبابية', 
            icon: TrendingUp, 
            before: "الشعور بأنك أبطأ في استيعاب المتغيرات الجديدة مقارنة بالمنافسين الأصغر سناً. خمول ذهني يجعلك تتجنب التحديات الفكرية المعقدة.",
            after: "ستشعر بطاقة ذهنية متجددة كأنك استعدت نشاطك قبل 10 سنوات. سرعة بديهة تجعلك الأسرع في تحليل المواقف واتخاذ القرارات الحاسمة بثقة."
        },
        { 
            week: 'الأسبوع 4', 
            title: 'السلطة التنفيذية والثقة المطلقة', 
            icon: ShieldCheck, 
            before: "التوتر الذي يسبق العروض التقديمية الكبرى، والاعتماد المهين على الملاحظات الورقية الذي يضعف صورتك كخبير أمام الإدارة العليا.",
            after: "ستشعر بقوة هادئة وسيطرة مطلقة. الوقوف أمام مجلس الإدارة أو العملاء بدون ورقة واحدة، وسرد الحقائق بدقة تجبر الجميع على الإنصات لك."
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-accent-yellow font-bold tracking-wider uppercase text-sm mb-2 block">المنهجية التنفيذية</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-dark-blue mb-6 leading-tight">
                        مسارك نحو <span className="text-primary-blue relative inline-block">
                            الهيمنة الذهنية
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-accent-yellow/30 -z-10"></span>
                        </span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        رحلة استعادة السيطرة وإعادة شحن طاقتك الذهنية في 4 أسابيع مركزة
                    </p>
                </div>

                {/* Desktop Connection Line */}
                <div className="hidden lg:block absolute top-[28rem] left-0 w-full h-1 bg-gray-100 -z-10"></div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col h-full group">
                            
                            {/* Marker on Line (Desktop) */}
                            <div className="hidden lg:flex absolute top-[11.5rem] left-1/2 transform -translate-x-1/2 justify-center items-center w-8 h-8 bg-white border-4 border-primary-blue rounded-full z-20 group-hover:border-accent-yellow transition-colors duration-300"></div>

                            {/* Card Header & Icon */}
                            <div className="text-center mb-8 relative">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-blue to-dark-blue text-white rounded-2xl shadow-lg mb-6 transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10">
                                    <step.icon size={36} className="text-accent-yellow" />
                                </div>
                                <div className="text-sm font-bold text-accent-yellow uppercase tracking-widest mb-2">{step.week}</div>
                                <h3 className="text-xl font-bold text-dark-blue px-2 leading-snug h-14 flex items-center justify-center">{step.title}</h3>
                            </div>

                            {/* Content Card */}
                            <div className="flex-grow bg-light-gray/50 rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4">
                                
                                {/* Pain Point (Before) */}
                                <div className="bg-white p-4 rounded-xl border-r-4 border-red-300 shadow-sm">
                                    <h4 className="text-xs font-bold text-red-400 uppercase mb-2 flex items-center gap-1">
                                        <XCircle size={12} /> قبل البرنامج
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {step.before}
                                    </p>
                                </div>

                                {/* Arrow Indicator */}
                                <div className="self-center text-gray-300">
                                    <ChevronDown size={20} />
                                </div>

                                {/* Power State (After) */}
                                <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl border-r-4 border-green-500 shadow-sm flex-grow">
                                    <h4 className="text-xs font-bold text-green-600 uppercase mb-2 flex items-center gap-1">
                                        <CheckCircle size={12} /> بعد البرنامج
                                    </h4>
                                    <p className="text-sm text-gray-800 font-bold leading-relaxed">
                                        {step.after}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

interface SocialProofProps {
    videoIds: string[];
    imageUrls: string[];
}
const SocialProof: React.FC<SocialProofProps> = ({ videoIds, imageUrls }) => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-dark-blue mb-4">قصص نجاح حقيقية</h2>
                    <p className="text-gray-600">لا تأخذ كلامنا مسلمات.. استمع لما يقوله مشتركونا</p>
                </div>

                {/* Video Testimonials - Horizontal Slider */}
                <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {videoIds.map((id, idx) => (
                        <div key={idx} className="w-[80vw] sm:w-[450px] flex-none snap-center">
                            <div className="bg-black rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative pt-[56.25%]">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <LiteYouTubeEmbed videoId={id} title={`Review ${idx}`} posterQuality="hqdefault" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Reviews Carousel/Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imageUrls.map((url, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <img 
                                src={url} 
                                alt={`Review Screenshot ${idx}`} 
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                                width="300"
                                height="200"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ValueStack: React.FC = () => {
    const items = [
        { icon: Video, title: "7 لقاءات مباشرة (Live)", value: "بقيمة 1400 DH" },
        { icon: Smartphone, title: "تطبيق ذاكرتي برو", value: "بقيمة 500 DH" },
        { icon: Users, title: "عضوية مجتمع النخبة", value: "بقيمة 300 DH" },
        { icon: Award, title: "شهادة إتمام معتمدة", value: "لا تقدر بثمن" },
    ];
    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-xl font-bold text-dark-blue mb-6 border-b border-gray-100 pb-4">ماذا يشمل العرض؟</h3>
            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 text-primary-blue p-2 rounded-lg group-hover:bg-primary-blue group-hover:text-white transition-colors">
                                <item.icon size={20} />
                            </div>
                            <span className="font-medium text-gray-700">{item.title}</span>
                        </div>
                        <span className="text-sm font-bold text-accent-yellow bg-yellow-50 px-2 py-1 rounded hidden sm:block">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Logistics: React.FC = () => {
    const faqs = [
        { q: "هل الدورة مسجلة أم مباشرة؟", a: "الدورة تجمع بين الاثنين. دروس مسجلة عالية الجودة، ولقاءات مباشرة أسبوعية للمتابعة." },
        { q: "ماذا لو فاتني لقاء مباشر؟", a: "جميع اللقاءات المباشرة تسجل وترفع على المنصة لتشاهدها في أي وقت." },
        { q: "هل أحتاج مهارات سابقة؟", a: "لا، نبدأ معك من الصفر." }
    ];
    return (
        <div className="mt-12 space-y-4 max-w-3xl mx-auto px-4">
            <h3 className="text-center font-bold text-dark-blue text-xl mb-6">أسئلة متكررة</h3>
            {faqs.map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-primary-blue mb-2">{f.q}</h4>
                    <p className="text-sm text-gray-600">{f.a}</p>
                </div>
            ))}
        </div>
    )
}

const Offer: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name === 'phone') {
            setValidationError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        // Phone Validation Logic
        const cleanPhone = formData.phone.replace(/\D/g, ''); // Remove non-digits
        if (cleanPhone.length > 10) {
            setValidationError("لقد أدخلت أرقاماً زائدة، يجب أن يكون الرقم 10 أرقام");
            return;
        }
        if (cleanPhone.length < 10) {
            setValidationError("رقم الهاتف غير مكتمل");
            return;
        }

        setStatus('submitting');

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
            const response = await fetch('https://n8n.srv1041616.hstgr.cloud/webhook/49d1c69a-4b76-4f54-a078-b1e0428a7072', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Form Data
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    form: 'dakiraty_landing',
                    
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
                setFormData({ name: '', email: '', phone: '' });
                
                if (window.fbq) {
                    window.fbq('track', 'Lead', { // Changed to Lead
                        content_name: 'Dakiraty Program',
                        value: 600,
                        currency: 'MAD'
                    }, { eventID: eventId });
                }
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="offer-section" className="py-20 bg-dark-blue text-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            استثمر في عقلك اليوم <br/> 
                            <span className="text-accent-yellow">واحصد النتائج مدى الحياة</span>
                        </h2>
                        <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                            انضم الآن واحصل على خصم خاص 33% لفترة محدودة. العرض يشمل جميع المزايا والهدايا المجانية وضمان استرداد كامل.
                        </p>
                        <ValueStack />
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                             <ShieldCheck className="text-green-400" />
                             <span>بياناتك آمنة 100% ومشفرة</span>
                        </div>
                    </div>
                    
                    {/* Registration Form Card */}
                    <div className="bg-white text-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-accent-yellow">
                         <div className="text-center mb-6">
                             <p className="text-gray-500 font-medium">السعر العادي: <span className="line-through">1200 DH</span></p>
                             <div className="text-5xl font-extrabold text-primary-blue mb-2">600 DH</div>
                             <p className="text-green-600 font-bold bg-green-50 inline-block px-3 py-1 rounded-full text-sm">وفر 600 DH اليوم</p>
                         </div>

                         {status === 'success' ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                    <CheckCircle className="text-green-600" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-dark-blue mb-2">تم تسجيل طلبك بنجاح!</h3>
                                <p className="text-gray-600 mb-6">شكراً لك، سيتواصل معك فريق العمل قريباً لإتمام إجراءات التسجيل.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="text-primary-blue font-bold underline hover:text-blue-700"
                                >
                                    تسجيل شخص آخر
                                </button>
                            </div>
                         ) : (
                             <form className="space-y-4" onSubmit={handleSubmit}>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                                     <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-100 text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue outline-none transition-all placeholder-gray-500" 
                                        placeholder="أدخل اسمك الثلاثي" 
                                    />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                                     <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-100 text-black border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue outline-none transition-all placeholder-gray-500" 
                                        placeholder="name@example.com" 
                                    />
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف (واتساب)</label>
                                     <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className={`w-full bg-gray-100 text-black border ${validationError ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-blue outline-none transition-all placeholder-gray-500`}
                                        dir="ltr" 
                                        placeholder="0632730020" 
                                    />
                                    {validationError && (
                                        <p className="text-red-500 text-xs mt-1 text-right font-bold">{validationError}</p>
                                    )}
                                 </div>
                                 
                                 {status === 'error' && (
                                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">
                                        عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.
                                    </div>
                                 )}

                                 <button 
                                    type="submit" 
                                    disabled={status === 'submitting'}
                                    className="w-full bg-accent-yellow hover:bg-yellow-400 text-dark-blue font-bold text-xl py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                     {status === 'submitting' ? (
                                        <span>جاري الإرسال...</span>
                                     ) : (
                                        <>
                                            <span>احجز مقعدي الآن</span>
                                            <ArrowLeft size={20} />
                                        </>
                                     )}
                                 </button>
                             </form>
                         )}
                         
                         {status !== 'success' && (
                             <div className="mt-6 text-center space-y-2">
                                 <p className="text-xs text-gray-500">بالضغط على الزر أعلاه، أنت توافق على الشروط والأحكام</p>
                                 <div className="flex justify-center gap-2 opacity-50">
                                     {/* Fake Payment Icons */}
                                     <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                     <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                     <div className="w-8 h-5 bg-gray-300 rounded"></div>
                                 </div>
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </section>
    )
}

const StickyCTA: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] md:hidden z-50">
             <ScrollLink 
                to="offer-section"
                smooth={true}
                duration={800}
                className="block w-full bg-primary-blue text-white text-center font-bold py-3 rounded-lg shadow-md active:bg-blue-800"
            >
                سجل الآن - 600 DH
            </ScrollLink>
        </div>
    )
}

// --- Main Assembly Component ---

const DakiratyLanding: React.FC = () => {
  useEffect(() => {
    // 1. Dynamic Preload for LCP Image
    // Even though index.html has a preload, this ensures if the component is loaded later 
    // or if the browser prioritized other things, this specific asset is boosted.
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = contentData.heroCustomThumbnail;
    // @ts-ignore
    link.fetchPriority = 'high';
    document.head.appendChild(link);

    // 2. Inject Meta Pixel
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
      
      window.fbq('init', PIXEL_ID);
      window.fbq('track', 'PageView');
    }

    return () => {
        // Cleanup preload link on unmount if needed, though usually harmless to leave
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans" dir="rtl">
      
      {/* 1. Hero with VSL */}
      <Hero videoId={contentData.heroVideoId} />
      
      {/* 2. Authority Section */}
      <Authority imageUrl={contentData.authorityImage} />
      
      {/* 3. Filter (Who is this for?) */}
      <FilterSection />
      
      {/* 4. Transformation (Before/After) */}
      <Transformation />
      
      {/* 5. Curriculum (Timeline - Replaced with Roadmap) */}
      <TransformationRoadmap />
      
      {/* 6. Social Proof (Testimonials) */}
      <SocialProof 
        videoIds={contentData.proofVideoIds} 
        imageUrls={contentData.proofImageUrls} 
      />
      
      {/* 7. Logistics (FAQ) */}
      <section className="bg-gray-50 py-16">
         <Logistics />
      </section>

      {/* 8. Offer & Footer (Closing) */}
      <Offer />
      
      {/* 9. Mobile Sticky CTA */}
      <StickyCTA />
      
    </div>
  );
};

export default DakiratyLanding;