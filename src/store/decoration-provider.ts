import * as vscode from 'vscode';
import { DecorationProviders } from '../types/decoration-providers';
import { FileStatus } from '../types/file-status';
import { readFileStatus } from '../helpers/read-write/read-file-status';
import { store } from './store';

export type DecorationProvider = {
	providers: DecorationProviders;
	init: () => void;
	disposeAll: () => void;
	update: (fileUri: string, fileStatus?: FileStatus) => void;
};

export const decorationProvider: DecorationProvider = {
	providers: {},
	init: function () {
		let fileStatuses = readFileStatus();

		if (!fileStatuses || fileStatuses.length < 0) {
			return;
		}

		fileStatuses.forEach(({ path, status }) => {
			const { badge, tooltip } = store.settings.badges[status];
			this.update(path, { badge, tooltip });
		});

		fileStatuses = [];
	},
	update: function (fileUri, fileStatus) {
		this.providers[fileUri] = vscode.window.registerFileDecorationProvider({
			provideFileDecoration(uri: vscode.Uri) {
				if (fileStatus && uri.fsPath === fileUri) {
					const { badge, tooltip } = fileStatus;
					return { badge, tooltip };
				}
				return null;
			},
		});
	},
	disposeAll: function () {
		Object.values(this.providers).forEach((provider) => {
			provider.dispose();
		});
	},
};
