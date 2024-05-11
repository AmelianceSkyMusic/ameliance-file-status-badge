import { getIndexByKey } from '../_ameliance-scripts/get-index-by-key';
import { readFileStatus } from '../helpers/read-write/read-file-status';
import { store } from '../store/store';
import { deleteFileStatusesData } from './helpers/delete-file-status-from-data';
import { saveFileStatusesData } from './helpers/save-file-statuses-data';

type UpdatedPath = {
	oldPath: string;
	newPath: string;
};

export function setFileStatusOnFilePathChange({ oldPath, newPath }: UpdatedPath) {
	let fileStatuses = readFileStatus();

	if (!fileStatuses || fileStatuses.length < 0) {
		return;
	}

	if (oldPath in store.decorationProvider.providers) {
		store.decorationProvider.providers[oldPath].dispose();
	}

	const elementIndex = getIndexByKey(fileStatuses, 'path', oldPath);
	if (elementIndex < 0) {
		return;
	}
	const index = elementIndex < 0 ? 0 : elementIndex;
	const fileStatus = fileStatuses[index].status;

	const { badge, tooltip } = store.settings.badges[fileStatus];

	store.decorationProvider.update(newPath, { badge, tooltip });
	saveFileStatusesData(newPath, fileStatus);
	store.decorationProvider.update(oldPath);
	deleteFileStatusesData(oldPath);

	fileStatuses = [];
}
