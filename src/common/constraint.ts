import type {Constraint, ListItem} from '@tweakpane/core';

export class GrouplistConstraint<T> implements Constraint<T> {
	public readonly optgroups: ListItem<ListItem<T>[]>[];

	constructor(optgroups: ListItem<ListItem<T>[]>[]) {
		this.optgroups = optgroups;
	}

	public constrain(value: T): T {
		const optgroups = this.optgroups;

		const allOptions = optgroups.flatMap((optgroup) => optgroup.value);

		if (allOptions.length === 0) {
			return value;
		}

		const matched =
			allOptions.filter((item) => {
				return item.value === value;
			}).length > 0;

		return matched ? value : allOptions[0].value;
	}
}
