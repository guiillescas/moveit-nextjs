import React, { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import {
  FiAward, FiHome, FiLogOut, FiSun, FiMoon,
} from 'react-icons/fi';
import Switch from 'react-switch';
import { signOut } from 'next-auth/client';

import styles from '../styles/components/LeftMenu.module.css';

export function LeftMenu(): ReactElement {
  const router = useRouter();

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
    <div className={styles.container}>
      <div>
        <img src="logo.svg" alt="Logo Moveit" />
      </div>

      <div className={styles.options}>
        <Link href="/">
          <button type="button" className={router.pathname === '/' && styles.activeOption}>
            <FiHome size={30} />
          </button>
        </Link>
        <Link href="/leaderboard">
          <button type="button" className={router.pathname === '/leaderboard' && styles.activeOption}>
            <FiAward size={30} />
          </button>
        </Link>

        <div className={styles.switch}>
          <Switch
            onChange={() => { toogleTheme(); }}
            checked={theme === 'dark'}
            height={25}
            width={45}
            handleDiameter={25}
            checkedIcon={(
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <FiMoon size={15} color="#fff" />
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
                <FiSun size={15} color="#fff" />
              </div>
          )}
            onColor="#547f92"
          />
        </div>
      </div>

      <div className={styles.logout}>
        <Link href="/">
          <button type="button" onClick={() => signOut()}>
            <FiLogOut size={26} color="#B3B3B3" />
          </button>
        </Link>
      </div>

    </div>
  );
}
