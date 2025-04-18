---
layout: archive
title: "Personal CV (Last updated: 2025-02-03)"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

<div class="cv-container">
  <h1 class="section-heading"><span>English Version</span></h1>
  <div class="cv-download">
    <p>You can download a PDF copy of my English CV <a href="/files/Aiwei-Liu-CV-EN.pdf">here</a>.</p>
  </div>
  
  <div class="pdf-container">
    <iframe src="/files/Aiwei-Liu-CV-EN.pdf" width="100%" height="600" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>
  </div>

  <h1 class="section-heading"><span>中文版本</span></h1>
  <div class="cv-download">
    <p>您可以在<a href="/files/Aiwei-Liu-CV-CN.pdf">这里</a>下载我的中文简历PDF版本。</p>
  </div>
  
  <div class="pdf-container">
    <iframe src="/files/Aiwei-Liu-CV-CN.pdf" width="100%" height="600" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>
  </div>
</div>

<style>
/* CV section styling to match about.md */
.cv-container {
  margin: 1.5em 0 2em 0;
}

.section-heading {
  position: relative;
  margin: 2em 0 1.2em 0;
  font-size: 1.8em;
  font-weight: 700;
  color: #333;
  padding-bottom: 0.3em;
}

.section-heading span {
  background: #fff;
  padding-right: 15px;
  position: relative;
  z-index: 1;
}

.section-heading:after {
  content: "";
  position: absolute;
  bottom: 0.4em;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #632991, transparent);
  z-index: 0;
}

.cv-download {
  background: #fff;
  border-radius: 12px;
  padding: 18px 22px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.05);
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.cv-download:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(99,41,145,0.12);
}

.cv-download p {
  margin: 0;
  font-size: 1.1em;
  color: #444;
}

.cv-download a {
  color: #632991;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border-bottom: 1px dotted #632991;
  padding-bottom: 1px;
}

.cv-download a:hover {
  color: #8244b8;
  border-bottom: 1px solid #8244b8;
}

.pdf-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin-bottom: 40px;
  background: #f8f8f8;
  padding: 2px;
  border: 1px solid rgba(0,0,0,0.08);
  position: relative;
}

.pdf-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #632991, #9e65d6);
  z-index: 10;
}

.pdf-container iframe {
  display: block;
  background: #fff;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cv-download {
    padding: 15px;
  }
  
  .pdf-container {
    margin-bottom: 30px;
  }
  
  .pdf-container iframe {
    height: 500px;
  }
}

@media (max-width: 480px) {
  .pdf-container iframe {
    height: 400px;
  }
}
</style>
