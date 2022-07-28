/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React, { ReactElement, useContext } from 'react';
import { FiUser } from 'react-icons/fi';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    };
  };
}

export function Profile(props: ProfileProps): ReactElement {
  const { level } = useContext(ChallengesContext);
  console.log(props.session.user.image);
  return (
    <div className={styles.profileContainer}>
      {props.session.user.image ? (
        <img
          src={props.session.user.image}
          alt={`Imagem de ${props.session.user.name}`}
        />
      ) : (
        <div className="without-profile-picture">
          <FiUser />
        </div>
      )}
      <div>
        <strong>{props.session.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
