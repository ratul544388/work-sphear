import qs from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const setQueryParams = ({ query, clearCurrentQuery, toggle }) => {
    const currentQuery = clearCurrentQuery
      ? {}
      : qs.parse(searchParams.toString());

    if (toggle) {
      Object.entries(query).forEach(([key, value]) => {
        const currentValue = currentQuery[key];
        if (currentValue === value) {
          delete query[key];
          delete currentQuery[key];
        }
      });
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...currentQuery,
          ...query,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    navigate(url);
  };

  return { setQueryParams };
};
