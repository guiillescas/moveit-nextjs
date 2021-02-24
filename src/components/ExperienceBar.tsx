import React, {
  ReactElement, useContext, useEffect, useState,
} from 'react';
import { useTheme } from 'next-themes';
import Switch from 'react-switch';
import { FiSun, FiMoon } from 'react-icons/fi';

import styles from '../styles/components/ExperienceBar.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function ExperienceBar(): ReactElement {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  function toogleTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <div className={styles.menu}>
      <header className={styles.experienceBar}>
        <span>0 xp</span>
        <div>
          <div style={{ width: `${percentToNextLevel}%` }} />

          <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
            {currentExperience}
            {' '}
            xp
          </span>
        </div>
        <span>
          {experienceToNextLevel}
          {' '}
          xp
        </span>
      </header>

      <div className={styles.switch}>
        <Switch
          onChange={() => { toogleTheme(); }}
          checked={theme === 'dark'}
          height={20}
          width={40}
          handleDiameter={20}
          checkedIcon={(
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <FiMoon size={13} color="#fff" />
            </div>
          )}
          uncheckedIcon={(
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <FiSun size={13} color="#fff" />
            </div>
          )}
          onColor="#547f92"
        />
      </div>
    </div>
  );
}

export default ExperienceBar;
