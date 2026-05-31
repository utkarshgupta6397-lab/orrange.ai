const fs = require('fs');
const file = 'components/ui/LivingOperationsGraph.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace path rendering for Inputs
code = code.replace(
  /<path[^>]*d=\{pathD\}[^>]*\/>/g,
  `<path d={pathD} fill="none" stroke="red" strokeWidth={4} />`
);

// Remove particles
code = code.replace(/<g className="graph-particles"[\s\S]*?<\/g>/g, '');

fs.writeFileSync(file, code);
