import { DecorationProvider, decorationProvider } from './decoration-provider';
import { Settings, settings } from './settings/settings';

type Store = {
	decorationProvider: DecorationProvider;
	settings: Settings;
};

export const store: Store = {
	decorationProvider,
	settings,
};
