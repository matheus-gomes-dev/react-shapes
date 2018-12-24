export const defineAngularCoefficient = (P1, P2) => {
  const m = P1.coordinateX - P2.coordinateX !== 0
    ? (P1.coordinateY - P2.coordinateY) / (P1.coordinateX - P2.coordinateX)
    : 100000;
  return m;
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
  // console.log('-----------------------');
  // console.log(X1, Y1, X2, Y2, X3, Y3);
  return [
    { coordinateX: Math.round(X1), coordinateY: Math.round(Y1) },
    { coordinateX: Math.round(X2), coordinateY: Math.round(Y2) },
    { coordinateX: Math.round(X3), coordinateY: Math.round(Y3) },
  ];
};