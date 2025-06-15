import React from 'react';

import cssAbout from './About.module.css';

type Props = {};

const h1 = `This application is a convenient tool for spaced repetition using flashcards. It helps you effectivelymemorize material by scheduling reviews at optimal intervals based on the principles of spaced repetition.Users can create their own decks of cards and review them just in time to retain important information.`;
const h2 = `The app is fully built with React and TypeScript, ensuring stability and predictable behavior. It'sdesigned for the web, meaning everything works directly in the browser without the need for installation.The interface is clean and minimalist, carefully crafted to keep your focus on learning withoutunnecessary distractions.`;
const h3 = `Users can register and log into a personal account. Once signed in, all flashcards and progress are saved in the cloud, allowing access from any device. In future updates, we plan to add cross-device synchronization and advanced analytics to help track your learning progress even more effectively.`;

export default function About({}: Props) {
  return (
    <>
      <div className={cssAbout.container}>
        <div className={cssAbout.textBGRotate1}>
          <div className={cssAbout.textBG1}>{h1}</div>
          <div className={cssAbout.textBG1clone}>{h1}</div>
        </div>

        <div className={cssAbout.textBGRotate2}>
          <div className={cssAbout.textBG2}>{h2}</div>
          <div className={cssAbout.textBG2clone}>{h2}</div>
        </div>

        <div className={cssAbout.textBGRotate3}>
          <div className={cssAbout.textBG3}>{h3}</div>
          <div className={cssAbout.textBG3clone}>{h3}</div>
        </div>
      </div>

      <button onClick={() => console.log('A B O U T')} className={cssAbout.text} data-text='ABOUT'>
        ABOUT
      </button>
    </>
  );
}
