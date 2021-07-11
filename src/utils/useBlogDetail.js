import { useEffect, useRef } from "react";
import { useDebounce } from "./debounceHelper";
import { useAsync } from "./hooks";
import { callAuthorizationApi } from "./request";

const UPDATING_DEBOUNCE_TIME = 500;

export const useBlogDetail = id => {
  /**
   * Hook for fetching blog
   */
  const {
    execute,
    value: blogData,
    setValue: setBlogData,
    status: fetchingStatus,
  } = useAsync(
    () =>
      callAuthorizationApi(`blogs/${id}`).then(response => ({
        ...response.data,
        mainImageId: response.data.mainImage?.id,
      })),
    false
  );

  /**
   * Hook for updating blog
   */
  const { execute: updateBlog, status: savingStatus } = useAsync(
    () => callAuthorizationApi(`blogs`, "POST", debounceBlogData).then(response => response.data),
    false
  );

  /**
   * Final version before call API to update blog
   * Being update after UPDATING_DEBOUNCE_TIME ms on the last change of blogData
   */
  const debounceBlogData = useDebounce(blogData, UPDATING_DEBOUNCE_TIME);

  /**
   * Check if it is the first time debounceBlogData got data.
   */
  const isDebounceBlogDataFirstTimeRetrieveData = useRef(true);

  /**
   * Fetch blog detail
   */
  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Call API to update blog when debounceBlogData changed.
   * debounceBlogData will be set from null to object on first fetching
   * so it will trigger call update effect. We prevent that by
   * check whether it is the first time debounceBlogData from null => object
   * We won't call the update effect
   */
  useEffect(() => {
    if (debounceBlogData && !isDebounceBlogDataFirstTimeRetrieveData.current) updateBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceBlogData]);

  /**
   * Set firstUpdate to false after calling update effect for the first time
   * From now on, we can call update effect whenever debouceBlogData change
   */
  useEffect(() => {
    if (isDebounceBlogDataFirstTimeRetrieveData.current && debounceBlogData) {
      isDebounceBlogDataFirstTimeRetrieveData.current = false;
    }
  }, [debounceBlogData]);

  return { setBlogData, fetchingStatus, savingStatus, blogData };
};
