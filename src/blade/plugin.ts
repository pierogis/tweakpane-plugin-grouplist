import * as TP from '@tweakpane/core';

import {GrouplistController} from '../common/controller';
import type {GrouplistParamsOptgroups} from '../common/params';
import {
	normalizeGrouplistOptgroups,
	parseGrouplistOptgroups,
} from '../common/util';
import {GrouplistApi} from './api';

export interface GrouplistBladeParams<T> extends TP.BaseBladeParams {
	optgroups: GrouplistParamsOptgroups<T>;
	value: T;
	view: 'grouplist';

	label?: string;
}

export const GrouplistBladePlugin = (function <T>(): TP.BladePlugin<
	GrouplistBladeParams<T>
> {
	return {
		id: 'grouplist',
		type: 'blade',
		accept(params) {
			const p = TP.ParamsParsers;
			const result = TP.parseParams<GrouplistBladeParams<T>>(params, {
				optgroups: p.required.custom<GrouplistParamsOptgroups<T>>(
					parseGrouplistOptgroups,
				),
				value: p.required.raw as TP.ParamsParser<T>,
				view: p.required.constant('grouplist'),

				label: p.optional.string,
			});
			return result ? {params: result} : null;
		},
		controller(args) {
			const ic = new GrouplistController(args.document, {
				props: TP.ValueMap.fromObject({
					optgroups: normalizeGrouplistOptgroups<T>(args.params.optgroups),
				}),
				value: TP.createValue(args.params.value),
				viewProps: args.viewProps,
			});
			return new TP.LabeledValueController<T, GrouplistController<T>>(
				args.document,
				{
					blade: args.blade,
					props: TP.ValueMap.fromObject({
						label: args.params.label,
					}),
					valueController: ic,
				},
			);
		},
		api(args) {
			if (!(args.controller instanceof TP.LabeledValueController)) {
				return null;
			}
			if (!(args.controller.valueController instanceof GrouplistController)) {
				return null;
			}
			return new GrouplistApi(args.controller);
		},
	};
})();
