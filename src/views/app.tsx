import {
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, List, Space, Spin, message } from "antd";
import * as React from "react";

type IItem = {
  avatar?: string;
  nickName: string;
  descriptions?: string;
  content: string;
  forward?: number;
  comment?: number;
  like?: number;
};

declare const acquireVsCodeApi: any;

const vscode = acquireVsCodeApi();

export const App = () => {
  const [content, setContent] = React.useState<{
    data: IItem[];
    topic: string;
  }>({
    data: [],
    topic: "",
  });
  const [loading, setLoading] = React.useState(true);

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    window.addEventListener("message", (event: any) => {
      const message = event.data;
      if (message.command === "loading") {
        setLoading(true);
      }
      if (message.command === "getMessage") {
        console.log(message.text);
        // 执行相应操作
        setLoading(false);
        setContent(message.text);
      }
    });
  }, []);

  const IconText = ({
    icon,
    text,
    style,
  }: {
    icon: React.FC;
    text?: string | number;
    style?: React.CSSProperties;
  }) => (
    <Space style={style}>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const onRefresh = () => {
    setLoading(true);
    vscode.postMessage({
      command: "refresh",
      text: {},
    });
  };

  const onPageUp = () => {
    const newPage = page - 1;
    if (newPage < 1) {
      return;
    }
    setLoading(true);
    vscode.postMessage({
      command: "pageUp",
      text: { page: page - 1 },
    });
    setPage(newPage);
  };

  const onPageDown = () => {
    setLoading(true);

    const newPage = page + 1;
    vscode.postMessage({
      command: "pageDown",
      text: { page: page + 1 },
    });
    setPage(newPage);
  };

  return (
    <div>
      {(content?.data || [])?.length > 0 && (
        <Spin tip="loading..." spinning={loading}>
          <Space wrap>
            <Button type="text" onClick={onRefresh}>
              刷新
            </Button>
            <Button type="text" onClick={onPageUp} disabled={page <= 1}>
              上一页
            </Button>
            <Button type="text" onClick={onPageDown}>
              下一页
            </Button>
          </Space>
          <Divider />
          <p style={{ paddingLeft: "15px" }}>{content?.topic}</p>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={content?.data || []}
            renderItem={(item: IItem) => (
              <>
                <List.Item
                  key={item?.nickName}
                  actions={[
                    <IconText
                      icon={ShareAltOutlined}
                      text={item?.forward}
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text={item?.comment}
                      key="list-vertical-message"
                      style={{ cursor: "pointer" }}
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text={item?.like}
                      key="list-vertical-like-o"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src="" />}
                    title={item?.nickName}
                    description={item?.descriptions}
                  />
                  {item?.content}
                </List.Item>
                {/* <List
                  itemLayout="vertical"
                  size="small"
                  dataSource={content?.data || []}
                  renderItem={(item: IItem) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="" />}
                        title={item?.nickName}
                        description={item?.descriptions}
                      />
                      {item?.content}
                    </List.Item>
                  )}
                /> */}
              </>
            )}
          />
        </Spin>
      )}
    </div>
  );
};
