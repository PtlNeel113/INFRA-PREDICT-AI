// India state center coordinates and boundaries for geographic visualization
export const INDIA_STATE_COORDINATES = [
  { name: 'Jammu & Kashmir', shortCode: 'JK', lat: 33.7782, lng: 76.5762 },
  { name: 'Ladakh', shortCode: 'LA', lat: 34.1526, lng: 77.5771 },
  { name: 'Himachal Pradesh', shortCode: 'HP', lat: 31.1048, lng: 77.1734 },
  { name: 'Punjab', shortCode: 'PB', lat: 31.1471, lng: 75.3412 },
  { name: 'Uttarakhand', shortCode: 'UK', lat: 30.0668, lng: 79.0193 },
  { name: 'Haryana', shortCode: 'HR', lat: 29.0588, lng: 76.0856 },
  { name: 'Delhi', shortCode: 'DL', lat: 28.7041, lng: 77.1025 },
  { name: 'Rajasthan', shortCode: 'RJ', lat: 27.0238, lng: 74.2179 },
  { name: 'Uttar Pradesh', shortCode: 'UP', lat: 26.8467, lng: 80.9462 },
  { name: 'Bihar', shortCode: 'BR', lat: 25.0961, lng: 85.3131 },
  { name: 'Sikkim', shortCode: 'SK', lat: 27.5330, lng: 88.5122 },
  { name: 'Arunachal Pradesh', shortCode: 'AR', lat: 28.2180, lng: 94.7278 },
  { name: 'Nagaland', shortCode: 'NL', lat: 26.1584, lng: 94.5624 },
  { name: 'Manipur', shortCode: 'MN', lat: 24.6637, lng: 93.9063 },
  { name: 'Mizoram', shortCode: 'MZ', lat: 23.1645, lng: 92.9376 },
  { name: 'Tripura', shortCode: 'TR', lat: 23.9408, lng: 91.9882 },
  { name: 'Meghalaya', shortCode: 'ML', lat: 25.4670, lng: 91.3662 },
  { name: 'Assam', shortCode: 'AS', lat: 26.2006, lng: 92.9376 },
  { name: 'West Bengal', shortCode: 'WB', lat: 22.9868, lng: 87.8550 },
  { name: 'Jharkhand', shortCode: 'JH', lat: 23.6102, lng: 85.2799 },
  { name: 'Odisha', shortCode: 'OD', lat: 20.9517, lng: 85.0985 },
  { name: 'Chhattisgarh', shortCode: 'CG', lat: 21.2787, lng: 81.8661 },
  { name: 'Madhya Pradesh', shortCode: 'MP', lat: 22.9734, lng: 78.6569 },
  { name: 'Gujarat', shortCode: 'GJ', lat: 22.2587, lng: 71.1924 },
  { name: 'Maharashtra', shortCode: 'MH', lat: 19.7515, lng: 75.7139 },
  { name: 'Andhra Pradesh', shortCode: 'AP', lat: 15.9129, lng: 79.7400 },
  { name: 'Karnataka', shortCode: 'KA', lat: 15.3173, lng: 75.7139 },
  { name: 'Goa', shortCode: 'GA', lat: 15.2993, lng: 74.1240 },
  { name: 'Telangana', shortCode: 'TG', lat: 18.1124, lng: 79.0193 },
  { name: 'Tamil Nadu', shortCode: 'TN', lat: 11.1271, lng: 78.6569 },
  { name: 'Kerala', shortCode: 'KL', lat: 10.8505, lng: 76.2711 },
  { name: 'Puducherry', shortCode: 'PY', lat: 11.9416, lng: 79.8083 },
  { name: 'Andaman & Nicobar', shortCode: 'AN', lat: 11.7401, lng: 92.6586 },
];

// Simplified India boundary path for SVG
// This is a stylized representation - for production, use actual GeoJSON
export const INDIA_BOUNDARY_PATH = `M 380,120 
  C 390,125 395,135 405,145 
  L 420,155 435,165 450,170 
  L 470,175 490,180 510,182 530,185 
  C 545,188 560,192 570,200 
  L 580,210 585,225 588,240 
  C 590,255 585,270 580,285 
  L 575,300 568,315 560,330 
  C 555,345 548,360 540,375 
  L 530,390 520,405 510,420 
  C 502,435 492,450 480,465 
  L 468,478 455,490 442,500 
  C 430,508 418,515 405,520 
  L 390,525 375,528 360,530 
  C 345,530 330,528 318,522 
  L 305,515 295,505 288,492 
  L 282,478 278,462 275,445 
  C 273,430 272,415 270,400 
  L 268,385 265,370 262,355 
  C 258,340 253,325 247,312 
  L 240,298 232,285 224,273 
  C 215,260 205,248 195,238 
  L 183,228 172,220 162,213 
  C 152,206 143,200 135,195 
  L 125,188 118,182 112,175 
  C 108,168 106,160 108,152 
  L 112,143 118,136 126,130 
  C 135,124 145,120 156,118 
  L 170,116 185,116 200,117 
  C 215,119 230,122 245,127 
  L 260,133 275,140 290,148 
  C 305,156 320,165 335,173 
  L 350,180 365,185 380,188 
  C 390,185 395,178 398,170 
  L 400,160 395,150 390,142 
  L 385,133 380,120 Z`;

