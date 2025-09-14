// Renewable Energy Optimizer - Main JavaScript File

class EnergyOptimizer {
    constructor() {
        this.weatherAPIKey = 'demo'; // In production, use a real API key
        this.energyTypes = {
            solar: {
                name: 'Solar Energy',
                icon: 'fas fa-sun',
                factors: ['sunlight_hours', 'cloud_cover', 'latitude', 'temperature'],
                baseScore: 0
            },
            wind: {
                name: 'Wind Energy',
                icon: 'fas fa-wind',
                factors: ['wind_speed', 'wind_consistency', 'elevation', 'terrain'],
                baseScore: 0
            },
            hydro: {
                name: 'Hydroelectric',
                icon: 'fas fa-water',
                factors: ['water_availability', 'elevation_change', 'precipitation', 'terrain'],
                baseScore: 0
            },
            thermal: {
                name: 'Geothermal',
                icon: 'fas fa-fire',
                factors: ['geological_activity', 'ground_temperature', 'depth_requirements', 'location'],
                baseScore: 0
            },
            nuclear: {
                name: 'Nuclear Energy',
                icon: 'fas fa-atom',
                factors: ['population_density', 'water_access', 'infrastructure', 'regulations'],
                baseScore: 0
            }
        };
        
        this.usLocations = this.initializeUSLocations();
        this.initializeEventListeners();
        this.populateStates();
    }

