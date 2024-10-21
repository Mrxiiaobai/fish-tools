import * as vscode from "vscode";
import { onDidChangeConfigurationCommand } from "../commands/onDidChangeConfiguration";
import { runInterval } from "../utils/func";
import { globalState } from "../utils/globalState";

export const init = (customTreeDataProvider: any) => {
  const config = vscode.workspace.getConfiguration("fishTools");

  const onRefresh = () => {
    customTreeDataProvider.refresh();
  };

  vscode.commands.registerCommand("fishView.refreshEntry", () => {
    onRefresh();
  });

  // 默认每隔30分钟 更新一次热搜
  runInterval.start(onRefresh, config.interval || 30);
  const context = globalState.getState("context");
  context.subscriptions.push(
    // 监听配置变化
    onDidChangeConfigurationCommand(() => {
      const config = vscode.workspace.getConfiguration("fishTools");
      runInterval.start(onRefresh, config.interval || 30);
    })
  );
};
