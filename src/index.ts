import {TpPlugin} from '@tweakpane/core';

import {GrouplistBladePlugin} from './blade';
import {GrouplistStringInputPlugin} from './input';

export const plugins: TpPlugin[] = [
	GrouplistBladePlugin,
	GrouplistStringInputPlugin,
];
