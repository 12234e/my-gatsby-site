import * as React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaBars, FaHome } from 'react-icons/fa';
import { Link, useStaticQuery, graphql } from 'gatsby';
import * as styles from './layout.module.css';

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  React.useEffect(() => {
    const canvas = document.getElementById('wave');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 50;

    let wave = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 100,
      frequency: 0.01
    };

    let increment = wave.frequency;

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          wave.y +
            Math.sin(i * wave.length + increment) *
              wave.amplitude *
              Math.sin(increment)
        );
      }

      ctx.strokeStyle = 'blue';
      ctx.stroke();
      increment += wave.frequency;
    }

    animate();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.siteTitle}>
        <p>
          <span>A</span>
          <span>l</span>
          <span>a</span>
          <span>m</span>
          <span>i</span>
          <span>n</span>
        </p>
      </header>
      <canvas id="wave"></canvas>
      <nav>
        <div className={styles.navContainer}>
          <ul className={styles.navLinks}>
            <li className={styles.navLinkItem}>
              <Link to="/" className={styles.navLinkText}>
                <h1>
                  <FaHome />
                </h1>
              </Link>
            </li>
          </ul>
          <button
            onClick={handleToggle}
            className={`${styles.toggleButton} ${
              isExpanded ? styles.expandedButton : ''
            }`}
          >
            {isExpanded ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
            {isExpanded && (
              <div>
                <br />
                <li className={styles.navLinkItem}>
                  <Link to="/blog" className={styles.navLinkText}>
                    <span>Blog</span>
                  </Link>
                </li>
                <br />
                <li className={styles.navLinkItem}>
                  <Link to="/about" className={styles.navLinkText}>
                    <span>About</span>
                  </Link>
                </li>
              </div>
            )}
          </button>
        </div>
      </nav>
      <main>
        <h1 className={styles.heading}>{pageTitle}</h1>
        {children}
      </main>
      <footer>
        Copyright © 2023
        AlaminKhan
        mdalaminkhan19957@gmaicompel.com
        +9660509918244
      </footer>
    </div>
  );
};

export default Layout;
