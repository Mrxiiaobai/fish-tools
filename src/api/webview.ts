import * as vscode from "vscode";
import { globalState } from "../utils/globalState";
import { analyze } from "../utils/func";
import { getHotDetail } from "../utils/service";

const path = require("path");

const templateHtml = (scriptUri: any) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>详情</title>
    </head>
    <body>
      <div id="loading">页面初始化中...</div>
      <div id="root"></div>
      <script src=${scriptUri}></script>
    </body>
  </html>`;
};

export class Webview {
  panel: any;

  init(extensionPath: any, webviewId: string, webviewTitle?: string) {
    this.panel = vscode.window.createWebviewPanel(
      webviewId,
      webviewTitle || "详情",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    // 监听 Webview 面板释放事件
    this.panel.onDidDispose(() => {
      globalState.setState("webviewPanel", null);
      globalState.setState("activeKey", null);
    });

    const jsPath = globalState.getState("jsPath");

    const scriptPath = vscode.Uri.file(path.join(extensionPath, jsPath));

    const scriptUri = this.panel.webview.asWebviewUri(scriptPath);

    this.panel.webview.html = templateHtml(scriptUri);

    this.panel.webview.onDidReceiveMessage((message: any) => {
      if (message.command) {
        this.setContent({
          ...message.text,
          title: globalState.getState("activeItem")?.activeTitle,
          id: globalState.getState("activeItem")?.activeKey,
        });
      }
    });

    return this.panel;
  }

  postMessage({ command, text }: { command: string; text: any }) {
    setTimeout(() => {
      this.panel.webview.postMessage({
        command,
        text,
      });
    }, 50);
  }

  async setContent({
    title,
    id,
    page,
  }: {
    title: string;
    id: string;
    page?: number;
  }) {
    this.postMessage({
      command: "loading",
      text: true,
    });

    const detail = await getHotDetail({ title, page });
    const content = analyze(detail);

    this.postMessage({
      command: "getMessage",
      text: content,
    });

    globalState.setState("activeItem", {
      activeKey: title,
      activeTitle: title,
    });
  }
}

export const webview = new Webview();
