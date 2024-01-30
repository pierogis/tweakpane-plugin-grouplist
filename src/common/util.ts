import * as TP from '@tweakpane/core';
import {MicroParser} from '@tweakpane/core';
import {MicroParsers} from '@tweakpane/core/dist/common/micro-parsers.js';

import {GrouplistConstraint} from './constraint.js';
import type {
	ArrayStyleGrouplistOptgroups,
	GrouplistParamsOptgroups,
	ObjectStyleGrouplistOptgroups,
} from './params.js';

export function parseGrouplistOptgroups<T>(p: typeof MicroParsers) {
	return (value: unknown): GrouplistParamsOptgroups<T> | undefined => {
		if (Array.isArray(value)) {
			return p.required.array(
				p.required.object({
					text: p.required.string,
					value: p.required.array(
						p.required.object({
							text: p.required.string,
							value: p.required.raw as MicroParser<T>,
						}),
					),
				}),
			)(value).value;
		}
		if (typeof value === 'object') {
			return (p.required.raw as MicroParser<ObjectStyleGrouplistOptgroups<T>>)(
				value,
			).value;
		}
		return undefined;
	};
}

export function normalizeGrouplistOptgroups<T>(
	optgroups: ArrayStyleGrouplistOptgroups<T> | ObjectStyleGrouplistOptgroups<T>,
): TP.ListItem<TP.ListItem<T>[]>[] {
	if (
		Array.isArray(optgroups) &&
		optgroups.every((optgroup) => Array.isArray(optgroup.value))
	) {
		return optgroups;
	}

	const objectStyleOptgroups = optgroups as ObjectStyleGrouplistOptgroups<T>;
	const items: TP.ListItem<TP.ListItem<T>[]>[] = Object.keys(
		objectStyleOptgroups,
	).map((groupName) => {
		const groupItems: TP.ListItem<T>[] = [];
		Object.keys(objectStyleOptgroups[groupName]).forEach((text) =>
			groupItems.push({
				text: text,
				value: objectStyleOptgroups[groupName][text],
			}),
		);
		return {text: groupName, value: groupItems};
	});
	return items;
}

export function createGrouplistConstraint<T>(
	optgroups: GrouplistParamsOptgroups<string> | undefined,
) {
	return !TP.isEmpty(optgroups)
		? new GrouplistConstraint(
				normalizeGrouplistOptgroups<T>(TP.forceCast(optgroups)),
			)
		: null;
}

export function findGrouplistItems<T>(
	constraint: TP.Constraint<T> | undefined,
): TP.ListItem<TP.ListItem<T>[]>[] | null {
	const c = constraint
		? TP.findConstraint<GrouplistConstraint<T>>(constraint, GrouplistConstraint)
		: null;
	if (!c) {
		return null;
	}

	return c.optgroups;
}
