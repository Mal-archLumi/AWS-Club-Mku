import React from "react";
import { motion } from "framer-motion";
import "./Partners.css";

import datacampLogo from "../../images/DC_Donates_logo_inverted.png";

const EASING = [0.2, 0.8, 0.2, 1];

function Partners() {
  return (
    <section className="partners section" id="partners">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            ease: EASING,
          }}
        >
          <span className="section-tag">Partnerships</span>

          <h2 className="section-title">
            Organizations Supporting Our Builders
          </h2>

          <p className="section-desc">
            We work with organizations that empower our members with learning
            opportunities, technical resources and industry experience.
          </p>
        </motion.div>

        <motion.div
          className="partner-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            ease: EASING,
            delay: 0.1,
          }}
        >
          <div className="partner-logo">
            <img src={datacampLogo} alt="DataCamp Donates" />
          </div>

          <div className="partner-info">
            <span className="partner-type">
              Education Partner
            </span>

            <h3>DataCamp Donates</h3>

            <p>
              Through DataCamp Donates, AWS Student Builder Community MKU has
              access to <strong>100 sponsored learning licences</strong> that
              help students build practical skills in Python, SQL, Data Science,
              Artificial Intelligence and Machine Learning.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Partners;