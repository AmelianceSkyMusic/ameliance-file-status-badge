import { store } from '../store/store';

export function init() {
	store.settings.init();
	store.decorationProvider.init();
}
