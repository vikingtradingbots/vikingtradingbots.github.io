import { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface StartFreeModalProps {
  onClose: () => void;
}

const experienceOptions = [
  'Beginner (less than 1 year)',
  'Intermediate (1 to 3 years)',
  'Advanced (more than 3 years)',
];

const StartFreeModal = ({ onClose }: StartFreeModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    broker: '',
    mt5Account: '',
    experience: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.whatsapp.trim() || !form.country.trim() || !form.broker.trim() || !form.mt5Account.trim() || !form.experience) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const mt5Number = parseInt(form.mt5Account.trim(), 10);
    if (isNaN(mt5Number)) {
      setError('MT5 Account Number must be a valid number.');
      return;
    }

    setLoading(true);

    try {
      if (!supabase) {
        setError('Backend not configured. Please try again later.');
        setLoading(false);
        return;
      }
      const { error: dbError } = await supabase.from('clients').insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        country: form.country.trim(),
        broker: form.broker.trim(),
        mt5_account: mt5Number,
        notes: [
          `WhatsApp: ${form.whatsapp.trim()}`,
          `Experience: ${form.experience}`,
          form.message.trim() ? `Message: ${form.message.trim()}` : '',
        ].filter(Boolean).join('\n'),
      });

      if (dbError) {
        if (dbError.message?.includes('mt5_account') || dbError.code === '23505') {
          if (dbError.message?.includes('email')) {
            setError('This email is already registered.');
          } else {
            setError('This account is already registered.');
          }
        } else {
          setError('Something went wrong. Please try again.');
        }
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="bg-[#0f1340] border border-foreground/10 rounded-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="font-montserrat text-xl font-bold text-foreground">Request Free Demo</h2>
            <p className="text-muted text-sm mt-1">Fill in the form and we'll reach out within 24 hours</p>
          </div>
          <button
            onClick={onClose}
            className="bg-foreground/10 hover:bg-foreground/20 rounded-full p-1.5 transition-colors flex-shrink-0"
          >
            <X size={16} className="text-foreground" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle size={48} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
            <h3 className="font-montserrat text-xl font-bold text-foreground mb-2">Request Sent!</h3>
            <p className="text-muted text-sm mb-2">We will contact you via WhatsApp within 24 hours</p>
            <p className="text-muted/60 text-xs">Please also check your email inbox</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                maxLength={100}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                maxLength={255}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">WhatsApp *</label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                maxLength={30}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">Country *</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => handleChange('country', e.target.value)}
                maxLength={100}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="United States"
              />
            </div>

            {/* Broker */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">Broker *</label>
              <input
                type="text"
                value={form.broker}
                onChange={(e) => handleChange('broker', e.target.value)}
                maxLength={100}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="Ex: FXGlobe, XM, IC Markets"
              />
            </div>

            {/* MT5 Account */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">MT5 Account Number *</label>
              <input
                type="text"
                value={form.mt5Account}
                onChange={(e) => handleChange('mt5Account', e.target.value.replace(/\D/g, ''))}
                maxLength={20}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="123456789"
              />
            </div>

            {/* Trading Experience */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">Trading Experience *</label>
              <select
                value={form.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="" disabled>Select your experience level</option>
                {experienceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-foreground text-xs font-montserrat font-bold mb-1 block">Message <span className="text-muted font-normal">(optional)</span></label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                maxLength={1000}
                rows={3}
                className="w-full bg-background border border-foreground/10 rounded-lg py-3 px-4 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Any additional details..."
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-destructive text-xs font-montserrat">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg font-montserrat font-bold text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70
                shadow-[0_4px_0_0_hsl(74,100%,33%)] hover:shadow-[0_3px_0_0_hsl(74,100%,33%)] hover:translate-y-[1px] active:translate-y-[3px] active:shadow-[0_1px_0_0_hsl(74,100%,33%)]"
              style={{ backgroundColor: '#a8ff3e', color: '#0f1340' }}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Submitting...' : 'Request Free Demo'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StartFreeModal;
