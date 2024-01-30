import {
	bindValueMap,
	ClassName,
	createSvgIconElement,
	ListItem,
	Value,
	ValueMap,
	View,
	ViewProps,
} from '@tweakpane/core';

export type GrouplistProps<T> = ValueMap<{
	optgroups: ListItem<ListItem<T>[]>[];
}>;

interface Config<T> {
	props: GrouplistProps<T>;
	value: Value<T>;
	viewProps: ViewProps;
}

const className = ClassName('lst');

export class GrouplistView<T> implements View {
	public readonly selectElement: HTMLSelectElement;
	public readonly element: HTMLElement;
	private readonly value_: Value<T>;
	private readonly props_: GrouplistProps<T>;

	constructor(doc: Document, config: Config<T>) {
		this.onValueChange_ = this.onValueChange_.bind(this);

		this.props_ = config.props;

		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		const selectElement = doc.createElement('select');
		selectElement.classList.add(className('s'));
		bindValueMap(this.props_, 'optgroups', (optgroups) => {
			optgroups.forEach((groupItem, index) => {
				const optgroupElement = doc.createElement('optgroup');
				optgroupElement.dataset.index = String(index);
				optgroupElement.label = groupItem.text;

				groupItem.value.forEach((item, index) => {
					const optionElement = doc.createElement('option');
					optionElement.dataset.index = String(index);
					optionElement.textContent = item.text;
					optionElement.value = String(item.value);

					optgroupElement.appendChild(optionElement);
				});

				selectElement.appendChild(optgroupElement);
			});
		});

		config.viewProps.bindDisabled(selectElement);
		this.element.appendChild(selectElement);
		this.selectElement = selectElement;

		const markElement = doc.createElement('div');
		markElement.classList.add(className('m'));
		markElement.appendChild(createSvgIconElement(doc, 'dropdown'));
		this.element.appendChild(markElement);

		config.value.emitter.on('change', this.onValueChange_);
		this.value_ = config.value;

		this.update_();
	}

	private update_(): void {
		this.selectElement.value = String(this.value_.rawValue);
	}

	private onValueChange_(): void {
		this.update_();
	}
}
