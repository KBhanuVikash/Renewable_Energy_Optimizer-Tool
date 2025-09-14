# Renewable Energy Optimizer

A modern, responsive web application that helps users find the best renewable energy solution for their specific location based on coordinates.

Made using Cursor with Claude 4 Sonnet
## Features

- **Interactive Location Input**: Enter coordinates manually or use current location
- **Comprehensive Energy Analysis**: Evaluates 5 renewable energy types:
  - Solar Energy
  - Wind Energy
  - Hydroelectric
  - Geothermal
  - Nuclear Energy
- **Smart Scoring Algorithm**: Considers multiple factors for each energy type
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Results**: Instant analysis with detailed recommendations

## How It Works

1. **Input Location**: Enter latitude and longitude coordinates or use your current location
2. **Analysis**: The app analyzes your location based on:
   - Climate data (temperature, wind, precipitation)
   - Geographical factors (elevation, terrain)
   - Population density
   - Geological conditions
3. **Results**: Get scored recommendations for each energy type with the best option highlighted

## Energy Assessment Factors

### Solar Energy
- Sunlight hours and intensity
- Cloud cover patterns
- Latitude (closer to equator = better)
- Temperature conditions

### Wind Energy
- Wind speed and consistency
- Elevation and terrain
- Temperature stability

### Hydroelectric
- Water availability and precipitation
- Elevation changes
- Terrain suitability

### Geothermal
- Geological activity
- Ground temperature
- Depth requirements

### Nuclear Energy
- Population density
- Water access
- Infrastructure availability
- Regulatory considerations

## Getting Started

1. Open `index.html` in a web browser
2. Enter coordinates or click "Use Current Location"
3. Click "Analyze Location" to get recommendations
4. View detailed results and recommendations

## Technical Details

- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Styling**: Modern CSS with Flexbox and Grid
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Responsive**: Mobile-first design approach

## File Structure

```
renewable-energy-optimizer/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Future Enhancements

- Integration with real weather APIs
- More detailed geographical data
- Cost analysis and ROI calculations
- Interactive maps
- Historical data analysis
- Energy storage recommendations

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.
