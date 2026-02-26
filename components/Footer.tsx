import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const prefetchRoute = (path: string) => {
  if (path === '/') import('../pages/Home');
  if (path === '/dakiraty') import('../pages/DakiratyLanding');
  if (path === '/quran') import('../pages/ProgramDetails');
  if (path === '/blog') import('../pages/Blog');
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-blue text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center text-white">
                <GraduationCap size={24} />
              </div>
              <span className="font-bold text-2xl">أحمد</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              نساعدك على اكتشاف قدراتك العقلية وتطوير مهارات الحفظ والتركيز من خلال برامج تدريبية احترافية مبنية على أسس علمية.
            </p>
            <div className="flex space-x-4 space-x-reverse pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Facebook size={18} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-blue hover:text-white transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">روابط هامة</h3>
            <ul className="space-y-4">
              <li><Link to="/" onMouseEnter={() => prefetchRoute('/')} className="text-gray-400 hover:text-accent-yellow transition-colors block">من نحن</Link></li>
              <li><Link to="/dakiraty" onMouseEnter={() => prefetchRoute('/dakiraty')} className="text-gray-400 hover:text-accent-yellow transition-colors block">برنامج ذاكرتي</Link></li>
              <li><Link to="/quran" onMouseEnter={() => prefetchRoute('/quran')} className="text-gray-400 hover:text-accent-yellow transition-colors block">برنامج القرآن</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-yellow transition-colors block">سياسة الخصوصية</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">اتصل بنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-primary-blue" />
                <span dir="ltr">+212 633 698 758</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-primary-blue" />
                <span>info@coachahmed.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-primary-blue mt-1" />
                <span>المغرب</span>
              </li>
            </ul>
          </div>
          
           {/* Newsletter */}
           <div>
            <h3 className="text-lg font-bold mb-6 text-white">النشرة البريدية</h3>
            <p className="text-gray-400 text-sm mb-4">اشترك للحصول على نصائح أسبوعية لتقوية الذاكرة.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="بريدك الإلكتروني" 
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                />
                <button className="bg-primary-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                    اشترك الآن
                </button>
            </form>
           </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} كوتش أحمد. جميع الحقوق محفوظة.
          </p>
          <div className="text-gray-600 text-xs flex gap-4">
             <a href="#" className="hover:text-gray-400">الشروط والأحكام</a>
             <a href="#" className="hover:text-gray-400">سياسة الاسترجاع</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;