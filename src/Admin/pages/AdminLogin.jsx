import React,{useState} from 'react';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../api/Auth';

const AdminLogin = () => {
  const navigate = useNavigate()
  const { setAccessToken, setUser } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('')
  const [isPending, setIspending] = useState(false)
  const { password, email } = formData;

  const handleForm = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIspending(true)
    try {
        const { accessToken, user } = await loginUser(formData);
        if (user.role !== 'admin') {
           setError('You do not have admin access.');
            return;
        }
        setAccessToken(accessToken);
        setUser(user);
           navigate('/admin'); 
    } catch (err) {
        setError(err.message);
    }finally{
      setIspending(false)
    }
};

  return (
    <div className="min-h-screen bg-[#0a1128] flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#034078]/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#001f54]/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-[#001f54]/40 backdrop-blur-md border border-[#034078]/40 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          {logo && (
            <img
              src={logo}
              alt="The Style Parlor"
              className="h-12 w-auto mx-auto mb-4 object-contain" 
            />
          )}
          <h1 className="font-serif text-2xl font-bold tracking-wider text-white">
            The Style Parlor
          </h1>
          <span className="text-[#034078] font-sans font-medium text-xs uppercase tracking-widest mt-1 block">
            Admin Portal Access
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-slate-400" size={18} />
              <input
              name='email'
              value={email}
              onChange={handleForm}
                type="email"
                placeholder="admin@thestyleparlor.com"
                className="w-full bg-[#0a1128]/80 text-white placeholder-slate-500 text-sm rounded-xl pl-11 pr-4 py-3.5 border border-[#034078]/40 focus:outline-none focus:border-[#034078] focus:ring-1 focus:ring-[#034078] transition-all"
              />
            </div>
          </div>

         
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <a href="#" className="text-xs text-[#034078] hover:text-sky-400 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-slate-400" size={18} />
              <input
              name='password'
              value={password}
              onChange={handleForm}
                type="password"
                placeholder="123"
                className="w-full bg-[#0a1128]/80 text-white placeholder-slate-500 text-sm rounded-xl pl-11 pr-11 py-3.5 border border-[#034078]/40 focus:outline-none focus:border-[#034078] focus:ring-1 focus:ring-[#034078] transition-all"
              />
              <span className="absolute right-4 text-slate-400">
                <Eye size={18} />
              </span>
            </div>
          </div>

          <button
          disabled={isPending}
            type="submit"
            className="w-full mt-2 bg-[#034078] hover:bg-[#034078]/80
             text-white font-medium py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg group"
          >
            {isPending? 'logining in' : 'login  to Admin Portal'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>


        <div className="mt-8 text-center text-xs text-slate-500">
          Protected area. Unauthorized access attempts are monitored and logged.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
