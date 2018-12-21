import React from 'react'
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';

// import { Component } from 'components'
import 'styling/semantic.less'

const App = () => (
  <div
    style={{width: '800px', height: '800px', border: '1px solid red', marginLeft: '150px'}}
    onClick={(e) => {
      console.log(e);
      console.log(e.pageX);
      console.log(e.pageY);
      console.log(e.clientX);
      console.log(e.clientY);
      console.log(e.screenX);
      console.log(e.screenY);
    }}
  >
    <Rectangle width={100} height={100} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />
    <Circle r={50} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />
    <Ellipse rx={300} ry={100} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />
    <Line x1={25} x2={350} y1={25} y2={350}  stroke={{color:'#E65243'}} strokeWidth={3} />
    <Polyline points='25,25 25,350 500,350 25,25' fill={{color:'transparent'}} stroke={{color:'#E65243'}} strokeWidth={3} />
    <CornerBox size={400} width={150} orientation='topLeft' fill={{color:'#2409ba'}} stroke={{color:'#E65243'}}strokeWidth={3} />
    <Triangle width={150} height={150} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />
  </div>
);

export default App;
