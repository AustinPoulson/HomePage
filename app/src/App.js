import React, { useState, useEffect } from 'react'

import './App.css';

export default function App() {
  const [sites, setSites] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const sitesData = localStorage.getItem('sites');
    if (sitesData) {
      setSites(JSON.parse(sitesData));
    } else {
      setSites([]);
    }
  }, []);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
      const file = files[0];
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target.result;
        
        const lines = content.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.replace(/^https?:\/\//, '').replace(/\/$/, ''));
        
        const newSites = [...sites];
        
        lines.forEach(line => {
          const site = line.toLowerCase();
          if (!newSites.includes(site)) {
            newSites.push(site);
          }
        });
        
        localStorage.setItem('sites', JSON.stringify(newSites));
        setSites(newSites);
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      
      reader.readAsText(file);
    }
  }

  function handleDeleteSite(siteToDelete) {
    const updatedSites = sites.filter(site => site !== siteToDelete);
    localStorage.setItem('sites', JSON.stringify(updatedSites));
    setSites(updatedSites);
  }

  return (
    <div 
      className={`App ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className='LinkList'>
        {sites.map((site, index) => (
          <Link key={index} name={site} link={`https://${site}`} onDelete={handleDeleteSite} />
        ))}
        <AddSite sites={sites} setSites={setSites} />
      </div>
    </div>
  );
}


function Link({name, link, onDelete}) {
  const [currentIcon, setCurrentIcon] = useState(`https://${name}/favicon.ico`);
  const [iconIndex, setIconIndex] = useState(0);
  
  const faviconUrls = [
    `https://${name}/favicon.ico`,
    `https://${name}/favicon.png`,
    `https://${name}/apple-touch-icon.png`,
    `https://www.google.com/s2/favicons?domain=${name}`,
    `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${name}&size=32`
  ];

  function handleImageError() {
    if (iconIndex < faviconUrls.length - 1) {
      const nextIndex = iconIndex + 1;
      setIconIndex(nextIndex);
      setCurrentIcon(faviconUrls[nextIndex]);
    }
  }

  function getDisplayName(siteName) {
    const name = siteName.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    onDelete(name);
  }

  return (
    <a className='LinkContainer' href={link}>
      <button className='DeleteButton' onClick={handleDelete}>×</button>
      <div className='LinkIconContainer'>
        <img 
          className='LinkImage' 
          src={currentIcon} 
          alt={name}
          onError={handleImageError}
        />
      </div>
      <div className='LinkTextContainer'>
        <p className='LinkText'>{getDisplayName(name)}</p>
      </div>
      <div className='LinkStatusContainer'></div>
    </a>
  )
}

function AddSite({ sites, setSites }) {
  const [newSite, setNewSite] = useState('');

  function handleAddSite() {
    if (newSite.trim()) {
      const siteToAdd = newSite.trim().toLowerCase();
      
      if (sites.includes(siteToAdd)) {
        setNewSite('');
        return;
      }
      
      const currentSites = sites;
      const updatedSites = [...currentSites, siteToAdd];
      
      localStorage.setItem('sites', JSON.stringify(updatedSites));
      setSites(updatedSites);
      setNewSite('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAddSite();
    }
  }

  return (
    <div className='LinkContainer'>
      <div className='LinkTextContainer'>
        <input 
          type="text" 
          placeholder="Enter site url" 
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
          onKeyDown={handleKeyDown}
          className='AddSiteInput'
        />
      </div>
      <div className='LinkStatusContainer'>
        <button 
          onClick={handleAddSite}
          className='AddSiteButton'
        >
          Add
        </button>
      </div>
    </div>
  )
}