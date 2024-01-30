import {
	BaseBladeParams,
	BladePlugin,
	createValue,
	LabeledValueBladeController,
	LabelPropsObject,
	MicroParser,
	parseRecord,
	ValueMap,
} from '@tweakpane/core';

import {GrouplistController} from '../common/controller.js';
import type {GrouplistParamsOptgroups} from '../common/params.js';
import {
	normalizeGrouplistOptgroups,
	parseGrouplistOptgroups,
} from '../common/util.js';
import {GrouplistApi} from './api.js';
import { Semver } from "tweakpane";

export interface GrouplistBladeParams<T> extends BaseBladeParams {
	optgroups: GrouplistParamsOptgroups<T>;
	value: T;
	view: 'grouplist';

	label?: string;
}

export const GrouplistBladePlugin = (function <T>(): BladePlugin<
	GrouplistBladeParams<T>
> {
	return {
		id: 'grouplist',
		type: 'blade',
		core: new Semver('2.0.0'),
		accept(params) {
			const result = parseRecord<GrouplistBladeParams<T>>(params, (p) => ({
				optgroups: p.required.custom<GrouplistParamsOptgroups<T>>(
					parseGrouplistOptgroups(p),
				),
				value: p.required.raw as MicroParser<T>,
				view: p.required.constant('grouplist'),

				label: p.optional.string,
			}));
			return result ? {params: result} : null;
		},
		controller(args) {
			const v = createValue(args.params.value);
			const vc = new GrouplistController(args.document, {
				props: ValueMap.fromObject({
					optgroups: normalizeGrouplistOptgroups<T>(args.params.optgroups),
				}),
				value: createValue(args.params.value),
				viewProps: args.viewProps,
			});
			return new LabeledValueBladeController<T, GrouplistController<T>>(
				args.document,
				{
					blade: args.blade,
					props: ValueMap.fromObject({
						label: args.params.label,
					} as LabelPropsObject),
					value: v,
					valueController: vc,
				},
			);
		},
		api(args) {
			if (!(args.controller instanceof LabeledValueBladeController)) {
				return null;
			}
			if (!(args.controller.valueController instanceof GrouplistController)) {
				return null;
			}
			return new GrouplistApi(args.controller);
		},
	};
})();
