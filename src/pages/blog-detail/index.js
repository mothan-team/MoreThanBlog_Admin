import { BackTop } from "antd";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "../../components/Editor";
import { useBlogDetail } from "../../utils/useBlogDetail";
import { BlogDetailForm } from "./BlogDetailForm";

const BlogDetail = () => {
  const { id } = useParams();
  const { blogData, setBlogData, fetchingStatus } = useBlogDetail(id);
  /**
   * Handler for update blog content
   */
  const onUpdateBlogContent = content => {
    setBlogData(blogData => ({ ...blogData, content }));
  };

  /**
   * Attributes come from the form
   * e.g. title, description, mainImage...
   */
  const onUpdateBlogInfo = info => {
    setBlogData(blogData => ({ ...blogData, ...info }));
  };

  if (fetchingStatus !== "success") {
    return "Loading...";
  }

  return (
    <>
      <BlogDetailForm blogData={blogData} onUpdateBlogInfo={onUpdateBlogInfo} />
      <Editor value={blogData.content} onUpdateBlogContent={onUpdateBlogContent} />
      <BackTop />
    </>
  );
};
export const BlogContext = createContext();

export default BlogDetail;
