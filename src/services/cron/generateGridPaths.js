export const generateGridPaths = (chipPos = [0, 0, 0], count = 6, spacing = 1.2) => {
  const paths = [];
  const pinSpacing = 0.3;
  const pinsPerSide = 6;
  const chipSize = 1.2;
  const spread = 3.5; // How far out paths should spread
  const dropDepth = -0.2; // Y-level where paths drop down

  const sides = [
    { axis: 'x', fixed: chipPos[2] + chipSize, dir: 1 },   // Front
    { axis: 'x', fixed: chipPos[2] - chipSize, dir: -1 },  // Back
    { axis: 'z', fixed: chipPos[0] + chipSize, dir: 1 },   // Right
    { axis: 'z', fixed: chipPos[0] - chipSize, dir: -1 }   // Left
  ];

  for (const side of sides) {
    for (let i = -Math.floor(pinsPerSide / 2); i <= Math.floor(pinsPerSide / 2); i++) {
      const offset = i * pinSpacing;
      let pinPos, bend1, bend2, endPos;

      if (side.axis === 'x') {
        // Front/Back: fixed Z, move along X
        pinPos = [chipPos[0] + offset, chipPos[1], side.fixed];

        const bendZ = side.fixed + side.dir * 1.0; // Push farther out
        const farZ = side.fixed + side.dir * spread; // Long forward line

        bend1 = [chipPos[0] + offset, chipPos[1], bendZ]; // slight forward
        bend2 = [chipPos[0] + offset, chipPos[1], farZ];  // stretch outward
        endPos = [chipPos[0] + offset, dropDepth, farZ];  // drop down far

      } else {
        // Left/Right: fixed X, move along Z
        pinPos = [side.fixed, chipPos[1], chipPos[2] + offset];

        const bendX = side.fixed + side.dir * 1.0;
        const farX = side.fixed + side.dir * spread;

        bend1 = [bendX, chipPos[1], chipPos[2] + offset];
        bend2 = [farX, chipPos[1], chipPos[2] + offset];
        endPos = [farX, dropDepth, chipPos[2] + offset];
      }

      paths.push([pinPos, bend1, bend2, endPos]);
    }
  }

  return paths;
};
