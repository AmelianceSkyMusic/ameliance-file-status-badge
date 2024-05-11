import { isObjectEmpty } from '../../_ameliance-scripts/is-object-empty';
import { FileStatus } from '../../types/file-status';
import { StatusType } from '../../types/status-type';
import { readJSON } from '../../utils/file-system/read-json';

type Badges = {
	badges: Record<StatusType, FileStatus>;
};

export type Settings = {
	read: () => Badges | null;
	init: () => void;
} & Badges;

export const settings: Settings = {
	badges: {
		todo: {
			badge: '⬜',
			tooltip: 'To Do',
		},
		inProgress: {
			badge: '🟨',
			tooltip: 'In Progress',
		},
		testing: {
			badge: '🟦',
			tooltip: 'Testing',
		},
		done: {
			badge: '🟩',
			tooltip: 'Done',
		},
	},
	read: function () {
		return readJSON<Badges | null>('.file-status', 'settings.json');
	},
	init: function () {
		let settings = this.read();
		if (settings && !isObjectEmpty(settings)) {
			this.badges = {
				...this.badges,
				todo: {
					...this.badges.todo,
					badge: settings.badges.todo.badge,
					tooltip: settings.badges.todo.tooltip,
				},
				inProgress: {
					...this.badges.inProgress,
					badge: settings.badges.inProgress.badge,
					tooltip: settings.badges.inProgress.tooltip,
				},
				testing: {
					...this.badges.testing,
					badge: settings.badges.testing.badge,
					tooltip: settings.badges.testing.tooltip,
				},
				done: {
					...this.badges.done,
					badge: settings.badges.done.badge,
					tooltip: settings.badges.done.tooltip,
				},
			};
		}
		settings = null;
	},
};
