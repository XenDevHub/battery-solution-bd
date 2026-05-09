const fs = require('fs');
const path = require('path');

const brands = [
  { name: 'rahimafrooz', color: '#0055A5', text: 'RAHIMAFROOZ' },
  { name: 'hamko', color: '#E31837', text: 'HAMKO' },
  { name: 'volta', color: '#008C45', text: 'VOLTA' },
  { name: 'navana', color: '#FF671F', text: 'NAVANA' },
  { name: 'pylontech', color: '#005b9f', text: 'PYLONTECH' },
  { name: 'growatt', color: '#f39c12', text: 'GROWATT' },
  { name: 'felicity', color: '#27ae60', text: 'FELICITY' },
  { name: 'lucas', color: '#002B5E', text: 'LUCAS' },
  { name: 'globatt', color: '#D4002A', text: 'GLOBATT' }
];

const dir = path.join(__dirname, 'public', 'brands');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

brands.forEach(brand => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
  <rect width="200" height="80" fill="transparent"/>
  <text x="100" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="${brand.color}" text-anchor="middle" alignment-baseline="middle" letter-spacing="1">
    ${brand.text}
  </text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${brand.name}.svg`), svg);
});

console.log('Logos generated.');
