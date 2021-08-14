import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ReactComponent as Arac } from './arac.svg';

const ACCEPTABLE_LIMIT = 120;

const mockData = [
  { x: 300, y: 600, src: 'KUTU-1', distance: null },
  { x: 650, y: 230, src: 'KUTU-2', distance: null },
  { x: 800, y: 550, src: 'KUTU-3', distance: null },
];

const App = () => {
  const [currentPosition, setCurrentPosition] = useState({ x: 220, y: 200 });
  const [boxes, setBoxes] = useState(mockData);
  useEffect(() => {
    const distanceAdded = mockData.map((item) => {
      const a = item.x - currentPosition.x;
      const b = item.y - currentPosition.y;

      const c = Math.sqrt(a * a + b * b);
      return { ...item, distance: c };
    });
    setBoxes(distanceAdded);
  }, [currentPosition.x, currentPosition.y]);

  useEffect(() => {
    const closest = boxes.find((item) => item.distance < ACCEPTABLE_LIMIT);
    if (closest) {
      console.log('You found it', closest.src);
    }
  }, [setBoxes, boxes]);

  return (
    <TransformWrapper
      defaultScale={1}
      wheel={{ disabled: true }}
      zoomIn={{ step: 10 }}
      zoomOut={{ step: 10 }}
      doubleClick={{ disabled: true }}
    >
      {({ ...rest }) => (
        <React.Fragment>
          <TransformComponent>
            <div
              onClick={(e) => {
                setCurrentPosition((prevState) => ({
                  ...prevState,
                  x: e.screenX - 10,
                  y: e.screenY - 100,
                }));
              }}
              className="container"
              style={{
                width: '100vw',
                height: '100vh',
                background:
                  'repeating-linear-gradient(0deg, rgba(120, 120, 120, 0.2), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 240px), repeating-linear-gradient(-90deg, rgba(120, 120, 120, 0.22), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 240px), repeating-linear-gradient(0deg, rgba(120, 120, 120, 0.22), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 60px), repeating-linear-gradient(-90deg, rgba(120, 120, 120, 0.22), rgba(120, 120, 120, 0.22) 2px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0) 60px)',
                pointerEvents: 'auto !important',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',

                  position: 'absolute',
                  top: `${currentPosition.y}px`,
                  left: `${currentPosition.x}px`,
                }}
              >
                <Arac width="120px" height="120px" />
              </div>
              {mockData.map((item) => (
                <div
                  key={shortid()}
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '3px dashed black',
                    position: 'absolute',
                    top: `${item.y}px`,
                    left: `${item.x}px`,
                  }}
                >
                  {item.src}
                </div>
              ))}
            </div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default App;
