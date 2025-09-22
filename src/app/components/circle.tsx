'use client';

import {
  useState,
  useEffect,
  useRef,
  type Ref,
  useImperativeHandle,
} from 'react';
import {useMap} from '@vis.gl/react-google-maps';

export type CircleProps = google.maps.CircleOptions;

/**
 * Component to render a circle on a map
 */
export const Circle = (props: CircleProps): null => {
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create the circle
    const newCircle = new google.maps.Circle({
      ...props,
      map: map,
    });
    setCircle(newCircle);

    // Clean up the circle when the component unmounts
    return () => {
      newCircle.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (circle) {
      circle.setOptions(props);
    }
  }, [circle, props]);

  return null;
};

export type CircleRef = Ref<google.maps.Circle | null>;

export function useCircleRef(): [
  CircleRef,
  Ref<HTMLDivElement>
] {
  const circleRef = useRef<google.maps.Circle | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    divRef,
    () => {
      // This is a bit of a hack to make the ref work with the Circle component
      const handler = {
        get: (target: any, prop: any, receiver: any) => {
          if (prop === 'current') {
            return circleRef.current;
          }
          return Reflect.get(target, prop, receiver);
        },
        set: (target: any, prop: any, value: any) => {
          if (prop === 'current') {
            circleRef.current = value;
            return true;
          }
          return Reflect.set(target, prop, value);
        },
      };

      return new Proxy({}, handler);
    },
    []
  );

  return [circleRef, divRef];
}
