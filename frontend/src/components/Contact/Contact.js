import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_be3ds85';
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_contact_form'; // You'll need to create this template
const EMAILJS_PUBLIC_KEY = 'DiIq_Jyufw19_CGfy';

const EASING = [0.2, 0.8, 0.2, 1];

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASING } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const formStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASING } },
};

function Contact() {
  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName?.trim() || formData.fullName.trim().length < 2)
      newErrors.fullName = 'Name required (min 2 characters)';
    if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Valid email required';
    if (!formData.message?.trim() || formData.message.trim().length < 10)
      newErrors.message = 'Message required (min 10 characters)';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    // Prepare email template data
    const templateParams = {
      to_email: 'awscloudclub.mku@gmail.com',
      from_name: formData.fullName,
      from_email: formData.email,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
      submission_date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_CONTACT,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          className="contact-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="contact-label" variants={slideUp}>
            Communication Layer
          </motion.span>
          <motion.h2 className="contact-heading" variants={slideUp}>
            Send us a message.
          </motion.h2>
          <motion.p className="contact-description" variants={slideUp}>
            Have questions, ideas, or want to collaborate? Drop us a message and we'll get back to you.
          </motion.p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-form-container"
            variants={formStagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.form className="contact-form" onSubmit={handleSubmit} variants={formStagger}>
              <motion.div className="contact-form-row" variants={formItem}>
                <div className="contact-form-group">
                  <label htmlFor="fullName">
                    Full Name <span className="contact-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                  {errors.fullName && <span className="contact-error">{errors.fullName}</span>}
                </div>

                <div className="contact-form-group">
                  <label htmlFor="email">
                    Email <span className="contact-required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                  {errors.email && <span className="contact-error">{errors.email}</span>}
                </div>
              </motion.div>

              <motion.div className="contact-form-group" variants={formItem}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about? (optional)"
                  disabled={loading}
                />
              </motion.div>

              <motion.div className="contact-form-group" variants={formItem}>
                <label htmlFor="message">
                  Message <span className="contact-required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  disabled={loading}
                />
                {errors.message && <span className="contact-error">{errors.message}</span>}
              </motion.div>

              <motion.button
                type="submit"
                className="contact-submit"
                disabled={loading}
                variants={formItem}
              >
                {loading ? (
                  <>
                    <span className="contact-spinner" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="contact-message contact-message-success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully. We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="contact-message contact-message-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </motion.form>
          </motion.div>

          <motion.div
            className="contact-info"
            variants={formStagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div className="contact-info-card" variants={formItem}>
              <div className="contact-info-label">Email</div>
              <a href="mailto:awscloudclub.mku@gmail.com" className="contact-info-value">
                awscloudclub.mku@gmail.com
              </a>
            </motion.div>

            <motion.div className="contact-info-card" variants={formItem}>
              <div className="contact-info-label">Location</div>
              <div className="contact-info-value">
                Mount Kenya University
                <br />
                Thika, Kenya
              </div>
            </motion.div>

            <motion.div className="contact-info-card" variants={formItem}>
              <div className="contact-info-label">Social</div>
              <div className="contact-info-links">
                <a
                  href="https://x.com/AWSMku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-link"
                >
                  Twitter/X (@AWSMku)
                </a>
                <a
                  href="https://www.linkedin.com/company/aws-cloud-club-mku/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-link"
                >
                  LinkedIn (aws-cloud-club-mku)
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
