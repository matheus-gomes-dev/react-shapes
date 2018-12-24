import { define4thPoints, defineAngularCoefficient, definePolylineExpression } from './parallelogramDraw';

const P1 = { coordinateX: 0, coordinateY: 10 };
const P2 = { coordinateX: 0, coordinateY: 0 };
const P3 = { coordinateX: 10, coordinateY: 0 };
const P4 = { coordinateX: 4, coordinateY: 8 };
const P5 = { coordinateX: 0, coordinateY: 4 };
const P6 = { coordinateX: 4, coordinateY: 0 };
const P7 = { coordinateX: 0, coordinateY: 0 };
const P8 = { coordinateX: 2, coordinateY: 2 };
const P9 = { coordinateX: 4, coordinateY: 4 };
const P10 = { coordinateX: -4, coordinateY: 4 };

describe('Parallelogram Draw Tests', () => {
  describe(`
    *** Smoke tests ***
  `, () => {
    test('Function define4thPoints must exist', () => {
      expect(define4thPoints).toBeDefined();
    });
    test('Function defineAngularCoefficient must exist', () => {
      expect(defineAngularCoefficient).toBeDefined();
    });
    test('Function definePolylineExpression must exist', () => {
      expect(definePolylineExpression).toBeDefined();
    });
  });
  describe(`
    *** Defining parallelogram ***
  `, () => {
    describe('Calculating the angular coefficient of a line that passes through points P1 and P2:', () => {
      test(`
        When:
          -P1 is positioned at (0, 0)
          -P2 is positioned at (4, 4)
        Then the angular coefficient will be m = 1
      `, () => {
        expect(defineAngularCoefficient(P7, P9)).toBe(1);
      });
      test(`
        When:
          -P1 is positioned at (0, 0)
          -P2 is positioned at (-4, 4)
        Then the angular coefficient will be m = -1
      `, () => {
        expect(defineAngularCoefficient(P7, P10)).toBe(-1);
      });
      test(`
        When:
          -P1 is positioned at (0, 0)
          -P2 is positioned at (0, 10)
        Then the angular coefficient will be approximate to 100000, since the line is parallel to the y axis
      `, () => {
        expect(defineAngularCoefficient(P7, P1)).toBe(100000);
      });
    });
    describe(`
    
      Defining the position of the 4th point of the parallelogram:
      
      If the position of 3 points (P1, P2, P3) of a parallelogram is known, we can define:
      
      -The equation of the line that passes through P1 and P2, that will be named r12.
      -The equation of the line that passes through P1 and P3, that will be named r13.
      -The equation of the line that passes through P2 and P3, that will be named r23.
      
      Now we can also define:
      
      -The equation of the line that is parallel to r23 and passes through P1, that will be named r1;
      -The equation of the line that is parallel to r13 and passes through P2, that will be named r2;
      -The equation of the line that is parallel to r12 and passes through P3. that will be named r3;
      
      By definition, in Euclidean geometry, a parallelogram is a simple (non-self-intersecting) 
      quadrilateral with two pairs of parallel sides. Therefore, given P1, P2 and P3, 
      we have 3 possible parallelograms:

      -The first parallelogram has the 4th point positioned at the intersection of r3 and r2;
      -The second parallelogram has the 4th point positioned at the intersection of r1 and r3;
      -The third parallelogram has the 4th point positioned at the intersection of r2 and r1;

      If there's a line that passes through P1, P2 and P3, then is not possible to define 
      any parallelogram!
    `, () => {
      test(`
        When:
          -P1 is positioned at (0,10)
          -P2 is positioned at (0,0)
          -P3 is positioned at (10,0)
        Then:
          -The 4th point of the first parallelogram will be at (10, -10)
          -The 4th point of the second parallelogram will be at (10, 10)
          -The 4th point of the third parallelogram will be at (-10, 10)`, () => {
        const positions4thPoints = define4thPoints(P1, P2, P3);
        expect(positions4thPoints[0].coordinateX).toBe(10);
        expect(positions4thPoints[0].coordinateY).toBe(-10);
        expect(positions4thPoints[1].coordinateX).toBe(10);
        expect(positions4thPoints[1].coordinateY).toBe(10);
        expect(positions4thPoints[2].coordinateX).toBe(-10);
        expect(positions4thPoints[2].coordinateY).toBe(10);
      });
      test(`
        When:
          -P1 is positioned at (4,8)
          -P2 is positioned at (0,4)
          -P3 is positioned at (4,0)
        Then:
          -The 4th point of the first parallelogram will be at (0, -4)
          -The 4th point of the second parallelogram will be at (8, 4)
          -The 4th point of the third parallelogram will be at (0, 12)`, () => {
        const positions4thPoints = define4thPoints(P4, P5, P6);
        expect(positions4thPoints[0].coordinateX).toBeCloseTo(0);
        expect(positions4thPoints[0].coordinateY).toBe(-4);
        expect(positions4thPoints[1].coordinateX).toBe(8);
        expect(positions4thPoints[1].coordinateY).toBe(4);
        expect(positions4thPoints[2].coordinateX).toBeCloseTo(0);
        expect(positions4thPoints[2].coordinateY).toBe(12);
      });
      test(`
        When:
          -P1 is positioned at (0,0)
          -P2 is positioned at (2,2)
          -P3 is positioned at (4,4)
        Then there's no possible parallelogram to be formed.`, () => {
        const positions4thPoints = define4thPoints(P7, P8, P9);
        expect(positions4thPoints[0].coordinateX).toBeNull();
        expect(positions4thPoints[0].coordinateY).toBeNull();
        expect(positions4thPoints[1].coordinateX).toBeNull();
        expect(positions4thPoints[1].coordinateY).toBeNull();
        expect(positions4thPoints[2].coordinateX).toBeNull();
        expect(positions4thPoints[2].coordinateY).toBeNull();
      });
    });
    describe(`
      Defining parallelogram's Polyline expression:
    `, () => {
      test(`
        When P1, P2, P3, P4 are vertices of a parallelogram and:
          -P1 is positioned at (0,10)
          -P2 is positioned at (0,0)
          -P3 is positioned at (10,0)
          -P4 is positioned at (10,10)
        definePolylineExpression(P1, P2, P3, P4) should return a expression to form a parallelogram`, () => {
        const expression = definePolylineExpression(
          P1,
          P2,
          P3,
          { coordinateX: 10, coordinateY: 10 }
        );
        expect(expression).toBeTruthy();
      });
      test(`
        When P1, P2, P3, P4 are not vertices of a parallelogram and:
          -P1 is positioned at (0,10)
          -P2 is positioned at (0,0)
          -P3 is positioned at (10,0)
          -P4 is positioned at (15,10)
        definePolylineExpression(P1, P2, P3, P4) should return null`, () => {
        const expression = definePolylineExpression(
          P1,
          P2,
          P3,
          { coordinateX: 15, coordinateY: 10 }
        );
        expect(expression).toBeNull();
      });
    });
  });
});
