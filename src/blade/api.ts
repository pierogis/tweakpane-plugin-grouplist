import {
	ApiChangeEvents,
	BladeApi,
	LabeledValueBladeController,
	ListItem,
	TpChangeEvent,
} from '@tweakpane/core';

import type {GrouplistController} from '../common/controller.js';

export interface GrouplistApiEvents<T> {
	change: {
		event: TpChangeEvent<T>;
	};
}

export class GrouplistApi<T> extends BladeApi<
	LabeledValueBladeController<T, GrouplistController<T>>
> {
	get label(): string | null | undefined {
		return this.controller.labelController.props.get('label');
	}

	set label(label: string | null | undefined) {
		this.controller.labelController.props.set('label', label);
	}

	get optgroups(): ListItem<ListItem<T>[]>[] {
		return this.controller.valueController.props.get('optgroups');
	}

	set optgroups(optgroups: ListItem<ListItem<T>[]>[]) {
		this.controller.valueController.props.set('optgroups', optgroups);
	}

	get value(): T {
		return this.controller.valueController.value.rawValue;
	}

	set value(value: T) {
		this.controller.valueController.value.rawValue = value;
	}

	public on<EventName extends keyof ApiChangeEvents<T>>(
		eventName: EventName,
		handler: (ev: GrouplistApiEvents<T>[EventName]['event']) => void,
	): this {
		const bh = handler.bind(this);
		this.controller.valueController.value.emitter.on(eventName, (ev) => {
			bh(new TpChangeEvent(this, ev.rawValue, ev.options.last));
		});
		return this;
	}
}
