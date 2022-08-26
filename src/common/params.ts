export type ArrayStyleGrouplistOptgroups<T> = {
	text: string;
	value: {text: string; value: T}[];
}[];
export type ObjectStyleGrouplistOptgroups<T> = {
	[text: string]: {[text: string]: T};
};
export type GrouplistParamsOptgroups<T> =
	| ArrayStyleGrouplistOptgroups<T>
	| ObjectStyleGrouplistOptgroups<T>;
