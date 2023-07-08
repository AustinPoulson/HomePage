import React, { Component } from 'react'

import Twitter from './assets/twitter.svg';
import Reddit from './assets/reddit.svg';
import YouTube from './assets/youtube.svg';
import Twitch from './assets/twitch.svg';
import Instagram from './assets/instagram.png';
import Netflix from './assets/netflix.svg';
import Amazon from './assets/amazon.svg';
import SoundCloud from './assets/soundcloud.svg';
import Gmail from './assets/gmail.svg';
import StackOverflow from './assets/stackoverflow.svg';
import Github from './assets/github.svg';
import EtherMedia from './assets/EtherMediaIcon.png'
import HF from './assets/hacker.png';
import './App.css';

export default function App() {
  return (
    <div className='App'>
      <div className='LinkList'>
        <Link name='Twitter' icon={Twitter} link='https://twitter.com/'/>
        <Link name='Reddit' icon={Reddit} link='https://www.reddit.com/'/>
        <Link name='YouTube' icon={YouTube} link='https://www.youtube.com/'/>
        <Link name='Twitch' icon={Twitch} link='https://www.twitch.tv/'/>
        <Link name='Instagram' icon={Instagram} link='https://www.instagram.com/'/>
        <Link name='Netflix' icon={Netflix} link='https://www.netflix.com/'/>
        <Link name='Amazon' icon={Amazon} link='https://www.amazon.com/'/>
        <Link name='SoundCloud' icon={SoundCloud} link='https://soundcloud.com/'/>
        <Link name='Gmail' icon={Gmail} link='https://mail.google.com/'/>
        <Link name='Stack Overflow' icon={StackOverflow} link='https://stackoverflow.com/'/>
        <Link name='HF' icon={HF} link='https://hackforums.net/'/>
        <Link name='Github' icon={Github} link='https://github.com/'/>
        <Link name='EtherMedia' icon={EtherMedia} link='https://ethermedia.app/'/>
      </div>
    </div>
  );
}

function Link({name, icon, link}) {
  return (
    <a className='LinkContainer' href={link}>
      <div className='LinkIconContainer'>
        <img className='LinkImage' src={icon} alt={name}></img>
      </div>
      <div className='LinkTextContainer'>
        <p className='LinkText'>{name}</p>
      </div>
      <div className='LinkStatusContainer'></div>
    </a>
  )
}
