const offsetX = -5;
const offsetY = -5;

export const defineAngularCoefficient = (P1, P2) => {
  const m = P1.coordinateX - P2.coordinateX !== 0
    ? (P1.coordinateY - P2.coordinateY) / (P1.coordinateX - P2.coordinateX)
    : 100000;
  return m;
};

export const defineParallelLinesAngularCoefficients = (P1, P2, P3, P4) => {
  const m12 = defineAngularCoefficient(P1, P2);
  const m13 = defineAngularCoefficient(P1, P3);
  const m14 = defineAngularCoefficient(P1, P4);
  const m23 = defineAngularCoefficient(P2, P3);
  const m24 = defineAngularCoefficient(P2, P4);
  const m34 = defineAngularCoefficient(P3, P4);
  const angularCoefficients = [m12, m13, m14, m23, m24, m34].sort();
  const parallelLinesAngularCoefficients = [];
  angularCoefficients.forEach((ac, index) => {
    if (index === 0) {
      return;
    }
    if (ac === angularCoefficients[index - 1]) {
      parallelLinesAngularCoefficients.push(ac);
    }
  });
  return parallelLinesAngularCoefficients;
};

export const isParallelogram = (P1, P2, P3, P4) => {
  if (!P1 || !P2 || !P3 || !P4) {
    return false;
  }
  const parallelLinesAngularCoefficients = defineParallelLinesAngularCoefficients(P1, P2, P3, P4);
  if (parallelLinesAngularCoefficients.length !== 2) {
    return false;
  }
  return true;
};

export const definePolylineExpression = (P1, P2, P3, P4) => {
  const m12 = defineAngularCoefficient(P1, P2);
  const m13 = defineAngularCoefficient(P1, P3);
  const parallelLinesAngularCoefficients = defineParallelLinesAngularCoefficients(P1, P2, P3, P4);
  if (parallelLinesAngularCoefficients.length !== 2) {
    // the points can not be vertices of the same parallelogram
    return null;
  }
  if (parallelLinesAngularCoefficients.find(ac => ac === m12) === undefined) {
    return `
    ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
    ${P3.coordinateX - offsetX},${P3.coordinateY - offsetY} 
    ${P2.coordinateX - offsetX},${P2.coordinateY - offsetY}
    ${P4.coordinateX - offsetX},${P4.coordinateY - offsetY} 
    ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
    `;
  }
  if (parallelLinesAngularCoefficients.find(ac => ac === m13) === undefined) {
    return `
    ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
    ${P2.coordinateX - offsetX},${P2.coordinateY - offsetY} 
    ${P3.coordinateX - offsetX},${P3.coordinateY - offsetY}
    ${P4.coordinateX - offsetX},${P4.coordinateY - offsetY} 
    ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
    `;
  }
  return `
  ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
  ${P3.coordinateX - offsetX},${P3.coordinateY - offsetY} 
  ${P4.coordinateX - offsetX},${P4.coordinateY - offsetY}
  ${P2.coordinateX - offsetX},${P2.coordinateY - offsetY} 
  ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
  `;
};

