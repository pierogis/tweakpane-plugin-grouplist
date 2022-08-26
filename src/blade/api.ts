import * as TP from '@tweakpane/core';

import type {GrouplistController} from '../common/controller';

export class GrouplistApi<T> extends TP.BladeApi<
	TP.LabelController<GrouplistController<T>>
> {
	private readonly emitter_: TP.Emitter<TP.ApiChangeEvents<T>> =
		new TP.Emitter();

	constructor(controller: TP.LabelController<GrouplistController<T>>) {
		super(controller);

		this.controller_.valueController.value.emitter.on('change', (ev) => {
			this.emitter_.emit('change', {
				event: new TP.TpChangeEvent(this, ev.rawValue),
			});
		});
	}

	get label(): string | undefined {
		return this.controller_.props.get('label');
	}

	set label(label: string | undefined) {
		this.controller_.props.set('label', label);
	}

	get optgroups(): TP.ListItem<TP.ListItem<T>[]>[] {
		return this.controller_.valueController.props.get('optgroups');
	}

	set optgroups(optgroups: TP.ListItem<TP.ListItem<T>[]>[]) {
		this.controller_.valueController.props.set('optgroups', optgroups);
	}

	get value(): T {
		return this.controller_.valueController.value.rawValue;
	}

	set value(value: T) {
		this.controller_.valueController.value.rawValue = value;
	}

	public on<EventName extends keyof TP.ApiChangeEvents<T>>(
		eventName: EventName,
		handler: (ev: TP.ApiChangeEvents<T>[EventName]['event']) => void,
	): this {
		const bh = handler.bind(this);
		this.emitter_.on(eventName, (ev) => {
			bh(ev.event);
		});
		return this;
	}
}
