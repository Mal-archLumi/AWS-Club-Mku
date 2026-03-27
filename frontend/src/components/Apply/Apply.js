import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import roles from '../../data/roles';
import './Apply.css';

// EmailJS Configuration - Replace with your actual values
const EMAILJS_SERVICE_ID = 'service_be3ds85';
const EMAILJS_TEMPLATE_ID = 'template_u7gtp0f';
const EMAILJS_PUBLIC_KEY = 'DiIq_Jyufw19_CGfy';

function Apply() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openPositions, setOpenPositions] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const togglePosition = (id) => {
    setOpenPositions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [formData, setFormData] = useState({});

  const handleChange = (roleId, e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [roleId]: { ...prev[roleId], [name]: value }
    }));
    // Clear error for this field
    if (errors[`${roleId}-${name}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${roleId}-${name}`];
        return newErrors;
      });
    }
  };

  const validateForm = (roleId, data) => {
    const newErrors = {};
    if (!data.fullName?.trim() || data.fullName.trim().length < 2)
      newErrors[`${roleId}-fullName`] = 'Full name is required (min 2 characters)';
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors[`${roleId}-email`] = 'A valid email is required';
    if (!data.regNumber?.trim() || data.regNumber.trim().length < 3)
      newErrors[`${roleId}-regNumber`] = 'Registration number is required';
    if (!data.yearOfStudy)
      newErrors[`${roleId}-yearOfStudy`] = 'Select your year of study';
    if (!data.experience?.trim() || data.experience.trim().length < 20)
      newErrors[`${roleId}-experience`] = 'Tell us about your experience (min 20 characters)';
    if (!data.motivation?.trim() || data.motivation.trim().length < 20)
      newErrors[`${roleId}-motivation`] = 'Share your motivation (min 20 characters)';
    return newErrors;
  };

  const handleSubmit = async (e, roleId, roleTitle) => {
    e.preventDefault();
    
    const data = formData[roleId] || {};
    const validationErrors = validateForm(roleId, data);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitSuccess(null);

    // Prepare email template data
    const templateParams = {
      to_email: data.email,
      from_name: data.fullName,
      role: roleTitle,
      registration_number: data.regNumber,
      year_of_study: data.yearOfStudy,
      experience: data.experience,
      motivation: data.motivation,
      linkedin: data.linkedin || 'Not provided',
      github: data.github || 'Not provided',
      submission_date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      // Clear form for this role
      setFormData(prev => ({ ...prev, [roleId]: {} }));
      setSubmitSuccess({ roleId, message: 'Application submitted successfully! We\'ll review it shortly.' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrors({ ...errors, [`${roleId}-submit`]: 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section apply" id="apply">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get Involved</span>
          <h2 className="section-title">Apply for a Role</h2>
          <p className="section-desc">
            We're always looking for passionate students to join our leadership team.
          </p>
        </div>

        <div className="apply-status">
          <div className="apply-status-dot"></div>
          <span>
            Applications are currently <strong>OPEN</strong> — Apply below to join the team
          </span>
        </div>

        <div className="positions-container">
          {roles.map((role) => (
            <details 
              key={role.id} 
              className="position-accordion"
              open={openPositions[role.id]}
              onToggle={() => togglePosition(role.id)}
            >
              <summary className="position-header">
                <div>
                  <span className="position-title">{role.title}</span>
                  <span className="position-badge" style={{ marginLeft: '0.75rem' }}>{role.badge}</span>
                </div>
                <span className="position-icon">+</span>
              </summary>
              <div className="position-body">
                <p className="position-desc">{role.description}</p>
                <ul className="position-reqs">
                  {role.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>

                <form 
                  className="application-form" 
                  onSubmit={(e) => handleSubmit(e, role.id, role.title)}
                >
                  <div className="form-group">
                    <label htmlFor={`fullName-${role.id}`}>
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id={`fullName-${role.id}`}
                      name="fullName"
                      placeholder="e.g., Jane Wanjiru"
                      value={formData[role.id]?.fullName || ''}
                      onChange={(e) => handleChange(role.id, e)}
                    />
                    {errors[`${role.id}-fullName`] && (
                      <span className="form-error">{errors[`${role.id}-fullName`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`email-${role.id}`}>
                     Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id={`email-${role.id}`}
                      name="email"
                      placeholder="e.g., janewanjiru@gmail.com"
                      value={formData[role.id]?.email || ''}
                      onChange={(e) => handleChange(role.id, e)}
                    />
                    {errors[`${role.id}-email`] && (
                      <span className="form-error">{errors[`${role.id}-email`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`regNumber-${role.id}`}>
                      Registration Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id={`regNumber-${role.id}`}
                      name="regNumber"
                      placeholder="e.g., BIT/2026/XXXXX"
                      value={formData[role.id]?.regNumber || ''}
                      onChange={(e) => handleChange(role.id, e)}
                    />
                    {errors[`${role.id}-regNumber`] && (
                      <span className="form-error">{errors[`${role.id}-regNumber`]}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`yearOfStudy-${role.id}`}>
                        Year of Study <span className="required">*</span>
                      </label>
                      <select
                        id={`yearOfStudy-${role.id}`}
                        name="yearOfStudy"
                        value={formData[role.id]?.yearOfStudy || ''}
                        onChange={(e) => handleChange(role.id, e)}
                      >
                        <option value="">Select year</option>
                        <option value="1">Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                      </select>
                      {errors[`${role.id}-yearOfStudy`] && (
                        <span className="form-error">{errors[`${role.id}-yearOfStudy`]}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`experience-${role.id}`}>
                      Relevant Experience <span className="required">*</span>
                    </label>
                    <textarea
                      id={`experience-${role.id}`}
                      name="experience"
                      rows="3"
                      placeholder="Tell us about your experience with AWS, leadership roles, or relevant skills..."
                      value={formData[role.id]?.experience || ''}
                      onChange={(e) => handleChange(role.id, e)}
                    />
                    {errors[`${role.id}-experience`] && (
                      <span className="form-error">{errors[`${role.id}-experience`]}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`motivation-${role.id}`}>
                      Why This Role? <span className="required">*</span>
                    </label>
                    <textarea
                      id={`motivation-${role.id}`}
                      name="motivation"
                      rows="3"
                      placeholder="What motivates you to take on this leadership position?"
                      value={formData[role.id]?.motivation || ''}
                      onChange={(e) => handleChange(role.id, e)}
                    />
                    {errors[`${role.id}-motivation`] && (
                      <span className="form-error">{errors[`${role.id}-motivation`]}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`linkedin-${role.id}`}>LinkedIn (Optional)</label>
                      <input
                        type="url"
                        id={`linkedin-${role.id}`}
                        name="linkedin"
                        placeholder="https://linkedin.com/in/..."
                        value={formData[role.id]?.linkedin || ''}
                        onChange={(e) => handleChange(role.id, e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`github-${role.id}`}>GitHub (Optional)</label>
                      <input
                        type="url"
                        id={`github-${role.id}`}
                        name="github"
                        placeholder="https://github.com/..."
                        value={formData[role.id]?.github || ''}
                        onChange={(e) => handleChange(role.id, e)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application →'
                    )}
                  </button>

                  {errors[`${role.id}-submit`] && (
                    <div className="form-message show error">
                      {errors[`${role.id}-submit`]}
                    </div>
                  )}

                  {submitSuccess && submitSuccess.roleId === role.id && (
                    <div className="form-message show success">
                      ✓ {submitSuccess.message}
                    </div>
                  )}
                </form>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Apply;