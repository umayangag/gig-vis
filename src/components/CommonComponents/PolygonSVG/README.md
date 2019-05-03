PolygonGroupList example:

```js
<PolygonGroupList
  polygonGroupList={[
    {
      polygon_list: [
        [
          [100, 200],
          [100, 400],
          [200, 300],
        ],  
      ],
      name: 'Red Triangle',
      centre_point: [150, 150],
    },
    {
      polygon_list: [
        [
          [200, 200],
          [200, 600],
          [600, 600],
          [600, 200],
        ],  
      ],
      name: 'Blue Square',
      centre_point: [400, 400],
    }
  ]}
  nameToScaleMap={{}}
  nameToStyleMap={{
      'Red Triangle': {fill: 'red'},
      'Blue Square': {fill: 'blue'},
  }}
/>
```
