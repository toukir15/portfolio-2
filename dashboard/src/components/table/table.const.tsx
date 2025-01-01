import { Tag } from "antd";

export const projectColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (logo: string) => (
      <img
        src={logo}
        alt="logo"
        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
      />
    ),
  },
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description: string) => (
      <Tag color="purple">
        {description.length > 20 ? `${description.slice(0, 20)}...` : description}
      </Tag>
    ),
  },
  {
    title: "Live",
    dataIndex: "live",
    key: "live",
    render: (liveLink: string) => (
      <a href={liveLink} target="_blank" rel="noopener noreferrer">
        <Tag color="green">Live Link</Tag>
      </a>
    ),
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
    render: (sourceLink: string) => (
      <a href={sourceLink} target="_blank" rel="noopener noreferrer">
        <Tag color="red">Source Code</Tag>
      </a>
    ),
  },
];

export const blogColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (logo: string) => (
      <img
        src={logo}
        alt="logo"
        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
      />
    ),
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Published",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => (
      <Tag color="green">{createdAt}</Tag>
    ),
  },
];

