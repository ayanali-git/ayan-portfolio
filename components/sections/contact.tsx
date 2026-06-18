"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'pathanayan8347@gmail.com',
    href: 'mailto:pathanayan8347@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9313917598',
    href: 'tel:+919313917598', // ✅ Changed to tel: for direct calling
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sindhiwad, Lal tower, Rajpipla, Gujarat, 393145',
    href: 'https://www.google.com/maps/search/?api=1&query=Rajpipla,+Gujarat', // ✅ Fixed link
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/ayan-x1',
    color: 'hover:text-gray-900 dark:hover:text-gray-100'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pathan-ayan',
    color: 'hover:text-blue-600'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://x.com/ayanali8347',
    color: 'hover:text-blue-400'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      emailjs.init("vbxLMo71V4JfYn_UC");
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Ayan Ali',
      };

      await emailjs.send(
        'service_l6ntj1a',
        'template_uy73vna',
        templateParams
      );

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"> {/* ✅ Adjusted text size */}
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </motion.div>

        {/* ✅ Default to grid-cols-1, lg:grid-cols-3 for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm currently open to new opportunities and would love to hear about your project. 
                Let's discuss how we can work together to bring your ideas to life.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Location' ? '_blank' : undefined}
                  rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="block group"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700">
                          <info.icon className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {info.label}
                          </p>
                          <p className="text-sm text-muted-foreground break-all"> {/* ✅ Added break-all for long text */}
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full bg-muted transition-colors duration-200 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ✅ Default to grid-cols-1, md:grid-cols-2 for larger screens */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="johndoe@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What's this about?"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell me about your project or just say hello..."
                      rows={6}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center gap-2 px-8 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Start a Project?</h3> {/* ✅ Adjusted text size */}
              <p className="text-muted-foreground mb-6">
                I'm available for freelance work and full-time opportunities. 
                Let's discuss your next big idea!
              </p>
              {/* ✅ Changed to flex-col on small screens */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href="mailto:pathanayan8347@gmail.com">
                    <Mail className="w-5 h-5" />
                    Email Me
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href="tel:+919313917598">
                    <Phone className="w-5 h-5" />
                    Call Me
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}