import React, { useState } from 'react';
import roles from '../../data/roles';
import './Apply.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('🔗 API URL:', API_URL);

const initialFormState = {
  fullName: '',
  email: '',
  regNumber: '',
  yearOfStudy: '',
  role: '',
  experience: '',
  motivation: '',
  linkedin: '',
  github: '',
};

function Apply() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2)
      newErrors.fullName = 'Full name is required (min 2 characters)';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'A valid email is required';
    if (!formData.regNumber.trim() || formData.regNumber.trim().length < 3)
      newErrors.regNumber = 'Registration number is required';
    if (!formData.yearOfStudy)
      newErrors.yearOfStudy = 'Select your year of study';
    if (!formData.role)
      newErrors.role = 'Select a position';
    if (!formData.experience.trim() || formData.experience.trim().length < 20)
      newErrors.experience = 'Tell us about your experience (min 20 characters)';
    if (!formData.motivation.trim() || formData.motivation.trim().length < 20)
      newErrors.motivation = 'Share your motivation (min 20 characters)';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('📤 Submitting application to:', `${API_URL}/api/applications`);
      console.log('📋 Form data:', formData);

      const res = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('📡 Response status:', res.status);

      const data = await res.json();
      console.log('📦 Response data:', data);

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setSubmitError(data.message || 'Something went wrong. Please try again.');
        }
        console.error('❌ Server error:', data);
        return;
      }

      console.log('✅ Application submitted successfully');
      setSubmitted(true);
      setFormData(initialFormState);
    } catch (err) {
      console.error('❌ Network error:', err);
      setSubmitError(`Could not connect to server: ${err.message}. Make sure the backend is running at ${API_URL}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="section apply" id="apply">
        <div className="container">
          <div className="apply-success">
            <div className="apply-success-icon">✅</div>
            <h3>Application Submitted!</h3>
            <p>
              Thank you for applying. We'll review your application and get back to you via email.
            </p>
            <button
              className="btn btn-ghost"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section apply" id="apply">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get Involved</span>
          <h2 className="section-title">Apply for a Role</h2>
          <p className="section-desc">
            We're always looking for passionate students to join our leadership team.
            Applications open during leadership transitions.
          </p>
        </div>

        <div className="apply-status">
          <div className="apply-status-dot"></div>
          <span>
            Applications are currently <strong>OPEN</strong> — Apply below to join the team
          </span>
        </div>

        <div className="apply-layout">
          {/* Roles sidebar */}
          <div className="apply-roles">
            <h3 className="apply-roles-title">Available Positions</h3>
            {roles.map((role) => (
              <div className="role-card" key={role.id}>
                <div className="role-card-header">
                  <h4>{role.title}</h4>
                  <span className="role-card-badge">{role.badge}</span>
                </div>
                <p className="role-card-desc">{role.description}</p>
                <ul className="role-card-reqs">
                  {role.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Application form */}
          <div className="apply-form-wrapper">
            <h3 className="apply-form-title">Submit Your Application</h3>

            {submitError && (
              <div className="apply-form-error-banner">{submitError}</div>
            )}

            <form className="apply-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="e.g. Jane Wanjiru"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  University Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. jane@students.mku.ac.ke"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="regNumber">
                  Registration Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="regNumber"
                  name="regNumber"
                  placeholder="e.g. CIT-XXX-XXX/2023"
                  value={formData.regNumber}
                  onChange={handleChange}
                />
                {errors.regNumber && <span className="form-error">{errors.regNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="yearOfStudy">
                    Year of Study <span className="required">*</span>
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                  >
                    <option value="">Select year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                  {errors.yearOfStudy && <span className="form-error">{errors.yearOfStudy}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    Position <span className="required">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">Select a position</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                  {errors.role && <span className="form-error">{errors.role}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="experience">
                  Relevant Experience <span className="required">*</span>
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows="4"
                  placeholder="Tell us about your experience with AWS, leadership roles, or relevant skills..."
                  value={formData.experience}
                  onChange={handleChange}
                ></textarea>
                {errors.experience && <span className="form-error">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="motivation">
                  Why This Role? <span className="required">*</span>
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows="4"
                  placeholder="What motivates you to take on this leadership position?"
                  value={formData.motivation}
                  onChange={handleChange}
                ></textarea>
                {errors.motivation && <span className="form-error">{errors.motivation}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn (Optional)</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="github">GitHub (Optional)</label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    placeholder="https://github.com/..."
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Apply;
