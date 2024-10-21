import * as vscode from "vscode";

export const onDidChangeConfigurationCommand = (callback: () => any) => {
  return vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("fishTools")) {
      const updated = vscode.workspace.getConfiguration("fishTools");
      if (updated) {
        callback && callback();
      }
    }
  });
};
