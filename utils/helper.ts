export const updateSearchParams = (
  router: any,
  searchParams: any,
  pathname: any,
  type: any,
  value: any
) => {
  const current = new URLSearchParams(Array.from(searchParams.entries()) as []);
  if (!value) {
    current.delete(type);
  } else {
    current.set(type, value);
  }
  const search = current.toString();
  const query = search ? `?${search}` : "";

  router.replace(`${pathname}${query}`);
};
