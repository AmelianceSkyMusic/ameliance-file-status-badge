import { readFileStatus } from '../helpers/read-write/read-file-status';
import { writeFileStatus } from '../helpers/read-write/write-file-status';
import { store } from '../store/store';

type UpdatedPath = {
	oldPath: string;
	newPath: string;
};

export function setFileStatusOnFolderPathChange({ oldPath, newPath }: UpdatedPath) {
	let fileStatuses = readFileStatus();

	if (!fileStatuses || fileStatuses.length < 0) {
		return;
	}

	fileStatuses = fileStatuses.map(({ path, status }) => {
		return { path: path.replace(oldPath, newPath), status };
	});

	store.decorationProvider.disposeAll();

	fileStatuses.forEach(({ path, status }) => {
		const { badge, tooltip } = store.settings.badges[status];
		store.decorationProvider.update(path, { badge, tooltip });
	});

	writeFileStatus(fileStatuses);

	fileStatuses = [];
}
