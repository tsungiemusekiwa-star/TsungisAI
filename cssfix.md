<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tsungi's AI - Audio Learning Hub</title>
  <style>
    /* Global resets and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: sans-serif; /* Replace with exact font if available, e.g., 'Inter' */
      background-color: #2a2a40; /* Dark purple background */
      color: #ffffff; /* White text */
      height: 100vh;
      overflow: hidden; /* Full viewport, no scroll */
      display: flex;
      flex-direction: column;
    }

    /* Header (Top Bar) */
    .header {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      background-color: #2a2a40;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Subtle divider */
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: bold;
      color: #a87fff; /* Purple logo text */
    }

    .logo-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #a87fff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2a2a40;
      font-size: 14px;
    }

    /* Main Dashboard Container */
    .dashboard {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* Sidebar */
    .sidebar {
      width: 250px; /* Fixed width */
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #2a2a40;
      flex-shrink: 0;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 12px; /* Spacing between items */
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #ffffff;
      text-decoration: none;
      font-size: 14px;
      padding: 8px 10px;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .sidebar-link:hover {
      background-color: rgba(168, 127, 255, 0.2);
    }

    .sidebar-link.active {
      background-color: #a87fff;
      color: #2a2a40;
    }

    .sidebar-icon {
      font-size: 16px;
      color: #a87fff; /* Purple icons */
    }

    /* User Profile */
    .user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: auto;
      padding-top: 20px;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #a87fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #ffffff;
    }

    .user-info {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 14px;
      color: #ffffff;
    }

    .user-email {
      font-size: 12px;
      color: #cccccc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px; /* Prevent overflow */
    }

    .sign-out {
      margin-left: auto;
      color: #a87fff;
      cursor: pointer;
      font-size: 14px;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow-y: auto; /* Allow scrolling if content overflows */
    }

    /* Title Section */
    .title-section {
      text-align: left;
    }

    .hub-title {
      font-size: 24px;
      color: #a87fff; /* Purple title */
      margin-bottom: 4px;
    }

    .hub-subtitle {
      font-size: 14px;
      color: #cccccc;
    }

    /* Stats Row */
    .stats-row {
      display: flex;
      gap: 15px;
    }

    .stat-card {
      background-color: #1e1e30; /* Dark card */
      border-radius: 8px;
      padding: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      max-width: 200px; /* Prevent over-stretching */
    }

    .stat-icon {
      font-size: 20px;
      color: #a87fff;
    }

    .stat-value {
      font-size: 20px;
      font-weight: bold;
    }

    .stat-label {
      font-size: 12px;
      color: #cccccc;
    }

    /* Now Playing Section */
    .now-playing {
      background-color: #1e1e30;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .now-playing-title {
      font-size: 14px;
      color: #cccccc;
    }

    .track-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .track-title {
      font-size: 16px;
      color: #ffffff;
    }

    .track-badge {
      background-color: #00d1d1; /* Cyan */
      color: #1e1e30;
      padding: 4px 8px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }

    .audio-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .timeline {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

    .time-start, .time-end {
      font-size: 12px;
      color: #cccccc;
    }

    .progress-bar {
      flex: 1;
      height: 4px;
      background-color: #3a3a50;
      border-radius: 2px;
      position: relative;
    }

    .progress-fill {
      width: 0%; /* JS dynamic */
      height: 100%;
      background-color: #a87fff;
      border-radius: 2px;
    }

    .play-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #a87fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 20px;
      color: #ffffff;
    }

    .volume-control {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .volume-icon {
      font-size: 16px;
      color: #cccccc;
    }

    .volume-slider {
      width: 100px;
      height: 4px;
      background-color: #3a3a50;
      border-radius: 2px;
      position: relative;
    }

    .volume-fill {
      width: 50%; /* JS dynamic */
      height: 100%;
      background-color: #a87fff;
      border-radius: 2px;
    }

    .volume-knob {
      position: absolute;
      top: -4px;
      left: 50%; /* Adjust based on fill */
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      border-radius: 50%;
      transform: translateX(-50%);
    }

    /* Disk Sections */
    .disk-section {
      background-color: #1e1e30;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .disk-section:hover {
      background-color: #25253a;
    }

    .disk-title {
      font-size: 14px;
      color: #ffffff;
    }

    .disk-tracks {
      background-color: #00a3a3; /* Teal badge */
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
    }

    .disk-arrow {
      color: #cccccc;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo">
      <div class="logo-avatar">T</div>
      Tsungi's AI 😊
    </div>
  </header>
  <div class="dashboard">
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <a href="#" class="sidebar-link active"><span class="sidebar-icon">🎧</span> Audio Learning</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">🔤</span> Acronym Generator</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">🧠</span> Memory Aids</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">🤖</span> Study Buddy</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">👥</span> Collaborative Learning</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">⬆️</span> Upload Files</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">📝</span> Practice Tests</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">📄</span> Mock Exams</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">⌨️</span> Typing Game</a>
        <a href="#" class="sidebar-link"><span class="sidebar-icon">✍️</span> Master Touch Typing</a>
      </nav>
      <div class="user-profile">
        <div class="user-avatar">U</div>
        <div class="user-info">
          <span class="user-name">Ubuntu</span>
          <span class="user-email">info.loka1@gmail.com</span>
        </div>
        <span class="sign-out">&gt; Sign Out</span>
      </div>
    </aside>
    <main class="main-content">
      <div class="title-section">
        <h1 class="hub-title">Audio Learning Hub</h1>
        <p class="hub-subtitle">Master actuarial concepts through comprehensive audio lessons</p>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-icon">📚</span>
          <div>
            <div class="stat-value">47</div>
            <div class="stat-label">Lessons</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">✅</span>
          <div>
            <div class="stat-value">0</div>
            <div class="stat-label">Completed</div>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📈</span>
          <div>
            <div class="stat-value">0%</div>
            <div class="stat-label">Progress</div>
          </div>
        </div>
      </div>
      <section class="now-playing">
        <div class="now-playing-title">Now Playing</div>
        <div class="track-info">
          <span class="track-title">Introduction Track 01 - Disk 1 (Part 1 - Part 2)</span>
          <span class="track-badge">CA1</span>
        </div>
        <div class="audio-controls">
          <div class="timeline">
            <span class="time-start">0:00</span>
            <div class="progress-bar"><div class="progress-fill"></div></div>
            <span class="time-end">1:40</span>
          </div>
          <div class="play-button">▶</div>
          <div class="volume-control">
            <span class="volume-icon">🔊</span>
            <div class="volume-slider">
              <div class="volume-fill"></div>
              <div class="volume-knob"></div>
            </div>
          </div>
        </div>
      </section>
      <div class="disk-section">
        <span class="disk-title">Disk 1 (Part 1 - Part 2)</span>
        <span class="disk-tracks">11 tracks</span>
        <span class="disk-arrow">▼</span>
      </div>
      <div class="disk-section">
        <span class="disk-title">Disk 2</span>
        <span class="disk-tracks">9 tracks</span>
        <span class="disk-arrow">▼</span>
      </div>
      <!-- Add more disks or expanded content as needed -->
    </main>
  </div>
</body>
</html>