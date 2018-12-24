const offsetX = -5;
const offsetY = -5;

export const defineAngularCoefficient = (P1, P2) => {
  const m = P1.coordinateX - P2.coordinateX !== 0
    ? (P1.coordinateY - P2.coordinateY) / (P1.coordinateX - P2.coordinateX)
    : 100000;
  return m;
};

export const definePolylineExpression = (P1, P2, P3, P4) => {
  const m12 = defineAngularCoefficient(P1, P2);
  const m13 = defineAngularCoefficient(P1, P3);
  const m14 = defineAngularCoefficient(P1, P4);
  const m23 = defineAngularCoefficient(P2, P3);
  const m24 = defineAngularCoefficient(P2, P4);
  const m34 = defineAngularCoefficient(P3, P4);
  const angularCoefficients = [m12, m13, m14, m23, m24, m34].sort();
  const desiredAngularCoefficients = [];
  angularCoefficients.forEach((ac, index) => {
    if (index === 0) {
      return;
    }
    if (ac === angularCoefficients[index - 1]) {
      desiredAngularCoefficients.push(ac);
    }
  });
  if (desiredAngularCoefficients.length !== 2) {
    // the points can not be vertices of the same parallelogram
    return null;
  }
  if (desiredAngularCoefficients.find(ac => ac === m12)
    && desiredAngularCoefficients.find(ac => ac === m24)) {
    return `
    ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
    ${P2.coordinateX - offsetX},${P2.coordinateY - offsetY} 
    ${P4.coordinateX - offsetX},${P4.coordinateY - offsetY}
    ${P3.coordinateX - offsetX},${P3.coordinateY - offsetY} 
    ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
    `;
  }
  if (desiredAngularCoefficients.find(ac => ac === m12)
    && desiredAngularCoefficients.find(ac => ac === m23)) {
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
  ${P2.coordinateX - offsetX},${P2.coordinateY - offsetY}
  ${P4.coordinateX - offsetX},${P4.coordinateY - offsetY} 
  ${P1.coordinateX - offsetX},${P1.coordinateY - offsetY}
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
