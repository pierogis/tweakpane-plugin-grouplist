import * as TP from '@tweakpane/core';
import {Controller} from '@tweakpane/core';

import {type GrouplistProps, GrouplistView} from './view.js';

interface Config<T> {
	props: TP.ValueMap<{
		optgroups: TP.ListItem<TP.ListItem<T>[]>[];
	}>;
	value: TP.Value<T>;
	viewProps: TP.ViewProps;
}

export class GrouplistController<T> implements Controller<GrouplistView<T>> {
	public readonly value: TP.Value<T>;
	public readonly view: GrouplistView<T>;
	public readonly props: GrouplistProps<T>;
	public readonly viewProps: TP.ViewProps;

	constructor(doc: Document, config: Config<T>) {
		this.onSelectChange_ = this.onSelectChange_.bind(this);

		this.props = config.props;
		this.value = config.value;
		this.viewProps = config.viewProps;

		this.view = new GrouplistView(doc, {
			props: this.props,
			value: this.value,
			viewProps: this.viewProps,
		});
		this.view.selectElement.addEventListener('change', this.onSelectChange_);
	}

	private onSelectChange_(e: Event): void {
		const selectElem: HTMLSelectElement = TP.forceCast(e.currentTarget);
		const optElem = selectElem.selectedOptions.item(0);
		if (!optElem) {
			return;
		}

		const itemIndex = Number(selectElem.selectedIndex);
		this.value.rawValue = this.props
			.get('optgroups')
			.flatMap((optgroup) => optgroup.value)[itemIndex].value;
	}
}
