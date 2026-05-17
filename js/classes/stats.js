class Stats {
  constructor() {
    this.currentRide = {
      objectsHopped: 0,
      maxObjectsInRow: 0,
      currentObjectsInRow: 0,
      distance: 0,
      timeInOncoming: 0,  // in milliseconds
      timeInBikeLane: 0,
      timeInSidewalk: 0,
      startTime: Date.now()
    };
    
    // Load saved stats from localStorage
    this.loadStats();
  }

  loadStats() {
    const saved = localStorage.getItem('bikelane_stats');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.totalObjectsHopped = data.totalObjectsHopped || 0;
        this.mostObjectsInRow = data.mostObjectsInRow || 0;
        this.highestScore = data.highestScore || 0;
        this.totalTimeInOncoming = data.totalTimeInOncoming || 0;
        this.preferredLane = data.preferredLane || 3;
        this.shortestRide = data.shortestRide || Infinity;
        this.longestRide = data.longestRide || 0;
        this.totalDistance = data.totalDistance || 0;
      } catch (e) {
        console.error('Error loading stats:', e);
        this.initializeStats();
      }
    } else {
      this.initializeStats();
    }
  }

  initializeStats() {
    this.totalObjectsHopped = 0;
    this.mostObjectsInRow = 0;
    this.highestScore = 0;
    this.totalTimeInOncoming = 0;
    this.preferredLane = 3;
    this.shortestRide = Infinity;
    this.longestRide = 0;
    this.totalDistance = 0;
  }

  saveStats() {
    const data = {
      totalObjectsHopped: this.totalObjectsHopped,
      mostObjectsInRow: this.mostObjectsInRow,
      highestScore: this.highestScore,
      totalTimeInOncoming: this.totalTimeInOncoming,
      preferredLane: this.preferredLane,
      shortestRide: this.shortestRide === Infinity ? 0 : this.shortestRide,
      longestRide: this.longestRide,
      totalDistance: this.totalDistance
    };
    localStorage.setItem('bikelane_stats', JSON.stringify(data));
  }

  // Called when player hops over an object
  recordObjectHop() {
    this.currentRide.objectsHopped++;
    this.currentRide.currentObjectsInRow++;
    
    if (this.currentRide.currentObjectsInRow > this.currentRide.maxObjectsInRow) {
      this.currentRide.maxObjectsInRow = this.currentRide.currentObjectsInRow;
    }
  }

  // Called when player lands (resets hop combo)
  resetHopCombo() {
    this.currentRide.currentObjectsInRow = 0;
  }

  // Called each frame to update time in lanes
  updateLaneTime(currentLane, deltaTime) {
    const deltaMs = deltaTime * 16.67; // Convert frame delta to milliseconds
    
    switch(currentLane) {
      case 1:
        this.currentRide.timeInOncoming += deltaMs;
        break;
      case 2:
        this.currentRide.timeInBikeLane += deltaMs;
        break;
      case 3:
        this.currentRide.timeInSidewalk += deltaMs;
        break;
    }
  }

  // Update distance traveled
  updateDistance(pixelsTraveled) {
    this.currentRide.distance += pixelsTraveled;
  }

  // Called when the ride ends (player dies or quits)
  endRide(finalScore) {
    const rideDistance = this.currentRide.distance * PIXELS_TO_METERS;
    const rideDuration = Date.now() - this.currentRide.startTime;
    
    // Update lifetime stats
    this.totalObjectsHopped += this.currentRide.objectsHopped;
    
    if (this.currentRide.maxObjectsInRow > this.mostObjectsInRow) {
      this.mostObjectsInRow = this.currentRide.maxObjectsInRow;
    }
    
    if (finalScore > this.highestScore) {
      this.highestScore = finalScore;
    }
    
    this.totalTimeInOncoming += this.currentRide.timeInOncoming;
    this.totalDistance += rideDistance;
    
    // Update shortest/longest ride (in meters)
    if (rideDistance > 0) {
      if (rideDistance < this.shortestRide) {
        this.shortestRide = rideDistance;
      }
      if (rideDistance > this.longestRide) {
        this.longestRide = rideDistance;
      }
    }
    
    // Calculate preferred lane (where they spent most time)
    const maxTime = Math.max(
      this.currentRide.timeInOncoming,
      this.currentRide.timeInBikeLane,
      this.currentRide.timeInSidewalk
    );
    
    if (maxTime === this.currentRide.timeInOncoming) {
      this.preferredLane = 1;
    } else if (maxTime === this.currentRide.timeInBikeLane) {
      this.preferredLane = 2;
    } else {
      this.preferredLane = 3;
    }
    
    // Save to localStorage
    this.saveStats();
    
    // Reset current ride
    this.resetCurrentRide();
  }

  resetCurrentRide() {
    this.currentRide = {
      objectsHopped: 0,
      maxObjectsInRow: 0,
      currentObjectsInRow: 0,
      distance: 0,
      timeInOncoming: 0,
      timeInBikeLane: 0,
      timeInSidewalk: 0,
      startTime: Date.now()
    };
  }

  // Get current distance in meters for display
  getCurrentDistanceMeters() {
    return Math.floor(this.currentRide.distance * PIXELS_TO_METERS);
  }

  // Format time from milliseconds to readable format
  static formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  // Get lane name for display
  static getLaneName(lane) {
    switch(lane) {
      case 1: return "Oncoming Traffic";
      case 2: return "Bike Lane";
      case 3: return "Sidewalk";
      default: return "Unknown";
    }
  }

  // Get formatted stats for display
  getFormattedStats() {
    return {
      totalObjectsHopped: this.totalObjectsHopped,
      mostObjectsInRow: this.mostObjectsInRow,
      highestScore: this.highestScore,
      totalTimeInOncoming: Stats.formatTime(this.totalTimeInOncoming),
      preferredLane: Stats.getLaneName(this.preferredLane),
      shortestRide: this.shortestRide === Infinity ? 0 : Math.floor(this.shortestRide),
      longestRide: Math.floor(this.longestRide),
      totalDistance: Math.floor(this.totalDistance)
    };
  }
}
