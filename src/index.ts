import {TpPlugin} from '@tweakpane/core';

import {GrouplistBladePlugin} from './blade/index.js';
import {GrouplistStringInputPlugin} from './input/index.js';

export const id = 'grouplist';
export const plugins: TpPlugin[] = [
	GrouplistBladePlugin,
	GrouplistStringInputPlugin,
];
