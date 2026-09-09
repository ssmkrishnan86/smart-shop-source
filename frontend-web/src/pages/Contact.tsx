import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../hooks/useToast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '../constants';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been sent to customer support!', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <SEO title="Contact Customer Support" />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold text-foreground">Get in Touch</h1>
          <p className="text-sm text-muted-foreground">Have questions about an order or merchant inquiry? Contact our 24/7 dedicated support team.</p>

          <div className="space-y-3 pt-4 text-xs font-semibold">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>{SUPPORT_EMAIL}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>{SUPPORT_PHONE}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>100 Technology Plaza, Enterprise Suite 500, Seattle WA 98101</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-border bg-card space-y-4 shadow-sm">
          <h3 className="font-bold text-base">Send Us a Message</h3>
          <Input label="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm"
              required
            />
          </div>
          <Button type="submit" size="md" className="w-full" leftIcon={<Send className="w-4 h-4" />}>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};
