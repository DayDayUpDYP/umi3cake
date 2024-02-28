import React, { useRef, useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import style from './index.less';
export default function Area() {
  let mapRef = useRef();
  let map = null;
  useEffect(() => {
    console.log('aaaaa');
    AMapLoader.load({
      key: '37994ff537edf826610d167a99d8e949', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.S'等
    })
      .then((AMap) => {
        var map = new AMap.Map('container', {
          center: [121.045332, 31.19884],
          zoom: 8.8,
        });
        function addPolygon(data) {
          let polygon = new AMap.Polygon({
            path: data,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 1,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
          });
          polygon.on('mouseover', () => {
            polygon.setOptions({
              fillOpacity: 0.7,
              fillColor: '#7bccc4',
            });
          });
          polygon.on('mouseout', () => {
            polygon.setOptions({
              fillOpacity: 0.5,
              fillColor: '#ccebc5',
            });
          });
          map.add(polygon);
        }
        const shanghai = [
          [
            [
              [121.7789, 31.3102],
              [121.7279, 31.3548],
              [121.5723, 31.4361],
              [121.5093, 31.4898],
              [121.5624, 31.4864],
              [121.5856, 31.4547],
              [121.7694, 31.3907],
              [121.796, 31.3456],
              [121.7789, 31.3102],
              [121.627, 31.445],
              [121.5942, 31.4586],
              [121.5758, 31.4782],
              [121.6137, 31.4713],
              [121.635, 31.453],
              [121.627, 31.445],
            ],
          ],
        ];
        addPolygon(shanghai);
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div>
      <div id="container" className={style.map} ref={mapRef}>
        即将渲染地图。。。
      </div>
    </div>
  );
}
