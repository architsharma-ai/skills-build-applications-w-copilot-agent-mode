const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const port = 8000;

const host = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

export const apiBaseUrl = `${host}/api`;

function normalizePagination(data) {
  return {
    page: data.page ?? data.pageNumber ?? data.page_num ?? 1,
    totalPages: data.totalPages ?? data.total_pages ?? data.totalPage ?? 1,
    nextPage: data.nextPage ?? data.next_page ?? data.next ?? null,
    prevPage: data.prevPage ?? data.prev_page ?? data.previous ?? null,
  };
}

function normalizeResponse(json) {
  if (!json) {
    return { items: [], pagination: normalizePagination({}) };
  }

  if (Array.isArray(json)) {
    return { items: json, pagination: normalizePagination({}) };
  }

  const items =
    Array.isArray(json.items) ? json.items :
    Array.isArray(json.data) ? json.data :
    Array.isArray(json.results) ? json.results :
    Array.isArray(json.rows) ? json.rows :
    [];

  return {
    items,
    pagination: normalizePagination(json)
  };
}

export async function fetchList(endpoint, page = 1) {
  const pageQuery = page ? `?page=${page}` : '';
  const url = `${apiBaseUrl}/${endpoint}${pageQuery}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${endpoint}: ${response.statusText}`);
  }

  const json = await response.json();
  return normalizeResponse(json);
}

export function getApiUrl(endpoint) {
  return `${apiBaseUrl}/${endpoint}`;
}
