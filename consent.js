// Consent manager: shows banner, records choice, and loads AdSense script when allowed
(function(){
  function qs(sel){return document.querySelector(sel)}
  const meta = qs('meta[name="google-adsense-account"]');
  const publisher = meta ? meta.content.replace(/^ca-pub-/, '') : null;

  function getConsent(){return localStorage.getItem('ad_consent')}
  function setConsent(v){localStorage.setItem('ad_consent', v)}
  function getPersonal(){return localStorage.getItem('ad_personal')==='1'}
  function setPersonal(v){localStorage.setItem('ad_personal', v? '1':'0')}

  function insertScript(nonPersonal){
    if (!publisher) return;
    if (document.getElementById('adsbygoogle-loader')) return;
    if (nonPersonal){
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
    }
    const s = document.createElement('script');
    s.id = 'adsbygoogle-loader';
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-' + publisher;
    s.onload = function(){
      renderExistingAdSlots();
    };
    document.head.appendChild(s);
  }

  function renderExistingAdSlots(){
    try{
      (window.adsbygoogle = window.adsbygoogle || []);
      const nodes = Array.from(document.querySelectorAll('ins.adsbygoogle'));
      nodes.forEach(()=>{ try{ (adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){} });
    }catch(e){}
  }

  function showBanner(){
    if (qs('.consent-banner')) return;
    const div = document.createElement('div');
    div.className = 'consent-banner';
    div.innerHTML = `
      <div class="consent-inner">
        <div class="consent-message">
          <strong>We use cookies and ads</strong>
          <div class="consent-text">We and our partners use cookies to personalize content and ads. Choose "Consent" to allow personalized ads, or "Manage options" to set preferences.</div>
        </div>
        <div class="consent-actions">
          <button class="btn btn-manage">Manage options</button>
          <button class="btn btn-consent">Consent</button>
        </div>
      </div>
      <div class="consent-manage hidden" aria-hidden="true">
        <div class="manage-inner">
          <h3>Ad preferences</h3>
          <label><input type="checkbox" id="personalized" checked> Allow personalized ads</label>
          <div style="margin-top:10px"><button class="btn btn-save">Save</button> <button class="btn btn-cancel">Cancel</button></div>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    div.querySelector('.btn-consent').addEventListener('click', function(){
      setConsent('granted'); setPersonal(true);
      div.remove(); insertScript(false);
    });

    div.querySelector('.btn-manage').addEventListener('click', function(){
      div.querySelector('.consent-manage').classList.remove('hidden');
      div.querySelector('.consent-manage').setAttribute('aria-hidden','false');
    });

    div.querySelector('.btn-cancel').addEventListener('click', function(){
      div.querySelector('.consent-manage').classList.add('hidden');
      div.querySelector('.consent-manage').setAttribute('aria-hidden','true');
    });

    div.querySelector('.btn-save').addEventListener('click', function(){
      const p = !!div.querySelector('#personalized').checked;
      setPersonal(p);
      setConsent(p? 'granted':'denied');
      div.remove(); if (p) insertScript(false);
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const c = getConsent();
    if (c === 'granted'){
      // load personalized ads
      insertScript(false);
    } else if (c === 'denied'){
      // do nothing
    } else {
      showBanner();
    }
  });
})();
