import { useState } from 'react';
import { Send, MessageSquareWarning } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from '@/components/ui/scroll-reveal';

const ComplaintsSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [complaint, setComplaint] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim() || !complaint.trim()) {
      toast({
        title: "برجاء ملء جميع الحقول",
        description: "الاسم ورقم الهاتف والشكوى مطلوبين",
        variant: "destructive"
      });
      return;
    }

    const message = `🔴 شكوى جديدة

👤 الاسم: ${name.trim()}
📱 رقم الهاتف: ${phone.trim()}

📝 الشكوى:
${complaint.trim()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201014868268?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setName('');
    setPhone('');
    setComplaint('');
    
    toast({
      title: "جاري فتح واتساب",
      description: "سيتم تحويلك لإرسال الشكوى"
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">الشكاوى</span> والمقترحات
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              رأيك يهمنا! لو عندك أي شكوى أو مقترح، ابعتلنا وهنرد عليك في أسرع وقت
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.2}>
          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-6">
                <MessageSquareWarning className="w-6 h-6 text-destructive" />
                <h3 className="text-xl font-bold">أرسل شكواك</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="اسمك"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50"
                    maxLength={50}
                  />
                  <Input
                    placeholder="رقم الهاتف"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background/50"
                    maxLength={15}
                    type="tel"
                  />
                </div>
                <Textarea
                  placeholder="اكتب شكواك أو مقترحك هنا..."
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  className="bg-background/50 min-h-[120px]"
                  maxLength={500}
                />
                <Button type="submit" variant="destructive" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  إرسال عبر واتساب
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ComplaintsSection;
