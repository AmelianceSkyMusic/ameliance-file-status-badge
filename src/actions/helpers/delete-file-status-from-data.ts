import { getIndexByKey } from '../../_ameliance-scripts/get-index-by-key';
import { readFileStatus } from '../../helpers/read-write/read-file-status';
import { writeFileStatus } from '../../helpers/read-write/write-file-status';

export function deleteFileStatusesData(fileUri: string) {
	let fileStatuses = readFileStatus();

	if (!fileStatuses || fileStatuses.length < 0) {
		return;
	}

	const elementIndex = getIndexByKey(fileStatuses, 'path', fileUri);
	if (elementIndex < 0) {
		return;
	}

	fileStatuses.splice(elementIndex, 1);

	writeFileStatus(fileStatuses);

	fileStatuses = [];
}
