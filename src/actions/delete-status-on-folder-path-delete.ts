import { readFileStatus } from '../helpers/read-write/read-file-status';
import { writeFileStatus } from '../helpers/read-write/write-file-status';
import { store } from '../store/store';

export function deleteStatusOnFolderPathDelete(folderPath: string) {
	let fileStatuses = readFileStatus();

	if (!fileStatuses || fileStatuses.length < 0) {
		return;
	}

	fileStatuses = fileStatuses.filter(({ path }) => !path.includes(folderPath));

	store.decorationProvider.disposeAll();

	fileStatuses.forEach(({ path, status }) => {
		const { badge, tooltip } = store.settings.badges[status];
		store.decorationProvider.update(path, { badge, tooltip });
	});

	writeFileStatus(fileStatuses);

	fileStatuses = [];
}