export const definePolylineQuadrilateralExpression = (parallelogramPoints, points) => {
  const m01 = defineAngularCoefficient(parallelogramPoints[0], parallelogramPoints[1]);
  const m02 = defineAngularCoefficient(parallelogramPoints[0], parallelogramPoints[2]);
  const parallelLinesAngularCoefficients = defineParallelLinesAngularCoefficients(
    parallelogramPoints[0],
    parallelogramPoints[1],
    parallelogramPoints[2],
    parallelogramPoints[3]
  );
  if (parallelLinesAngularCoefficients.find(ac => ac === m01) === undefined) {
    return `
    ${points[0].coordinateX - offsetX},${points[0].coordinateY - offsetY}
    ${points[2].coordinateX - offsetX},${points[2].coordinateY - offsetY} 
    ${points[1].coordinateX - offsetX},${points[1].coordinateY - offsetY}
    ${points[3].coordinateX - offsetX},${points[3].coordinateY - offsetY} 
    ${points[0].coordinateX - offsetX},${points[0].coordinateY - offsetY}
    `;
  }
  if (parallelLinesAngularCoefficients.find(ac => ac === m02) === undefined) {
    return `
    ${points[0].coordinateX - offsetX},${points[0].coordinateY - offsetY}
    ${points[1].coordinateX - offsetX},${points[1].coordinateY - offsetY} 
    ${points[2].coordinateX - offsetX},${points[2].coordinateY - offsetY}
    ${points[3].coordinateX - offsetX},${points[3].coordinateY - offsetY} 
    ${points[0].coordinateX - offsetX},${points[0].coordinateY - offsetY}
    `;
  }
  return `
  ${points[0].coordinateX - offsetX},${points[0].coordinateY - offsetY}
  ${points[2].coordinateX - offsetX},${points[2].coordinateY - offsetY} 
  ${points[3].coordinateX - offsetX},${points[3].coordinateY - offsetY}
  ${points[1].coordinateX - offsetX},${points[1].coordinateY - offsetY} 
  ${points[0].coordinateX - offsetX},${points[0].coordinateY - offsetY}
  `;
};

export const define4thPoints = (P1, P2, P3) => {
  // defining angular coefficient
  const m1 = defineAngularCoefficient(P3, P1);
  const m2 = defineAngularCoefficient(P2, P1);
  const m3 = defineAngularCoefficient(P3, P2);

  // check if points belong to the same line
  if (m1 === m2 || m1 === m3 || m2 === m3) {
    return [
      { coordinateX: null, coordinateY: null },
      { coordinateX: null, coordinateY: null },
      { coordinateX: null, coordinateY: null },
    ];
  }

  // defining intersection points
  const Y1 = ((m1 * m2 * (P3.coordinateX - P2.coordinateX))
    + (m2 * P2.coordinateY)
    - (m1 * P3.coordinateY)) / (m2 - m1);
  const X1 = ((m1 * P2.coordinateX) - (m2 * P3.coordinateX)
    - P2.coordinateY + P3.coordinateY) / (m1 - m2);

  const Y2 = ((m2 * m3 * (P1.coordinateX - P3.coordinateX))
    + (m3 * P3.coordinateY)
    - (m2 * P1.coordinateY)) / (m3 - m2);
  const X2 = ((m2 * P3.coordinateX) - (m3 * P1.coordinateX)
    - P3.coordinateY + P1.coordinateY) / (m2 - m3);

  const Y3 = ((m1 * m3 * (P1.coordinateX - P2.coordinateX))
    + (m3 * P2.coordinateY)
    - (m1 * P1.coordinateY)) / (m3 - m1);
  const X3 = ((m1 * P2.coordinateX) - (m3 * P1.coordinateX)
    - P2.coordinateY + P1.coordinateY) / (m1 - m3);
  return [
    { coordinateX: Math.round(X1), coordinateY: Math.round(Y1) },
    { coordinateX: Math.round(X2), coordinateY: Math.round(Y2) },
    { coordinateX: Math.round(X3), coordinateY: Math.round(Y3) },
  ];
};

export const calculateDistance = (P1, P2) => {
  const xDifference = P1.coordinateX - P2.coordinateX;
  const yDifference = P1.coordinateY - P2.coordinateY;
  return (Math.sqrt((xDifference * xDifference) + (yDifference * yDifference)));
};

