const useSearch = (searchParams: string) => {
  const params = new URLSearchParams(searchParams);
  const search = params.get('category');

  return search;
};

export default useSearch;