// India outline for realistic map rendering
// Coordinates are approximate and simplified for demo - use real GeoJSON for production
export const INDIA_GEOJSON_SIMPLIFIED = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'India' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [68.176645, 23.691965], // Gujarat west
          [68.162386, 25.209588], // Gujarat-Rajasthan
          [70.648422, 29.013312], // Rajasthan
          [73.024750, 30.921074], // Punjab
          [75.656934, 31.512287], // Punjab-HP
          [76.916035, 32.907794], // HP
          [78.458446, 34.168931], // J&K
          [79.208892, 35.033435], // Ladakh
          [77.837451, 35.494009], // Ladakh north
          [78.738894, 34.331215], // J&K east
          [79.188625, 32.994395], // Uttarakhand
          [80.276870, 30.356758], // Uttarakhand
          [81.334351, 28.709167], // Nepal border
          [83.509355, 27.363882], // Nepal border
          [85.169754, 26.669073], // Bihar
          [87.024946, 26.415521], // West Bengal
          [88.932650, 26.414617], // West Bengal-Sikkim
          [89.745529, 26.717202], // Assam
          [91.216905, 26.808648], // Assam
          [92.099486, 26.863207], // Assam
          [93.325188, 26.883267], // Nagaland
          [94.603249, 27.215556], // Arunachal
          [95.156483, 27.983247], // Arunachal
          [96.413646, 28.335945], // Arunachal east
          [97.396916, 27.882536], // Arunachal-Myanmar
          [97.133999, 27.083373], // Myanmar border
          [96.408228, 26.508814], // Manipur
          [95.159160, 26.001303], // Manipur
          [94.129830, 25.087859], // Mizoram
          [93.032598, 24.072639], // Mizoram
          [92.379202, 23.270983], // Tripura
          [91.737529, 22.994051], // Tripura-Bangladesh
          [91.412614, 22.765019], // Bangladesh border
          [90.586957, 22.392794], // Bangladesh border
          [89.844219, 21.965725], // Bangladesh-West Bengal
          [89.032181, 21.985110], // West Bengal coast
          [88.207515, 21.711443], // West Bengal coast
          [87.224747, 21.834106], // West Bengal-Odisha
          [86.398182, 20.780856], // Odisha
          [85.821658, 19.817960], // Odisha coast
          [84.671550, 19.311393], // Andhra Pradesh
          [83.369512, 18.295848], // Andhra Pradesh
          [82.689140, 17.046830], // Andhra Pradesh
          [81.687988, 16.308629], // Andhra Pradesh coast
          [80.518593, 15.612715], // Andhra Pradesh
          [80.230818, 13.838545], // Tamil Nadu
          [79.857298, 12.991746], // Tamil Nadu
          [79.339960, 11.963553], // Tamil Nadu coast
          [78.885660, 10.422718], // Tamil Nadu-Kerala
          [77.838115, 9.305549], // Kerala
          [76.967902, 8.891660], // Kerala coast
          [76.260588, 9.360946], // Kerala coast
          [75.594157, 10.229094], // Kerala
          [75.391089, 11.385758], // Kerala-Karnataka
          [74.730650, 12.773094], // Karnataka coast
          [74.123996, 14.609838], // Karnataka-Goa
          [73.922024, 15.209059], // Goa
          [73.329700, 16.029967], // Maharashtra coast
          [72.819725, 18.929588], // Maharashtra-Goa
          [72.899743, 19.886487], // Maharashtra
          [72.818990, 21.113320], // Maharashtra-Gujarat
          [72.685696, 22.726619], // Gujarat coast
          [72.236026, 23.884385], // Gujarat
          [71.184570, 24.299016], // Gujarat
          [70.074077, 24.389335], // Gujarat-Rajasthan
          [68.842685, 24.264852], // Rajasthan
          [68.176645, 23.691965], // Back to start
        ]],
      },
    },
  ],
};