export const calculateAreaOfParallelogram = (P1, P2, P3, P4) => {
  const parallelLinesAngularCoefficients = defineParallelLinesAngularCoefficients(P1, P2, P3, P4);
  const m12 = defineAngularCoefficient(P1, P2);
  const m13 = defineAngularCoefficient(P1, P3);

  if (parallelLinesAngularCoefficients.length !== 2) {
    return null;
  }
  if (parallelLinesAngularCoefficients.find(ac => ac === m12) === undefined) {
    const distanceP1P2 = calculateDistance(P1, P2);
    const distanceP3P4 = calculateDistance(P3, P4);
    return Math.round((distanceP1P2 * distanceP3P4) / 2);
  }
  if (parallelLinesAngularCoefficients.find(ac => ac === m13) === undefined) {
    const distanceP1P3 = calculateDistance(P1, P3);
    const distanceP2P4 = calculateDistance(P2, P4);
    return Math.round((distanceP1P3 * distanceP2P4) / 2);
  }
  const distanceP1P4 = calculateDistance(P1, P4);
  const distanceP2P3 = calculateDistance(P2, P3);
  return Math.round((distanceP1P4 * distanceP2P3) / 2);
};

// reference: https://en.wikipedia.org/wiki/Shoelace_formula
export const calculateAreaOfQuadrilateral = (parallelogramPoints, points) => {
  const m01 = defineAngularCoefficient(parallelogramPoints[0], parallelogramPoints[1]);
  const m02 = defineAngularCoefficient(parallelogramPoints[0], parallelogramPoints[2]);
  const parallelLinesAngularCoefficients = defineParallelLinesAngularCoefficients(
    parallelogramPoints[0],
    parallelogramPoints[1],
    parallelogramPoints[2],
    parallelogramPoints[3]
  );
  // 0 -> 1 -> 2 -> 3 -> 0
  if (parallelLinesAngularCoefficients.find(ac => ac === m02) === undefined) {
    const area = 0.5 * Math.abs(
      (points[0].coordinateX * points[1].coordinateY)
      + (points[1].coordinateX * points[2].coordinateY)
      + (points[2].coordinateX * points[3].coordinateY)
      + (points[3].coordinateX * points[0].coordinateY)
      - (points[1].coordinateX * points[0].coordinateY)
      - (points[2].coordinateX * points[1].coordinateY)
      - (points[3].coordinateX * points[2].coordinateY)
      - (points[0].coordinateX * points[3].coordinateY)
    );
    return Math.round(area);
  }
  // 0 -> 2 -> 1 -> 3 -> 0
  if (parallelLinesAngularCoefficients.find(ac => ac === m01) === undefined) {
    const area = 0.5 * Math.abs(
      (points[0].coordinateX * points[2].coordinateY)
      + (points[2].coordinateX * points[1].coordinateY)
      + (points[1].coordinateX * points[3].coordinateY)
      + (points[3].coordinateX * points[0].coordinateY)
      - (points[2].coordinateX * points[0].coordinateY)
      - (points[1].coordinateX * points[2].coordinateY)
      - (points[3].coordinateX * points[1].coordinateY)
      - (points[0].coordinateX * points[3].coordinateY)
    );
    return Math.round(area);
  }
  // 0 -> 2 -> 3 -> 1 -> 0
  const area = 0.5 * Math.abs(
    (points[0].coordinateX * points[2].coordinateY)
    + (points[2].coordinateX * points[3].coordinateY)
    + (points[3].coordinateX * points[1].coordinateY)
    + (points[1].coordinateX * points[0].coordinateY)
    - (points[2].coordinateX * points[0].coordinateY)
    - (points[3].coordinateX * points[2].coordinateY)
    - (points[1].coordinateX * points[3].coordinateY)
    - (points[0].coordinateX * points[1].coordinateY)
  );
  return Math.round(area);
};

export const defineCenterOfMass = (P1, P2, P3, P4) => {
  const coordinateX = (P1.coordinateX + P2.coordinateX + P3.coordinateX + P4.coordinateX) / 4;
  const coordinateY = (P1.coordinateY + P2.coordinateY + P3.coordinateY + P4.coordinateY) / 4;
  return { coordinateX, coordinateY };
};

export const checkIfPointsAreTooClose = (points) => {
  let answer = false;
  if (points.length === 1) {
    return answer;
  }
  points.forEach((point, index) => {
    if (index === 0) {
      return;
    }
    for (let i = 0; i < index; i += 1) {
      if (calculateDistance(point, points[i]) < 12) {
        answer = true;
      }
    }
  });
  return answer;
};
