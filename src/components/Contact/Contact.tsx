import { useRef, useState, type FormEvent } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import ScrollReveal from '../shared/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Magnetic button effect
  useGSAP(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const radius = 80;
      const dist = Math.sqrt(x * x + y * y);

      if (dist < radius) {
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);

    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.contact}>
      <div className={styles.container}>
        <ScrollReveal>
          <h2 className={styles.title}>
            Let&apos;s build something extraordinary.
          </h2>
        </ScrollReveal>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <textarea
                placeholder="Tell us about your project"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={styles.textarea}
                rows={4}
                required
              />
            </div>
            <button ref={btnRef} type="submit" className={styles.submitBtn}>
              <span>Send Message</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </form>

          <div className={styles.links}>
            <ScrollReveal delay={0.2}>
              <div className={styles.linkGroup}>
                <span className={styles.linkLabel}>Telegram</span>
                <a href="https://t.me/karaf" className={styles.linkValue} target="_blank" rel="noopener noreferrer">
                  @karaf
                </a>
              </div>
              <div className={styles.linkGroup}>
                <span className={styles.linkLabel}>Email</span>
                <a href="mailto:hello@karaf.ru" className={styles.linkValue}>
                  hello@karaf.ru
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
