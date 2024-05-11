import * as vscode from 'vscode';
import { getActiveDocumentPath } from '../helpers/path/get-active-document-path';
import { store } from '../store/store';
import { StatusType } from '../types/status-type';
import { deleteFileStatusesData } from './helpers/delete-file-status-from-data';
import { saveFileStatusesData } from './helpers/save-file-statuses-data';

export function setFileStatus(uri?: vscode.Uri, statusType?: StatusType) {
	let fileUri = uri?.fsPath || getActiveDocumentPath();

	if (!fileUri) {
		return;
	}

	if (fileUri in store.decorationProvider.providers) {
		store.decorationProvider.providers[fileUri].dispose();
	}

	if (statusType) {
		const { badge, tooltip } = store.settings.badges[statusType];
		store.decorationProvider.update(fileUri, { badge, tooltip });
		saveFileStatusesData(fileUri, statusType);
	} else {
		store.decorationProvider.update(fileUri);
		deleteFileStatusesData(fileUri);
	}
}
