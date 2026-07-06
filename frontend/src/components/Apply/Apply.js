import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import roles from '../../data/roles';
import './Apply.css';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_be3ds85';
const EMAILJS_TEMPLATE_ID = 'template_u7gtp0f';
const EMAILJS_PUBLIC_KEY = '_eGe3_Hw7hzf2QmG_';

const EASING = [0.2, 0.8, 0.2, 1];

const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
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
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName?.trim() || formData.fullName.trim().length < 2)
      newErrors.fullName = 'Full name required (min 2 characters)';

    if (
      !formData.email?.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = 'Valid email required';

    if (!formData.regNumber?.trim() || formData.regNumber.trim().length < 3)
      newErrors.regNumber = 'Registration number required';

    if (!formData.yearOfStudy)
      newErrors.yearOfStudy = 'Year of study required';

    if (
      !formData.experience?.trim() ||
      formData.experience.trim().length < 20
    )
      newErrors.experience =
        'Experience required (min 20 characters)';

    if (
      !formData.motivation?.trim() ||
      formData.motivation.trim().length < 20
    )
      newErrors.motivation =
        'Motivation required (min 20 characters)';

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

      setTimeout(() => {
        setSelectedRole(null);
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      console.error(error);
      setSubmitStatus('error');

    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="apply"
      id="apply"
      ref={ref}
    >
      <div className="apply-container">

        <motion.div
          className="apply-header"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span
            className="apply-label"
            variants={slideUp}
          >
            Leadership Applications
          </motion.span>

          <motion.h2
            className="apply-heading"
            variants={slideUp}
          >
            Join the Leadership Team
          </motion.h2>

          <motion.p
            className="apply-description"
            variants={slideUp}
          >
            We're looking for passionate students to help lead the AWS Student
            Builder Community MKU. Leadership roles are how we organise events,
            run workshops, grow our membership, and keep the community thriving.
          </motion.p>
        </motion.div>

        <motion.div
          className="apply-status"
          initial={{ opacity: 0, y: 12 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{
            delay: 0.4,
            duration: 0.4,
            ease: EASING,
          }}
        >
          <span className="apply-status-indicator" />

          <span className="apply-status-text">
            Leadership applications are currently <strong>OPEN</strong>
          </span>
        </motion.div>

        {!selectedRole ? (
          <>
            <motion.div
              className="apply-roles"
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASING }}
            >
              <motion.button
                className="apply-role-card"
                whileHover={{ y: -4 }}
                onClick={() =>
                  window.open(
                    'https://www.meetup.com/aws-sbg-at-mount-kenya-university',
                    '_blank'
                  )
                }
              >
                <div className="apply-role-header">
                  <h3 className="apply-role-title">
                    Join as a Student Builder
                  </h3>

                  <span className="apply-role-badge">
                    Everyone
                  </span>
                </div>

                <p className="apply-role-description">
                  New to AWS? Already building projects? Join our Meetup
                  community to attend workshops, participate in events,
                  collaborate with other students and stay updated on
                  everything happening in the club.
                </p>

                <div className="apply-role-requirements">
                  <span className="apply-role-requirements-label">
                    What You'll Get
                  </span>

                  <ul>
                    <li>Free AWS workshops and events</li>
                    <li>Hands-on cloud projects</li>
                    <li>Networking with fellow builders</li>
                    <li>Certification guidance and learning resources</li>
                  </ul>
                </div>

                <span className="apply-role-action">
                  Join on Meetup →
                </span>
              </motion.button>
            </motion.div>

            <h3
              style={{
                color: "#fff",
                margin: "2.5rem 0 1rem",
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              Apply for a Leadership Role
            </h3>

            <motion.div
              className="apply-roles"
              key="roles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15,
                ease: EASING,
              }}
            >
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  className="apply-role-card"
                  onClick={() => handleRoleSelect(role.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: roles.indexOf(role) * 0.1,
                    ease: EASING,
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="apply-role-header">
                    <h3 className="apply-role-title">
                      {role.title}
                    </h3>

                    <span className="apply-role-badge">
                      {role.badge}
                    </span>
                  </div>

                  <p className="apply-role-description">
                    {role.description}
                  </p>

                  <div className="apply-role-requirements">
                    <span className="apply-role-requirements-label">
                      Requirements
                    </span>

                    <ul>
                      {role.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <span className="apply-role-action">
                    Apply for this role →
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </>
        ) : (          <motion.div
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
                ← Back
              </button>

              <h3 className="apply-form-title">
                {roles.find((r) => r.id === selectedRole)?.title}
              </h3>
            </div>

            <form
              className="apply-form"
              onSubmit={handleSubmit}
            >
              <motion.div
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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

                {errors.fullName && (
                  <span className="apply-error">
                    {errors.fullName}
                  </span>
                )}
              </motion.div>

              <motion.div
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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

                {errors.email && (
                  <span className="apply-error">
                    {errors.email}
                  </span>
                )}
              </motion.div>

              <motion.div
                className="apply-form-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="apply-form-group">
                  <label htmlFor="regNumber">
                    Registration Number
                    <span className="apply-required">*</span>
                  </label>

                  <input
                    type="text"
                    id="regNumber"
                    name="regNumber"
                    value={formData.regNumber || ''}
                    onChange={handleChange}
                    placeholder="BIT/2026/001"
                  />

                  {errors.regNumber && (
                    <span className="apply-error">
                      {errors.regNumber}
                    </span>
                  )}
                </div>

                <div className="apply-form-group">
                  <label htmlFor="yearOfStudy">
                    Year of Study
                    <span className="apply-required">*</span>
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
                    <option value="5+">Year 5+</option>
                  </select>

                  {errors.yearOfStudy && (
                    <span className="apply-error">
                      {errors.yearOfStudy}
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label htmlFor="experience">
                  Relevant Experience
                  <span className="apply-required">*</span>
                </label>

                <textarea
                  id="experience"
                  name="experience"
                  rows="4"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  placeholder="Tell us about your technical experience, leadership experience, projects or community involvement."
                />

                {errors.experience && (
                  <span className="apply-error">
                    {errors.experience}
                  </span>
                )}
              </motion.div>

              <motion.div
                className="apply-form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label htmlFor="motivation">
                  Why are you interested in this role?
                  <span className="apply-required">*</span>
                </label>

                <textarea
                  id="motivation"
                  name="motivation"
                  rows="4"
                  value={formData.motivation || ''}
                  onChange={handleChange}
                  placeholder="Tell us why you'd like to join the leadership team and how you'd contribute to the community."
                />

                {errors.motivation && (
                  <span className="apply-error">
                    {errors.motivation}
                  </span>
                )}
              </motion.div>

              <motion.div
                className="apply-form-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="apply-form-group">
                  <label htmlFor="linkedin">
                    LinkedIn (Optional)
                  </label>

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
                  <label htmlFor="github">
                    GitHub (Optional)
                  </label>

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
                  Application submitted successfully! We'll contact you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="apply-message apply-message-error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Something went wrong. Please try again.
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