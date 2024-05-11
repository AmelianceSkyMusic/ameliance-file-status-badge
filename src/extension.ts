import * as fs from 'fs';
import * as vscode from 'vscode';
import { setFileStatus } from './actions/set-file-status';
import { setFileStatusOnFilePathChange } from './actions/set-file-status-on-file-path-change';
import { setFileStatusOnFolderPathChange } from './actions/set-file-status-on-folder-path-change';
import { init } from './helpers/init';
import { deleteStatusOnFilePathDelete } from './actions/delete-status-on-file-path-delete';
import { deleteStatusOnFolderPathDelete } from './actions/delete-status-on-folder-path-delete';

export function activate(context: vscode.ExtensionContext) {
	init();

	const onWillRenameFiles = vscode.workspace.onWillRenameFiles((event) => {
		event.files.forEach((file) => {
			const oldPath = file.oldUri.fsPath;
			const newPath = file.newUri.fsPath;
			const isFile = fs.statSync(oldPath).isFile();
			if (isFile) {
				setFileStatusOnFilePathChange({ oldPath, newPath });
			} else {
				setFileStatusOnFolderPathChange({ oldPath, newPath });
			}
		});
	});

	const onWillDeleteFiles = vscode.workspace.onWillDeleteFiles((event) => {
		event.files.forEach((file) => {
			const path = file.fsPath;
			const isFile = fs.statSync(path).isFile();
			if (isFile) {
				deleteStatusOnFilePathDelete(path);
			} else {
				deleteStatusOnFolderPathDelete(path);
			}
		});
	});

	const setFileStatusTodo = (uri?: vscode.Uri) => setFileStatus(uri, 'todo');
	const setFileStatusInProgress = (uri?: vscode.Uri) => setFileStatus(uri, 'inProgress');
	const setFileStatusTesting = (uri?: vscode.Uri) => setFileStatus(uri, 'testing');
	const setFileStatusDone = (uri?: vscode.Uri) => setFileStatus(uri, 'done');
	const setFileStatusNone = (uri?: vscode.Uri) => setFileStatus(uri);

	const command = {
		todo: vscode.commands.registerCommand('ameliance-file-status-badge.command.todo', () => setFileStatusTodo()),

		inProgress: vscode.commands.registerCommand('ameliance-file-status-badge.command.inProgress', () =>
			setFileStatusInProgress(),
		),

		testing: vscode.commands.registerCommand('ameliance-file-status-badge.command.testing', () =>
			setFileStatusTesting(),
		),

		done: vscode.commands.registerCommand('ameliance-file-status-badge.command.done', () => setFileStatusDone()),

		none: vscode.commands.registerCommand('ameliance-file-status-badge.command.none', () => setFileStatusNone()),
	};

	const menu = {
		todo: vscode.commands.registerCommand('ameliance-file-status-badge.menu.todo', (uri: vscode.Uri) =>
			setFileStatusTodo(uri),
		),
		inProgress: vscode.commands.registerCommand('ameliance-file-status-badge.menu.inProgress', (uri: vscode.Uri) =>
			setFileStatusInProgress(uri),
		),
		testing: vscode.commands.registerCommand('ameliance-file-status-badge.menu.testing', (uri: vscode.Uri) =>
			setFileStatusTesting(uri),
		),
		done: vscode.commands.registerCommand('ameliance-file-status-badge.menu.done', (uri: vscode.Uri) =>
			setFileStatusDone(uri),
		),
		none: vscode.commands.registerCommand('ameliance-file-status-badge.menu.none', (uri: vscode.Uri) =>
			setFileStatusNone(uri),
		),
	};

	context.subscriptions.push(...Object.values(command), ...Object.values(menu), onWillRenameFiles, onWillDeleteFiles);
}

export function deactivate() {}
