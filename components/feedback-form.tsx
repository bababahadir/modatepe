'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Loader2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface FeedbackFormProps {
  locale: Locale;
  translations: any;
}

export function FeedbackForm({ locale, translations }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
    privacy: false
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      setMessage(translations.contact.forms.privacy.required);
      return;
    }

    if (!formData.category) {
      setMessage("Lütfen kategori seçiniz.");
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setMessage(translations.contact.forms.feedback.success);
        setFormData({ name: '', email: '', phone: '', category: '', message: '', privacy: false });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || translations.contact.forms.feedback.error);
      }
    } catch (error) {
      setMessage(translations.contact.forms.feedback.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-orange-600 text-white rounded-t-2xl">
        <CardTitle className="text-xl text-center">
          {translations.contact.forms.feedback.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="feedback-name">{translations.contact.forms.contact.name} *</Label>
            <Input
              id="feedback-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={translations.contact.forms.contact.name}
              required
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-email">{translations.contact.forms.contact.email} *</Label>
            <Input
              id="feedback-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={translations.contact.forms.contact.email}
              required
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-phone">{translations.contact.forms.contact.phone} *</Label>
            <Input
              id="feedback-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder={translations.contact.forms.contact.phone}
              required
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-category">{translations.contact.forms.feedback.category} *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="border-gray-300 focus:border-orange-500 focus:ring-orange-500">
                <SelectValue placeholder={translations.contact.forms.feedback.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complaint">{translations.contact.forms.feedback.complaint}</SelectItem>
                <SelectItem value="suggestion">{translations.contact.forms.feedback.suggestion}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-message">{translations.contact.forms.contact.message} *</Label>
            <Textarea
              id="feedback-message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder={translations.contact.forms.contact.message}
              required
              rows={4}
              className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="feedback-privacy"
              checked={formData.privacy}
              onCheckedChange={(checked) => handleInputChange('privacy', !!checked)}
              required
            />
            <Label 
              htmlFor="feedback-privacy" 
              className="text-sm text-gray-600 leading-relaxed cursor-pointer"
            >
              {translations.contact.forms.privacy.text}
            </Label>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('başarıyla') || message.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {translations.common.loading}
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                {translations.contact.forms.feedback.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}