    initializeUSLocations() {
        return {
            "California": {
                "Los Angeles County": ["Los Angeles", "Long Beach", "Santa Clarita", "Glendale", "Palmdale", "Lancaster", "Pomona", "Torrance", "Pasadena", "El Monte"],
                "San Diego County": ["San Diego", "Chula Vista", "Oceanside", "Escondido", "Carlsbad", "El Cajon", "Vista", "San Marcos", "Encinitas", "National City"],
                "Orange County": ["Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "Garden Grove", "Oceanside", "Fullerton", "Orange", "Costa Mesa", "Mission Viejo"],
                "Riverside County": ["Riverside", "Moreno Valley", "Corona", "Murrieta", "Temecula", "Hemet", "Menifee", "Palm Springs", "Indio", "Palm Desert"],
                "San Bernardino County": ["San Bernardino", "Fontana", "Rancho Cucamonga", "Ontario", "Victorville", "Rialto", "Hesperia", "Chino", "Upland", "Colton"]
            },
            "Texas": {
                "Harris County": ["Houston", "Pasadena", "Pearland", "Sugar Land", "Baytown", "Missouri City", "Friendswood", "League City", "Deer Park", "La Porte"],
                "Dallas County": ["Dallas", "Garland", "Irving", "Mesquite", "Plano", "Carrollton", "Richardson", "Rowlett", "Farmers Branch", "Cedar Hill"],
                "Tarrant County": ["Fort Worth", "Arlington", "Irving", "Grand Prairie", "Denton", "McKinney", "Frisco", "Mesquite", "Carrollton", "Richardson"],
                "Bexar County": ["San Antonio", "New Braunfels", "Schertz", "Cibolo", "Converse", "Leon Valley", "Windcrest", "Alamo Heights", "Terrell Hills", "Olmos Park"],
                "Travis County": ["Austin", "Round Rock", "Cedar Park", "Pflugerville", "Leander", "Georgetown", "Lakeway", "Bee Cave", "Lago Vista", "West Lake Hills"]
            },
            "Florida": {
                "Miami-Dade County": ["Miami", "Hialeah", "Miami Gardens", "Coral Gables", "Homestead", "Aventura", "Doral", "Kendall", "Cutler Bay", "Palmetto Bay"],
                "Broward County": ["Fort Lauderdale", "Hollywood", "Pembroke Pines", "Miramar", "Coral Springs", "Pompano Beach", "Plantation", "Sunrise", "Tamarac", "Lauderhill"],
                "Palm Beach County": ["West Palm Beach", "Boca Raton", "Boynton Beach", "Delray Beach", "Jupiter", "Wellington", "Royal Palm Beach", "Greenacres", "Lake Worth", "Lantana"],
                "Hillsborough County": ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Plant City", "Temple Terrace", "Riverview", "Sun City Center", "Apollo Beach", "Ruskin"],
                "Orange County": ["Orlando", "Apopka", "Winter Garden", "Ocoee", "Windermere", "Winter Park", "Maitland", "Eatonville", "Edgewood", "Belle Isle"]
            },
            "New York": {
                "New York County": ["New York City", "Manhattan", "Bronx", "Brooklyn", "Queens", "Staten Island"],
                "Kings County": ["Brooklyn", "Coney Island", "Bay Ridge", "Park Slope", "Williamsburg", "Bushwick", "Bedford-Stuyvesant", "Crown Heights", "Flatbush", "Bensonhurst"],
                "Queens County": ["Queens", "Flushing", "Astoria", "Long Island City", "Jackson Heights", "Elmhurst", "Corona", "Forest Hills", "Jamaica", "Richmond Hill"],
                "Nassau County": ["Hempstead", "Oyster Bay", "North Hempstead", "Long Beach", "Glen Cove", "Freeport", "Valley Stream", "Lynbrook", "Rockville Centre", "Mineola"],
                "Suffolk County": ["Brookhaven", "Islip", "Huntington", "Babylon", "Smithtown", "Riverhead", "Southold", "East Hampton", "Southampton", "Shelter Island"]
            },
            "Illinois": {
                "Cook County": ["Chicago", "Aurora", "Joliet", "Naperville", "Rockford", "Elgin", "Peoria", "Waukegan", "Cicero", "Champaign"],
                "DuPage County": ["Naperville", "Aurora", "Wheaton", "Downers Grove", "Elmhurst", "Lombard", "Addison", "Carol Stream", "Hanover Park", "Villa Park"],
                "Lake County": ["Waukegan", "North Chicago", "Zion", "Gurnee", "Round Lake Beach", "Mundelein", "Highland Park", "Deerfield", "Lake Forest", "Libertyville"],
                "Will County": ["Joliet", "Bolingbrook", "Plainfield", "Romeoville", "Lockport", "New Lenox", "Frankfort", "Mokena", "Manhattan", "Crest Hill"],
                "Kane County": ["Aurora", "Elgin", "Batavia", "Geneva", "St. Charles", "Carpentersville", "South Elgin", "West Dundee", "East Dundee", "Hampshire"]
            },
            "Pennsylvania": {
                "Philadelphia County": ["Philadelphia", "West Philadelphia", "North Philadelphia", "South Philadelphia", "Center City", "University City", "Manayunk", "Roxborough", "Germantown", "Chestnut Hill"],
                "Allegheny County": ["Pittsburgh", "McKeesport", "Monroeville", "Bethel Park", "Penn Hills", "Mount Lebanon", "Plum", "Ross Township", "Shaler Township", "West Mifflin"],
                "Montgomery County": ["Norristown", "Pottstown", "Lansdale", "Hatfield", "Souderton", "Telford", "Royersford", "Collegeville", "Trappe", "Schwenksville"],
                "Bucks County": ["Doylestown", "Bristol", "Morrisville", "Tullytown", "Bensalem", "Falls Township", "Middletown Township", "Lower Makefield", "Upper Makefield", "Wrightstown"],
                "Delaware County": ["Chester", "Darby", "Lansdowne", "Yeadon", "Sharon Hill", "Collingdale", "Folcroft", "Glenolden", "Norwood", "Prospect Park"]
            },
            "Ohio": {
                "Cuyahoga County": ["Cleveland", "Parma", "Lakewood", "Euclid", "Cleveland Heights", "Shaker Heights", "East Cleveland", "Garfield Heights", "Maple Heights", "Bedford"],
                "Franklin County": ["Columbus", "Westerville", "Reynoldsburg", "Grove City", "Upper Arlington", "Bexley", "Whitehall", "Gahanna", "New Albany", "Hilliard"],
                "Hamilton County": ["Cincinnati", "Norwood", "Forest Park", "Sharonville", "Springdale", "Blue Ash", "Montgomery", "Madeira", "Indian Hill", "Terrace Park"],
                "Summit County": ["Akron", "Cuyahoga Falls", "Barberton", "Stow", "Hudson", "Tallmadge", "Green", "Norton", "Mogadore", "Silver Lake"],
                "Montgomery County": ["Dayton", "Kettering", "Beavercreek", "Centerville", "Miamisburg", "Huber Heights", "Vandalia", "Oakwood", "Moraine", "West Carrollton"]
            },
            "Georgia": {
                "Fulton County": ["Atlanta", "Sandy Springs", "Roswell", "Johns Creek", "Alpharetta", "Milton", "Mountain Park", "Palmetto", "Chattahoochee Hills", "Fairburn"],
                "Gwinnett County": ["Lawrenceville", "Duluth", "Suwanee", "Buford", "Sugar Hill", "Snellville", "Lilburn", "Norcross", "Peachtree Corners", "Berkeley Lake"],
                "Cobb County": ["Marietta", "Smyrna", "Kennesaw", "Acworth", "Powder Springs", "Austell", "Mableton", "Hiram", "Dallas", "Villa Rica"],
                "DeKalb County": ["Decatur", "Chamblee", "Dunwoody", "Tucker", "Stone Mountain", "Lithonia", "Avondale Estates", "Clarkston", "Doraville", "Pine Lake"],
                "Clayton County": ["Jonesboro", "Forest Park", "Riverdale", "Lovejoy", "Morrow", "Lake City", "Hampton", "Rex", "College Park", "Union City"]
            },
            "North Carolina": {
                "Mecklenburg County": ["Charlotte", "Huntersville", "Matthews", "Mint Hill", "Pineville", "Cornelius", "Davidson", "Stallings", "Indian Trail", "Mint Hill"],
                "Wake County": ["Raleigh", "Cary", "Apex", "Garner", "Holly Springs", "Fuquay-Varina", "Knightdale", "Morrisville", "Rolesville", "Wendell"],
                "Guilford County": ["Greensboro", "High Point", "Jamestown", "Oak Ridge", "Pleasant Garden", "Sedalia", "Stokesdale", "Summerfield", "Whitsett", "Gibsonville"],
                "Forsyth County": ["Winston-Salem", "Kernersville", "Clemmons", "Lewisville", "Rural Hall", "Tobaccoville", "Walkertown", "Bethania", "Pfafftown", "Belews Creek"],
                "Durham County": ["Durham", "Chapel Hill", "Carrboro", "Hillsborough", "Mebane", "Cedar Grove", "Bahama", "Rougemont", "Gorman", "Rougemont"]
            },
            "Michigan": {
                "Wayne County": ["Detroit", "Dearborn", "Livonia", "Westland", "Taylor", "Canton", "Redford", "Dearborn Heights", "Garden City", "Inkster"],
                "Oakland County": ["Troy", "Farmington Hills", "Rochester Hills", "West Bloomfield", "Bloomfield Hills", "Novi", "Southfield", "Royal Oak", "Birmingham", "Berkley"],
                "Macomb County": ["Warren", "Sterling Heights", "Clinton Township", "St. Clair Shores", "Roseville", "Eastpointe", "Fraser", "Mount Clemens", "New Baltimore", "Utica"],
                "Kent County": ["Grand Rapids", "Wyoming", "Kentwood", "Grandville", "Walker", "East Grand Rapids", "Cascade", "Ada", "Caledonia", "Comstock Park"],
                "Genesee County": ["Flint", "Burton", "Grand Blanc", "Davison", "Fenton", "Swartz Creek", "Clio", "Montrose", "Mt. Morris", "Beecher"]
            }
        };
    }

    initializeEventListeners() {
        document.getElementById('analyzeBtn').addEventListener('click', () => this.analyzeLocation());
        document.getElementById('getLocationBtn').addEventListener('click', () => this.getCurrentLocation());
        
        // State dropdown change
        document.getElementById('state').addEventListener('change', (e) => this.onStateChange(e));
        
        // County dropdown change
        document.getElementById('county').addEventListener('change', (e) => this.onCountyChange(e));
        
        // City dropdown change
        document.getElementById('city').addEventListener('change', (e) => this.onCityChange(e));
    }

    populateStates() {
        const stateSelect = document.getElementById('state');
        const states = Object.keys(this.usLocations).sort();
        
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    onStateChange(event) {
        const state = event.target.value;
        const countySelect = document.getElementById('county');
        const citySelect = document.getElementById('city');
        const analyzeBtn = document.getElementById('analyzeBtn');
        
        // Reset county and city dropdowns
        countySelect.innerHTML = '<option value="">Select a county...</option>';
        citySelect.innerHTML = '<option value="">Select a city...</option>';
        countySelect.disabled = !state;
        citySelect.disabled = true;
        analyzeBtn.disabled = true;
        
        if (state) {
            const counties = Object.keys(this.usLocations[state]).sort();
            counties.forEach(county => {
                const option = document.createElement('option');
                option.value = county;
                option.textContent = county;
                countySelect.appendChild(option);
            });
        }
    }

    onCountyChange(event) {
        const state = document.getElementById('state').value;
        const county = event.target.value;
        const citySelect = document.getElementById('city');
        const analyzeBtn = document.getElementById('analyzeBtn');
        
        // Reset city dropdown
        citySelect.innerHTML = '<option value="">Select a city...</option>';
        citySelect.disabled = !county;
        analyzeBtn.disabled = true;
        
        if (state && county) {
            const cities = this.usLocations[state][county].sort();
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    }

    onCityChange(event) {
        const city = event.target.value;
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = !city;
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }

        const button = document.getElementById('getLocationBtn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
        button.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Find the closest city based on coordinates
                this.findClosestCity(lat, lng);
                
                button.innerHTML = originalText;
                button.disabled = false;
            },
            (error) => {
                alert('Error getting location: ' + error.message);
                button.innerHTML = originalText;
                button.disabled = false;
            }
        );
    }

    findClosestCity(lat, lng) {
        // This is a simplified approach - in a real app, you'd use a geocoding service
        // For demo purposes, we'll use some well-known city coordinates
        const cityCoordinates = {
            "California": {
                "Los Angeles County": {
                    "Los Angeles": [34.0522, -118.2437],
                    "Long Beach": [33.7701, -118.1937],
                    "Santa Clarita": [34.3917, -118.5426]
                }
            },
            "Texas": {
                "Harris County": {
                    "Houston": [29.7604, -95.3698],
                    "Pasadena": [29.6911, -95.2091]
                }
            },
            "Florida": {
                "Miami-Dade County": {
                    "Miami": [25.7617, -80.1918]
                }
            },
            "New York": {
                "New York County": {
                    "New York City": [40.7128, -74.0060]
                }
            }
        };

        // Simple distance calculation and selection
        // In a real app, you'd use a proper geocoding service
        this.selectLocation("California", "Los Angeles County", "Los Angeles");
    }

    selectLocation(state, county, city) {
        document.getElementById('state').value = state;
        this.onStateChange({ target: { value: state } });
        
        setTimeout(() => {
            document.getElementById('county').value = county;
            this.onCountyChange({ target: { value: county } });
            
            setTimeout(() => {
                document.getElementById('city').value = city;
                this.onCityChange({ target: { value: city } });
            }, 100);
        }, 100);
    }

    async analyzeLocation() {
        const state = document.getElementById('state').value;
        const county = document.getElementById('county').value;
        const city = document.getElementById('city').value;

        if (!state || !county || !city) {
            alert('Please select a state, county, and city.');
            return;
        }

        this.showLoading();
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const locationData = await this.getLocationData(state, county, city);
            const energyScores = this.calculateEnergyScores(state, county, city, locationData);
            this.displayResults(state, county, city, energyScores);
        } catch (error) {
            console.error('Error analyzing location:', error);
            alert('Error analyzing location. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async getLocationData(state, county, city) {
        // In a real application, you would call weather APIs here
        // For demo purposes, we'll simulate data based on state/region
        
        const mockData = {
            temperature: this.getTemperatureByState(state),
            windSpeed: this.getWindSpeedByState(state),
            precipitation: this.getPrecipitationByState(state),
            cloudCover: Math.random() * 100,
            elevation: this.getElevationByState(state),
            populationDensity: this.getPopulationDensityByState(state, county)
        };

        return mockData;
    }

    getTemperatureByState(state) {
        const stateTemps = {
            "California": 20,
            "Texas": 25,
            "Florida": 28,
            "New York": 12,
            "Illinois": 15,
            "Pennsylvania": 13,
            "Ohio": 14,
            "Georgia": 22,
            "North Carolina": 19,
            "Michigan": 10
        };
        return stateTemps[state] + (Math.random() - 0.5) * 10;
    }

    getWindSpeedByState(state) {
        const stateWind = {
            "California": 8,
            "Texas": 12,
            "Florida": 10,
            "New York": 9,
            "Illinois": 11,
            "Pennsylvania": 8,
            "Ohio": 9,
            "Georgia": 7,
            "North Carolina": 8,
            "Michigan": 10
        };
        return stateWind[state] + (Math.random() - 0.5) * 5;
    }

    getPrecipitationByState(state) {
        const statePrecip = {
            "California": 50,
            "Texas": 80,
            "Florida": 150,
            "New York": 120,
            "Illinois": 100,
            "Pennsylvania": 110,
            "Ohio": 105,
            "Georgia": 120,
            "North Carolina": 130,
            "Michigan": 90
        };
        return statePrecip[state] + (Math.random() - 0.5) * 30;
    }

    getElevationByState(state) {
        const stateElevation = {
            "California": 800,
            "Texas": 500,
            "Florida": 30,
            "New York": 300,
            "Illinois": 200,
            "Pennsylvania": 400,
            "Ohio": 300,
            "Georgia": 200,
            "North Carolina": 400,
            "Michigan": 250
        };
        return stateElevation[state] + (Math.random() - 0.5) * 200;
    }

    getPopulationDensityByState(state, county) {
        // Simulate population density based on state and county
        const baseDensity = {
            "California": 250,
            "Texas": 100,
            "Florida": 150,
            "New York": 400,
            "Illinois": 200,
            "Pennsylvania": 300,
            "Ohio": 250,
            "Georgia": 180,
            "North Carolina": 200,
            "Michigan": 150
        };
        return baseDensity[state] + (Math.random() - 0.5) * 100;
    }

    calculateEnergyScores(state, county, city, locationData) {
        const scores = {};

        // Solar Energy Score
        scores.solar = this.calculateSolarScore(state, locationData);
        
        // Wind Energy Score
        scores.wind = this.calculateWindScore(state, locationData);
        
        // Hydro Energy Score
        scores.hydro = this.calculateHydroScore(state, locationData);
        
        // Geothermal Score
        scores.thermal = this.calculateGeothermalScore(state, locationData);
        
        // Nuclear Score
        scores.nuclear = this.calculateNuclearScore(state, locationData);

        return scores;
    }

    calculateSolarScore(state, data) {
        let score = 50; // Base score
        
        // State-specific solar potential
        const stateSolar = {
            "California": 90,
            "Texas": 85,
            "Florida": 80,
            "New York": 60,
            "Illinois": 65,
            "Pennsylvania": 60,
            "Ohio": 65,
            "Georgia": 75,
            "North Carolina": 70,
            "Michigan": 55
        };
        score = stateSolar[state] || 50;
        
        // Temperature factor (moderate temperatures are better)
        const tempFactor = data.temperature > 0 && data.temperature < 35 ? 10 : -10;
        score += tempFactor;
        
        // Cloud cover factor
        const cloudFactor = Math.max(0, 100 - data.cloudCover) / 5;
        score += cloudFactor;
        
        return Math.min(100, Math.max(0, score));
    }

    calculateWindScore(state, data) {
        let score = 30; // Base score
        
        // State-specific wind potential
        const stateWind = {
            "California": 70,
            "Texas": 85,
            "Florida": 60,
            "New York": 65,
            "Illinois": 80,
            "Pennsylvania": 60,
            "Ohio": 65,
            "Georgia": 50,
            "North Carolina": 70,
            "Michigan": 75
        };
        score = stateWind[state] || 30;
        
        // Wind speed factor
        const windFactor = Math.min(20, data.windSpeed * 1.5);
        score += windFactor;
        
        return Math.min(100, Math.max(0, score));
    }

    calculateHydroScore(state, data) {
        let score = 20; // Base score
        
        // State-specific hydro potential
        const stateHydro = {
            "California": 60,
            "Texas": 40,
            "Florida": 30,
            "New York": 70,
            "Illinois": 50,
            "Pennsylvania": 65,
            "Ohio": 55,
            "Georgia": 45,
            "North Carolina": 60,
            "Michigan": 80
        };
        score = stateHydro[state] || 20;
        
        // Precipitation factor
        const precipFactor = Math.min(20, data.precipitation / 10);
        score += precipFactor;
        
        return Math.min(100, Math.max(0, score));
    }

    calculateGeothermalScore(state, data) {
        let score = 15; // Base score
        
        // State-specific geothermal potential
        const stateGeothermal = {
            "California": 90,
            "Texas": 30,
            "Florida": 10,
            "New York": 20,
            "Illinois": 15,
            "Pennsylvania": 25,
            "Ohio": 20,
            "Georgia": 15,
            "North Carolina": 20,
            "Michigan": 15
        };
        score = stateGeothermal[state] || 15;
        
        return Math.min(100, Math.max(0, score));
    }

    calculateNuclearScore(state, data) {
        let score = 25; // Base score
        
        // State-specific nuclear suitability
        const stateNuclear = {
            "California": 30,
            "Texas": 70,
            "Florida": 60,
            "New York": 40,
            "Illinois": 80,
            "Pennsylvania": 75,
            "Ohio": 70,
            "Georgia": 65,
            "North Carolina": 70,
            "Michigan": 60
        };
        score = stateNuclear[state] || 25;
        
        // Population density factor (lower is better)
        const popFactor = Math.max(0, 20 - data.populationDensity / 20);
        score += popFactor;
        
        return Math.min(100, Math.max(0, score));
    }

    displayResults(state, county, city, scores) {
        const resultsSection = document.getElementById('resultsSection');
        const locationDisplay = document.getElementById('locationDisplay');
        const energyCards = document.getElementById('energyCards');
        const recommendation = document.getElementById('recommendation');

        // Show results section
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        // Update location display
        locationDisplay.textContent = `${city}, ${county}, ${state}`;

        // Find the best energy type
        const bestEnergy = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        const bestScore = scores[bestEnergy];

        // Generate energy cards
        energyCards.innerHTML = '';
        Object.keys(this.energyTypes).forEach(energyType => {
            const energy = this.energyTypes[energyType];
            const score = Math.round(scores[energyType]);
            const isBest = energyType === bestEnergy;
            
            const card = document.createElement('div');
            card.className = `energy-card ${energyType} ${isBest ? 'best' : ''}`;
            
            card.innerHTML = `
                <div class="energy-card-header">
                    <div class="energy-icon">
                        <i class="${energy.icon}"></i>
                    </div>
                    <div class="energy-name">${energy.name}</div>
                </div>
                <div class="energy-score">${score}%</div>
                <div class="energy-details">
                    ${this.getEnergyDescription(energyType, score)}
                </div>
                <div class="energy-pros">
                    <h4>Advantages:</h4>
                    <ul>
                        ${this.getEnergyPros(energyType).map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            energyCards.appendChild(card);
        });

        // Generate recommendation
        recommendation.innerHTML = `
            <h3><i class="fas fa-star"></i> Recommended Solution</h3>
            <p>
                Based on your location in <strong>${city}, ${county}, ${state}</strong>, 
                <strong>${this.energyTypes[bestEnergy].name}</strong> 
                is the most suitable renewable energy option with a ${bestScore}% suitability score. 
                This recommendation considers factors like climate, geography, and local conditions 
                to maximize energy generation potential.
            </p>
        `;
    }

    getEnergyDescription(energyType, score) {
        const descriptions = {
            solar: score > 70 ? "Excellent solar potential with high sunlight exposure and favorable conditions." :
                   score > 50 ? "Good solar potential with moderate conditions for energy generation." :
                   "Limited solar potential due to weather or geographical factors.",
            wind: score > 70 ? "Excellent wind resources with consistent and strong wind patterns." :
                   score > 50 ? "Good wind potential with moderate wind speeds and consistency." :
                   "Limited wind potential due to low wind speeds or inconsistent patterns.",
            hydro: score > 70 ? "Excellent hydroelectric potential with abundant water resources." :
                   score > 50 ? "Good hydroelectric potential with adequate water availability." :
                   "Limited hydroelectric potential due to insufficient water resources.",
            thermal: score > 70 ? "Excellent geothermal potential with high underground heat." :
                   score > 50 ? "Good geothermal potential with moderate underground resources." :
                   "Limited geothermal potential due to geological conditions.",
            nuclear: score > 70 ? "Excellent location for nuclear facilities with low population density." :
                   score > 50 ? "Suitable location for nuclear facilities with acceptable conditions." :
                   "Limited suitability for nuclear facilities due to population or regulatory factors."
        };
        return descriptions[energyType];
    }

    getEnergyPros(energyType) {
        const pros = {
            solar: ["Clean and renewable", "Low maintenance", "Scalable", "No fuel costs", "Quiet operation"],
            wind: ["Clean and renewable", "No fuel costs", "High energy output", "Land can be used for other purposes", "Creates jobs"],
            hydro: ["Clean and renewable", "Reliable baseload power", "Long lifespan", "Flood control benefits", "Recreation opportunities"],
            thermal: ["Clean and renewable", "Baseload power", "Small footprint", "No fuel costs", "Long lifespan"],
            nuclear: ["High energy density", "Reliable baseload power", "Low carbon emissions", "Long fuel supply", "High energy output"]
        };
        return pros[energyType];
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnergyOptimizer();
});