import { readFileStatus } from '../helpers/read-write/read-file-status';
import { store } from '../store/store';
import { deleteFileStatusesData } from './helpers/delete-file-status-from-data';

export function deleteStatusOnFilePathDelete(filePath: string) {
	let fileStatuses = readFileStatus();

	if (!fileStatuses || fileStatuses.length < 0) {
		return;
	}

	if (filePath in store.decorationProvider.providers) {
		store.decorationProvider.providers[filePath].dispose();
	}

	deleteFileStatusesData(filePath);

	fileStatuses = [];
}
