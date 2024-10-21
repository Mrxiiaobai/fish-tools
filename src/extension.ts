import * as vscode from "vscode";
import { runInterval } from "./utils/func";
import { CustomTreeDataProvider } from "./api/treeDataProvider";
import { init } from "./api/init";
import { openContentCommand } from "./commands/openContent";
import { globalState } from "./utils/globalState";

export function activate(context: vscode.ExtensionContext) {
  try {
    // 注册自定义视图
    globalState.setState("context", context);

    const customTreeDataProvider = new CustomTreeDataProvider();

    const customView = vscode.window.createTreeView("fishView", {
      treeDataProvider: customTreeDataProvider,
    });

    init(customTreeDataProvider);

    context.subscriptions.push(openContentCommand);
    context.subscriptions.push(customView);
  } catch (error) {
    vscode.window.showInformationMessage(`${error}`);
  }
}

export function deactivate() {
  runInterval.stop();
}
