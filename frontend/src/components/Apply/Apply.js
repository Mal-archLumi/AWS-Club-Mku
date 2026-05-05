import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import roles from '../../data/roles';
import './Apply.css';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_be3ds85';
const EMAILJS_TEMPLATE_ID = 'template_u7gtp0f';
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

function Apply() {
  const [inView, setInView] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
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

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setFormData({});
    setErrors({});
    setSubmitStatus(null);
  };

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
      newErrors.fullName = 'Full name required (min 2 characters)';
    if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Valid email required';
    if (!formData.regNumber?.trim() || formData.regNumber.trim().length < 3)
      newErrors.regNumber = 'Registration number required';
    if (!formData.yearOfStudy)
      newErrors.yearOfStudy = 'Year of study required';
    if (!formData.experience?.trim() || formData.experience.trim().length < 20)
      newErrors.experience = 'Experience required (min 20 characters)';
    if (!formData.motivation?.trim() || formData.motivation.trim().length < 20)
      newErrors.motivation = 'Motivation required (min 20 characters)';
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

    const role = roles.find((r) => r.id === selectedRole);
    
    // Prepare email template data
    const templateParams = {
      to_email: 'awscloudclub.mku@gmail.com',
      from_name: formData.fullName,
      from_email: formData.email,
      role: role.title,
      registration_number: formData.regNumber,
      year_of_study: formData.yearOfStudy,
      experience: formData.experience,
      motivation: formData.motivation,
      linkedin: formData.linkedin || 'Not provided',
      github: formData.github || 'Not provided',
      submission_date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({});
      
      // Reset to role selection after 3 seconds
      setTimeout(() => {
        setSelectedRole(null);
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="apply" id="apply" ref={ref}>
      <div className="apply-container">
        <motion.div
          className="apply-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="apply-label" variants={slideUp}>
            Entry Layer
          </motion.span>
          <motion.h2 className="apply-heading" variants={slideUp}>
            Join the System
          </motion.h2>
          <motion.p className="apply-description" variants={slideUp}>
            Operate execution cycles, lead builds, and ship real software. Join as a system operator or active builder.
          </motion.p>
        </motion.div>

        <motion.div
          className="apply-status"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.4, duration: 0.4, ease: EASING }}
        >
          <span className="apply-status-indicator" />
          <span className="apply-status-text">
            Applications currently <strong>OPEN</strong>
          </span>
        </motion.div>

        {!selectedRole ? (
          <motion.div
            className="apply-roles"
            key="roles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASING }}
          >
            {roles.map((role) => (
              <motion.button
                key={role.id}
                className="apply-role-card"
                onClick={() => handleRoleSelect(role.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * roles.indexOf(role), ease: EASING }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: EASING } }}
              >
                <div className="apply-role-header">
                  <h3 className="apply-role-title">{role.title}</h3>
                  <span className="apply-role-badge">{role.badge}</span>
                </div>
                <p className="apply-role-description">{role.description}</p>
                <div className="apply-role-requirements">
                  <span className="apply-role-requirements-label">Requirements</span>
                  <ul>
                    {role.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <span className="apply-role-action">Apply for this role →</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="apply-form-container"
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASING }}
          >
            <div className="apply-form-header">
              <button
                className="apply-back-button"
                onClick={() => {
                  setSelectedRole(null);
                  setFormData({});
                  setErrors({});
                  setSubmitStatus(null);
                }}
              >
                ← Back to roles
              </button>
              <h3 className="apply-form-title">
                {roles.find((r) => r.id === selectedRole)?.title}
              </h3>
            </div>

            <form className="apply-form" onSubmit={handleSubmit}>
              <motion.div 
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: EASING }}
              >
                <label htmlFor="fullName">
                  Full Name <span className="apply-required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <span className="apply-error">{errors.fullName}</span>}
              </motion.div>

              <motion.div 
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: EASING }}
              >
                <label htmlFor="email">
                  Email <span className="apply-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="apply-error">{errors.email}</span>}
              </motion.div>

              <motion.div 
                className="apply-form-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: EASING }}
              >
                <div className="apply-form-group">
                  <label htmlFor="regNumber">
                    Registration Number <span className="apply-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="regNumber"
                    name="regNumber"
                    value={formData.regNumber || ''}
                    onChange={handleChange}
                    placeholder="e.g., BIT/2026/001"
                  />
                  {errors.regNumber && <span className="apply-error">{errors.regNumber}</span>}
                </div>

                <div className="apply-form-group">
                  <label htmlFor="yearOfStudy">
                    Year of Study <span className="apply-required">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy || ''}
                    onChange={handleChange}
                  >
                    <option value="">Select year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                  {errors.yearOfStudy && <span className="apply-error">{errors.yearOfStudy}</span>}
                </div>
              </motion.div>

              <motion.div 
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3, ease: EASING }}
              >
                <label htmlFor="experience">
                  Relevant Experience <span className="apply-required">*</span>
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows="4"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  placeholder="Describe your relevant experience, skills, and technical background..."
                />
                {errors.experience && <span className="apply-error">{errors.experience}</span>}
              </motion.div>

              <motion.div 
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3, ease: EASING }}
              >
                <label htmlFor="motivation">
                  Why This Role? <span className="apply-required">*</span>
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows="4"
                  value={formData.motivation || ''}
                  onChange={handleChange}
                  placeholder="Explain why you're interested in this role and what you aim to contribute..."
                />
                {errors.motivation && <span className="apply-error">{errors.motivation}</span>}
              </motion.div>

              <motion.div 
                className="apply-form-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3, ease: EASING }}
              >
                <div className="apply-form-group">
                  <label htmlFor="linkedin">LinkedIn (Optional)</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="apply-form-group">
                  <label htmlFor="github">GitHub (Optional)</label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github || ''}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                className="apply-submit"
                disabled={loading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3, ease: EASING }}
              >
                {loading ? (
                  <>
                    <span className="apply-spinner" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  className="apply-message apply-message-success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Application submitted successfully. We'll review it shortly.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="apply-message apply-message-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Submission failed. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Apply;
