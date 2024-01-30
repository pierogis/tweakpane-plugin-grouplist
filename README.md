# tweakpane-plugin-grouplist
plugin to use option groups in select dropdown for [Tweakpane][tweakpane].


## Installation


### Browser
```html
<script src="tweakpane.min.js"></script>
<script src="tweakpane-plugin-grouplist.min.js"></script>
<script>
  const pane = new Tweakpane.Pane();
  pane.registerPlugin(TweakpaneGrouplistPlugin);
</script>
```


### Package
```js
import { Pane } from 'tweakpane';
import * as GrouplistPlugin from '@pierogis/tweakpane-plugin-grouplist';

const pane = new Pane();
pane.registerPlugin(GrouplistPlugin);
```


## Usage
```js
// use nested objects to define option group labels, option names, and option values
const objectOptgroups = {
  [group1Name]: {
    [group1Option1Name]: group1Option1Value,
    [group1Option2Name]: group1Option2Value
  },
  [group2Name]: {
    [group2Option1Name]: group2Option1Value,
    [group2Option2Name]: group2Option2Value
  }
}

// available as blade
pane.addBlade({
  view: 'grouplist',
  value: group1Option1Value,
  optgroups: objectOptgroups,
  label: 'selected'
})

const params = {
  'selected': group1Option1Value,
};

// or input
pane.addInput(params, 'selected', {
  view: 'grouplist',
  optgroups: objectOptgroups
}).on('change', (ev) => {
  console.log(ev.value);
});

// OR

// use nested objects to define option group labels, option names, and option values
const arrayOptgroups = [
  {
    text: group1Name,
    value: [
      {text: 'group 1 option 1', value: group1Option1Value},
      {text: 'group 1 option 2', value: group1Option2Value}
    ]
  },
  {
    text: group2Name,
    value: [
      {text: 'group 2 option 1', value: group2Option1Value},
      {text: 'group 2 option 2', value: group2Option2Value}
    ]
  }
]

pane.addBlade({
  view: 'grouplist',
  value: group1Option1Value,
  optgroups: arrayOptgroups,
  label: 'selected'
})

const params = {
  'selected': group1Option1Value,
};

pane.addInput(params, 'selected', {
  view: 'grouplist',
  optgroups: arrayOptgroups
}).on('change', (ev) => {
  console.log(ev.value);
});
```


[tweakpane]: https://github.com/cocopon/tweakpane/
