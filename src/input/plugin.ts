import * as TP from '@tweakpane/core';

import {GrouplistController} from '../common/controller';
import type {GrouplistParamsOptgroups} from '../common/params';
import {
	createGrouplistConstraint,
	findGrouplistItems,
	parseGrouplistOptgroups,
} from '../common/util';

export interface StringGrouplistInputParams extends TP.BaseInputParams {
	optgroups: GrouplistParamsOptgroups<string>;
}

function createConstraint(
	params: StringGrouplistInputParams,
): TP.Constraint<string> {
	const constraints: TP.Constraint<string>[] = [];

	const lc = createGrouplistConstraint<string>(params.optgroups);
	if (lc) {
		constraints.push(lc);
	}

	return new TP.CompositeConstraint(constraints);
}

export const GrouplistStringInputPlugin: TP.InputBindingPlugin<
	string,
	string,
	StringGrouplistInputParams
> = {
	id: 'input-grouplist',
	type: 'input',
	accept: (value, params) => {
		if (typeof value !== 'string') {
			return null;
		}
		const p = TP.ParamsParsers;
		const result = TP.parseParams<StringGrouplistInputParams>(params, {
			optgroups: p.required.custom<GrouplistParamsOptgroups<string>>(
				parseGrouplistOptgroups,
			),
			view: p.required.constant('grouplist'),
		});
		return result
			? {
					initialValue: value,
					params: result,
			  }
			: null;
	},
	binding: {
		reader: (_args) => TP.stringFromUnknown,
		constraint: (args) => createConstraint(args.params),
		writer: (_args) => TP.writePrimitive,
	},
	controller: (args) => {
		const doc = args.document;
		const value = args.value;
		const c = args.constraint;

		return new GrouplistController(doc, {
			props: TP.ValueMap.fromObject({
				optgroups: findGrouplistItems(c) ?? [],
			}),
			value: value,
			viewProps: args.viewProps,
		});
	},
};
