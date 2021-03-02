/* eslint-disable react/require-default-props */
import React, {
  createContext, ReactElement, ReactNode, useEffect, useState,
} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    }
  };
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps): ReactElement {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [totalExperience, setTotalExperience] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [isUserCharged, setIsUserCharged] = useState(false);

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    async function initialUser() {
      await axios.post('/api/initial-user', rest.session.user).then((response) => {
        setLevel(response.data.level);
        setCurrentExperience(response.data.currentExperience);
        setChallengesCompleted(response.data.challengesCompleted);
        setTotalExperience(response.data.totalExperience);
        setIsUserCharged(true);
      });
    }
    initialUser();
  }, []);

  useEffect(() => {
    async function updateUserData() {
      if (isUserCharged) {
        const data = {
          name: rest.session.user.name,
          email: rest.session.user.email,
          image: rest.session.user.image,
          level,
          currentExperience,
          challengesCompleted,
          totalExperience,
        };

        axios.put('/api/update-user', data).then((response) => {
          setLevel(response.data.level);
          setCurrentExperience(response.data.currentExperience);
          setChallengesCompleted(response.data.challengesCompleted);
        });
      }
    }
    updateUserData();
  }, [level, currentExperience, challengesCompleted, totalExperience]);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
