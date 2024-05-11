import { getIndexByKey } from '../../_ameliance-scripts/get-index-by-key';
import { readFileStatus } from '../../helpers/read-write/read-file-status';
import { writeFileStatus } from '../../helpers/read-write/write-file-status';
import { StatusType } from '../../types/status-type';

export function saveFileStatusesData(fileUri: string, statusType: StatusType) {
	let fileStatuses = readFileStatus();

	if (!fileStatuses || fileStatuses.length < 0) {
		fileStatuses = [];
	}

	const elementIndex = getIndexByKey(fileStatuses, 'path', fileUri);
	if (elementIndex >= 0) {
		fileStatuses[elementIndex] = { path: fileUri, status: statusType };
	} else {
		fileStatuses.push({ path: fileUri, status: statusType });
	}

	writeFileStatus(fileStatuses);

	fileStatuses = [];
}
